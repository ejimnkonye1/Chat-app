
import React, { useEffect, useState } from 'react'
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
      <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
          <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]">
            <i className='bx bxs-envelope'></i>
          </span>
         
          <input
            type="email"
            name="email"
            required
            className={`cf-bg-transparent cf-w-full cf-h-full cf-text-lg cf-font-semibold cf-text-gray-900 cf-pl-1.5 cf-pr-7.5 cf-pb-5 ${resetEmail ? 'cf-not-empty' : ''}`}
            value={resetEmail}
            onChange={handlemailChange}
          />
          <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">
            Email
          </label>
          
         
        </div>
        <div className="cf-check cf-flex cf-justify-between cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-[-14px] cf-mb-4">
          
         
          <a href="#" className="cf-hover:underline cf-text-gray-900"onClick={() => setfogetPage(false)} >Login</a>
         
        </div>
       
        <button type="submit" onClick={handleresetpassword} className="cf-bg-gray-900 cf-w-full cf-h-[43px] cf-rounded-lg cf-font-semibold cf-text-white cf-cursor-pointer">
          Reset password
        </button>
    </div>
  )
}

export default RequestPasswordform;
