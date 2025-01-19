/* eslint-disable react/prop-types */

    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"
import Login from './login/Login'
import { ChatBox } from './components/chatbox'
import RequestPassword from './forms/requestPassword'
import Settings from './components/Settings'

import { useState,useEffect, } from "react";
// import { useLocation } from "react-router-dom";
const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const delayLoader = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(delayLoader);
  }, []); // Run loader only when the route changes

  return isLoading ? <Loader /> : children;
};
const Loader = () => (
  <div id="spinner" className="fixed inset-0 flex items-center justify-center flex-col bg-WHITE z-50">
     
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-500 w-12 h-12" >
         
      </div>
     
<div className="card">
  <div className="loader">
    <p>loading</p>
    <div className="words">
      <span className="word">buttons</span>
      <span className="word">forms</span>
      <span className="word">switches</span>
      <span className="word">database</span>
      <span className="word">buttons</span>
    </div>
  </div>
</div>

  </div>
    
    
    );
const App = () => {
 

      
   const darkMode = useSelector((state)=> state.darkMode)
  const appClass = darkMode ? 'dark' : '';
  return (
    

   
    <div className={`min-h-screen overflow-hidden    dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 transition-colors duration-700 ${appClass}`}>
      
        <Router>
        <Layout>

       
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chatbox" element={<ChatBox/>}/>
          <Route path="/requestpassword" element={<RequestPassword/>}/>
          <Route path="/settings" element={<Settings/>}/>
        

        </Routes>
        </Layout>
      </Router>
    </div>
   
      


  )
}

export default App
