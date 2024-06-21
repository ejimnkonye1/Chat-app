import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Holder from './components/holder'
import { Head } from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Head />
      <Holder />
    </div>
  )
}

export default App
