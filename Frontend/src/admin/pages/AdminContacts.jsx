import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const STATUSES = ['new', 'in_progress', 'resolved']

const STATUS_STYLES = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
}

function AdminContacts() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const limit = 10

  const [viewContact, setViewContact] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [actionMessage, setActionMessage] = useState('')

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

  const loadContacts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page, limit, status: statusFilter })
      if (searchQuery) params.set('q', searchQuery)
      const data = await adminFetch(`/api/admin/contacts?${params.toString()}`)
      setContacts(Array.isArray(data?.data) ? data.data : [])
      setTotal(data?.pagination?.total || 0)
    } catch (err) {
      setError(err.message || 'Failed to load contacts.')
    } finally {
      setLoading(false)
    }
  }, [adminFetch, page, statusFilter, searchQuery])

  useEffect(() => { loadContacts() }, [loadContacts])

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    setActionMessage('')
    try {
      await adminFetch(`/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      })
      setActionMessage(`Status updated to "${newStatus}".`)
      await loadContacts()
      if (viewContact?._id === id) {
        setViewContact((prev) => prev ? { ...prev, status: newStatus } : prev)
      }
    } catch (err) {
      setError(err.message || 'Status update failed.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id) => {
    setDeleteLoading(true)
    try {
      await adminFetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      setViewContact(null)
      await loadContacts()
    } catch (err) {
      setError(err.message || 'Delete failed.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Contact Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Total: {total} contacts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
          placeholder="Search name, email, subject..."
          className="flex-1 min-w-[200px] rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        >
          <option value="all">All Status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ').toUpperCase()}</option>)}
        </select>
        <button type="button" onClick={loadContacts} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          SEARCH
        </button>
      </div>

      {actionMessage && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">{actionMessage}</p>
      )}

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? <p className="p-6 text-sm text-slate-500">Loading contacts...</p>
          : error ? <p className="p-6 text-sm font-medium text-red-600">{error}</p>
          : contacts.length === 0 ? <p className="p-6 text-sm text-slate-500">No contacts found.</p>
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Subject</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="transition hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{contact.name}</td>
                      <td className="px-4 py-3 text-slate-600">{contact.email}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{contact.subject || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[contact.status] || 'bg-slate-100 text-slate-600'}`}>
                          {contact.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setViewContact(contact)}
                            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            VIEW
                          </button>
                          <select
                            value={contact.status}
                            onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                            disabled={updatingId === contact._id}
                            className="rounded-lg border border-indigo-300 bg-indigo-50 px-2 py-1.5 text-xs font-semibold text-indigo-700 outline-none disabled:opacity-60"
                          >
                            {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                          </select>
                          <button
                            type="button"
                            onClick={() => setDeleteId(contact._id)}
                            className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

      {/* View Contact Modal */}
      {viewContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Message</h3>
              <button type="button" onClick={() => setViewContact(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Name</p>
                  <p className="mt-1 text-slate-900">{viewContact.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Email</p>
                  <p className="mt-1 text-slate-900">{viewContact.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Phone</p>
                  <p className="mt-1 text-slate-900">{viewContact.phone || '-'}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[viewContact.status] || ''}`}>
                    {viewContact.status?.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Subject</p>
                <p className="mt-1 text-slate-900">{viewContact.subject || '-'}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Message</p>
                <p className="mt-1 text-slate-700 leading-relaxed whitespace-pre-wrap">{viewContact.message}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Received</p>
                <p className="mt-1 text-slate-900">{viewContact.createdAt ? new Date(viewContact.createdAt).toLocaleString() : '-'}</p>
              </div>
            </div>
            <div className="mt-5 border-t pt-4">
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusChange(viewContact._id, s)}
                    disabled={viewContact.status === s || updatingId === viewContact._id}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition disabled:opacity-50 ${
                      viewContact.status === s
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => setDeleteId(viewContact._id)} className="rounded-xl border border-red-300 bg-red-50 px-5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">DELETE</button>
              <button type="button" onClick={() => setViewContact(null)} className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Delete Contact?</h3>
            <p className="mt-2 text-sm text-slate-600">This action cannot be undone.</p>
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

export default AdminContacts