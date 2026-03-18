import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/Image/service-bg.jpg'
import { API_BASE_URL } from '../utils/api'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: 'Register' }

function Register() {
  const content = usePageContent('register', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/admin')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setSuccess('Registration successful. Please login.')
      setFormData({ name: '', email: '', password: '' })

      setTimeout(() => {
        navigate('/login')
      }, 700)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[360px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[2.5rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[5.5rem]">
              Register
            </span>
            <div className="relative z-10">
              <p className="mb-4 flex items-center gap-2 text-base">
                <Link to="/" className="text-slate-300 no-underline hover:text-white">Home</Link>
                <span className="text-sm text-slate-400">|</span>
                <span className="font-medium text-red-500">{pageTitle}</span>
              </p>
              <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-6xl">{pageTitle}</h1>
            </div>
          </div>
          <div className="relative min-h-[220px] overflow-hidden">
            <img src={heroImg} alt="Register background" className="block h-full w-full object-cover object-top" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-[#0d1e35]">Create Account</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                minLength={6}
                required
              />
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            {success ? <p className="text-sm font-medium text-green-600">{success}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#f00455] px-4 py-3 font-bold text-white transition hover:bg-[#d30049] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-red-500 no-underline hover:text-red-600">Login</Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default Register
