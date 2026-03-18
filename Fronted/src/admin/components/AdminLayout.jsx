import React, { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearAuth, getStoredUser } from '../../utils/auth'

function AdminLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = useMemo(() => getStoredUser(), [])

  const handleLogout = () => {
    clearAuth()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-xl lg:hidden"
              aria-label="Toggle sidebar"
            >
              ?
            </button>
            <Link to="/admin" className="text-lg font-bold text-slate-900 no-underline">
              Torado Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:inline">{user?.email || 'Admin'}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-6 mt-16 lg:mt-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</p>
          </div>

          <nav className="space-y-2">
            <NavLink
              end
              to="/admin"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium no-underline ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </NavLink>
          </nav>
        </aside>

        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        ) : null}

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
