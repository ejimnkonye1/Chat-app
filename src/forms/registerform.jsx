/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../login/Login.css';
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
      <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
      {erromes && <p className='text-danger'>{erromes}</p>}
      {success && <p className='text-danger'>Account has been created, You can now login with ur details</p>}
        <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]">
          <i className='bx bxs-user'></i>
        </span>
        <input
          type="text"
          name="username"
          required
          className="cf-bg-transparent cf-w-full cf-h-full cf-text-lg cf-font-semibold cf-text-gray-900 cf-pl-1.5 cf-pr-7.5 cf-pb-5"
          value={username}
          onChange={handleusername}
        />
        <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">
          Username
        </label>
      </div>
      <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
        <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]">
          <i className='bx bxs-envelope'></i>
        </span>
        <input
          type="email"
          name="email"
          required
          className={`cf-bg-transparent cf-w-full cf-h-full cf-text-lg cf-font-semibold cf-text-gray-900 cf-pl-1.5 cf-pr-7.5 cf-pb-5 ${email ? 'cf-not-empty' : ''}`}
          value={email}
          onChange={handleEmail}
        />
        <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">
          Email
        </label>
      </div>
      <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
        <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]">
          <i className='bx bxs-lock-alt'></i>
        </span>
        <input
          type="password"
          name="password"
          required
          className={`cf-bg-transparent cf-w-full cf-h-full cf-text-lg cf-font-semibold cf-text-gray-900 cf-pl-1.5 cf-pr-7.5 cf-pb-5 ${password ? 'cf-not-empty' : ''}`}
          value={password}
          onChange={handlePassword}
        />
        <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">
          Password
        </label>
      </div>
      <div className="cf-check cf-flex cf-justify-between cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-[-14px] cf-mb-4">
        <label className="cf-flex cf-items-center">
          <input type="checkbox" className="cf-mr-1.5 cf-accent-gray-900" />
          I accept all terms & conditions
        </label>
      </div>
      <button type="submit" className="cf-bg-gray-900 cf-w-full cf-h-[43px] cf-rounded-lg cf-font-semibold cf-text-white cf-cursor-pointer">
        Register Here
      </button>
      <div className="cf-register cf-text-center cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-8 cf-mb-4">
        <p>Already have an account? <a href="#" onClick={() => setIsRegister(false)} className="cf-font-semibold cf-hover:underline">Login!</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;