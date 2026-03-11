import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { getPagePath, navItems } from '../siteContent'

const parentLookup = navItems.reduce((accumulator, item) => {
  accumulator[item.id] = item.id

  if (item.children) {
    item.children.forEach((child) => {
      accumulator[child.id] = item.id
    })
  }

  return accumulator
}, {})

const getPrimaryPath = (item) => getPagePath(item.children?.[0]?.id ?? item.id)

export default function Header({ currentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const activeParent = parentLookup[currentPage] ?? currentPage

  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [currentPage])

  const mobileItems = useMemo(() => navItems, [])

  return (
    <header className="w-full">
      <div className="bg-[#0b2344] text-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-6 text-sm">
            <span className="hidden items-center gap-2 md:inline-flex">
              <FaMapMarkerAlt className="text-[#f00455]" />
              838 Andy Street, Madison, NJ 08003
            </span>
            <span className="inline-flex items-center gap-2">
              <FaEnvelope className="text-[#f00455]" />
              hello@torado.com
            </span>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {['Help', 'Support', 'Contact'].map((item, index, arr) => (
              <span key={item} className="flex items-center gap-3">
                <Link
                  to={getPagePath('contact')}
                  className="text-sm text-white/85 transition-colors hover:text-white"
                >
                  {item}
                </Link>
                {index < arr.length - 1 && <span className="text-white/40">/</span>}
              </span>
            ))}
            <div className="ml-4 flex items-center gap-3 text-base text-white/60">
              <button type="button" aria-label="Facebook" className="transition-colors hover:text-white">
                <FaFacebookF />
              </button>
              <button type="button" aria-label="Twitter" className="transition-colors hover:text-white">
                <FaTwitter />
              </button>
              <button type="button" aria-label="Instagram" className="transition-colors hover:text-white">
                <FaInstagram />
              </button>
              <button type="button" aria-label="LinkedIn" className="transition-colors hover:text-white">
                <FaLinkedinIn />
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex h-[96px] max-w-[1400px] items-center px-4 lg:px-8">
          <Link to={getPagePath('home')} className="shrink-0" aria-label="Go to Home">
            <img src={logo} alt="Torado logo" className="h-12 w-auto" />
          </Link>

          <ul className="ml-10 hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = activeParent === item.id

              return (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                  onMouseLeave={() => item.children && setOpenDropdown((prev) => (prev === item.id ? null : prev))}
                >
                  <div className="flex items-center gap-2">
                    <Link
                      to={getPrimaryPath(item)}
                      className={`text-lg font-semibold transition-colors ${
                        isActive ? 'text-[#f00455]' : 'text-[#1b2940] hover:text-[#f00455]'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown((prev) => (prev === item.id ? null : item.id))}
                        className={`text-sm transition-colors ${
                          isActive ? 'text-[#f00455]' : 'text-[#1b2940] hover:text-[#f00455]'
                        }`}
                        aria-label={`Toggle ${item.label} menu`}
                      >
                        <FaChevronDown className={`opacity-70 transition-transform ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {item.children && openDropdown === item.id && (
                    <div className="absolute left-0 top-full z-30 mt-4 min-w-[240px] rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={getPagePath(child.id)}
                          className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                            currentPage === child.id
                              ? 'bg-[#fff1f6] text-[#f00455]'
                              : 'text-[#1b2940] hover:bg-slate-50 hover:text-[#f00455]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

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

            <Link
              to={getPagePath('blog')}
              aria-label="Search"
              className="text-2xl text-[#1b2940] transition-colors hover:text-[#f00455]"
            >
              <FaSearch />
            </Link>

            <Link
              to={getPagePath('contact')}
              className="h-12 rounded-md bg-[#f00455] px-7 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#d30049]"
            >
              BOOK A CONSULTATION
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 px-4 pb-6 pt-4 lg:hidden">
            <ul className="space-y-2">
              {mobileItems.map((item) => (
                <li key={`mobile-${item.id}`} className="rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between px-4 py-3">
                    <Link
                      to={getPrimaryPath(item)}
                      className={`text-sm font-semibold ${
                        activeParent === item.id ? 'text-[#f00455]' : 'text-[#1b2940]'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown((prev) => (prev === item.id ? null : item.id))}
                        className="text-[#1b2940]"
                        aria-label={`Toggle ${item.label} menu`}
                      >
                        <FaChevronDown className={`transition-transform ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {item.children && openDropdown === item.id && (
                    <div className="space-y-1 border-t border-slate-100 bg-slate-50 p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={getPagePath(child.id)}
                          className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                            currentPage === child.id ? 'bg-white text-[#f00455]' : 'text-[#1b2940]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <Link
              to={getPagePath('contact')}
              className="mt-5 block w-full rounded-md bg-[#f00455] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#d30049]"
            >
              BOOK A CONSULTATION
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
