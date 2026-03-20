import React, { useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearAuth, getStoredUser } from '../../utils/auth'

const DATA_SECTIONS = [
  { path: '/admin/blogs', label: 'Blogs', icon: '📝' },
  { path: '/admin/teams', label: 'Team', icon: '👥' },
  { path: '/admin/services', label: 'Services', icon: '⚙️' },
  { path: '/admin/contacts', label: 'Contacts', icon: '📬' },
  { path: '/admin/users', label: 'Users', icon: '👤' },
]

function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = useMemo(() => getStoredUser(), [])

  const handleLogout = () => {
    clearAuth()
    navigate('/admin/login')
  }

  const navLinkClass = (active) =>
    `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition ${
      active
        ? 'bg-indigo-600 text-white shadow-[0_10px_24px_rgba(79,70,229,0.28)]'
        : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
    }`

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fef3f2,_#eef2ff_40%,_#f8fafc_75%)] text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300/90 bg-white text-lg text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <Link to="/admin" className="flex items-center gap-2 text-slate-900 no-underline">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">T</span>
              <span className="text-base font-extrabold tracking-tight sm:text-lg">Torado Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 sm:flex">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold uppercase text-white">
                {(user?.name || 'A').slice(0, 1)}
              </span>
              <span className="max-w-[220px] truncate text-sm font-medium text-slate-600">{user?.email || 'admin@torado.com'}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200/80 bg-white/95 px-4 py-5 shadow-xl backdrop-blur-md transition-transform duration-200 overflow-y-auto lg:static lg:translate-x-0 lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-6 mt-16 rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-indigo-50 p-4 lg:mt-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Workspace</p>
            <h2 className="mt-1 text-base font-bold text-slate-900">Admin Control</h2>
            <p className="mt-1 text-xs text-slate-600">Manage all website data from one place.</p>
          </div>

          <nav className="space-y-1">
            {/* Dashboard */}
            <Link
              to="/admin"
              onClick={() => setSidebarOpen(false)}
              className={navLinkClass(location.pathname === '/admin' && !location.search)}
            >
              🏠 Dashboard
            </Link>

            {/* Data Management */}
            <div className="pt-3">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Data Management</p>
              {DATA_SECTIONS.map((section) => (
                <Link
                  key={section.path}
                  to={section.path}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass(location.pathname.startsWith(section.path))}
                >
                  {section.icon} {section.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout