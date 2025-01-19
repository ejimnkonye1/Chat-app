/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import LoginForm from '../forms/loginform';
import RegisterForm from '../forms/registerform';
import RequestPasswordform from '../forms/requestPassword';

const LoginRegisterForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [forgetpage, setfogetPage] = useState(false);

  

    return (
        <div className='relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-900'
            // style={{ background: 'black' }}
        >
            <div
                className={`container relative h-[530px] lg:w-[460px] w-full 
                border-3 border-white/40 lg:mx-8 mx-4 shadow-lg 
                flex items-center justify-center rounded-3xl
                overflow-hidden
                transition-transform duration-1000`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 20)' }}
            >
                <div className={`main-box ${isRegister ? 'register' : 'login'} p-6 lg:p-12 w-full`}>
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