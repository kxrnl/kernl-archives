import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Games from './pages/Games'
import Devlogs from './pages/Devlogs'
import NotFound from './pages/NotFound'

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/devlogs" element={<Devlogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
