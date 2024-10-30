
    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"
import Login from './login/Login'
import { ChatBox } from './components/chatbox'
import RequestPassword from './forms/requestPassword'
import Settings from './components/Settings'
import Userprofile from "./components/Userprofile";


const App = () => {
   const darkMode = useSelector((state)=> state.darkMode)
  const appClass = darkMode ? 'dark' : '';
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-700 ${appClass}`}>
        <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chatbox" element={<ChatBox/>}/>
          <Route path="/requestpassword" element={<RequestPassword/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/userprofile" element={<Userprofile/>}/>

        </Routes>
      </Router>
    </div>
      


  )
}

export default App
