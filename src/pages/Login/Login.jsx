import { useState } from 'react';
import { Navigate,Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/Auth';
import { useAuth } from '../../contexts/authContext';
import 'boxicons/css/boxicons.min.css';
import BackgroundImage from '../../assets/pexels-pixabay-276452.jpg';

const LoginRegisterForm = () => {
    const { userLoggedIn } = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSignedIn) {
            setIsSignedIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div
            className='relative min-h-screen flex items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <header className="fixed w-full top-0 right-0 z-50 bg-blue-500 p-8 flex items-center justify-between">
                <div className="text-4xl font-bold text-white">BILLIE(NZ)</div>
                <nav className="flex items-center">
                    {["About", "Services", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="relative text-white text-lg font-medium ml-11 hover:before:w-full before:absolute before:content-[''] before:left-0 before:bottom-[-4px] before:w-0 before:h-0.5 before:bg-white before:rounded before:transition-all before:duration-450"
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={() => setIsPopupActive(!isPopupActive)}
                        className="inline-block px-8 py-2.5 bg-transparent text-white border-2 border-white rounded-lg text-lg font-medium ml-11 transition-transform duration-450 hover:scale-110 hover:bg-white hover:text-gray-800"
                    >
                        Login
                    </button>
                </nav>
            </header>

            <div
                className={`container relative h-[530px] w-[460px] border-3 border-white/40 backdrop-blur-[25px] shadow-lg flex items-center justify-center rounded-3xl overflow-hidden ${
                    isPopupActive ? 'scale-100' : 'scale-0'
                } transition-transform duration-500`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
                <div className={`main-box ${isRegister ? 'register' : 'login'} p-16 w-full`}>
                    <h1 className="text-gray-900 text-center text-4xl font-bold">{isRegister ? 'Registration' : 'Login'}</h1>
                    <form action="">
                        {isRegister && (
                            <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
                                <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]"><i className='bx bxs-user'></i></span>
                                <input 
                                    type="text"
                                    name="username"
                                    required 
                                    className={`bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5 ${formData.username ? 'not-empty' : ''}`}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">Username</label>
                            </div>
                        )}
                        <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
                            <span className="icon absolute right-2.5  text-lg text-gray-900 leading-[55px]"><i className='bx bxs-envelope'></i></span>
                            <input 
                                type="email" 
                                name="email"
                                required 
                                className={`bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5 ${formData.email ? 'not-empty' : ''}`}
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">Email</label>
                        </div>
                        <div className="input-box relative h-13 w-full border-b-2 border-gray-900 mt-8 mb-8">
                            <span className="icon absolute right-2.5 text-lg text-gray-900 leading-[55px]"><i className='bx bxs-lock-alt'></i></span>
                            <input 
                                type="password" 
                                name="password"
                                required 
                                className={`bg-transparent w-full h-full text-lg font-semibold text-gray-900 pl-1.5 pr-7.5 pb-5 ${formData.password ? 'not-empty' : ''}`}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <label className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg font-medium transition-all duration-450 pointer-events-none">Password</label>
                        </div>
                        {isRegister ? (
                            <div className="check flex justify-between text-gray-900 text-sm font-medium mt-[-14px] mb-4">
                                <label className="flex items-center"><input type="checkbox" className="mr-1.5 accent-gray-900" />I accept all terms & conditions</label>
                            </div>
                        ) : (
                            <div className="check flex justify-between text-gray-900 text-sm font-medium mt-[-14px] mb-4">
                                <label className="flex items-center"><input type="checkbox" className="mr-1.5 accent-gray-900" />Remember me</label>
                                <a href="#" className="hover:underline">Forget Password</a>
                            </div>
                        )}
                        <button type="submit" className="bg-gray-900 w-full h-[43px] rounded-lg font-semibold text-white cursor-pointer">{isRegister ? 'Register Here' : 'Login'}</button>
                        <div className="register text-center text-gray-900 text-sm font-medium mt-8 mb-4">
                            <p>{isRegister ? 'Already have an account?' : "If you don't have an account?"} <a href="#" onClick={() => setIsRegister(!isRegister)} className="font-semibold hover:underline">{isRegister ? 'Login!' : 'Register Here'}</a></p>
                        </div>
                    </form>
                </div>
                <span className="close-icon absolute left-0 top-0 w-11 h-11 bg-gray-900 text-white flex items-center justify-center text-3xl cursor-pointer" onClick={() => setIsPopupActive(false)}>
                    <i className='bx bx-x'></i>
                </span>
            </div>
        </div>
    );
};

export default LoginRegisterForm;
