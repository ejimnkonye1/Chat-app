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
  const validateForm = () => {
    const passwordValue = password.trim()
    const passwordLength = passwordValue.length >= 8

    setFormValid(passwordLength);
    return passwordLength;
  }

  const validateEmail = () => {
    const emailValue = email.trim();
    const emailType = emailValue.includes('@');

    setEmailValid(emailType);
    return emailType;

  }
  const handleRegister = async (event) => {
    event.preventDefault();

    const valid = validateForm();
    const isEmail = validateEmail();
    if(valid && isEmail) {
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
        setError(err.message)
    }
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
}, 8000);
const handleusername = (event) => {
  setUsername(event.target.value);
};
  return (
    <form action="" onSubmit={handleRegister}>
    <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
        {erromes && <p className='text-danger'>{erromes}</p>}
        {success && <p className='text-danger'>Account has been created, You can now login with your details</p>}
        <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]">
            <i className='bx bxs-user'></i>
        </span>
        <input
            type="text"
            name="username"
            required
            className="bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5"
            value={username}
            onChange={handleusername}
        />
        <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">
            Username
        </label>
    </div>
    <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
        <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]">
            <i className='bx bxs-envelope'></i>
        </span>
        <input
            type="email"
            name="email"
            required
            className={`bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5 ${email ? 'not-empty' : ''}`}
            value={email}
            onChange={handleEmail}
        />
        <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">
            Email
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
            className={`bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5 ${password ? 'not-empty' : ''}`}
            value={password}
            onChange={handlePassword}
        />
        <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">
            Password
        </label>
    </div>
    <div className="check flex justify-between text-gray-900 text-sm font-medium mt-[-14px] mb-4">
        <label className="flex items-center">
            <input type="checkbox" className="mr-1.5 accent-gray-900" />
            I accept all terms & conditions
        </label>
    </div>
    <button type="submit" className="bg-gray-900 w-full h-[43px] rounded-lg font-semibold text-white cursor-pointer">
        Register Here
    </button>
    <div className="register text-center text-gray-900 text-sm font-medium mt-8 mb-4">
        <p>Already have an account? <a href="#" onClick={() => setIsRegister(false)} className="font-semibold hover:underline">Login!</a></p>
    </div>
</form>
  );
};

export default RegisterForm;