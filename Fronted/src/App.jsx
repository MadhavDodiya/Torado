import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import ServiceDetail from './Pages/ServiceDetail'
import Aboutus from './Pages/Aboutus'
import Pricingplans from './Pages/Pricingplans'
import Faqs from "./Pages/Faq's"
import Testimonials from './Pages/Testimonials'
import Privacypolicy from './Pages/Privacypolicy'
import TermAndCondition from './Pages/Term&condition'
import Portfolio from './Pages/Portfolio'
import Teams from './Pages/Teams'
import TeamDetail from './Pages/TeamDetail'
import Blog from './Pages/Blog'
import BlogDetails from './Pages/BlogDetails'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ErrorPage from './Pages/404Error'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AdminLogin from './admin/pages/AdminLogin'
import AdminRegister from './admin/pages/AdminRegister'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminBlogs from './admin/pages/AdminBlogs'
import AdminTeams from './admin/pages/AdminTeams'
import AdminServices from './admin/pages/AdminServices'
import AdminContacts from './admin/pages/AdminContacts'
import AdminUsers from './admin/pages/AdminUsers'
import AdminProtectedRoute from './admin/components/AdminProtectedRoute'
import AdminLayout from './admin/components/AdminLayout'

function App() {
  const location = useLocation()
  const normalizedPath = location.pathname.replace(/\/+$/, '')
  const currentPage = normalizedPath === '' || normalizedPath === '/' ? 'home' : normalizedPath.slice(1)
  const isAdminPath = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPath ? <Header currentPage={currentPage} /> : null}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/service-detail" element={<ServiceDetail />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/pricingplan" element={<Pricingplans />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/teamdetails" element={<TeamDetail />} />
        <Route path="/team-detail" element={<TeamDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/financial-analysis" element={<ServiceDetail />} />
        <Route path="/taxation-planning" element={<ServiceDetail />} />
        <Route path="/investment-trading" element={<ServiceDetail />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/term-condition" element={<TermAndCondition />} />

        {/* Admin Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="teams" element={<AdminTeams />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!isAdminPath ? <Footer /> : null}
    </>
  )
}

export default App