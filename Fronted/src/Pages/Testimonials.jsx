import React from 'react'
import heroImg from '../assets/Image/service-bg.jpg'
import img1 from '../assets/Image/team1.jpg'
import img2 from '../assets/Image/team2.jpg'
import img3 from '../assets/Image/team3.jpg'
import { Link } from 'react-router-dom'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

function Testimonials({ pageTitle = 'Testimonials' }) {
  const testimonials = [
    {
      name: 'Aurel Beniamin',
      role: 'Company Manager',
      image: img1,
    },
    {
      name: 'Emma Charlotte',
      role: 'Company Manager',
      image: img2,
    },
    {
      name: 'Sophia Isabella',
      role: 'Company Manager',
      image: img3,
    },
    {
      name: 'Sophia Isabella',
      role: 'Company Manager',
      image: img3,
    },
    {
      name: 'Sophia Isabella',
      role: 'Company Manager',
      image: img3,
    },
    {
      name: 'Sophia Isabella',
      role: 'Company Manager',
      image: img3,
    },
  ]

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[2rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[8rem]">
              TESTIMONIALS
            </span>

            <div className="relative z-10">
              <p className="mb-4 flex items-center gap-2 text-base">
                <Link to="/" className="text-slate-300 no-underline hover:text-white">
                  Home
                </Link>
                <span className="text-sm text-slate-400">|</span>
                <span className="font-medium text-red-500">{pageTitle}</span>
              </p>

              <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-6xl">
                {pageTitle}
              </h1>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden">
            <img
              src={heroImg}
              alt="Testimonials background"
              className="block h-full w-full object-cover object-top"
            />
            <div
              className="absolute left-0 top-0 z-10 h-0 w-0"
              style={{
                borderStyle: 'solid',
                borderWidth: '430px 0 0 200px',
                borderColor: 'transparent transparent transparent #0d1e35',
              }}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={index}
              className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <FaQuoteLeft className="text-4xl text-green-300 md:text-5xl" />
                <div className="flex gap-1 text-sm text-yellow-400 md:text-base">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar key={starIndex} />
                  ))}
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-gray-600 md:mb-10">
                Nullam tinci dunt augue eget dui volu tpatvit Duis urna lacus, efficitur non.
                Tempor incididu aliquet enim dolor voluptate.
              </p>

              <div className="relative mt-auto flex items-center gap-4 rounded-lg border border-gray-200 p-5">
                <div className="absolute -top-[7px] left-12 h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white"></div>
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h4 className="text-lg font-bold text-[#0f1f3c]">{item.name}</h4>
                  <p className="text-gray-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Testimonials
