/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../Firebase'
import { doc, setDoc } from 'firebase/firestore';

const RegisterForm = ({ setIsRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [erromes, setError] = useState(false)
  const [username, setUsername] = useState ('')
  const [success, setsuccess] = useState('')
  const [loading, setloading] = useState('');


  const handleRegister = async (event) => {
    event.preventDefault();
    setloading(true); 
    
      try {
   const userData =   await createUserWithEmailAndPassword(auth, email, password);
   const user = userData.user.uid
    await setDoc(doc(firestore, 'users', user), {
  email,
  username

    })
   console.log(user)
      
      setEmail('')
      setPassword('')
       setUsername('')
      //  setsuccess(true)
       setIsRegister(false)
      
    } catch(err) {
        console.log(err)
        setloading(false)
        setError(err.message)
    }
    
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
setTimeout(() => {
  setError(false)
  // setsuccess(false)
}, 12000);

const handleusername = (event) => {
  setUsername(event.target.value);
};
  return (
<form action="" onSubmit={handleRegister}>
    <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
        {erromes && <p className='text-nightowl-red'>{erromes}</p>}
        {success && <p className='text-danger'>Account has been created, You can now login with your details</p>}
        <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]">
            <i className='bx bxs-envelope'></i>
        </span>
        
  
        <input 
            type="email"
            name="email"
            required
            placeholder=" "
            className="peer bg-transparent w-full border-none h-full text-sm font-semibold text-gray-900 px-3 pt-6 pb-2 focus:outline-none"
            value={email}
            onChange={handleEmail}
        />
        <label className="absolute left-0 top-3 text-gray-500  px-1 transition-all duration-200 transform -translate-y-3 scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-gray-900">
            Email
        </label>
    </div>

    <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
    <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]">
            <i className='bx bxs-user'></i>
        </span>
        
       
        <input 
            type="text"
            name="username"
            required
            placeholder=" "
            className="peer bg-transparent w-full border-none h-full text-sm font-semibold text-gray-900 px-3 pt-6 pb-2 focus:outline-none"
            value={username}
            onChange={handleusername}
        />
        <label className="absolute left-0 top-3 text-gray-500  px-1 transition-all duration-200 transform -translate-y-3 scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-gray-900">
            Username
        </label>
    </div>

    <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
        <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]">
            <i className='bx bxs-lock-alt'></i>
        </span>
        
      
        <input 
            type="password"
            name="password"
            required
            placeholder=" "
            className="peer bg-transparent w-full border-none h-full text-sm font-semibold text-gray-900 px-3 pt-6 pb-2 focus:outline-none"
            value={password}
            onChange={handlePassword}
        />
        <label className="absolute left-0 top-3 text-gray-500  px-1 transition-all duration-200 transform -translate-y-3 scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-gray-900">
            Password
        </label>
    </div>

    <button type="submit" className="flex items-center justify-center bg-gray-900 w-full h-[43px] rounded-lg font-semibold text-white cursor-pointer">
        {loading ? (
            <>
                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="..." fill="currentColor"/>
                    <path d="..." fill="currentFill"/>
                </svg>
                <span className='ml-2'> Register</span>
            </>
        ) : (
            ' Register'
        )}
    </button>

    <div className="register text-center text-gray-900 text-sm font-medium mt-8 mb-4">
        <p>Already have an account? <a href="#" onClick={() => setIsRegister(false)} className="font-semibold hover:underline">Login!</a></p>
    </div>
</form>

  );
};

export default RegisterForm;

