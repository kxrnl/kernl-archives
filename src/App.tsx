import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

// Loader Component
import Loading from './components/Loading'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Devlogs from './pages/Devlogs'
import NotFound from './pages/NotFound'
import GamesDevlogsLayout from './layouts/GamesDevlogsLayout'
import AboutLayout from './layouts/AboutLayout'

// View overlays
import { ProjectCardOverlay } from './components/ProjectsCardOverlay'
import { DevlogCardOverlay } from './components/DevlogCardOverlay'

// Test
import Test from './pages/Test'

// Yes me
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

import './App.css'

function App() {
  const location = useLocation()
  const background = location.state?.background

  const [loading, setLoading] = useState(false)
  const [fading, setFading] = useState(false)

  const wasOverlayRef = useRef(false)

  useEffect(() => {
    const isOverlay = Boolean(background)
    const wasOverlay = wasOverlayRef.current
    wasOverlayRef.current = isOverlay

    // Skip the loading transition when entering OR exiting an overlay —
    // only trigger it for genuine page-to-page navigation
    if (isOverlay || wasOverlay) return

    setLoading(true)
    setFading(false)

    const fadeTimer = setTimeout(() => setFading(true), 1500)
    const hideTimer = setTimeout(() => setLoading(false), 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [location.pathname, background])

  return (
    <>
      {loading && <Loading fading={fading} />}

      <Routes location={background || location}>
        <Route path="/" element={<Home />} />

        <Route element={<GamesDevlogsLayout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/devlogs" element={<Devlogs />} />
          {/* Direct visits/refreshes to a view URL (no background) fall back to the grid page */}
          <Route path="/projects/view/:id" element={<Projects />} />
          <Route path="/devlogs/view/:id" element={<Devlogs />} />
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

        <Route path="/test" element={<Test />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* OVERLAY routes */}
      {background && (
        <Routes>
          <Route path="/projects/view/:id" element={<ProjectCardOverlay />} />
          <Route path="/devlogs/view/:id" element={<DevlogCardOverlay />} />
        </Routes>
      )}
    </>
  )
}

export default App