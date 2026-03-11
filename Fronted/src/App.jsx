import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ContentPage from './Pages/ContentPage'
import { getPageIdFromPath, pageContent } from './siteContent'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function ContentRoute() {
  const { pageId } = useParams()

  if (!pageId || !(pageId in pageContent)) {
    return <Navigate to="/" replace />
  }

  return <ContentPage pageId={pageId} />
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
          path="/:pageId"
          element={
            <AppLayout>
              <ContentRoute />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
