/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { setUsername, setUserEmail } from '../action';
import { useDispatch } from 'react-redux';
import 'boxicons/css/boxicons.min.css';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../forms/loginform';
import RegisterForm from '../forms/registerform';
import RequestPasswordform from '../forms/requestPassword';

const LoginRegisterForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [forgetpage, setfogetPage] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isSignedIn) {
            setIsSignedIn(true);
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                dispatch(setUsername(formData.username));
                dispatch(setUserEmail(email));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleUser = async (e) => {
        e.preventDefault();
        if (!isSignedIn) {
            setIsSignedIn(true);
            try {
                await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUsername(formData.username));
                dispatch(setUserEmail(email)); 
            } catch (err) {
                console.error(err);
            }
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleemail = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };

    const handlepassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };

    return (
        <div className='relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-900'
            // style={{ background: 'black' }}
        >
            <div
                className={`container relative h-[530px] w-[460px] 
                border-3 border-white/40 mx-8 shadow-lg 
                flex items-center justify-center rounded-3xl
                overflow-hidden
                transition-transform duration-1000`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 20)' }}
            >
                <div className={`main-box ${isRegister ? 'register' : 'login'} p-12 w-full`}>
                    <h1 className="text-gray-900 text-center text-4xl font-bold">{isRegister ? 'Registration' : forgetpage ? 'forget' : 'Login'}</h1>

                    {isRegister ? (
                        <div>
                            <RegisterForm setIsRegister={setIsRegister} />
                        </div>
                    ) : (
                        <div>
                            {forgetpage ? (
                                <RequestPasswordform 
                                    forgetpage={forgetpage}
                                    setfogetPage={setfogetPage}
                                />
                            ) : (
                                <LoginForm 
                                    setIsRegister={setIsRegister}
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