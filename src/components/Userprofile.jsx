import { useEffect, useState } from 'react';
import { auth, firestore } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      } else if (auth.currentUser) {
        const userRef = doc(firestore, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          // Save user data to localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(userData));
        } else {
          console.log('No user document found');
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <div>
        <h1>Logged in as:</h1>
        {user ? <h2>{user.username}</h2> : <h2>No Username Found</h2>}
        {user ? <h3>{user.email}</h3> : <h3>No Email Found</h3>}
      </div>
    </div>
  );
};

export default UserProfile;
