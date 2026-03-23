import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import usePageContent from '../../hooks/usePageContent'
import { buildApiUrl, getFriendlyApiError } from '../../utils/api'
import { clearAuth, isAdminUser, isLoggedIn } from '../../utils/auth'

const defaultContent = {
  pageTitle: 'Admin Login',
  subtitle: 'Sign in to access admin panel',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitButtonText: 'LOGIN',
  registerPrompt: 'Admin account nahi hai?',
  registerLinkText: 'Admin Register',
}

function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const content = usePageContent('admin-login', defaultContent)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isLoggedIn() && isAdminUser()) {
      navigate('/admin', { replace: true })
      return
    }

    if (isLoggedIn() && !isAdminUser()) {
      clearAuth()
    }
  }, [navigate])

  useEffect(() => {
    if (location.state?.reason === 'access_denied') {
      setError('Access denied. Only admin users are allowed.')
    }
  }, [location.state])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(buildApiUrl('/api/auth/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Admin login failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (err) {
      setError(getFriendlyApiError(err, 'Admin login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_#1e293b,_#0f172a_45%,_#020617_90%)] px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl"></div>
        <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">
          {content.pageTitle || defaultContent.pageTitle}
        </h1>
        <p className="mb-6 text-sm text-slate-300">{content.subtitle || defaultContent.subtitle}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-200">
              {content.emailLabel || defaultContent.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-slate-200 focus:ring-2 focus:ring-slate-300/30"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-200">
              {content.passwordLabel || defaultContent.passwordLabel}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-slate-200 focus:ring-2 focus:ring-slate-300/30"
              required
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 font-bold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'LOGGING IN...' : content.submitButtonText || defaultContent.submitButtonText}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-300">
          {content.registerPrompt || defaultContent.registerPrompt}{' '}
          <Link to="/admin/register" className="font-semibold text-rose-200 no-underline hover:text-white">
            {content.registerLinkText || defaultContent.registerLinkText}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AdminLogin
