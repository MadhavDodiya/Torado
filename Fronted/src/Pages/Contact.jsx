import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/Image/service-bg.jpg'
import { API_BASE_URL } from '../utils/api'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: 'Contact' }

function Contact() {
  const content = usePageContent('contact', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form')
      }

      setSuccess('Message sent successfully.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
      })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[3rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[7rem]">
              Contact
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
            <img src={heroImg} alt="Contact background" className="block h-full w-full object-cover object-top" />
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

      <section className="relative overflow-hidden px-4 py-20">
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Your Subject"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Your Message"
              className="w-full rounded-md bg-gray-200 px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            {success ? <p className="text-sm font-medium text-green-600">{success}</p> : null}

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-red-500 px-8 py-4 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setFormData({ name: '', email: '', subject: '', phone: '', message: '' })
                  setError('')
                  setSuccess('')
                }}
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

export default Contact
