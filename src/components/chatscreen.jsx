/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { auth, firestore } from '../Firebase';
import { addDoc, collection, getDocs, query, where, Timestamp, onSnapshot } from 'firebase/firestore';
import {  Head, UserChat,  } from './nav';
import { Searchs } from './search';
import { FiPaperclip } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
export  const ChatScreen = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [showChat, setShowChat] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const senderId = auth.currentUser?.uid;
  const chatContainerRef = useRef(null);


  const fetchUsers = async (auth, setOnlineUsers, firestore) => {
    try {
      const userRef = collection(firestore, 'users');
      const q = query(userRef, where('email', '!=', auth.currentUser.email));
      const usersnapshot = await getDocs(q);
      const userdata = usersnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
      setOnlineUsers(userdata);
    } catch (error) {
      // setError(error.message);
      console.log(error)
    }
  };

  useEffect(() => {
    const handleScroll = () => {
        if (chatContainerRef.current) {
            setIsScrolled(chatContainerRef.current.scrollTop > 50);
        }
    };

    const chatContainer = chatContainerRef.current;
    chatContainer.addEventListener('scroll', handleScroll);
    
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
       
        fetchUsers(auth, setOnlineUsers, firestore);
      } else {
        setOnlineUsers([]);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
   
  }, [auth, firestore, setOnlineUsers]);

  const fetchChatMessages = async (senderId, selectedUser) => {
    try {
      const messageQuery = query(
        collection(firestore, 'messages'),
        where('receiverId', 'in', [selectedUser.uid, senderId]),
        where('senderId', 'in', [selectedUser.uid, senderId])
      );
      // const messageSnapshot = await getDocs(messageQuery);
      const unsubscribe = onSnapshot(messageQuery,(snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const sortedMessages = messagesData.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(sortedMessages);
      })
      return unsubscribe;
    }
    
    catch (error) {
      console.error('Error fetching chat messages:', error);
    }
    
  };
  


  useEffect(() => {
    if (selectedUser) {
     const unsubscribe =  fetchChatMessages(senderId, selectedUser);
     return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe(); // Call unsubscribe during cleanup
      }
    };
    }
    
  }, [selectedUser, senderId]);

  const handleChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    if (selectedUser) {
      try {
        await addDoc(collection(firestore, 'messages'), {
          senderId: senderId,
          receiverId: selectedUser.uid,
          content: chatInput,
          timestamp: Timestamp.now(),
          read: false,
          status:false
        });

        setMessages([...messages, { content: chatInput, senderId: senderId, receiverId: selectedUser.uid }]);
        setChatInput('');
        
      } catch (err) {
        console.error('Error sending message', err);
      }
    } else {
      console.error('No selected user');
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const time = timestamp.toDate();
    return time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  let lastDate = null;
    return (
  <div className="flex h-screen font-sans">
    {/* Left Sidebar */}
    <div className="w-1/3 bg-white border-r border-gray-300 p-4">
      <Searchs 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Head 
        onlineUsers={onlineUsers}
        setSelectedUser={setSelectedUser}
        searchQuery={searchQuery}
        currentUserId={senderId}
        
      />
      <UserChat
        onlineUsers={onlineUsers}
        setSelectedUser={setSelectedUser}
        messages={messages}
        selectedUser={selectedUser}
        currentUserId={senderId}
      />
    </div>

    {/* Right Chat Area */}
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className={`p-4 border-b transition-colors duration-300 ${isScrolled ? 'bg-nightowl-background text-nightowl-text' : 'bg-gray-500 text-nightowl-background'}`}>
                <h6 className="text-lg font-sans font-semibold text-white">
                    {selectedUser ? selectedUser.name || selectedUser.email : "Select a user to start chatting"}
                </h6>
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
      <ul className="space-y-2 message-list">
  {messages.map((msg, index) => {
    const messageDate = formatDate(msg.timestamp);
    const showDate = lastDate !== messageDate;
    lastDate = messageDate;
    return (
      <div key={index}>
        {showDate && (
          <div className="date-divider text-center text-xs font-bold text-gray-500 my-2">
            {messageDate}
          </div>
        )}
        <li
          className={`message-item ${
            msg.senderId === senderId ? "sent" : "received"
          }`}
        >
          <span>{msg.content}</span>
          <small className="block text-xs text-gray-600 mt-1">
            {formatTime(msg.timestamp)}
          </small>
        </li>
      </div>
    );
  })}
</ul>

      </div>

      {/* Message Input */}
      <div className="p-3 bg-nightowl-cyan flex items-center">
        <input
          type="text"
          className="flex-grow border rounded-lg px-3 py-1.5 text-sm"
          placeholder="Type a message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <a className="ml-3 hover:text-gray-700" href="#!">
          <FiPaperclip />
        </a>
        <a className="ml-3 hover:text-gray-700" href="#!">
          <FaRegSmile />
        </a>
        <a
          className="ml-3 text-blue-500 hover:text-blue-700"
          onClick={handleSendMessage}
        >
          <FaPaperPlane />
        </a>
      </div>
    </div>
  </div>
);

};


