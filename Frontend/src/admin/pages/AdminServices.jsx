import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const EMPTY_FORM = {
  title: '',
  description: '',
  shortDescription: '',
  category: 'other',
  price: '',
  isActive: true,
  displayOrder: 0,
  featuredImage: { url: '', relativeUrl: '' },
  icon: { url: '', relativeUrl: '' },
  features: [],
}

const CATEGORIES = ['web', 'mobile', 'design', 'consulting', 'other']

function AdminServices() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 10

  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [featuresText, setFeaturesText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState('')

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

  const loadServices = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch(`/api/admin/services?page=${page}&limit=${limit}`)
      setServices(Array.isArray(data?.data) ? data.data : [])
      setTotal(data?.pagination?.total || 0)
    } catch (err) {
      setError(err.message || 'Failed to load services.')
    } finally {
      setLoading(false)
    }
  }, [adminFetch, page])

  useEffect(() => { loadServices() }, [loadServices])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(field)
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
      setForm((prev) => ({ ...prev, [field]: { url, relativeUrl } }))
    } catch (err) {
      setFormError(err.message || 'Image upload failed.')
    } finally {
      setImageUploading('')
    }
  }

  const parseFeaturesText = (text) =>
    text.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => ({
      title: line,
      description: '',
    }))

  const openCreate = () => {
    setForm({ ...EMPTY_FORM })
    setFeaturesText('')
    setEditingId(null)
    setFormError('')
    setFormSuccess('')
    setShowForm(true)
  }

  const openEdit = (service) => {
    setForm({
      title: service.title || '',
      description: service.description || '',
      shortDescription: service.shortDescription || '',
      category: service.category || 'other',
      price: service.price ?? '',
      isActive: service.isActive !== false,
      displayOrder: service.displayOrder || 0,
      featuredImage: service.featuredImage || { url: '', relativeUrl: '' },
      icon: service.icon || { url: '', relativeUrl: '' },
      features: service.features || [],
    })
    setFeaturesText(
      Array.isArray(service.features)
        ? service.features.map((f) => f.title || f).join('\n')
        : ''
    )
    setEditingId(service._id)
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
      const payload = {
        ...form,
        price: form.price !== '' ? Number(form.price) : null,
        features: parseFeaturesText(featuresText),
      }
      if (editingId) {
        await adminFetch(`/api/admin/services/${editingId}`, { method: 'PATCH', body: JSON.stringify(payload) })
        setFormSuccess('Service updated successfully.')
      } else {
        await adminFetch('/api/admin/services', { method: 'POST', body: JSON.stringify(payload) })
        setFormSuccess('Service created successfully.')
        setForm({ ...EMPTY_FORM })
        setFeaturesText('')
        setEditingId(null)
      }
      await loadServices()
    } catch (err) {
      setFormError(err.message || 'Save failed.')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteLoading(true)
    try {
      await adminFetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      await loadServices()
    } catch (err) {
      setError(err.message || 'Delete failed.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Services Management</h1>
          <p className="mt-1 text-sm text-slate-500">Total: {total} services</p>
        </div>
        <button type="button" onClick={showForm ? () => setShowForm(false) : openCreate} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          {showForm ? 'CLOSE FORM' : '+ NEW SERVICE'}
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{editingId ? 'Edit Service' : 'Create New Service'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Service title" required className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Price ($)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Leave empty if free" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Display Order</label>
                <input name="displayOrder" type="number" value={form.displayOrder} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500" />
              </div>

              <div className="flex items-center gap-3">
                <input id="svcActive" name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} className="h-4 w-4 rounded border-slate-300" />
                <label htmlFor="svcActive" className="text-sm font-semibold text-slate-700">Active Service</label>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Short Description</label>
                <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="One-line summary" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500" />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Full Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Detailed description..." rows={5} required className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500" />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Features (one per line)</label>
                <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={"Financial Analysis\nTax Planning\nRisk Management"} rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-slate-500" />
              </div>

              {/* Featured Image */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Featured Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'featuredImage')} disabled={imageUploading === 'featuredImage'} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" />
                {form.featuredImage?.url && <img src={form.featuredImage.url} alt="preview" className="mt-2 h-16 w-24 rounded-lg object-cover" />}
                {imageUploading === 'featuredImage' && <p className="mt-1 text-xs text-indigo-600">Uploading...</p>}
              </div>

              {/* Icon */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Icon Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'icon')} disabled={imageUploading === 'icon'} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" />
                {form.icon?.url && <img src={form.icon.url} alt="icon preview" className="mt-2 h-12 w-12 rounded-lg object-cover" />}
                {imageUploading === 'icon' && <p className="mt-1 text-xs text-indigo-600">Uploading...</p>}
              </div>
            </div>

            {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}
            {formSuccess && <p className="text-sm font-medium text-emerald-600">{formSuccess}</p>}

            <div className="flex gap-3">
              <button type="submit" disabled={formLoading} className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60">
                {formLoading ? 'SAVING...' : editingId ? 'UPDATE SERVICE' : 'CREATE SERVICE'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">CANCEL</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? <p className="p-6 text-sm text-slate-500">Loading services...</p>
          : error ? <p className="p-6 text-sm font-medium text-red-600">{error}</p>
          : services.length === 0 ? <p className="p-6 text-sm text-slate-500">No services found.</p>
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Order</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((service) => (
                    <tr key={service._id} className="transition hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900 max-w-[200px] truncate">{service.title}</td>
                      <td className="px-4 py-3 text-slate-600 capitalize">{service.category}</td>
                      <td className="px-4 py-3 text-slate-600">{service.price != null ? `$${service.price}` : 'Free'}</td>
                      <td className="px-4 py-3 text-slate-600">{service.displayOrder}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${service.isActive !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                          {service.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(service)} className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100">EDIT</button>
                          <button type="button" onClick={() => setDeleteId(service._id)} className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100">DELETE</button>
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

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Delete Service?</h3>
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

export default AdminServices