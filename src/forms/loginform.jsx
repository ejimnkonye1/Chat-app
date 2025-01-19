/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../Firebase';
import { useDispatch } from 'react-redux';
import { setUsername } from '../action';
import { doc, getDoc } from 'firebase/firestore';
import { ErrorAlert } from '../alerts';


const LoginForm = ({ setIsRegister, forgetpage, setfogetPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserSignIn = async (e) => {
    e.preventDefault();
    setloading(true); 

    try{
       
         const userData =  await signInWithEmailAndPassword(auth, email,password)
          const user = userData.user.uid
   const userdoc =      await getDoc(doc(firestore, 'users', user))
        if (userdoc.exists){

           const userInfo = userdoc.data();
           localStorage.setItem('loggedInUser', JSON.stringify({
            uid: user,
            username: userInfo.username,
            email: userInfo.email,
          }));
    
          console.log('user exists')
          navigate('/chatbox');
        } else{
          console.error('user not found', error)
          setError(error)
        }
   
    }catch (err){
   console.error(err)
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

  // Clear error after 12 seconds
  setTimeout(() => {
    setError(false);
  }, 12000);

  return (
    <div>
      <form action="" onSubmit={handleUserSignIn}>
      {error && (
                         <>
                                                <ErrorAlert
                                               open={!!error}
                                               message={error}
                                               onClose={() => setError("")}
                                             />
                                       </>
                       )}
        <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8 flex items-center">
          <span className="icon absolute right-2.5 pb-1 text-lg text-gray-900 ">
            <i className='bx bxs-envelope pb-2'></i>
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
          <label className="absolute left-1 top-3 text-gray-500 px-1 transition-all duration-200 transform -translate-y-3 scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-gray-900">
            Email
          </label>
        </div>

        <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
          <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            <i className={showPassword ? 'bx bxs-show' : 'bx bxs-hide' } ></i>
          </span>
          <input 
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            placeholder=" "
            className="peer bg-transparent w-full border-none h-full text-sm font-semibold text-gray-900 px-3 pt-6 pb-2 focus:outline-none"
            value={password}
            onChange={handlePassword}
          />
          <label className="absolute left-0 top-3 text-gray-500 px-1 transition-all duration-200 transform -translate-y-3 scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-gray-900">
            Password
          </label>
        </div>

        <div className="check flex justify-end text-gray-900 text-sm font-medium mt-[-14px] mb-4">
          <a href="#" className="hover:underline" onClick={() => setfogetPage(true)}>Forget Password</a>
        </div>
        <button type="submit" className="flex items-center justify-center bg-gray-900 w-full h-[43px] rounded-lg font-semibold text-white cursor-pointer mr-2">
          {loading ? (
            <>
              <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className='ml-2'>Login</span>
            </>
          ) : (
            'Login'
          )}
        </button>
        <div className="register text-center text-gray-900 text-sm font-medium mt-8 mb-4">
          <p>If you don't have an account? <a href="#" onClick={() => setIsRegister(true)} className="font-semibold hover:underline">Register Here</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
