
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Holder from './components/holder'
import { Head } from './components/header'
import { useSelector } from 'react-redux'

    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './login/Login'
import { ChatBox } from './components/chatbox'

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
        </Routes>
      </Router>


  )
}

export default App
