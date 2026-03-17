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
import TeamDetail from './Pages/TeamDetail'
import Blog from './Pages/Blog'
import BlogDetails from './Pages/BlogDetails'
import Contact from './Pages/Contact'
import ErrorPage from './Pages/404Error'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  const location = useLocation()
  const normalizedPath = location.pathname.replace(/\/+$/, '')
  const currentPage = normalizedPath === '' || normalizedPath === '/' ? 'home' : normalizedPath.slice(1)

  return (
    <>
      <Header currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service pageTitle="Our Services" />} />
        <Route path="/service-detail" element={<ServiceDetail pageTitle="Service Detail" />} />
        <Route path="/aboutus" element={<Aboutus pageTitle="About Us" />} />
        <Route path="/pricingplan" element={<Pricingplans />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams pageTitle="Team" />} />
        <Route path="/team" element={<Teams pageTitle="Team" />} />
        <Route path="/teamdetails" element={<TeamDetail />} />
        <Route path="/team-detail" element={<TeamDetail />} />
        <Route path="/blog" element={<Blog pageTitle="Blog" />} />
        <Route path="/blog-details" element={<BlogDetails pageTitle="Blog Details" />} />
        <Route path="/blogdetails" element={<BlogDetails pageTitle="Blog Details" />} />
        <Route path="/contact" element={<Contact pageTitle="Contact" />} />
        <Route path="/financial-analysis" element={<ServiceDetail pageTitle="Financial Analysis" />} />
        <Route path="/taxation-planning" element={<ServiceDetail pageTitle="Taxation Planning" />} />
        <Route path="/investment-trading" element={<ServiceDetail pageTitle="Investment Trading" />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/faqs" element={<Faqs pageTitle="Faq's" />} />
        <Route path="/testimonials" element={<Testimonials pageTitle="Testimonials" />} />
        <Route path="/privacy-policy" element={<Privacypolicy pageTitle="Privacy Policy" />} />
        <Route path="/term-condition" element={<TermAndCondition pageTitle="Term & Condition" />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
