import { useState } from 'react';
import { Navigate,Link } from 'react-router-dom';
// import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/Auth';
// import { useAuth } from '../../contexts/authContext';
import 'boxicons/css/boxicons.min.css';
import BackgroundImage from '../../assets/pexels-pixabay-276452.jpg';
// import { doSignInWithEmailAndPassword } from '../../firebase/Auth';
// import { doSignInWithEmailAndPassword } from '../../Auth';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginRegisterForm = () => {
    // const { userLoggedIn } = useAuth();

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
        style={{ backgroundImage: `url(${BackgroundImage})` }}
   >
     <header className="cf-fixed cf-w-full cf-top-0 cf-right-0 cf-z-50 cf-bg-blue-500 cf-p-8 cf-flex cf-items-center cf-justify-between">
       <div className="cf-text-4xl cf-font-bold cf-text-white">BILLIE(NZ) YARN</div>
       <nav className="cf-flex cf-items-center">
         {["About", "Services", "Contact"].map((item, index) => (
           <a
             key={index}
             href="#"
             className="cf-relative cf-text-white cf-text-lg cf-font-medium cf-ml-11 cf-hover:before:w-full cf-before:absolute cf-before:content-[''] cf-before:left-0 cf-before:bottom-[-4px] cf-before:w-0 cf-before:h-0.5 cf-before:bg-white cf-before:rounded cf-before:transition-all cf-before:duration-450"
           >
             {item}
           </a>
         ))}
         <button
           onClick={() => setIsPopupActive(!isPopupActive)}
           className="cf-inline-block cf-px-8 cf-py-2.5 cf-bg-transparent cf-text-white cf-border-2 cf-border-white cf-rounded-lg cf-text-lg cf-font-medium cf-ml-11 cf-transition-transform cf-duration-450 cf-hover:scale-110 cf-hover:bg-white cf-hover:text-gray-800"
         >
           Login
         </button>
       </nav>
     </header>

     <div
       className={`cf-container cf-relative cf-h-[530px] cf-w-[460px] cf-border-3 cf-border-white/40 cf-backdrop-blur-[25px] cf-shadow-lg cf-flex cf-items-center cf-justify-center cf-rounded-3xl cf-overflow-hidden ${
         isPopupActive ? 'cf-scale-100' : 'cf-scale-0'
       } cf-transition-transform cf-duration-500`}
       style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
     >
       <div className={`cf-main-box ${isRegister ? 'cf-register' : 'cf-login'} cf-p-16 cf-w-full`}>
         <h1 className="cf-text-gray-900 cf-text-center cf-text-4xl cf-font-bold">{isRegister ? 'Registration' : 'Login'}</h1>
         <form action="" onSubmit={handleUser}>
           {isRegister && (
             <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
               <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]"><i className='bx bxs-user'></i></span>
               
               <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">Username</label>
             </div>
           )}
           <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
             <span className="cf-icon cf-absolute cf-right-2.5  cf-text-lg cf-text-gray-900 cf-leading-[55px]"><i className='bx bxs-envelope'></i></span>
             <input
               type="email"
               name="email"
               required
               className={`cf-bg-transparent cf-w-full cf-h-full cf-text-lg cf-font-semibold cf-text-gray-900 cf-pl-1.5 cf-pr-7.5 cf-pb-5 ${formData.email ? 'cf-not-empty' : ''}`}
              //  value={formData.email}
               value={email}
               onChange={handleemail}
             />
             <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">Email</label>
           </div>
           <div className="cf-input-box cf-relative cf-h-13 cf-w-full cf-border-b-2 cf-border-gray-900 cf-mt-8 cf-mb-8">
             <span className="cf-icon cf-absolute cf-right-2.5 cf-text-lg cf-text-gray-900 cf-leading-[55px]"><i className='bx bxs-lock-alt'></i></span>
             <input
               type="password"
               name="password"
               required
               className={`cf-bg-transparent cf-w-full cf-h-full cf-text-lg cf-font-semibold cf-text-gray-900 cf-pl-1.5 cf-pr-7.5 cf-pb-5 ${formData.password ? 'cf-not-empty' : ''}`}
              //  value={formData.password}
               onChange={handlepassword}
               value={password}
             />
             <label className="cf-absolute cf-left-1.5 cf-top-1/2 cf-transform cf--translate-y-1/2 cf-text-gray-900 cf-text-lg cf-font-medium cf-transition-all cf-duration-450 cf-pointer-events-none">Password</label>
           </div>
           {isRegister ? (
             <div className="cf-check cf-flex cf-justify-between cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-[-14px] cf-mb-4">
               <label className="cf-flex cf-items-center"><input type="checkbox" className="cf-mr-1.5 cf-accent-gray-900" />I accept all terms & conditions</label>
             </div>
           ) : (
             <div className="cf-check cf-flex cf-justify-between cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-[-14px] cf-mb-4">
               <label className="cf-flex cf-items-center"><input type="checkbox" className="cf-mr-1.5 cf-accent-gray-900" />Remember me</label>
               <a href="#" className="cf-hover:underline">Forget Password</a>
             </div>
           )}
           <button type="submit" className="cf-bg-gray-900 cf-w-full cf-h-[43px] cf-rounded-lg cf-font-semibold cf-text-white cf-cursor-pointer">{isRegister ? 'Register Here' : 'Login'}</button>
           <div className="cf-register cf-text-center cf-text-gray-900 cf-text-sm cf-font-medium cf-mt-8 cf-mb-4">
             <p>{isRegister ? 'Already have an account?' : "If you don't have an account?"} <a href="#" onClick={() => setIsRegister(!isRegister)} className="cf-font-semibold cf-hover:underline">{isRegister ? 'Login!' : 'Register Here'}</a></p>
           </div>
         </form>
       </div>
       <span className="cf-close-icon cf-absolute cf-left-0 cf-top-0 cf-w-11 cf-h-11 cf-bg-gray-900 cf-text-white cf-flex cf-items-center cf-justify-center cf-text-3xl cf-cursor-pointer" onClick={() => setIsPopupActive(false)}>
         <i className='bx bx-x'></i>
       </span>
     </div>
   </div>
    );
};

export default LoginRegisterForm;
