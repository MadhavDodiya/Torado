import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaChartLine,
  FaCogs,
  FaHandshake,
  FaLightbulb,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaHeadset,
  FaPuzzlePiece,
} from 'react-icons/fa'
import heroImg from '../assets/Image/service-bg.jpg'
import service1 from '../assets/Image/service1.jpg'
import service2 from '../assets/Image/service2.jpg'
import service3 from '../assets/Image/service3.jpg'
import service4 from '../assets/Image/service4.jpg'
import service5 from '../assets/Image/service5.jpg'

const serviceGrowth = [
  {
    title: 'Business Tax Reforms',
    description:
      'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
    image: service3,
    icon: <FaLightbulb />,
  },
  {
    title: 'Process Development',
    description:
      'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
    image: service4,
    icon: <FaCogs />,
  },
  {
    title: 'Manage Investment',
    description:
      'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
    image: service5,
    icon: <FaChartLine />,
  },
  {
    title: 'Financial Growth Planning',
    description:
      'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
    image: service1,
    icon: <FaHandshake />,
  },
  {
    title: 'Business Tax Reforms',
    description:
      'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
    image: service3,
    icon: <FaLightbulb />,
  },
  {
    title: 'Process Development',
    description:
      'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
    image: service2,
    icon: <FaCogs />,
  },
]

const steps = [
  {
    icon: <FaHeadset size={28} />,
    title: 'Our Consultation',
    desc: 'Praesent sed erat cursus leifend mi vitae lacinia ullamcorp ligulaat augue vulputate.',
  },
  {
    icon: <FaPuzzlePiece size={28} />,
    title: 'Perfect Solutions',
    desc: 'Praesent sed erat cursus leifend mi vitae lacinia ullamcorp ligulaat augue vulputate.',
  },
  {
    icon: <FaChartLine size={28} />,
    title: 'Business Growth',
    desc: 'Praesent sed erat cursus leifend mi vitae lacinia ullamcorp ligulaat augue vulputate.',
  },
]

function Service({ pageTitle = 'Our Services' }) {
  const navigate = useNavigate()

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[430px]">

          {/* ── LEFT SIDE ── */}
          <div className="relative bg-[#0d1e35] flex items-center px-10 lg:px-16 py-20 overflow-hidden">

            {/* Watermark */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] lg:text-[9rem] font-black text-white/[0.06] uppercase tracking-widest pointer-events-none select-none whitespace-nowrap z-0">
              Service
            </span>

            {/* Content */}
            <div className="relative z-10">
              {/* Breadcrumb */}
              <p className="flex items-center gap-2 text-base mb-4">
                <Link to="/" className="text-slate-300 no-underline hover:text-white">
                  Home
                </Link>
                <span className="text-slate-400 text-sm">|</span>
                <span className="text-red-500 font-medium">{pageTitle}</span>
              </p>

              {/* Heading */}
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* ── RIGHT SIDE IMAGE ── */}
          <div className="relative overflow-hidden min-h-[300px]">

            {/* Hero Image — right aligned */}
            <img
              src={heroImg}
              alt="Team working together"
              className="block ml-auto h-full w-full object-cover object-top"
            />

            {/* CSS Triangle — navy wedge over left edge of image */}
            <div
              className="absolute top-0 left-0 z-10 w-0 h-0"
              style={{
                borderStyle: 'solid',
                borderWidth: '430px 0 0 200px',
                borderColor: 'transparent transparent transparent #0d1e35',
              }}
            />
          </div>

        </div>
      </section>

      <section className="service-growth-section">
        <div className="service-growth-container">
          <div className="service-growth-heading">
            <p>WHAT WE PROVIDES</p>
            <h2>
              Get Exceptional Service
              <br />
              For Growth
            </h2>
          </div>

          <div className="service-growth-grid">
            {serviceGrowth.map((item, index) => (
              <article key={`${item.title}-${index}`} className="service-growth-grid-item">
                <div
                  className="service-growth-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate('/service-detail', { state: { service: item } })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigate('/service-detail', { state: { service: item } })
                    }
                  }}
                >
                  <img src={item.image} alt={item.title} className="service-growth-image" />
                  <div className="service-growth-icon">{item.icon}</div>
                  <div className="service-growth-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link to="/service-detail" state={{ service: item }}>Read More -&gt;</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="service-growth-footer">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.
            <Link to="/services" className="service-growth-footer-link">
              View All Services -&gt;
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center py-12">
        <nav aria-label="Service pagination" className="flex items-center gap-4 sm:gap-6">
          <button type="button" aria-label="Previous page" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex items-center justify-center text-red-500 text-lg sm:text-xl hover:bg-gray-300 transition">
            <FaArrowLeft />
          </button>

          {['01', '02', '03'].map((page) => {
            const isActive = page === '01'
            return (
              <button key={page} type="button" aria-current={isActive ? 'page' : undefined} className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full text-xl font-semibold flex items-center justify-center transition ${isActive ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}>
                {page}
              </button>)
          })}

          <button type="button" aria-label="Next page" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full  bg-gray-200 flex items-center justify-center text-red-500 text-lg sm:text-xl hover:bg-gray-300 transition">
            <FaArrowRight />
          </button>
        </nav>
      </div>

      <section className="relative w-full h-[500px] flex items-center justify-center text-center overflow-hidden">

        {/* Background Image */}
        <img
          src={heroImg}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0b2545]/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6 text-white">

          {/* Play Button */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              aria-label="Play video"
              className="inline-flex items-center justify-center bg-red-500 text-white shadow-lg transition hover:scale-105"
              style={{
                width: '80px',
                height: '80px',
                minWidth: '80px',
                minHeight: '80px',
                padding: 0,
                borderRadius: '50%',
                lineHeight: 1,
              }}
            >
              <FaPlay className="text-2xl leading-none" />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-red-500 tracking-widest font-semibold mb-4 flex items-center justify-center gap-3">
            GLOBALY RENOWNED & TRUSTED
            <span className="w-10 h-[2px] bg-red-500"></span>
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            We Deliver Solution With <br /> The Goal Of
          </h1>

          {/* Button */}
          <Link
            to="/contact"
            className="inline-block no-underline bg-red-500 hover:bg-red-600 text-white px-8 py-4 font-semibold rounded-md transition"
          >
            CONTACT US
          </Link>

        </div>

        {/* Left Arrow Decoration */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 text-red-500 text-4xl font-bold hidden lg:block">
          &gt;&gt;&gt;
        </div>

      </section>

      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* Title */}
          <p className="text-red-500 font-semibold tracking-widest mb-3">
            PROCESS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 leading-tight">
            We Follow Some Easy Steps <br />
            To Developed Projects
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-12">

            {steps.map((step, index) => (
              <div key={index} className="text-center flex flex-col items-center">

                {/* Zigzag */}
                <div className="text-red-400 text-xl mb-3">
                  ~~~~~
                </div>

                {/* Icon Circle */}
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg mb-6">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 max-w-xs">
                  {step.desc}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

    </>
  )
}

export default Service
