import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { clearAuth, getStoredUser } from '../utils/auth'

function Dashboard() {
  const navigate = useNavigate()
  const user = getStoredUser()

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <section className="min-h-[70vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-extrabold text-[#0d1e35] md:text-4xl">Dashboard</h1>
        <p className="mt-3 text-base text-slate-600">
          Welcome{user?.name ? `, ${user.name}` : ''}. You are logged in.
        </p>
        <div className="mt-8">
          {user?.isAdmin ? (
            <Link
              to="/admin"
              className="mr-3 inline-flex rounded-md bg-[#0b2344] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white no-underline transition hover:bg-[#14345f]"
            >
              Admin Panel
            </Link>
          ) : null}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-[#f00455] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#d30049]"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
