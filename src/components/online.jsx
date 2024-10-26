/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { auth, firestore } from '../Firebase';
import { addDoc, collection, getDocs, query, where, Timestamp, onSnapshot } from 'firebase/firestore';
import { UserChatTable } from './nav';
import { Searchs } from './search';

const OnlineUsersList = () => {
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
    <div className='cf-bg-nightowl-background'>
    <p>Logged in as {auth.currentUser ? auth.currentUser.email : ''}</p>
  
    <section className="chat-section ">
      <div className="container py-5 ">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-5">
              <div className="card-body">
                <div className="row">
                  <div className=" col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 border cf-bg-nightowl-chatBackground cf-pt-4 cf-text-nightowl-text">
                    <Searchs />
                    <UserChatTable 
                    onlineUsers={onlineUsers}
                    setSelectedUser={setSelectedUser}
                    messages={messages}
                    senderId={senderId}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 col-xl-8 border cf-bg-nightowl-chatBackground cf-text-nightowl-text">
                   
                      <div>
                        <h6 className='p-2'>{ selectedUser ? selectedUser.name || selectedUser.email : ''}</h6>
                       

<div className="chat-messages"><ul className='message-list'>
{messages.map((msg, index) => {
                const messageDate = formatDate(msg.timestamp);
                const showDate = lastDate !== messageDate;
                lastDate = messageDate;
                return (
                  <div key={index}>
                    {showDate && <div className={`date-divider ${''}`}>{messageDate}</div>}
                    <li
                      className={`message-item ${
                        msg.senderId === senderId ? 'sent' : 'received'
                      }`}
                    >
                      <span>{msg.content}</span>
                      <small>{formatTime(msg.timestamp)}</small>
                    </li>
                  </div>
                );
              })}
            </ul>

  {/* {messages.map((message, index) => (
   
    <div key={index}>
      <div className="d-flex flex-row align-items-center">
        {message.senderId === senderId ? (
          <div>
            <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary"> {message.content}</p>
          </div>

        ) : (
          <div className="d-flex flex-row justify-content-end">
            <div className="d-flex flex-column justify-content-end">
              <div className="d-flex align-items-center mb-3">
               
                <p className="small p-2 text-end rounded-3 text-white bg-primary">
                   {message.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ))} */}
</div>


 <div className="message-input">
                          <img src="" alt="avatar 3" className="input-avatar" />
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="exampleFormControlInput2"
                            placeholder="Type message"
                            value={chatInput}
                            onChange={handleChatInput}
                          />
                          <a className="ms-1 text-muted" href="#!"></a>
                          <a className="ms-3 text-muted" href="#!"></a>
                          <a className="ms-3" onClick={handleSendMessage}>
                            Send
                          </a>
                        </div>
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

export default OnlineUsersList;
