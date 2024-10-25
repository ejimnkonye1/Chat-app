
    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './login/Login'
import { ChatBox } from './components/chatbox'
import RequestPassword from './forms/requestPassword'


const App = () => {
  //  const darkmode = useSelector((state)=> state.darkMode)

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chatbox" element={<ChatBox/>}/>
          <Route path="/requestpassword" element={<RequestPassword/>}/>

        </Routes>
      </Router>


  )
}

export default App
