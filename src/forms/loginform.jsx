import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login/Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { handlePasswordReset } from './resetPasswordform';
import RequestPasswordform from './requestPassword';

const LoginForm = ({ setIsRegister, forgetpage, setfogetPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {erromes, setErrormes} = useState()
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('')
  const Navigate = useNavigate()

  const handleUser = async (e) => {
    e.preventDefault();
    try{
        await signInWithEmailAndPassword(auth, email,password)
        // dispatch(email)

        Navigate('/chatbox');
    }catch (err){
   console.error(err)
  setError(err.message)
  console.log(`this is error: ${erromes}`)
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleResetPasswordRequest = async (e) => {
      e.preventDefault()
      navigate=('/requestpassword')
      const result = await handlePasswordReset (resetEmail);
      if(result.success){
          setMessage(result.message)
      }else{
        setError(result.message)
      }
  }
  return (
    <div>
    
        <form action="" onSubmit={handleUser}>
        <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
          <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]">
            <i className='bx bxs-envelope'></i>
          </span>
          {erromes && <p className='text-danger'>{erromes}</p>}
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
            Remember me
          </label>
         
          <a href="#" className="cf-hover:underline"onClick={() => setfogetPage(true)} >Forget Password</a>
         
        </div>
        <button type="submit" className="cf-bg-gray-900 cf-w-full cf-h-[43px] cf-rounded-lg cf-font-semibold cf-text-white cf-cursor-pointer">
          Login
        </button>
  
        <div className="cf-register cf-text-center cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-8 cf-mb-4">
          <p>If you don't have an account? <a href="#" onClick={() => setIsRegister(true)} className="cf-font-semibold cf-hover:underline">Register Here</a></p>
        </div>
      </form>
      

    </div>
   
  );
};

export default LoginForm;
