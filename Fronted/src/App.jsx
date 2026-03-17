import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import ServiceDetail from './Pages/ServiceDetail'
import Aboutus from './Pages/Aboutus'
import Pricingplans from './Pages/Pricingplans'
import Faqs from './Pages/Faq\'s'
import Testimonials from './Pages/Testimonials'
import Privacypolicy from './Pages/Privacypolicy'
import TermAndCondition from './Pages/Term&condition'
import Portfolio from './Pages/Portfolio'
import Teams from './Pages/Teams'
import Blog from './Pages/Blog'
import BlogDetails from './Pages/BlogDetails'
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
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams pageTitle="Team" />} />
        <Route path="/team" element={<Teams pageTitle="Team" />} />
        <Route path="/blog" element={<Blog pageTitle="Blog" />} />
        <Route path="/blog-details" element={<BlogDetails pageTitle="Blog Details" />} />
        <Route path="/faqs" element={<Faqs pageTitle="Faq's" />} />
        <Route path="/testimonials" element={<Testimonials pageTitle="Testimonials" />} />
        <Route path="/privacy-policy" element={<Privacypolicy pageTitle="Privacy Policy" />} />
        <Route path="/term-condition" element={<TermAndCondition pageTitle="Term & Condition" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
