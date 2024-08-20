import { useState, useEffect } from 'react';
import { auth, firestore } from '../Firebase';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { FiPaperclip } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
const OnlineUsersList = () => {
  
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState ('');
  const [chatMessages, setChatMessages] = useState('');
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const fetchUsers = async () => {
          try {
            const userRef = collection(firestore, 'users');
            const q = query(userRef, where('email', '!=', auth.currentUser.email));
            const usersnapshot = await getDocs(q);
            const userdata = usersnapshot.docs.map((doc) => doc.data());
            setOnlineUsers(userdata);
          } catch (error) {
            setError(error.message);
          }
        };
        fetchUsers();
      } else {
        setOnlineUsers([]);
      }
    });
    return unsubscribe;
  }, [firestore]);


  const handleChatInput = (e) => {
    setChatInput(e.target.value);
  };
  const senderId = auth.currentUser?.uid;
 
  
  const handleSendMessage = async () => {
    setChatMessages(chatInput);
if (!chatMessages.trim()) return;
console.log('firestore:', firestore);
console.log('collection:', collection(firestore, 'messages'));
console.log('data:', {
  senderId: senderId,
  receiverId: selectedUserId,
  content: chatMessages,
  Timestamp: Timestamp.now(),
  read: false,
});
console.log('senderId:', senderId);
  console.log('receiverId:', selectedUserId);
  console.log('content:', chatMessages);
  console.log('Timestamp:', Timestamp.now());

  try {
    await addDoc(collection(firestore, 'messages'), {
      senderId: auth.currentUser.email,
      receiver: selectedUserId.email,
      content: chatMessages,
      Timestamp: Timestamp.now(),
      read: false,
    });
    setMessages([...messages, { content: chatMessages, senderId: senderId, receiverId: selectedUserId }])
    setChatInput('');
  } catch (err) {
    console.error('error sending message', err);
  }

   
  };

  const handleuser = (user) => {
    setSelectedUserId(user)
  }

  useEffect(() => {
    if(senderId && selectedUserId){
      const messageQuery = query( collection(firestore, 'messages'),
       where('receiverId', 'in', [selectedUserId.email, senderId]),
      where('senderId', 'in', [selectedUserId.email, senderId])

      )
      const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const newMessage = snapshot.docs.map((doc) => doc.data())
        const sortMessage = newMessage.sort((a,b) => a.Timestamp - b.Timestamp)
        setMessages(sortMessage)
      })
      return unsubscribe;
    }

  }, [])
  return (
    <div>
      <p>Logged in as {auth.currentUser ? auth.currentUser.email : ''}</p>
     
      <section className="chat-section">
  <div className="container py-5">
    <div className="row">
      <div className="col-md-12">
        <div className='card mb-5'>
          <div className="card-body">
            <h1>Online Users:</h1>
            {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index} onClick={() => handleuser(user)}>
              <div className="online-user">
                <div className="circle" />
                <p>{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
         {selectedUserId && (
        <h1>{selectedUserId.email}</h1>
      )}
          </div>
        </div>
        <div className="card" id="chat3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                <div className="p-3">
                  <div className="user-list">
                    <ul className="list-unstyled mb-0">
                      <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between billie-link">
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src="https://via.placeholder.com/60"
                                alt="pic"
                                className="d-flex align-self-center me-3 friend-pic"
                                width="60"
                              />
                              <span className="badge badge-dot"></span>
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">User 1</p>
                              <p className="small text-muted">Hello!</p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">10:00 AM</p>
                            <span className="badge bg-danger rounded-pill float-end">2</span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between billie-link">
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src="https://via.placeholder.com/60"
                                alt="pic"
                                className="d-flex align-self-center me-3 friend-pic"
                                width="60"
                              />
                              <span className="badge badge-dot"></span>
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">User 2</p>
                              <p className="small text-muted">Hi!</p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">10:05 AM</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-7 col-xl-8">
                <div className=''>
                  <div className="chat-messages">
                    
                    <div className="d-flex flex-row align-items-center">
                      <img
                        src="https://via.placeholder.com/60"
                        className="message-avatar"
                        alt="avatar"
                      />
                      <div>
                        <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                          Hello!
                        </p>
                      </div>
                     
     
                    </div>
                    {messages.map((message, index) => (
                    <div key={index} className="d-flex flex-row align-items-center">
                      
                      <img
                        src="https://via.placeholder.com/60"
                        className="message-avatar"
                        alt="avatar"
                        value={message.sender}
                      />
    
                      <div className='d-flex justify-content-end ml-auto m-3 flex-end'>
                        <p className="  small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        
             
                       {message.content}
      
      

                        </p>
                      </div>
     
                    </div>
                  ))}

                  </div>
                  <div className="message-input">
                    <img
                      src="https://via.placeholder.com/60"
                      alt="avatar 3"
                      className="input-avatar"
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                      value={chatInput}
                      onChange={handleChatInput}
                    />
                    <a className="ms-1 text-muted" href="#!">
                      <FiPaperclip />
                    </a>
                    <a className="ms-3 text-muted" href="#!">
                      <FaRegSmile />
                    </a>
                    <a className="ms-3" onClick={handleSendMessage}>
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
  </div>
</section>
    </div>
  );
};

export default OnlineUsersList;