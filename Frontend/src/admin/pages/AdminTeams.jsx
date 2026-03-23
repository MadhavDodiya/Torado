import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const EMPTY_FORM = {
  name: '',
  position: '',
  bio: '',
  email: '',
  department: 'development',
  isActive: true,
  socialLinks: { linkedin: '', twitter: '', github: '', website: '' },
  profileImage: { url: '', relativeUrl: '' },
}

const DEPARTMENTS = ['development', 'design', 'marketing', 'management']

function AdminTeams() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 10

  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [editingId, setEditingId] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

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

  const loadMembers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch(`/api/admin/team?page=${page}&limit=${limit}`)
      setMembers(Array.isArray(data?.data) ? data.data : [])
      setTotal(data?.pagination?.total || 0)
    } catch (err) {
      setError(err.message || 'Failed to load team members.')
    } finally {
      setLoading(false)
    }
  }, [adminFetch, page])

  useEffect(() => { loadMembers() }, [loadMembers])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('File read failed'))
        reader.readAsDataURL(file)
      })
      const res = await adminFetch('/api/admin/upload-image', {
        method: 'POST',
        body: JSON.stringify({ fileName: file.name, mimeType: file.type, data: dataUrl }),
      })
      const url = res?.data?.url || ''
      const relativeUrl = res?.data?.relativeUrl || ''
      setForm((prev) => ({ ...prev, profileImage: { url, relativeUrl } }))
    } catch (err) {
      setFormError(err.message || 'Image upload failed.')
    } finally {
      setImageUploading(false)
    }
  }

  const openCreate = () => {
    setForm({ ...EMPTY_FORM, socialLinks: { linkedin: '', twitter: '', github: '', website: '' }, profileImage: { url: '', relativeUrl: '' } })
    setEditingId(null)
    setFormError('')
    setFormSuccess('')
    setShowForm(true)
  }

  const openEdit = (member) => {
    setForm({
      name: member.name || '',
      position: member.position || '',
      bio: member.bio || '',
      email: member.email || '',
      department: member.department || 'development',
      isActive: member.isActive !== false,
      socialLinks: { linkedin: '', twitter: '', github: '', website: '', ...(member.socialLinks || {}) },
      profileImage: member.profileImage || { url: '', relativeUrl: '' },
    })
    setEditingId(member._id)
    setFormError('')
    setFormSuccess('')
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')
    setFormSuccess('')
    try {
      if (editingId) {
        await adminFetch(`/api/admin/team/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        setFormSuccess('Team member updated successfully.')
      } else {
        await adminFetch('/api/admin/team', {
          method: 'POST',
          body: JSON.stringify(form),
        })
        setFormSuccess('Team member created successfully.')
        setForm({ ...EMPTY_FORM, socialLinks: { linkedin: '', twitter: '', github: '', website: '' }, profileImage: { url: '', relativeUrl: '' } })
        setEditingId(null)
      }
      await loadMembers()
    } catch (err) {
      setFormError(err.message || 'Save failed.')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteLoading(true)
    try {
      await adminFetch(`/api/admin/team/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      await loadMembers()
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
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Team Management</h1>
          <p className="mt-1 text-sm text-slate-500">Total: {total} members</p>
        </div>
        <button
          type="button"
          onClick={showForm ? () => setShowForm(false) : openCreate}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {showForm ? 'CLOSE FORM' : '+ NEW MEMBER'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            {editingId ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Position *</label>
                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Job title"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Department</label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                />
                {form.profileImage?.url && (
                  <img src={form.profileImage.url} alt="preview" className="mt-2 h-16 w-16 rounded-full object-cover" />
                )}
                {imageUploading && <p className="mt-1 text-xs text-indigo-600">Uploading...</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Short biography"
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              {/* Social Links */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">LinkedIn URL</label>
                <input
                  name="linkedin"
                  value={form.socialLinks.linkedin}
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Twitter URL</label>
                <input
                  name="twitter"
                  value={form.socialLinks.twitter}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">GitHub URL</label>
                <input
                  name="github"
                  value={form.socialLinks.github}
                  onChange={handleSocialChange}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Website URL</label>
                <input
                  name="website"
                  value={form.socialLinks.website}
                  onChange={handleSocialChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">Active Member</label>
              </div>
            </div>

            {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}
            {formSuccess && <p className="text-sm font-medium text-emerald-600">{formSuccess}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={formLoading}
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
              >
                {formLoading ? 'SAVING...' : editingId ? 'UPDATE MEMBER' : 'ADD MEMBER'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null) }}
                className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading team members...</p>
        ) : error ? (
          <p className="p-6 text-sm font-medium text-red-600">{error}</p>
        ) : members.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No team members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Member</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Position</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Department</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => (
                  <tr key={member._id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {member.profileImage?.url ? (
                          <img src={member.profileImage.url} alt={member.name} className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                            {(member.name || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-slate-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{member.position}</td>
                    <td className="px-4 py-3 text-slate-600 capitalize">{member.department}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        member.isActive !== false
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {member.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(member)}
                          className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(member._id)}
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
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40">PREV</button>
              <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40">NEXT</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Delete Team Member?</h3>
            <p className="mt-2 text-sm text-slate-600">This action cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => handleDelete(deleteId)} disabled={deleteLoading} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60">
                {deleteLoading ? 'DELETING...' : 'DELETE'}
              </button>
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminTeams