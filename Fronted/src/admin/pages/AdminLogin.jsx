import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { API_BASE_URL } from '../../utils/api'
import { clearAuth, isAdminUser, isLoggedIn } from '../../utils/auth'

function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
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
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
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
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-extrabold text-white">Admin Login</h1>
        <p className="mb-6 text-sm text-slate-400">Sign in to access admin panel</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-400"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-200">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-slate-400"
              required
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-white px-4 py-3 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin
