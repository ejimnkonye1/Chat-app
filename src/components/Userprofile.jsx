import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore, storage } from '../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiArrowLeft } from 'react-icons/fi';
import { handleBackClick } from './HandleBack'; 

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigateBack, setNavigateBack] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(firestore, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log('No user document found');
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        uploadImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected.");
    }
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      if (auth.currentUser) {
        const userRef = doc(firestore, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { profileImage: url });
        setImageUrl(url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <button
        className="absolute left-3 text-3xl"
        onClick={() => handleBackClick(navigate, navigateBack, setNavigateBack)}
      >
        <FiArrowLeft size={24} />
      </button>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="relative mb-4">
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute bottom-0 right-0 w-10 h-10 opacity-0 cursor-pointer"
        />
        <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
          <i className="bx bx-camera text-gray-600"></i>
        </span>
      </div>
      <h2 className="text-xl font-semibold">Logged in as:</h2>
      {user ? (
        <div className="mt-2 text-center">
          <p className="text-lg text-gray-800">{user.username || 'No Username Found'}</p>
          <p className="text-sm text-gray-600">{user.email || 'No Email Found'}</p>
        </div>
      ) : (
        <p className="text-gray-600">No User Information Available</p>
      )}
    </div>
  );
};

export default Userprofile;
