import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import heroImg from '../assets/Image/service-bg.jpg'
import service1 from '../assets/Image/imgi_19_service1.png'
import service2 from '../assets/Image/service-details2.jpg'

function ServiceDetail({ pageTitle = 'Service Detail' }) {

  const categories = [
    "Financial Analysis",
    "Taxation Planning",
    "Investment Trading",
    "Wealth Marketing",
    "Planning Strategies",
  ];

  const features = [
    "Get Your Final Result",
    "Project Monitoring",
    "Core Project Monitoring",
  ];

  const strategies = [
    "Pras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. wsit amet neque auctor ornare justouis dictum ex accumsan eleifend.",
    "Pras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. wsit amet neque auctor ornare justouis dictum ex accumsan eleifend.",
  ];

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[430px]">

          {/* ── LEFT SIDE ── */}
          <div className="relative bg-[#0d1e35] flex items-center px-10 lg:px-16 py-20 overflow-hidden">

            {/* Watermark */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] lg:text-[4rem] font-black text-white/6 uppercase tracking-widest pointer-events-none select-none whitespace-nowrap z-0">
              Service Detail
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
            <img src={heroImg} alt="Team working together" className="block ml-auto h-full w-full object-cover object-top" />

            {/* CSS Triangle — navy wedge over left edge of image */}
            <div className="absolute top-0 left-0 z-10 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '430px 0 0 200px', borderColor: 'transparent transparent transparent #0d1e35', }} />
          </div>

        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-12">

            {/* Business Tax Reforms */}
            <div>
              <h2 className="text-4xl font-bold text-[#0f1f3d] mb-6">
                Business Tax Reforms
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla, non lacinia urna. Donec sit amet neque auctor, ornare dui rutrum, condimentum justo. Duis dictum, ex accumsan eleifend eleifen ex justo aliquam nunc, in ultrices ante quam eget massa. Sed scelerisque, odio eu tempor pulvinar magna tortor finibus lorem, ut mattis tellus nunc ut quam. Curabitur quis ornare leo. Suspendisse bibendum nibh non turpis vestibulum pellentesque consectetur adipisci lorem ipsum dolor sit amet.
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla, non lacinia urnaone csit amet neque auctor, ornare dui rutrum, condimentum justouis dictum ex accumsan eleifend.
              </p>

              <img src={service1} alt="business" className="rounded-lg w-full object-cover" />
            </div>


            {/* Manage Business Solutions */}
            <div>
              <h2 className="text-3xl font-bold text-[#0f1f3d] mb-4">
                Manage Business Solutions
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros.
              </p>

              <div className="grid md:grid-cols-2 gap-8 items-start">

                <img src={service2} alt="meeting" className="rounded-lg w-full object-cover" />

                <div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Cras enim urna, interdum nec porttitor vitaesocit eui eros.
                  </p>

                  <div className="space-y-4">
                    {features.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#f4e3e5] p-4 rounded-md">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-gray-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <p className="text-gray-600 leading-relaxed mt-8">
                Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros.
              </p>
            </div>


            {/* Digital Service strategy */}
            <div>

              <h2 className="text-3xl font-bold text-[#0f1f3d] mb-4">
                Digital Service strategy
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                Cras enim urna, interdum nec porttitor vitae.
              </p>

              <div className="space-y-4">
                {strategies.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">

                    <div className="bg-red-500 text-white p-3 rounded-md">
                      <FiArrowRight />
                    </div>

                    <p className="text-gray-600 leading-relaxed">{item}</p>

                  </div>
                ))}
              </div>

              <h2>
                Outsourced Consulting Business
              </h2>

              <p>
                Nras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla, non lacinia urna. Donec sit amet neque auctor, ornare dui rutrum, condimentum justo. Duis dictum, ex accumsan eleifend eleifen ex justo aliquam nunc, in ultrices ante quam eget massa. Sed scelerisque, odio eu tempor pulvinar magna tortor finibus lorem, ut mattis tellus nunc ut quam. Curabitur quis ornare leo. Suspendisse bibendum nibh non turpis vestibulum pellentesque consectetur adipisci lorem ipsum dolor sit amet.
              </p>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">

            {/* SEARCH */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <input type="text" placeholder="Search Here" className="flex-1 outline-none text-gray-600" />
              <button className="bg-red-500 p-3 rounded text-white">
                <FiSearch />
              </button>
            </div>

            {/* CATEGORY */}
            <div className="bg-white rounded-lg p-6 shadow-sm relative">

              <div className="absolute left-0 top-6 h-8 w-1 bg-red-500"></div>

              <h3 className="text-xl font-bold text-[#0f1f3d] mb-6 ml-3">
                Category
              </h3>

              <div className="space-y-4">
                {categories.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md hover:bg-gray-200">
                    <span className="text-gray-700">{item}</span>
                    <FiArrowRight className="text-red-500" />
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>



    </>
  )
}

export default ServiceDetail
