import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const EMPTY_FORM = {
  title: '',
  content: '',
  excerpt: '',
  author: '',
  category: 'other',
  status: 'draft',
  featuredImage: { url: '', relativeUrl: '' },
}

const CATEGORIES = ['technology', 'business', 'lifestyle', 'other']
const STATUSES = ['draft', 'published']

function AdminBlogs() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const [blogs, setBlogs] = useState([])
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

  const loadBlogs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch(`/api/admin/blogs?page=${page}&limit=${limit}`)
      setBlogs(Array.isArray(data?.data) ? data.data : [])
      setTotal(data?.pagination?.total || 0)
    } catch (err) {
      setError(err.message || 'Failed to load blogs.')
    } finally {
      setLoading(false)
    }
  }, [adminFetch, page])

  useEffect(() => { loadBlogs() }, [loadBlogs])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const dataUrl = reader.result
        const res = await adminFetch('/api/admin/upload-image', {
          method: 'POST',
          body: JSON.stringify({ fileName: file.name, mimeType: file.type, data: dataUrl }),
        })
        const url = res?.data?.url || ''
        const relativeUrl = res?.data?.relativeUrl || ''
        setForm((prev) => ({ ...prev, featuredImage: { url, relativeUrl } }))
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setFormError(err.message || 'Image upload failed.')
    } finally {
      setImageUploading(false)
    }
  }

  const openCreate = () => {
    setForm({ ...EMPTY_FORM })
    setEditingId(null)
    setFormError('')
    setFormSuccess('')
    setShowForm(true)
  }

  const openEdit = (blog) => {
    setForm({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      author: blog.author || '',
      category: blog.category || 'other',
      status: blog.status || 'draft',
      featuredImage: blog.featuredImage || { url: '', relativeUrl: '' },
    })
    setEditingId(blog._id)
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
        await adminFetch(`/api/admin/blogs/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        setFormSuccess('Blog updated successfully.')
      } else {
        await adminFetch('/api/admin/blogs', {
          method: 'POST',
          body: JSON.stringify(form),
        })
        setFormSuccess('Blog created successfully.')
        setForm({ ...EMPTY_FORM })
        setEditingId(null)
      }
      await loadBlogs()
    } catch (err) {
      setFormError(err.message || 'Save failed.')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteLoading(true)
    try {
      await adminFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      await loadBlogs()
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
          <h1 className="text-2xl font-extrabold text-slate-900">Blog Management</h1>
          <p className="mt-1 text-sm text-slate-500">Total: {total} blogs</p>
        </div>
        <button
          type="button"
          onClick={showForm ? () => setShowForm(false) : openCreate}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {showForm ? 'CLOSE FORM' : '+ NEW BLOG'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            {editingId ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Blog title"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Author</label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                />
                {form.featuredImage?.url && (
                  <img src={form.featuredImage.url} alt="preview" className="mt-2 h-16 w-24 rounded-lg object-cover" />
                )}
                {imageUploading && <p className="mt-1 text-xs text-indigo-600">Uploading...</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="Short description"
                  rows={2}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Content *</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Full blog content..."
                  rows={8}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
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
                {formLoading ? 'SAVING...' : editingId ? 'UPDATE BLOG' : 'CREATE BLOG'}
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
          <p className="p-6 text-sm text-slate-500">Loading blogs...</p>
        ) : error ? (
          <p className="p-6 text-sm font-medium text-red-600">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No blogs found. Create your first blog!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Author</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900 max-w-[220px] truncate">{blog.title}</td>
                    <td className="px-4 py-3 text-slate-600 capitalize">{blog.category}</td>
                    <td className="px-4 py-3 text-slate-600">{blog.author || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        blog.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(blog)}
                          className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(blog._id)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40"
              >
                PREV
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40"
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Delete Blog?</h3>
            <p className="mt-2 text-sm text-slate-600">This action cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                disabled={deleteLoading}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleteLoading ? 'DELETING...' : 'DELETE'}
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminBlogs