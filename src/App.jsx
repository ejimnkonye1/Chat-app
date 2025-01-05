/* eslint-disable react/prop-types */

    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"
import Login from './login/Login'
import { ChatBox } from './components/chatbox'
import RequestPassword from './forms/requestPassword'
import Settings from './components/Settings'
import Userprofile from "./components/Userprofile";
import { useState,useEffect, } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
  const Loader = () => (
    <div id="spinner" className="fixed inset-0 flex items-center justify-center flex-col bg-WHITE z-50">
       <span className="sr-only">Loading...</span>
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-500 w-12 h-12" >
           
        </div>
        <div className="text-2xl py-10 font-bold text-gray-800 animate-bounce">
        ℂ𝕙𝕒𝕥𝕒𝕡𝕡
    </div>
           
    </div>
      
      
      );
      
      const Layout = ({ children }) => {
        const [isLoading, setIsLoading] = useState(true);
        const location = useLocation();
      
        useEffect(() => {
          setIsLoading(true); 
          const delayLoader = setTimeout(() => {
            setIsLoading(false);
          }, 2000);
      
          return () => clearTimeout(delayLoader);
        }, [location]);
      
        return isLoading ? <Loader /> : children;
      };
   const darkMode = useSelector((state)=> state.darkMode)
  const appClass = darkMode ? 'dark' : '';
  return (
    

   
    <div className={`min-h-screen h-[90vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-700 ${appClass}`}>
      
        <Router>
        <Layout>

       
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chatbox" element={<ChatBox/>}/>
          <Route path="/requestpassword" element={<RequestPassword/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/userprofile" element={<Userprofile/>}/>

        </Routes>
        </Layout>
      </Router>
    </div>
   
      


  )
}

export default App
