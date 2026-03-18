import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API_BASE_URL } from '../utils/api'
import { clearAuth } from '../utils/auth'

function AdminPanel() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ totals: { users: 0, contacts: 0 }, latestUsers: [], latestContacts: [] })
  const [users, setUsers] = useState([])
  const [contacts, setContacts] = useState([])

  const fetchAdminData = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError('')
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const [statsRes, usersRes, contactsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/stats`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/contacts`, { headers }),
      ])

      const [statsData, usersData, contactsData] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        contactsRes.json(),
      ])

      if (!statsRes.ok || !usersRes.ok || !contactsRes.ok) {
        const message =
          statsData.message || usersData.message || contactsData.message || 'Failed to load admin data'
        throw new Error(message)
      }

      setStats(statsData.data)
      setUsers(usersData.data || [])
      setContacts(contactsData.data || [])
    } catch (err) {
      setError(err.message || 'Something went wrong')
      if ((err.message || '').toLowerCase().includes('not authorized')) {
        clearAuth()
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token')
    if (!token) return

    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user')
      }

      setUsers((prev) => prev.filter((u) => u._id !== userId))
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <section className="min-h-[75vh] bg-[#f4f7fb] px-4 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-2xl bg-[#0b2344] p-5 text-white shadow-lg">
          <h2 className="text-xl font-extrabold">Admin Panel</h2>
          <p className="mt-1 text-sm text-slate-200">Manage your platform data</p>

          <div className="mt-6 space-y-2">
            <button type="button" onClick={() => setActiveTab('overview')} className={`w-full rounded-md px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'overview' ? 'bg-[#f00455]' : 'bg-white/10 hover:bg-white/20'}`}>
              Overview
            </button>
            <button type="button" onClick={() => setActiveTab('users')} className={`w-full rounded-md px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'users' ? 'bg-[#f00455]' : 'bg-white/10 hover:bg-white/20'}`}>
              Users
            </button>
            <button type="button" onClick={() => setActiveTab('contacts')} className={`w-full rounded-md px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'contacts' ? 'bg-[#f00455]' : 'bg-white/10 hover:bg-white/20'}`}>
              Contacts
            </button>
          </div>

          <button type="button" onClick={handleLogout} className="mt-8 w-full rounded-md bg-[#f00455] px-4 py-3 text-sm font-bold uppercase tracking-wide transition hover:bg-[#d30049]">
            Logout
          </button>
        </aside>

        <main className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-extrabold text-[#0d1e35]">Admin Dashboard</h1>
            <button type="button" onClick={fetchAdminData} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Refresh
            </button>
          </div>

          {loading ? <p className="text-slate-600">Loading admin data...</p> : null}
          {error ? <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}

          {!loading && !error && activeTab === 'overview' ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Total Users</p>
                  <p className="mt-2 text-3xl font-black text-[#0d1e35]">{stats.totals.users}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Total Contacts</p>
                  <p className="mt-2 text-3xl font-black text-[#0d1e35]">{stats.totals.contacts}</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="text-lg font-bold text-[#0d1e35]">Latest Users</h3>
                  <div className="mt-3 space-y-2">
                    {stats.latestUsers.length ? stats.latestUsers.map((item) => (
                      <div key={item._id} className="rounded-md bg-slate-50 px-3 py-2">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-sm text-slate-600">{item.email}</p>
                      </div>
                    )) : <p className="text-sm text-slate-500">No users yet.</p>}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="text-lg font-bold text-[#0d1e35]">Latest Contacts</h3>
                  <div className="mt-3 space-y-2">
                    {stats.latestContacts.length ? stats.latestContacts.map((item) => (
                      <div key={item._id} className="rounded-md bg-slate-50 px-3 py-2">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-sm text-slate-600">{item.email}</p>
                      </div>
                    )) : <p className="text-sm text-slate-500">No contacts yet.</p>}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {!loading && !error && activeTab === 'users' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">Email</th>
                    <th className="px-4 py-3 font-bold">Role</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length ? users.map((user) => (
                    <tr key={user._id} className="border-t border-slate-100">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.isAdmin ? 'Admin' : 'User'}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user._id)}
                          className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-slate-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : null}

          {!loading && !error && activeTab === 'contacts' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">Email</th>
                    <th className="px-4 py-3 font-bold">Phone</th>
                    <th className="px-4 py-3 font-bold">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length ? contacts.map((contact) => (
                    <tr key={contact._id} className="border-t border-slate-100">
                      <td className="px-4 py-3">{contact.name}</td>
                      <td className="px-4 py-3">{contact.email}</td>
                      <td className="px-4 py-3">{contact.phone || '-'}</td>
                      <td className="px-4 py-3">{contact.subject || '-'}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-slate-500">No contacts found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : null}
        </main>
      </div>
    </section>
  )
}

export default AdminPanel
