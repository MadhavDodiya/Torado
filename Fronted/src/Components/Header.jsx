import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaTimes,
  FaTwitter,
} from 'react-icons/fa'
import logo from '../assets/Image/imgi_1_logo.png'

const linkResetStyle = { textDecoration: 'none' }

export default function Header() {
  const location = useLocation()
  const currentPage = location.pathname.replace(/^\//, '').replace(/\/+$/, '') || 'home'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)
  const closeTimer = useRef(null)

  const closeMenus = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setMobileOpen(false)
    setOpenDropdown(null)
  }

  const isActive = (paths) => {
    return paths.some(
      (p) => currentPage === p || currentPage.startsWith(p + '/')
    )
  }

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const startCloseTimer = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  const cancelCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleMouseEnter = (name) => {
    cancelCloseTimer()
    setOpenDropdown(name)
  }

  const handleMouseLeave = () => {
    startCloseTimer()
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#0b2344] text-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-6 text-sm">
            <span className="hidden items-center gap-2 md:inline-flex">
              <FaMapMarkerAlt className="text-red-500" />
              838 Andy Street, Madison, NJ 08003
            </span>
            <span className="inline-flex items-center gap-2">
              <FaEnvelope className="text-red-500" />
              hello@torado.com
            </span>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="flex items-center gap-3">
              <Link to="/contact" onClick={closeMenus} className="text-sm text-white/85 no-underline transition-colors hover:text-white" style={linkResetStyle}>Help</Link>
              <span className="text-white/40">/</span>
            </span>
            <span className="flex items-center gap-3">
              <Link to="/contact" onClick={closeMenus} className="text-sm text-white/85 no-underline transition-colors hover:text-white" style={linkResetStyle}>Support</Link>
              <span className="text-white/40">/</span>
            </span>
            <span className="flex items-center gap-3">
              <Link to="/contact" onClick={closeMenus} className="text-sm text-white/85 no-underline transition-colors hover:text-white" style={linkResetStyle}>Contact</Link>
            </span>

            <div className="ml-4 flex items-center gap-3 text-base text-white/60">
              <Link to="/" onClick={closeMenus} aria-label="Facebook" className="no-underline transition-colors hover:text-white" style={linkResetStyle}><FaFacebookF /></Link>
              <Link to="/" onClick={closeMenus} aria-label="Twitter" className="no-underline transition-colors hover:text-white" style={linkResetStyle}><FaTwitter /></Link>
              <Link to="/" onClick={closeMenus} aria-label="Instagram" className="no-underline transition-colors hover:text-white" style={linkResetStyle}><FaInstagram /></Link>
              <Link to="/" onClick={closeMenus} aria-label="LinkedIn" className="no-underline transition-colors hover:text-white" style={linkResetStyle}><FaLinkedinIn /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav ref={navRef} className="border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex h-[96px] max-w-[1400px] items-center px-4 lg:px-8">
          <Link to="/" onClick={closeMenus} className="shrink-0 no-underline" aria-label="Go to Home" style={linkResetStyle}>
            <img src={logo} alt="Torado logo" className="h-12 w-auto" />
          </Link>

          <ul className="ml-10 hidden items-center gap-8 lg:flex">

            {/* Home */}
            <li>
              <Link
                to="/"
                onClick={closeMenus}
                className={`text-lg font-semibold no-underline transition-colors ${isActive(['home']) ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                style={linkResetStyle}
              >
                Home
              </Link>
            </li>

            {/* Services dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2">
                <Link
                  to="/services"
                  onClick={closeMenus}
                  className={`text-lg font-semibold no-underline transition-colors ${isActive(['services', 'service-detail', 'financial-analysis', 'taxation-planning', 'investment-trading']) ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                  style={linkResetStyle}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDropdown('services') }}
                  className={`text-sm opacity-70 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`}
                  aria-label="Toggle Services dropdown"
                >
                  <FaChevronDown />
                </button>
              </div>

              {openDropdown === 'services' && (
                <ul
                  className="absolute left-0 top-full z-30 mt-4 min-w-[240px] rounded-xl border border-slate-100 bg-white p-2 shadow-xl"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <Link to="/services" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['services']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Services</Link>
                  </li>
                  <li>
                    <Link to="/service-detail" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['service-detail', 'financial-analysis', 'taxation-planning', 'investment-trading']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Service Detail</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Pages dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('pages')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2">
                <Link
                  to="/aboutus"
                  onClick={closeMenus}
                  className={`text-lg font-semibold no-underline transition-colors ${isActive(['aboutus', 'pricingplan', 'faqs', 'testimonials', 'portfolio', 'projects', 'privacy-policy', 'term-condition', 'error']) ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                  style={linkResetStyle}
                >
                  Pages
                </Link>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDropdown('pages') }}
                  className={`text-sm opacity-70 transition-transform ${openDropdown === 'pages' ? 'rotate-180' : ''}`}
                  aria-label="Toggle Pages dropdown"
                >
                  <FaChevronDown />
                </button>
              </div>

              {openDropdown === 'pages' && (
                <ul
                  className="absolute left-0 top-full z-30 mt-4 min-w-[240px] rounded-xl border border-slate-100 bg-white p-2 shadow-xl"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={handleMouseLeave}
                >
                  <li><Link to="/aboutus" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['aboutus']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>About Us</Link></li>
                  <li><Link to="/pricingplan" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['pricingplan']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Pricing Plan</Link></li>
                  <li><Link to="/faqs" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['faqs']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Faq's</Link></li>
                  <li><Link to="/testimonials" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['testimonials']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Testimonials</Link></li>
                  <li><Link to="/portfolio" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['portfolio', 'projects']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Portfolio</Link></li>
                  <li><Link to="/privacy-policy" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['privacy-policy']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Privacy Policy</Link></li>
                  <li><Link to="/term-condition" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['term-condition']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Term & Condition</Link></li>
                  <li><Link to="/error" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['error']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Error</Link></li>
                </ul>
              )}
            </li>

            {/* Team dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('team')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2">
                <Link
                  to="/teams"
                  onClick={closeMenus}
                  className={`text-lg font-semibold no-underline transition-colors ${isActive(['teams', 'teamdetails', 'team-detail']) ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                  style={linkResetStyle}
                >
                  Team
                </Link>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDropdown('team') }}
                  className={`text-sm opacity-70 transition-transform ${openDropdown === 'team' ? 'rotate-180' : ''}`}
                  aria-label="Toggle Team dropdown"
                >
                  <FaChevronDown />
                </button>
              </div>

              {openDropdown === 'team' && (
                <ul
                  className="absolute left-0 top-full z-30 mt-4 min-w-[240px] rounded-xl border border-slate-100 bg-white p-2 shadow-xl"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={handleMouseLeave}
                >
                  <li><Link to="/teams" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['teams']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Team</Link></li>
                  <li><Link to="/teamdetails" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['teamdetails', 'team-detail']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Team Details</Link></li>
                </ul>
              )}
            </li>

            {/* Blog dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('blog')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2">
                <Link
                  to="/blog"
                  onClick={closeMenus}
                  className={`text-lg font-semibold no-underline transition-colors ${isActive(['blog', 'blog-details', 'blogdetails']) ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                  style={linkResetStyle}
                >
                  Blog
                </Link>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDropdown('blog') }}
                  className={`text-sm opacity-70 transition-transform ${openDropdown === 'blog' ? 'rotate-180' : ''}`}
                  aria-label="Toggle Blog dropdown"
                >
                  <FaChevronDown />
                </button>
              </div>

              {openDropdown === 'blog' && (
                <ul
                  className="absolute left-0 top-full z-30 mt-4 min-w-[240px] rounded-xl border border-slate-100 bg-white p-2 shadow-xl"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={handleMouseLeave}
                >
                  <li><Link to="/blog" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['blog']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Blog</Link></li>
                  <li><Link to="/blog-details" onClick={closeMenus} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold no-underline transition-colors ${isActive(['blog-details', 'blogdetails']) ? 'bg-[#fff1f6] text-red-500' : 'text-black hover:bg-slate-50 hover:text-red-500'}`} style={linkResetStyle}>Blog Details</Link></li>
                </ul>
              )}
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                onClick={closeMenus}
                className={`text-lg font-semibold no-underline transition-colors ${isActive(['contact']) ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                style={linkResetStyle}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop right */}
          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f00455] text-base text-white">
                <FaPhoneAlt />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-[#7c8491]">Contact Us</p>
                <p className="text-lg font-semibold text-[#1b2940]">(+212)-226-3126</p>
              </div>
            </div>

            <Link to="/blog" onClick={closeMenus} aria-label="Search" className="text-2xl text-black no-underline transition-colors hover:text-red-500" style={linkResetStyle}>
              <FaSearch />
            </Link>

            <Link
              to="/contact"
              onClick={closeMenus}
              className="inline-flex h-12 items-center rounded-md bg-[#f00455] px-7 text-sm font-bold uppercase tracking-wide text-white no-underline transition-colors hover:bg-[#d30049]"
              style={linkResetStyle}
            >
              BOOK A CONSULTATION
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-100 px-4 pb-6 pt-4 lg:hidden">
            <ul className="space-y-2">
              <li className="rounded-lg border border-slate-100">
                <Link to="/" onClick={closeMenus} className={`block px-4 py-3 text-sm font-semibold no-underline ${isActive(['home']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Home</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/services" onClick={closeMenus} className={`block px-4 py-3 text-sm font-semibold no-underline ${isActive(['services', 'service-detail', 'financial-analysis', 'taxation-planning', 'investment-trading']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Services</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/financial-analysis" onClick={closeMenus} className={`block px-4 py-3 text-sm no-underline ${isActive(['financial-analysis']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Financial Analysis</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/taxation-planning" onClick={closeMenus} className={`block px-4 py-3 text-sm no-underline ${isActive(['taxation-planning']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Taxation Planning</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/investment-trading" onClick={closeMenus} className={`block px-4 py-3 text-sm no-underline ${isActive(['investment-trading']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Investment Trading</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/aboutus" onClick={closeMenus} className={`block px-4 py-3 text-sm font-semibold no-underline ${isActive(['aboutus']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>About Us</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/projects" onClick={closeMenus} className={`block px-4 py-3 text-sm font-semibold no-underline ${isActive(['projects', 'portfolio']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Projects</Link>
              </li>
              <li className="rounded-lg border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleDropdown('team-mobile')}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-black"
                >
                  Team
                  <FaChevronDown className={`transition-transform ${openDropdown === 'team-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'team-mobile' && (
                  <div className="space-y-1 border-t border-slate-100 px-2 pb-2 pt-1">
                    <Link to="/teams" onClick={closeMenus} className={`block rounded-md px-3 py-2 text-sm no-underline ${isActive(['teams']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Team</Link>
                    <Link to="/teamdetails" onClick={closeMenus} className={`block rounded-md px-3 py-2 text-sm no-underline ${isActive(['teamdetails', 'team-detail']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Team Details</Link>
                  </div>
                )}
              </li>
              <li className="rounded-lg border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleDropdown('blog-mobile')}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-black"
                >
                  Blog
                  <FaChevronDown className={`transition-transform ${openDropdown === 'blog-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'blog-mobile' && (
                  <div className="space-y-1 border-t border-slate-100 px-2 pb-2 pt-1">
                    <Link to="/blog" onClick={closeMenus} className={`block rounded-md px-3 py-2 text-sm no-underline ${isActive(['blog']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Blog</Link>
                    <Link to="/blog-details" onClick={closeMenus} className={`block rounded-md px-3 py-2 text-sm no-underline ${isActive(['blog-details', 'blogdetails']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Blog Details</Link>
                  </div>
                )}
              </li>
              <li className="rounded-lg border border-slate-100">
                <Link to="/contact" onClick={closeMenus} className={`block px-4 py-3 text-sm font-semibold no-underline ${isActive(['contact']) ? 'text-red-500' : 'text-black'}`} style={linkResetStyle}>Contact</Link>
              </li>
            </ul>

            <Link
              to="/contact"
              onClick={closeMenus}
              className="mt-5 block w-full rounded-md bg-[#f00455] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white no-underline transition-colors hover:bg-[#d30049]"
              style={linkResetStyle}
            >
              BOOK A CONSULTATION
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
