import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import ServiceDetail from './Pages/ServiceDetail'
import Aboutus from './Pages/Aboutus'
import Pricingplans from './Pages/Pricingplans'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  const location = useLocation()
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1)

  return (
    <>
      <Header currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service pageTitle="Our Services" />} />
        <Route path="/service-detail" element={<ServiceDetail pageTitle="Service Detail" />} />
        <Route path="/aboutus" element={<Aboutus pageTitle="About Us" />} />
        <Route path="/pricingplan" element={<Pricingplans />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
