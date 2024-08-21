/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { auth, firestore } from '../Firebase';
import { addDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

const OnlineUsersList = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const senderId = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const fetchUsers = async () => {
          try {
            const userRef = collection(firestore, 'users');
            const q = query(userRef, where('email', '!=', auth.currentUser.email));
            const usersnapshot = await getDocs(q);
            const userdata = usersnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
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
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchChatMessages = async () => {
        try {
          const messageQuery = query(
            collection(firestore, 'messages'),
            where('receiverId', 'in', [selectedUser.uid, senderId]),
            where('senderId', 'in', [selectedUser.uid, senderId])
          );
          const messageSnapshot = await getDocs(messageQuery);
          const messagesData = messageSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMessages(messagesData);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        }
      };
      fetchChatMessages();
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

  return (
    <div>
      <p>Logged in as {auth.currentUser ? auth.currentUser.email : ''}</p>

      <section className="chat-section">
        <div>
          <h1>Online Users</h1>

          <div className='d-flex'>
            <select
              value={selectedUser?.uid || ''}
              onChange={(e) => {
                const selected = onlineUsers.find((user) => user.uid === e.target.value);
                setSelectedUser(selected);
              }}
            >
              <option value="" disabled>Select a user</option>
              {onlineUsers.map((user) => (
                <option key={user.uid} value={user.uid}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          <div>
          <ul>
  {onlineUsers.map((user) => (
    <li key={user.uid} onClick={() => setSelectedUser(user)}>
      {user.email}
    </li>
  ))}
</ul>
          </div>
          {selectedUser && (
            <div>
              <h2>Chat with {selectedUser.name || selectedUser.email}</h2>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>
                    {message.senderId === senderId ? (
                      <span>Me: {message.content}</span>
                    ) : (
                      <span>{selectedUser.name || selectedUser.email}: {message.content}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  value={chatInput}
                  onChange={handleChatInput}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OnlineUsersList;
