import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const STATUS_STYLES = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
}

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${color}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-3 text-4xl font-extrabold text-slate-900">{value ?? '—'}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  )
}

function AdminDashboard() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const adminFetch = useCallback(
    async (path, options = {}) => {
      const res = await fetch(buildApiUrl(path), {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401 || res.status === 403) {
        clearAuth()
        navigate('/admin/login', { replace: true })
        throw new Error('Session expired.')
      }
      if (!res.ok) throw new Error(data.message || 'Request failed.')
      return data
    },
    [navigate, token],
  )

  const loadStats = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch('/api/admin/stats')
      setStats(data?.data || null)
    } catch (err) {
      setError(err.message || 'Failed to load stats.')
    } finally {
      setLoading(false)
    }
  }, [adminFetch])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  const totals = stats?.totals || {}
  const latestUsers = Array.isArray(stats?.latestUsers) ? stats.latestUsers : []
  const latestContacts = Array.isArray(stats?.latestContacts) ? stats.latestContacts : []

  return (
    <section className="space-y-6">

      {/* Page Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Overview of your website data.</p>
          </div>
          <button
            type="button"
            onClick={loadStats}
            disabled={loading}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Stat Cards */}
      {loading && !stats ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Total Users"
            value={totals.users}
            sub={`${totals.admins ?? 0} admin${totals.admins === 1 ? '' : 's'}`}
            color="border-indigo-100 bg-indigo-50"
            icon="👤"
          />
          <StatCard
            label="Total Contacts"
            value={totals.contacts}
            sub="All submitted messages"
            color="border-rose-100 bg-rose-50"
            icon="📬"
          />
          <StatCard
            label="New Messages"
            value={totals.newContacts}
            sub="Awaiting response"
            color="border-blue-100 bg-blue-50"
            icon="🆕"
          />
          <StatCard
            label="In Progress"
            value={totals.inProgressContacts}
            sub="Currently being handled"
            color="border-amber-100 bg-amber-50"
            icon="⏳"
          />
          <StatCard
            label="Resolved"
            value={totals.resolvedContacts}
            sub="Closed messages"
            color="border-emerald-100 bg-emerald-50"
            icon="✅"
          />
          <StatCard
            label="Admin Users"
            value={totals.admins}
            sub={`Out of ${totals.users ?? 0} total users`}
            color="border-slate-200 bg-slate-50"
            icon="🛡️"
          />
        </div>
      )}

      {/* Quick Links */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { to: '/admin/blogs', label: 'Manage Blogs', icon: '📝', color: 'hover:border-indigo-300 hover:bg-indigo-50' },
          { to: '/admin/teams', label: 'Manage Team', icon: '👥', color: 'hover:border-rose-300 hover:bg-rose-50' },
          { to: '/admin/services', label: 'Manage Services', icon: '⚙️', color: 'hover:border-amber-300 hover:bg-amber-50' },
          { to: '/admin/contacts', label: 'View Contacts', icon: '📬', color: 'hover:border-blue-300 hover:bg-blue-50' },
          { to: '/admin/users', label: 'Manage Users', icon: '👤', color: 'hover:border-emerald-300 hover:bg-emerald-50' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 no-underline shadow-sm transition ${item.color}`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Latest Users + Latest Contacts */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Latest Users */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Latest Users</h2>
            <Link to="/admin/users" className="text-xs font-semibold text-indigo-600 no-underline hover:text-indigo-800">
              View All →
            </Link>
          </div>

          {loading && !stats ? (
            <div className="space-y-3 p-5">
              {[...Array(5)].map((_, i) => <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-100" />)}
            </div>
          ) : latestUsers.length === 0 ? (
            <p className="p-5 text-sm text-slate-500">No users yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {latestUsers.map((user) => (
                <li key={user._id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                    {(user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    user.isAdmin ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Latest Contacts */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Latest Messages</h2>
            <Link to="/admin/contacts" className="text-xs font-semibold text-indigo-600 no-underline hover:text-indigo-800">
              View All →
            </Link>
          </div>

          {loading && !stats ? (
            <div className="space-y-3 p-5">
              {[...Array(5)].map((_, i) => <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-100" />)}
            </div>
          ) : latestContacts.length === 0 ? (
            <p className="p-5 text-sm text-slate-500">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {latestContacts.map((contact) => (
                <li key={contact._id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                    {(contact.name || 'C').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{contact.name}</p>
                    <p className="truncate text-xs text-slate-500">{contact.subject || contact.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLES[contact.status] || 'bg-slate-100 text-slate-600'}`}>
                    {(contact.status || 'new').replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </section>
  )
}

export default AdminDashboard