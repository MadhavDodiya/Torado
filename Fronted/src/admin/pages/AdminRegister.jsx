import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import usePageContent from '../../hooks/usePageContent'
import { buildApiUrl, getFriendlyApiError } from '../../utils/api'
import { clearAuth, isAdminUser, isLoggedIn } from '../../utils/auth'

const defaultContent = {
  pageTitle: 'Admin Register',
  subtitle: 'Create admin account for dashboard access',
  nameLabel: 'Full Name',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitButtonText: 'REGISTER',
  loginPrompt: 'Already registered?',
  loginLinkText: 'Admin Login',
}

function AdminRegister() {
  const navigate = useNavigate()
  const content = usePageContent('admin-register', defaultContent)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isLoggedIn() && isAdminUser()) {
      navigate('/admin', { replace: true })
      return
    }

    if (isLoggedIn() && !isAdminUser()) {
      clearAuth()
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
      const response = await fetch(buildApiUrl('/api/auth/admin/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Admin registration failed')
      }

      if (data?.token && data?.user) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      setSuccess('Admin account ready. Redirecting to dashboard...')
      setFormData({ name: '', email: '', password: '' })
      setTimeout(() => {
        navigate('/admin', { replace: true })
      }, 500)
    } catch (err) {
      setError(getFriendlyApiError(err, 'Admin registration failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_#fce7f3,_#ede9fe_45%,_#f8fafc_90%)] px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-rose-300/40 blur-3xl"></div>
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-md rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-2xl backdrop-blur">
        <h1 className="mb-2 text-3xl font-extrabold text-[#0d1e35]">
          {content.pageTitle || defaultContent.pageTitle}
        </h1>
        <p className="mb-6 text-sm text-slate-500">{content.subtitle || defaultContent.subtitle}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              {content.nameLabel || defaultContent.nameLabel}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              {content.emailLabel || defaultContent.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              {content.passwordLabel || defaultContent.passwordLabel}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              required
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          {success ? <p className="text-sm font-medium text-green-600">{success}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rose-600 px-4 py-3 font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'REGISTERING...' : content.submitButtonText || defaultContent.submitButtonText}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          {content.loginPrompt || defaultContent.loginPrompt}{' '}
          <Link to="/admin/login" className="font-semibold text-rose-600 no-underline hover:text-rose-700">
            {content.loginLinkText || defaultContent.loginLinkText}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AdminRegister
