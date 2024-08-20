
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Holder from './components/holder'
import { Head } from './components/header'
import { useSelector } from 'react-redux'

    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './login/Login'
import { ChatBox } from './components/chatbox'
import RequestPassword from './forms/requestPassword'
import Texting from './socket'
import Hold from './components/test'
import OnlineUsersList from './components/online'

const App = () => {
   const darkmode = useSelector((state)=> state.darkMode)
  const style = {
    backgroundColor : darkmode ? '#000' : "#fff",
    color: darkmode ? '#FFF' : '#000',
    transition: 'all 0.3s',
}
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chatbox" element={<ChatBox/>}/>
          <Route path="/requestpassword" element={<RequestPassword/>}/>
          <Route path="/text" element={<Hold/>}/>
          <Route path="/on" element={<OnlineUsersList/>}/>
        </Routes>
      </Router>


  )
}

export default App
