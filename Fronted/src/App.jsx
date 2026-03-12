import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import Financial from './Pages/Financial'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service pageTitle="Our Services" />} />
        <Route path="/financial-analysis" element={<Financial />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
