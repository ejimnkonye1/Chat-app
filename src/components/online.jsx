import { useState, useEffect } from 'react';
import { auth, firestore } from '../Firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const OnlineUsersList = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <p>Logged in as {auth.currentUser ? auth.currentUser.email : ''}</p>
      <h1>Online Users:</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>
              <div className="online-user">
                <div className="circle" />
                <p>{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OnlineUsersList;