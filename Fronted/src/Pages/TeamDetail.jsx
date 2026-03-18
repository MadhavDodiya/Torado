import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'
import team2 from '../assets/Image/team2.jpg'
import usePageContent from '../hooks/usePageContent'

const skills = [
  { name: 'Tecnology', value: 90 },
  { name: 'Marketing', value: 80 },
  { name: 'Business', value: 75 },
]

const defaultContent = {
  pageTitle: 'Team Detail',
}

function TeamDetail() {
  const content = usePageContent('team-detail', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  let location = useLocation()
  let selectedMember = location.state?.member ?? {
    name: 'Emma Charlotte',
    role: 'Financial Head',
    img: team2,
  }

  return (
    <>
      <section className="bg-[#0d1e35] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-extrabold text-white">{pageTitle}</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] px-4 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="w-full">
            <img
              src={selectedMember.img}
              alt={selectedMember.name}
              className="h-[400px] w-full rounded-lg object-cover shadow-md lg:h-[500px]"
            />
          </div>

          <div>
            <h2 className="mb-2 text-4xl font-bold text-[#0f172a]">{selectedMember.name}</h2>

            <p className="mb-4 font-medium text-red-500">{selectedMember.role}</p>

            <p className="mb-6 leading-relaxed text-gray-500">
              Pellentesque at posuere tellus. Ut sed dui justo. Phasellus scelerisque
              turpis pulvinar lectus tristique non. Nam laoreet, risus vel laoreet
              laoreet, mauris risus velit id imperdiet ante nisi in ante. Integer
              consectetur in nisi mattis tincidunt.
            </p>

            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-full bg-gray-200 p-3">
                <FaPhoneAlt className="text-gray-700" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#0f172a]">
                  Phone No: (+212)-226-3126
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Pellentesque at posuere tellus. Ut sed dui justo. Phasellus
                  scelerisque pulvinar lectus tristique.
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-full bg-gray-200 p-3">
                <FaEnvelope className="text-gray-700" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#0f172a]">
                  Email: hello@torado.com
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Pellentesque at posuere tellus. Ut sed dui justo. Phasellus
                  scelerisque pulvinar lectus tristique.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition hover:bg-red-500 hover:text-white"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] px-4 py-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_#ccc_1px,_transparent_1px)] opacity-20 [background-size:40px_40px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#0f172a] md:text-4xl">
              Personal Experience
            </h2>

            <p className="text-[15px] leading-relaxed text-gray-500 md:text-base">
              Pellentesque at posuere tellus. Ut sed dui justo. Phasellus
              scelerisque turpis pulvinar lectus tristique non. Nam laoreet,
              risus vel laoreet laoreet, mauris risuspo velit id imperdiet ante
              nisi in ante. Integer consectetur in nisi mattis tincidunton
              lacinia faucibus nunc, vel pellentesque nibh condimentum non.
            </p>
          </div>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold text-[#0f172a]">
                    {skill.name}
                  </span>
                  <span className="font-semibold text-[#0f172a]">
                    {skill.value}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] px-4 py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-200px] top-[50%] h-[500px] w-[500px] rounded-full border border-red-400 opacity-40"></div>
          <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full border border-red-400 opacity-40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-3 font-semibold uppercase tracking-wide text-red-500">
            Contact With Us Now
          </p>

          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#0f172a] md:text-5xl">
            Feel Free to Write Our <br className="hidden md:block" />
            Technology Experts
          </h2>

          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Subject"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Your Phone Number"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <textarea
              rows="5"
              placeholder="Enter Your Message"
              className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                type="submit"
                className="rounded-md bg-red-500 px-8 py-4 font-semibold text-white transition hover:bg-red-600"
              >
                SEND MESSAGE
              </button>

              <button
                type="reset"
                className="rounded-md bg-red-500 px-8 py-4 font-semibold text-white transition hover:bg-red-600"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default TeamDetail
