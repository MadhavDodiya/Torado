import React from 'react'
import heroImg from '../assets/Image/service-bg.jpg'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import team1 from '../assets/Image/team1.jpg'
import team2 from '../assets/Image/team2.jpg'
import team3 from '../assets/Image/team3.jpg'
import team4 from '../assets/Image/team4.jpg'

function Teams({ pageTitle = 'Team' }) {
  const members = [
    { name: 'William Benjamin', role: 'Financial Advisor', img: team1 },
    { name: 'Sophia Isabella', role: 'Financial Head', img: team2 },
    { name: 'Michael Pluim', role: 'Head Office Manager', img: team3 },
    { name: 'Charlotte Allen', role: 'Account Manager', img: team4 },
    { name: 'Daniel Morgan', role: 'Investment Strategist', img: team1 },
    { name: 'Emma Collins', role: 'Risk Consultant', img: team2 },
  ]

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[2rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[7rem]">
              TEAM
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
            <img src={heroImg} alt="Team background" className="block h-full w-full object-cover object-top" />
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

      <section className="bg-[#f6f6f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 flex items-center justify-center gap-3 font-semibold tracking-widest text-red-500">
              OUR TEAM
              <span className="h-[2px] w-10 bg-red-500"></span>
            </p>
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Meet Our Team Member</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article key={member.name} className="h-full rounded-lg bg-white p-6 shadow transition duration-300 hover:shadow-xl">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img src={member.img} alt={member.name} className="h-[260px] w-full object-cover" />
                  <div
                    className="absolute bottom-0 left-0 h-16 w-full bg-white"
                    style={{ clipPath: 'polygon(0 50%,100% 0,100% 100%,0 100%)' }}
                  ></div>
                </div>

                <h3 className="mb-1 text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mb-6 text-sm text-gray-500">{member.role}</p>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-500 hover:text-white">
                    <FaFacebookF />
                  </div>
                  <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-500 hover:text-white">
                    <FaTwitter />
                  </div>
                  <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-500 hover:text-white">
                    <FaInstagram />
                  </div>
                  <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-500 hover:text-white">
                    <FaLinkedinIn />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Teams
