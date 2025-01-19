/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { auth, firestore } from '../Firebase';
import { addDoc, collection, getDocs, query, where, Timestamp, onSnapshot } from 'firebase/firestore';
import {  Head, UserChat,  } from './nav';
import { Searchs } from './search';
import { FiPaperclip } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FiArrowLeft } from 'react-icons/fi';
import { TextField, IconButton } from '@mui/material';
export  const ChatScreen = () => {
  const darkMode = useSelector((state) => state.darkMode)
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [showChat, setShowChat] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showChatArea, setShowChatArea] = useState(false);

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //       if (chatContainerRef.current) {
  //           setIsScrolled(chatContainerRef.current.scrollTop > 50);
  //       }
  //   };

  //   const chatContainer = chatContainerRef.current;
  //   chatContainer.addEventListener('scroll', handleScroll);
    
  //   return () => chatContainer.removeEventListener('scroll', handleScroll);
  // }, []);

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
  const handleBackClick = () => {
    setShowChatArea(false); 
};
    return (
  <div className={`flex h-screen  font-sans ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
    {/* Left Sidebar */}
    {!showChatArea && (
      <div className={`  h-screen dark:bg-gray-800 md:w-1/3 bg-white border-r border-gray-300 overflow-hidden ${
        showChatArea ? 'hidden md:block' :'w-full'
    }`}>
      <Searchs 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Head 
        onlineUsers={onlineUsers}
        setSelectedUser={setSelectedUser}
        searchQuery={searchQuery}
        currentUserId={senderId}
        showChatArea={showChatArea}
        setShowChatArea={setShowChatArea}
        
      />
      <UserChat
        onlineUsers={onlineUsers}
        setSelectedUser={setSelectedUser}
        messages={messages}
        selectedUser={selectedUser}
        currentUserId={senderId}
        setShowChatArea={setShowChatArea}
      />
    </div>
  )}
    {/* Right Chat Area */}
    {(showChatArea || window.innerWidth >= 768) && (
    <div  className={`flex-1 flex flex-col h-screen overflow-hidden  ${
      showChatArea ? 'flex' : 'hidden'
  } md:flex`} >
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center transition-colors duration-300">

                    <button
                        className="block md:hidden mr-3 text-gray-500 hover:text-gray-700"
                        onClick={handleBackClick}
                    >
                        <FiArrowLeft size={24} /> 
                    </button>
                    <h6 className="text-lg font-sans font-semibold text-gray-500">
                        {selectedUser ? selectedUser.username || selectedUser.username : "Select a user to start chatting"}
                    </h6>
                </div>

      {/* Chat Messages */}
      <div  className="flex-1 overflow-y-auto p-4 scrollbar-hidden">
      <ul className="space-y-2 ">
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
          className={`message-item mb-2 p-1.5 px-2.5 rounded-lg relative w-fit min-w-[10%] max-w-[60%] flex flex-col break-words ${
            msg.senderId === senderId ? "sent self-end bg-[#525853] text-white text-right ml-auto" : "received self-start bg-[#f0f0f0] text-black text-left"
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
      <div className="p-3 flex items-center">
      {/* Material-UI TextField for the input */}
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        placeholder="Type a message..."
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        InputProps={{
          style: {
            backgroundColor: 'var(--mui-bg-light)',
            color: 'var(--mui-text-primary)',
          },
        }}
      />

      {/* Attach File Icon */}
      <IconButton color="default" className="ml-2">
        <FiPaperclip />
      </IconButton>

      {/* Emoji Icon */}
      <IconButton color="default" className="ml-2">
        <FaRegSmile />
      </IconButton>

      {/* Send Message Icon */}
      <IconButton
        color="primary"
        className="ml-2"
        onClick={handleSendMessage}
      >
        <FaPaperPlane />
      </IconButton>
    </div>
    </div>
    )}
  
  </div>
);

};


