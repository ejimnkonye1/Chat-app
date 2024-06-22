import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
