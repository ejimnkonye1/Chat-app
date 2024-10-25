/* eslint-disable react/prop-types */

import {  useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../Firebase'

const RequestPasswordform = ({setfogetPage}) => {
  const [resetEmail , setResetEmail] = useState('')
  const [erromes, setError] = useState('')
  const [success , setsuccess] = useState(false)
const handleresetpassword = async (e) => {
  e.preventDefault();
  try{
      await sendPasswordResetEmail(auth, resetEmail)
      setsuccess(true)
     setResetEmail('')
    
     
  }catch (err){
 console.error(err)
setError(err.message)
console.log(`this is error: ${erromes}`)
  }
};
  const handlemailChange = (e) => {
    setResetEmail(e.target.value)

  }
  setTimeout(() => {
    setsuccess(false)
    setError(false)
  }, 5000);
  return (
    <div>
    {erromes && <p className='text-danger'>{erromes}</p>}
    {success && <p className='text-danger'>We sent a link to reset your password to your email</p>}
    <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
        <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]">
            <i className='bx bxs-envelope'></i>
        </span>
        <input
            type="email"
            name="email"
            required
            className={`bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5 ${resetEmail ? 'not-empty' : ''}`}
            value={resetEmail}
            onChange={handlemailChange}
        />
        <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">
            Email
        </label>
    </div>
    <div className="check flex justify-between text-gray-900 text-sm font-medium mt-[-14px] mb-4">
        <a href="#" className="hover:underline text-gray-900" onClick={() => setfogetPage(false)}>Login</a>
    </div>
    <button type="submit" onClick={handleresetpassword} className="bg-gray-900 w-full h-[43px] rounded-lg font-semibold text-white cursor-pointer">
        Reset password
    </button>
</div>
  )
}

export default RequestPasswordform;
