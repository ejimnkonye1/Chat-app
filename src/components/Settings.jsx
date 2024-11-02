import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { CiDark } from "react-icons/ci";
import { setMode } from '../action';
import { CiLight } from "react-icons/ci";
import { handleBackClick } from './HandleBack';
import { FiArrowLeft } from 'react-icons/fi';
const Settings = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode)


  const [navigateBack, setNavigateBack] = useState(false);
  
  
  const toggleDarkMode = () => {
     const newMode = !darkMode
     dispatch(setMode(newMode));

     document.documentElement.classList.toggle('dark',newMode)
  }
  return (
    <>
      <div className="flex flex-col ">
      <button
        className="absolute left-3 top-3 text-3xl"
        onClick={() => handleBackClick(navigate, navigateBack, setNavigateBack)}
      >
        <FiArrowLeft size={24} />
      </button>
        <h1 className="text-center font-bold text-2xl py-4 dark:text-gray-100 ">Settings</h1>
        <hr/>
        <div className="mt-2 flex justify-between p-4 ">
          <p className="font-bold text-nightowl-background dark:text-gray-100">Turn on dark mode</p>
          <div 
            onClick={toggleDarkMode}
            className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-nightowl-green' : 'bg-gray-300'} `}
          >
            <div 
              className={`absolute flex items-center top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 transform ${darkMode ? 'translate-x-8' : 'translate-x-2'}`}
            >
              {darkMode ? (
                <CiDark className="w-4 h-4 text-grey-900 items-center mx-auto"/> 
              ) : (
                <CiLight className="w-4 h-4 text-yellow-500 items-center mx-auto" />
              )
              }
            </div>
              
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings