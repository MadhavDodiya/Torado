import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight, FaArrowUp, FaBell } from 'react-icons/fa'
import post1 from '../assets/Image/service1.jpg'
import post2 from '../assets/Image/service2.jpg'

const getPagePath = (pageId) => (pageId === 'home' ? '/' : `/${pageId}`)

const footerLinkMap = {
  'About Us': 'about',
  'Our Team': 'team',
  'Our Projects': 'projects',
  'Latest News': 'blog',
  'Contact Us': 'contact',
  'Financial Advice': 'financial-analysis',
  'Planning Strategies': 'services',
  'Taxation Planning': 'taxation-planning',
  'Investment Trading': 'investment-trading',
  'Wealth Marketing': 'services',
}

function Footer() {
  const [email, setEmail] = useState('')

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const usefulLinks = ['About Us', 'Our Team', 'Our Projects', 'Latest News', 'Contact Us']
  const whatWeDo = [
    'Financial Advice',
    'Planning Strategies',
    'Taxation Planning',
    'Investment Trading',
    'Wealth Marketing',
  ]
  const recentPosts = [
    {
      image: post1,
      category: 'BUSINESS & FINANCE',
      title: 'How To Start Getting More Of a Return From Your Savings',
      pageId: 'financial-analysis',
    },
    {
      image: post2,
      category: 'BUSINESS & FINANCE',
      title: 'Consulted Admitting Wooded Is Power Acuteness',
      pageId: 'taxation-planning',
    },
  ]

  const getFooterPath = (label) => getPagePath(footerLinkMap[label] ?? 'home')

  return (
    <>
      <section
        className="d-flex justify-content-center px-3"
        style={{ position: 'relative', zIndex: 20, marginBottom: '-60px' }}
      >
        <div
          className="w-100 rounded-3 overflow-hidden d-flex flex-column flex-sm-row align-items-center justify-content-between gap-4 px-4 px-md-5 py-5"
          style={{
            maxWidth: '960px',
            background: 'linear-gradient(120deg, #e61b50 0%, #ff3366 60%, #c0143f 100%)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.28) 1.2px, transparent 1.2px)',
              backgroundSize: '18px 18px',
              opacity: 0.35,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              className="text-white fw-bolder mb-1"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
            >
              Do You Want To Learn About Us?
            </h2>
            <p className="mb-0 text-white" style={{ opacity: 0.85, fontSize: '0.875rem' }}>
              Want to learn about us please go to our website.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <Link
              to={getPagePath('about')}
              className="btn text-white fw-bold text-uppercase px-4 py-3"
              style={{
                background: '#0d1e32',
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                border: 'none',
              }}
            >
              GET IN TOUCH TODAY
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ background: '#0d1e32', color: '#fff', paddingTop: '100px' }}>
        <div className="container-xl px-4">
          <div
            className="row g-5 pb-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="col-12 col-lg-6">
              <Link
                to={getPagePath('home')}
                className="d-flex align-items-center gap-3 mb-4 border-0 bg-transparent p-0 text-decoration-none"
              >
                <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#e61b50',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 6,
                      borderRadius: '50%',
                      background: '#0d1e32',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: '#e61b50',
                    }}
                  />
                </div>
                <span className="fw-bolder text-white" style={{ fontSize: '1.5rem' }}>
                  Torado
                </span>
              </Link>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.8, maxWidth: 300 }}>
                Sed ut perspiciati unde omnis iste natus error sit voluptatem accusanti doloremq
                laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis architecto
                beatae.
              </p>
            </div>

            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-start gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid #e61b50',
                    marginTop: 2,
                  }}
                >
                  <FaBell style={{ color: '#e61b50', fontSize: '0.7rem' }} />
                </div>
                <p className="fw-bold text-white mb-0" style={{ lineHeight: 1.4 }}>
                  Stay Up To Date With The Latest News. Subscribe Now!
                </p>
              </div>
              <div className="d-flex flex-column flex-sm-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="form-control rounded-0 border-0"
                  style={{ fontSize: '0.875rem', padding: '14px 20px', flexGrow: 1 }}
                />
                <Link
                  to={getPagePath('blog')}
                  className="btn rounded-0 fw-bold text-white text-uppercase"
                  style={{
                    background: '#e61b50',
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem',
                    padding: '14px 24px',
                    whiteSpace: 'nowrap',
                    border: 'none',
                  }}
                >
                  SUBSCRIBE NOW
                </Link>
              </div>
            </div>
          </div>

          <div
            className="row g-5 py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="col-12 col-sm-6 col-lg-3">
              <h5
                className="fw-bolder text-white d-flex align-items-center mb-4"
                style={{ fontSize: '0.95rem' }}
              >
                Working Time
                <span
                  className="ms-3 flex-grow-1"
                  style={{ display: 'block', height: 2, background: '#e61b50' }}
                />
              </h5>
              <div
                className="p-3"
                style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4 }}
              >
                {['Mon - Sat / 08am : 12pm', 'Mon - Sat / 08am : 12pm', 'Sunday Close'].map(
                  (time, i) => (
                    <div
                      key={time}
                      className="d-flex align-items-center gap-2"
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.875rem',
                        marginBottom: i < 2 ? 10 : 0,
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>&bull;</span>
                      {time}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <h5
                className="fw-bolder text-white d-flex align-items-center mb-4"
                style={{ fontSize: '0.95rem' }}
              >
                Useful Links
                <span
                  className="ms-3 flex-grow-1"
                  style={{ display: 'block', height: 2, background: '#e61b50' }}
                />
              </h5>
              <ul className="list-unstyled mb-0">
                {usefulLinks.map((link) => (
                  <li key={link} className="mb-2">
                    <Link
                      to={getFooterPath(link)}
                      className="d-flex w-100 align-items-center gap-2 text-decoration-none footer-link"
                      style={{ color: '#94a3b8', fontSize: '0.875rem' }}
                    >
                      <FaAngleDoubleRight
                        style={{ color: '#e61b50', fontSize: '0.65rem', flexShrink: 0 }}
                      />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <h5
                className="fw-bolder text-white d-flex align-items-center mb-4"
                style={{ fontSize: '0.95rem' }}
              >
                What We Do
                <span
                  className="ms-3 flex-grow-1"
                  style={{ display: 'block', height: 2, background: '#e61b50' }}
                />
              </h5>
              <ul className="list-unstyled mb-0">
                {whatWeDo.map((item) => (
                  <li key={item} className="mb-2">
                    <Link
                      to={getFooterPath(item)}
                      className="d-flex w-100 align-items-center gap-2 text-decoration-none"
                      style={{ color: '#94a3b8', fontSize: '0.875rem' }}
                    >
                      <FaAngleDoubleRight
                        style={{ color: '#e61b50', fontSize: '0.65rem', flexShrink: 0 }}
                      />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <h5
                className="fw-bolder text-white d-flex align-items-center mb-4"
                style={{ fontSize: '0.95rem' }}
              >
                Recent Post
                <span
                  className="ms-3 flex-grow-1"
                  style={{ display: 'block', height: 2, background: '#e61b50' }}
                />
              </h5>
              <ul className="list-unstyled mb-0">
                {recentPosts.map((post, i) => (
                  <li
                    key={post.title}
                    className={`d-flex gap-3 align-items-start${i < recentPosts.length - 1 ? ' mb-4' : ''}`}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: 60, height: 60, objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div>
                      <p
                        className="mb-1 fw-bold text-uppercase"
                        style={{
                          color: '#e61b50',
                          fontSize: '0.65rem',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {post.category}
                      </p>
                      <Link
                        to={getPagePath(post.pageId)}
                        className="text-start text-decoration-none"
                        style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.45 }}
                      >
                        {post.title}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 py-4">
            <p className="mb-0" style={{ color: '#64748b', fontSize: '0.875rem' }}>
              &copy;{' '}
              <Link
                to={getPagePath('home')}
                className="text-decoration-none fw-semibold"
                style={{ color: '#e61b50' }}
              >
                Torado
              </Link>{' '}
              is Proudly Owned by{' '}
              <Link
                to={getPagePath('about')}
                className="text-decoration-none fw-semibold"
                style={{ color: '#e61b50' }}
              >
                EnvyTheme
              </Link>
            </p>
            <div className="d-flex align-items-center gap-3" style={{ fontSize: '0.875rem' }}>
              <Link
                to={getPagePath('contact')}
                className="text-decoration-none"
                style={{ color: '#64748b' }}
              >
                Terms &amp; Conditions
              </Link>
              <span style={{ color: '#334155' }}>|</span>
              <Link
                to={getPagePath('contact')}
                className="text-decoration-none"
                style={{ color: '#64748b' }}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className="btn d-flex align-items-center justify-content-center rounded-circle shadow"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          background: '#e61b50',
          border: 'none',
          color: '#fff',
          zIndex: 50,
        }}
        aria-label="Scroll to top"
      >
        <FaArrowUp style={{ fontSize: '0.75rem' }} />
      </button>
    </>
  )
}

export default Footer
