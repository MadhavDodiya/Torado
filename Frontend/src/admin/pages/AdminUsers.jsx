import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../utils/api'
import { clearAuth, getStoredUser } from '../../utils/auth'

function AdminUsers() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''
  const currentUser = getStoredUser()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const limit = 10
  const [deleteId, setDeleteId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const adminFetch = useCallback(
    async (path, options = {}) => {
      const res = await fetch(buildApiUrl(path), {
        ...options,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401 || res.status === 403) { clearAuth(); navigate('/admin/login', { replace: true }); throw new Error('Session expired.') }
      if (!res.ok) throw new Error(data.message || 'Request failed.')
      return data
    },
    [navigate, token],
  )

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page, limit, role: roleFilter })
      if (searchQuery) params.set('q', searchQuery)
      const data = await adminFetch(`/api/admin/users?${params.toString()}`)
      setUsers(Array.isArray(data?.data) ? data.data : [])
      setTotal(data?.pagination?.total || 0)
    } catch (err) {
      setError(err.message || 'Failed to load users.')
    } finally {
      setLoading(false)
    }
  }, [adminFetch, page, roleFilter, searchQuery])

  useEffect(() => { loadUsers() }, [loadUsers])

  const handleDelete = async (id) => {
    setDeleteLoading(true)
    try {
      await adminFetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      setSuccessMessage('User deleted successfully.')
      await loadUsers()
    } catch (err) {
      setError(err.message || 'Delete failed.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">User Management</h1>
        <p className="mt-1 text-sm text-slate-500">Total: {total} users</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
          placeholder="Search name or email..."
          className="flex-1 min-w-[200px] rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin Only</option>
          <option value="user">Users Only</option>
        </select>
        <button type="button" onClick={loadUsers} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          SEARCH
        </button>
      </div>

      {successMessage && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">{successMessage}</p>
      )}

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? <p className="p-6 text-sm text-slate-500">Loading users...</p>
          : error ? <p className="p-6 text-sm font-medium text-red-600">{error}</p>
          : users.length === 0 ? <p className="p-6 text-sm text-slate-500">No users found.</p>
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">User</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Joined</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => {
                    const isSelf = currentUser?.id === user._id
                    return (
                      <tr key={user._id} className="transition hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                              {(user.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-slate-900">{user.name}</span>
                            {isSelf && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">YOU</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.isAdmin ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-4 py-3">
                          {isSelf ? (
                            <span className="text-xs text-slate-400">Cannot delete yourself</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteId(user._id)}
                              className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                            >
                              DELETE
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold disabled:opacity-40">PREV</button>
              <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold disabled:opacity-40">NEXT</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Delete User?</h3>
            <p className="mt-2 text-sm text-slate-600">This action cannot be undone. The user will lose access permanently.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => handleDelete(deleteId)} disabled={deleteLoading} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{deleteLoading ? 'DELETING...' : 'DELETE'}</button>
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminUsers