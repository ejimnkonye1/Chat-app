/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { auth, firestore } from '../Firebase';
import { addDoc, collection, getDocs, query, where, Timestamp, onSnapshot } from 'firebase/firestore';
import {  Head, UserChat,  } from './nav';
import { Searchs } from './search';
import { FiPaperclip } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
export  const ChatScreen = () => {
  const [showEmails, setShowEmails] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const senderId = auth.currentUser?.uid;

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
    <div>
   <section className="chat-section">
  <div className="container mx-auto py-3">
    <div className="flex flex-col">
      <div className="mb-5"></div>
      <div className="bg-white shadow-lg rounded-lg" id="chat3">
        <div className="p-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-5/12 xl:w-1/3 mb-4 md:mb-0">
              <Searchs />
              <Head 
                onlineUsers={onlineUsers}
                setSelectedUser={setSelectedUser}
              />
              <UserChat
                onlineUsers={onlineUsers}
                setSelectedUser={setSelectedUser}
                messages={messages}
                senderId={senderId}
                showEmails={showEmails}
                setShowEmails={setShowEmails}
                showChat={showChat}
                setShowChat={setShowChat}
              />
             
        
            </div>
        
            <div className="w-full md:w-1/2 lg:w-7/12 xl:w-2/3">
              <div>
                <h6 className="p-2">
                  {selectedUser ? selectedUser.name || selectedUser.email : ""}
                </h6>
                <div className="chat-messages overflow-y-auto h-[400px]">
                  <ul className="space-y-2 message-list">
                    {messages.map((msg, index) => {
                      const messageDate = formatDate(msg.timestamp);
                      const showDate = lastDate !== messageDate;
                      lastDate = messageDate;
                      return (
                        <div key={index}>
                          {showDate && (
                            <div className="text-center text-sm text-gray-500 my-2">
                              {messageDate}
                            </div>
                          )}
                          <li
                            className={`message-item ${
                              msg.senderId === senderId
                                ? " sent"
                                : " received"
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
                <div className="message-input flex items-center mt-4">
                  {/* <UserImage
                    email={auth.currentUser ? auth.currentUser.email : ""}
                    className="w-10 h-10 rounded-full mr-3"
                  /> */}
                  <input
                    type="text"
                    className="form-control form-control-lg border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type message"
                    value={chatInput}
                    onChange={handleChatInput}
                  />
                  <a className="ml-3 text-gray-500 hover:text-gray-700" href="#!">
                    <FiPaperclip />
                  </a>
                  <a className="ml-3 text-gray-500 hover:text-gray-700" href="#!">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    
  </div>
  );
};


