import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { API_BASE_URL } from '../../utils/api'

function AdminRegister() {
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

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Admin registration failed')
      }

      setSuccess('Admin account created. Redirecting to login...')
      setFormData({ name: '', email: '', password: '' })
      setTimeout(() => {
        navigate('/admin/login')
      }, 600)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#0d1e35] px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-extrabold text-[#0d1e35]">Admin Register</h1>
        <p className="mb-6 text-sm text-slate-500">Create admin account for dashboard access</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-[#f00455]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-[#f00455]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-[#f00455]"
              required
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          {success ? <p className="text-sm font-medium text-green-600">{success}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#f00455] px-4 py-3 font-bold text-white hover:bg-[#d30049] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already registered?{' '}
          <Link to="/admin/login" className="font-semibold text-[#f00455] no-underline">
            Admin Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AdminRegister
