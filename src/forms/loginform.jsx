/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore} from '../Firebase';

import { useDispatch } from 'react-redux';
import { setUsername } from '../action';
import { doc, getDoc } from 'firebase/firestore';

const LoginForm = ({ setIsRegister, forgetpage, setfogetPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('')
  const Navigate = useNavigate()
const dispatch = useDispatch()
  const handleUserSignIn = async (e) => {
    e.preventDefault();
    try{
       
         const userData =  await signInWithEmailAndPassword(auth, email,password)
          const user = userData.user.uid
   const userdoc =      await getDoc(doc(firestore, 'users', user))
        if (userdoc.exists){
          console.log('user exists')
          Navigate('/chatbox');
        } else{
          console.error('user not found', error)
          setError(error)
        }
   
    }catch (err){
   console.error(err)
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
  }, 5000);

  return (
    <div>
    <form action="" onSubmit={handleUserSignIn}>
        {error && <p className='text-danger'>{error}</p>}
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
                Remember me
            </label>
            <a href="#" className="hover:underline" onClick={() => setfogetPage(true)}>Forget Password</a>
        </div>
        <button type="submit" className="bg-gray-900 w-full h-[43px] rounded-lg font-semibold text-white cursor-pointer">
            Login
        </button>
        <div className="register text-center text-gray-900 text-sm font-medium mt-8 mb-4">
            <p>If you don't have an account? <a href="#" onClick={() => setIsRegister(true)} className="font-semibold hover:underline">Register Here</a></p>
        </div>
    </form>
</div>
   
  );
};

export default LoginForm;
