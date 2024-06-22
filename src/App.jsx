import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Holder from './components/holder'
import { Head } from './components/header'
import { useSelector } from 'react-redux'
function App() {
  const [count, setCount] = useState(0)
  const darkmode = useSelector((state)=> state.darkMode)
  const style = {
    backgroundColor : darkmode ? '#000' : "#fff",
    color: darkmode ? '#FFF' : '#000',
    transition: 'all 0.3s',
}
  return (
    <div style={style} >
      <Head />
      <Holder />
    </div>
  )
}

export default App
