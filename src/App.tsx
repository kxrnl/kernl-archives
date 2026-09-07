import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Loader Component
import Loading from './components/Loading'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Devlogs from './components/Devlogs'
import NotFound from './pages/NotFound'
import GamesDevlogsLayout from './layouts/GamesDevlogsLayout'
import AboutLayout from './layouts/AboutLayout'

// Yes me
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

import './App.css'

function App() {
  // Loading sthing
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setFading(false)

    const fadeTimer = setTimeout(() => setFading(true), 1500)  // Timer
    const hideTimer = setTimeout(() => setLoading(false), 2000) // Actual Fade

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [location.pathname])

  return (
    <>
      {loading && <Loading fading={fading} />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<GamesDevlogsLayout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/devlogs" element={<Devlogs />} />

        </Route>

        <Route element={<AboutLayout />}>
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}

export default App