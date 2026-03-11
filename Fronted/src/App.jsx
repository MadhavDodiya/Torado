import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Service from './Pages/Service'

const getPageIdFromPath = (pathname) => {
  if (!pathname || pathname === '/') {
    return 'home'
  }

  return pathname.replace(/^\/+|\/+$/g, '') || 'home'
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function AppLayout({ children }) {
  const location = useLocation()
  const currentPage = getPageIdFromPath(location.pathname)

  return (
    <>
      <Header currentPage={currentPage} />
      {children}
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/services"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/about"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/team"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/financial-analysis"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/taxation-planning"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route
          path="/investment-trading"
          element={
            <AppLayout>
              <Service />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
