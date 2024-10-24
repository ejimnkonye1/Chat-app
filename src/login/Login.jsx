import { useState } from 'react';
import { Navigate,Link } from 'react-router-dom';
// import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/Auth';
// import { useAuth } from '../../contexts/authContext';
import 'boxicons/css/boxicons.min.css';

// import { doSignInWithEmailAndPassword } from '../../firebase/Auth';
// import { doSignInWithEmailAndPassword } from '../../Auth';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../forms/loginform';
import RegisterForm from '../forms/registerform';
import RequestPasswordform from '../forms/requestPassword';
const LoginRegisterForm = () => {


    const [email, setEmail] = useState('')
    const [ password, setPassword] = useState('')

     const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
  
     const [isSignedIn, setIsSignedIn] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [forgetpage, setfogetPage] = useState(false)


    const handleRegister = async (e) => {
      e.preventDefault()
      if(!isSignedIn) {
          setIsSignedIn(true)
          try{
            await createUserWithEmailAndPassword(auth,email, password)
          }catch(err){
            console.error(err)
          }
          
      }

    }



    const handleUser = async (e) => {
        e.preventDefault()
        if(!isSignedIn) {
            setIsSignedIn(true)
            try{
              await signInWithEmailAndPassword(auth,email, password)
            }catch(err){
              console.error(err)
            }
            
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };


    const handleemail = (e) => {
    setEmail(e.target.value)
    console.log(email)
      
  };
  const handlepassword = (e) => {
    setPassword(e.target.value)
    console.log(password)
      
  };
    return (
        <div className='cf-relative cf-min-h-screen cf-flex cf-items-center cf-justify-center cf-bg-cover cf-bg-center'
        // style={{ backgroundImage: `url(${BackgroundImage})` }}
        style={{ background: 'black' }}
   >
    
     <div
       className={`cf-container cf-relative cf-h-[530px] cf-w-[460px] 
        cf-border-3 cf-border-white/40 cf-backdrop-blur-[25px] cf-shadow-lg 
        cf-flex cf-items-center
         cf-justify-center cf-rounded-3xl
         cf-overflow-hidden
        
         cf-transition-transform cf-duration-500`}
       style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
     >
       <div className={`cf-main-box ${isRegister ? 'cf-register' : 'cf-login'} cf-p-16 cf-w-full`}>
         <h1 className="cf-text-gray-900 cf-text-center cf-text-4xl cf-font-bold">{isRegister ? 'Registration' :forgetpage? 'forget': 'Login'}</h1>


        {isRegister? (

          
<div>
  <RegisterForm setIsRegister={setIsRegister} 
  
  />

</div>
          
          
        ): (

            <div>
              {forgetpage? (

<RequestPasswordform 
forgetpage={forgetpage}
setfogetPage={setfogetPage}
/>
              ):(
                <LoginForm setIsRegister={setIsRegister}
                forgetpage={forgetpage}
                setfogetPage={setfogetPage}
                />
              )}
           
            </div>
        )}


       </div>
       
     </div>
   </div>
    );
};

export default LoginRegisterForm;
