import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API_BASE_URL } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const parseResponseJson = async (response) => {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

const stringifyContent = (value) => JSON.stringify(value ?? {}, null, 2)

function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [pages, setPages] = useState([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [contentObject, setContentObject] = useState({})
  const [jsonText, setJsonText] = useState('{}')
  const [jsonError, setJsonError] = useState('')

  const selectedPage = useMemo(
    () => pages.find((item) => item.slug === selectedSlug) || null,
    [pages, selectedSlug],
  )

  const handleUnauthorized = useCallback(() => {
    clearAuth()
    navigate('/admin/login')
  }, [navigate])

  const loadPageList = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      handleUnauthorized()
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/content`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await parseResponseJson(response)

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized()
        return
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load content pages')
      }

      const rows = data.data || []
      setPages(rows)
      setSelectedSlug((prevSlug) => {
        const nextSlug = prevSlug || rows[0]?.slug || ''
        const nextContent =
          rows.find((item) => item.slug === nextSlug)?.content || {}
        setContentObject(nextContent)
        setJsonText(stringifyContent(nextContent))
        setJsonError('')
        return nextSlug
      })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [handleUnauthorized])

  useEffect(() => {
    loadPageList()
  }, [loadPageList])

  useEffect(() => {
    if (!selectedPage) return
    setContentObject(selectedPage.content || {})
    setJsonText(stringifyContent(selectedPage.content || {}))
    setJsonError('')
  }, [selectedPage])

  const handleSelectPage = (slug) => {
    setSelectedSlug(slug)
  }

  const handleJsonChange = (value) => {
    setJsonText(value)
    setJsonError('')
    try {
      const parsed = JSON.parse(value)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setJsonError('Content must be a JSON object.')
        return
      }
      setContentObject(parsed)
    } catch {
      setJsonError('Invalid JSON format.')
    }
  }

  const handleTitleChange = (value) => {
    const updated = { ...contentObject, pageTitle: value }
    setContentObject(updated)
    setJsonText(stringifyContent(updated))
    setJsonError('')
  }

  const handleSave = async () => {
    if (!selectedSlug) return
    if (jsonError) return

    const token = localStorage.getItem('token')
    if (!token) {
      handleUnauthorized()
      return
    }

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/content/${selectedSlug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: contentObject }),
      })
      const data = await parseResponseJson(response)

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized()
        return
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save page content')
      }

      setPages((prev) =>
        prev.map((item) =>
          item.slug === selectedSlug
            ? { ...item, content: data.data?.content || contentObject, updatedAt: data.data?.updatedAt || item.updatedAt }
            : item,
        ),
      )
      setMessage('Page content saved successfully.')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (!selectedSlug) return

    const token = localStorage.getItem('token')
    if (!token) {
      handleUnauthorized()
      return
    }

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/content/${selectedSlug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await parseResponseJson(response)

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized()
        return
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset page content')
      }

      const resetContent = data.data?.content || {}
      setContentObject(resetContent)
      setJsonText(stringifyContent(resetContent))
      setPages((prev) =>
        prev.map((item) =>
          item.slug === selectedSlug
            ? { ...item, content: resetContent, updatedAt: null }
            : item,
        ),
      )
      setMessage('Page content reset to default.')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="min-h-[75vh] bg-[#f4f7fb] px-4 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl bg-[#0b2344] p-5 text-white shadow-lg">
          <h2 className="text-xl font-extrabold">Content Admin</h2>
          <p className="mt-1 text-sm text-slate-200">Control all page content from backend</p>

          <div className="mt-5 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
            {pages.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => handleSelectPage(item.slug)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm font-semibold transition ${selectedSlug === item.slug ? 'bg-[#f00455]' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {item.slug}
              </button>
            ))}
          </div>
        </aside>

        <main className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-extrabold text-[#0d1e35]">Page Content Editor</h1>
            <button type="button" onClick={loadPageList} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Refresh
            </button>
          </div>

          {loading ? <p className="text-slate-600">Loading content...</p> : null}
          {saving ? <p className="mb-4 rounded-md bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">Saving changes...</p> : null}
          {error ? <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}
          {message ? <p className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{message}</p> : null}

          {!loading && selectedSlug ? (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Selected Page</label>
                <input value={selectedSlug} readOnly className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Page Title</label>
                <input
                  value={String(contentObject.pageTitle || '')}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                  className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm outline-none focus:border-[#f00455]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full JSON Content</label>
                <textarea
                  rows={16}
                  value={jsonText}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-4 py-3 font-mono text-xs outline-none focus:border-[#f00455]"
                />
                {jsonError ? <p className="mt-2 text-sm font-medium text-red-600">{jsonError}</p> : null}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || Boolean(jsonError)}
                  className="rounded-md bg-[#0b2344] px-5 py-2 text-sm font-bold text-white hover:bg-[#14345f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save Content
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="rounded-md bg-red-500 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Reset To Default
                </button>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </section>
  )
}

export default AdminDashboard
