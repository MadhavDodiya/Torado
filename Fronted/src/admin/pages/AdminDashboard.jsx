import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const EMPTY_ROW = { path: '', value: '' }

const isPlainObject = (value) =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const flattenObject = (input, parentPath = '') => {
  if (!isPlainObject(input)) return []

  const rows = []
  for (const [key, value] of Object.entries(input)) {
    const currentPath = parentPath ? `${parentPath}.${key}` : key
    if (isPlainObject(value)) {
      rows.push(...flattenObject(value, currentPath))
    } else {
      rows.push({
        path: currentPath,
        value: typeof value === 'string' ? value : JSON.stringify(value),
      })
    }
  }
  return rows
}

const parseFieldValue = (raw) => {
  const value = String(raw ?? '').trim()
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  if (value && !Number.isNaN(Number(value)) && /^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value)
  }

  if (
    (value.startsWith('[') && value.endsWith(']')) ||
    (value.startsWith('{') && value.endsWith('}'))
  ) {
    try {
      return JSON.parse(value)
    } catch {
      return String(raw ?? '')
    }
  }

  return String(raw ?? '')
}

const buildObjectFromRows = (rows) => {
  const output = {}

  for (const row of rows) {
    const path = String(row.path || '')
      .trim()
      .replace(/\.+/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '')

    if (!path) continue

    const segments = path.split('.').map((part) => part.trim()).filter(Boolean)
    if (!segments.length) continue

    let current = output
    for (let index = 0; index < segments.length - 1; index += 1) {
      const key = segments[index]
      if (!isPlainObject(current[key])) {
        current[key] = {}
      }
      current = current[key]
    }

    current[segments[segments.length - 1]] = parseFieldValue(row.value)
  }

  return output
}

function AdminDashboard() {
  const navigate = useNavigate()

  const [contentList, setContentList] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState('')

  const [selectedSlug, setSelectedSlug] = useState('')
  const [selectedPage, setSelectedPage] = useState(null)
  const [pageLoading, setPageLoading] = useState(false)
  const [pageError, setPageError] = useState('')

  const [editorRows, setEditorRows] = useState([])
  const [editorError, setEditorError] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const [newSlug, setNewSlug] = useState('')
  const [newRows, setNewRows] = useState([EMPTY_ROW])
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createMessage, setCreateMessage] = useState('')

  const [deleteFieldPath, setDeleteFieldPath] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [imageFieldPath, setImageFieldPath] = useState('')
  const [imageUploadLoading, setImageUploadLoading] = useState(false)
  const [imageUploadError, setImageUploadError] = useState('')
  const [imageUploadMessage, setImageUploadMessage] = useState('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [rowUploadLoadingKey, setRowUploadLoadingKey] = useState('')
  const [newRowUploadError, setNewRowUploadError] = useState('')
  const [newRowUploadMessage, setNewRowUploadMessage] = useState('')
  const [editorRowUploadError, setEditorRowUploadError] = useState('')
  const [editorRowUploadMessage, setEditorRowUploadMessage] = useState('')

  const token = useMemo(() => localStorage.getItem('token') || '', [])

  const adminFetch = useCallback(
    async (path, options = {}) => {
      const response = await fetch(buildApiUrl(path), {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      })

      const data = await response.json().catch(() => ({}))
      if (response.status === 401 || response.status === 403) {
        clearAuth()
        navigate('/admin/login', { replace: true, state: { reason: 'access_denied' } })
        throw new Error('Session expired. Please login again.')
      }
      if (!response.ok) throw new Error(data.message || 'Request failed.')
      return data
    },
    [navigate, token],
  )

  const loadContentList = useCallback(async () => {
    setListLoading(true)
    setListError('')
    try {
      const data = await adminFetch('/api/admin/content')
      const items = Array.isArray(data?.data) ? data.data : []
      setContentList(items)
      if (!selectedSlug && items[0]?.slug) setSelectedSlug(items[0].slug)
    } catch (error) {
      setListError(error.message || 'Unable to load page list.')
    } finally {
      setListLoading(false)
    }
  }, [adminFetch, selectedSlug])

  const loadPage = useCallback(
    async (slug) => {
      if (!slug) return
      setPageLoading(true)
      setPageError('')
      setSaveMessage('')
      setEditorError('')
      try {
        const data = await adminFetch(`/api/admin/content/${slug}`)
        const pageData = data?.data || null
        setSelectedPage(pageData)
        const rows = flattenObject(pageData?.content || {})
        setEditorRows(rows.length ? rows : [EMPTY_ROW])
      } catch (error) {
        setPageError(error.message || 'Unable to load page content.')
      } finally {
        setPageLoading(false)
      }
    },
    [adminFetch],
  )

  useEffect(() => {
    loadContentList()
  }, [loadContentList])

  useEffect(() => {
    if (selectedSlug) loadPage(selectedSlug)
  }, [loadPage, selectedSlug])

  useEffect(
    () => () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    },
    [imagePreviewUrl],
  )

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Image read failed.'))
      reader.readAsDataURL(file)
    })

  const setEditorRow = (index, key, value) => {
    setEditorRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)))
  }

  const addEditorRow = () => setEditorRows((prev) => [...prev, { ...EMPTY_ROW }])
  const removeEditorRow = (index) =>
    setEditorRows((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      return updated.length ? updated : [{ ...EMPTY_ROW }]
    })

  const setNewRow = (index, key, value) => {
    setNewRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)))
  }

  const addNewRow = () => setNewRows((prev) => [...prev, { ...EMPTY_ROW }])
  const removeNewRow = (index) =>
    setNewRows((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      return updated.length ? updated : [{ ...EMPTY_ROW }]
    })

  const handleSavePage = async () => {
    if (!selectedSlug) return
    setSaveLoading(true)
    setSaveMessage('')
    setEditorError('')
    try {
      const content = buildObjectFromRows(editorRows)
      const data = await adminFetch(`/api/admin/content/${selectedSlug}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
      })
      setSelectedPage(data?.data || null)
      const rows = flattenObject(data?.data?.storedContent || {})
      setEditorRows(rows.length ? rows : [EMPTY_ROW])
      setSaveMessage('Page content saved successfully.')
      await loadContentList()
    } catch (error) {
      setEditorError(error.message || 'Save failed.')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleResetPage = async () => {
    if (!selectedSlug) return
    const confirmed = window.confirm(`"${selectedSlug}" ka custom content delete karna hai?`)
    if (!confirmed) return

    setSaveLoading(true)
    setSaveMessage('')
    setEditorError('')
    try {
      const data = await adminFetch(`/api/admin/content/${selectedSlug}`, { method: 'DELETE' })
      setSelectedPage(data?.data || null)
      setEditorRows([{ ...EMPTY_ROW }])
      setSaveMessage('Custom content delete ho gaya. Default active hai.')
      await loadContentList()
    } catch (error) {
      setEditorError(error.message || 'Reset failed.')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleCreateOrUpdateNewPage = async () => {
    const slug = String(newSlug || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')

    setCreateError('')
    setCreateMessage('')
    if (!slug) {
      setCreateError('Page slug required hai.')
      return
    }

    setCreateLoading(true)
    try {
      const content = buildObjectFromRows(newRows)
      await adminFetch(`/api/admin/content/${slug}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
      })
      setCreateMessage('New page content save ho gaya.')
      setSelectedSlug(slug)
      await loadContentList()
      await loadPage(slug)
    } catch (error) {
      setCreateError(error.message || 'Create failed.')
    } finally {
      setCreateLoading(false)
    }
  }

  const handleDeleteFieldByPath = () => {
    const target = deleteFieldPath.trim()
    if (!target) {
      setEditorError('Delete key path empty hai.')
      return
    }

    const filtered = editorRows.filter((row) => row.path.trim() !== target)
    if (filtered.length === editorRows.length) {
      setEditorError(`Path "${target}" nahi mila.`)
      return
    }

    setEditorRows(filtered.length ? filtered : [{ ...EMPTY_ROW }])
    setDeleteFieldPath('')
    setEditorError('')
  }

  const handleImageSelect = (event) => {
    const selected = event.target.files?.[0] || null
    setImageUploadError('')
    setImageUploadMessage('')
    setUploadedImageUrl('')
    setImageFile(selected)

    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    setImagePreviewUrl(selected ? URL.createObjectURL(selected) : '')
  }

  const uploadImageAndReturnUrl = async (file) => {
    const mimeType = String(file?.type || '').trim().toLowerCase()
    if (!mimeType.startsWith('image/')) {
      throw new Error('Only image files are allowed.')
    }

    const dataUrl = await fileToDataUrl(file)
    const response = await adminFetch('/api/admin/upload-image', {
      method: 'POST',
      body: JSON.stringify({
        fileName: file.name,
        mimeType,
        data: dataUrl,
      }),
    })

    const url = response?.data?.url || ''
    if (!url) throw new Error('Image uploaded but URL missing.')
    return url
  }

  const handleNewRowImageChange = async (index, event) => {
    const input = event.target
    const selected = input.files?.[0] || null
    if (!selected) return

    const uploadKey = `new-${index}`
    setRowUploadLoadingKey(uploadKey)
    setNewRowUploadError('')
    setNewRowUploadMessage('')

    try {
      const url = await uploadImageAndReturnUrl(selected)
      setNewRow(index, 'value', url)
      setNewRowUploadMessage(`Image URL field row ${index + 1} me add ho gaya.`)
    } catch (error) {
      setNewRowUploadError(error.message || 'Image upload failed.')
    } finally {
      setRowUploadLoadingKey((prev) => (prev === uploadKey ? '' : prev))
      input.value = ''
    }
  }

  const handleEditorRowImageChange = async (index, event) => {
    const input = event.target
    const selected = input.files?.[0] || null
    if (!selected) return

    const uploadKey = `editor-${index}`
    setRowUploadLoadingKey(uploadKey)
    setEditorRowUploadError('')
    setEditorRowUploadMessage('')

    try {
      const url = await uploadImageAndReturnUrl(selected)
      setEditorRow(index, 'value', url)
      setEditorRowUploadMessage(`Image URL field row ${index + 1} me add ho gaya.`)
    } catch (error) {
      setEditorRowUploadError(error.message || 'Image upload failed.')
    } finally {
      setRowUploadLoadingKey((prev) => (prev === uploadKey ? '' : prev))
      input.value = ''
    }
  }

  const handleUploadImage = async () => {
    if (!imageFile) {
      setImageUploadError('Please select an image first.')
      return
    }

    setImageUploadLoading(true)
    setImageUploadError('')
    setImageUploadMessage('')
    try {
      const url = await uploadImageAndReturnUrl(imageFile)
      setUploadedImageUrl(url)
      setImageUploadMessage('Image uploaded successfully.')
    } catch (error) {
      setImageUploadError(error.message || 'Image upload failed.')
    } finally {
      setImageUploadLoading(false)
    }
  }

  const handleCopyUploadedUrl = async () => {
    if (!uploadedImageUrl) return
    try {
      await navigator.clipboard.writeText(uploadedImageUrl)
      setImageUploadMessage('Image URL copied.')
      setImageUploadError('')
    } catch {
      setImageUploadError('Unable to copy URL. Manual copy karo.')
    }
  }

  const handleUseImageInEditor = () => {
    const targetPath = imageFieldPath.trim()
    if (!selectedSlug) {
      setImageUploadError('Pehle page select karo.')
      return
    }
    if (!uploadedImageUrl) {
      setImageUploadError('Upload image first.')
      return
    }
    if (!targetPath) {
      setImageUploadError('Field path do. Example: hero.imageUrl')
      return
    }

    setEditorRows((prev) => {
      const index = prev.findIndex((row) => row.path.trim() === targetPath)
      if (index >= 0) {
        return prev.map((row, i) => (i === index ? { ...row, value: uploadedImageUrl } : row))
      }
      return [...prev, { path: targetPath, value: uploadedImageUrl }]
    })

    setImageUploadError('')
    setImageUploadMessage(`URL "${targetPath}" field me add ho gaya.`)
  }

  const selectedPageTitle = selectedPage?.content?.pageTitle || selectedSlug || 'Select Page'
  const totalPages = contentList.length
  const customPages = contentList.filter((item) => item?.hasCustomContent).length

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Content Management</h1>
        <p className="mt-2 text-sm text-slate-600">JSON ke bina direct fields edit karo.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Total Pages: {totalPages}
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Custom Pages: {customPages}
          </span>
        </div>
      </div>

      <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">Add New Page</h2>
        <p className="mt-1 text-sm text-slate-600">Field path + value se content create/update karo.</p>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-slate-700">Page Slug</label>
          <input
            type="text"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="example: admin-login"
            className="w-full max-w-sm rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="mt-4 space-y-2">
          {newRows.map((row, index) => {
            const uploadKey = `new-${index}`
            const isUploading = rowUploadLoadingKey === uploadKey
            return (
              <div key={`new-row-${index}`} className="grid gap-2 md:grid-cols-[1fr_1fr_auto_auto]">
                <input
                  type="text"
                  value={row.path}
                  onChange={(e) => setNewRow(index, 'path', e.target.value)}
                  placeholder="Field path (example: hero.title)"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => setNewRow(index, 'value', e.target.value)}
                  placeholder="Value / Image URL"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <label className="cursor-pointer rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100">
                  {isUploading ? 'UPLOADING...' : 'UPLOAD IMAGE'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleNewRowImageChange(index, e)}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeNewRow(index)}
                  className="rounded-lg border border-red-300 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  REMOVE
                </button>
              </div>
            )
          })}
        </div>
        {newRowUploadError ? <p className="mt-2 text-sm font-medium text-red-600">{newRowUploadError}</p> : null}
        {newRowUploadMessage ? <p className="mt-2 text-sm font-medium text-emerald-700">{newRowUploadMessage}</p> : null}

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addNewRow}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            ADD FIELD
          </button>
          <button
            type="button"
            onClick={handleCreateOrUpdateNewPage}
            disabled={createLoading}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createLoading ? 'SAVING...' : 'SAVE NEW PAGE'}
          </button>
          {createError ? <p className="text-sm font-medium text-red-600">{createError}</p> : null}
          {createMessage ? <p className="text-sm font-medium text-emerald-700">{createMessage}</p> : null}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">Upload Image</h2>
        <p className="mt-1 text-sm text-slate-600">
          Image upload karo aur selected page (<span className="font-semibold">{selectedSlug || 'none'}</span>) ke field me use karo.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[300px_1fr]">
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
            />
            {imagePreviewUrl ? (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <img src={imagePreviewUrl} alt="Selected preview" className="h-48 w-full object-cover" />
              </div>
            ) : null}
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={imageUploadLoading || !imageFile}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {imageUploadLoading ? 'UPLOADING...' : 'UPLOAD IMAGE'}
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={uploadedImageUrl}
              readOnly
              placeholder="Uploaded image URL"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
            />
            <input
              type="text"
              value={imageFieldPath}
              onChange={(e) => setImageFieldPath(e.target.value)}
              placeholder="Field path (example: hero.imageUrl)"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopyUploadedUrl}
                disabled={!uploadedImageUrl}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                COPY URL
              </button>
              <button
                type="button"
                onClick={handleUseImageInEditor}
                disabled={!uploadedImageUrl || !selectedSlug}
                className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                USE IN EDITOR
              </button>
            </div>
            {imageUploadError ? <p className="text-sm font-medium text-red-600">{imageUploadError}</p> : null}
            {imageUploadMessage ? <p className="text-sm font-medium text-emerald-700">{imageUploadMessage}</p> : null}
          </div>
        </div>
      </article>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Pages</h2>
              <p className="mt-1 text-sm text-slate-600">Select page to edit details.</p>
            </div>
            <button
              type="button"
              onClick={loadContentList}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              REFRESH
            </button>
          </div>

          {listLoading ? <p className="mt-4 text-sm text-slate-500">Loading pages...</p> : null}
          {listError ? <p className="mt-4 text-sm font-medium text-red-600">{listError}</p> : null}

          <div className="mt-4 max-h-[620px] space-y-2 overflow-auto pr-1">
            {contentList.map((item) => {
              const isActive = item.slug === selectedSlug
              const title = item?.content?.pageTitle || item.slug
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.28)]'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{title}</p>
                    {item?.hasCustomContent ? (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                        custom
                      </span>
                    ) : null}
                  </div>
                  <p className={`mt-1 truncate font-mono text-[11px] ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                    {item.slug}
                  </p>
                </button>
              )
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{selectedPageTitle}</h2>
              <p className="mt-1 text-sm text-slate-600">
                Slug: <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">{selectedSlug || '-'}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const rows = flattenObject(selectedPage?.content || {})
                setEditorRows(rows.length ? rows : [{ ...EMPTY_ROW }])
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              RELOAD FIELDS
            </button>
          </div>

          {pageLoading ? <p className="mt-4 text-sm text-slate-500">Loading page details...</p> : null}
          {pageError ? <p className="mt-4 text-sm font-medium text-red-600">{pageError}</p> : null}

          <div className="mt-4 space-y-2">
            {editorRows.map((row, index) => {
              const uploadKey = `editor-${index}`
              const isUploading = rowUploadLoadingKey === uploadKey
              return (
                <div key={`editor-row-${index}`} className="grid gap-2 md:grid-cols-[1fr_1fr_auto_auto]">
                  <input
                    type="text"
                    value={row.path}
                    onChange={(e) => setEditorRow(index, 'path', e.target.value)}
                    placeholder="Field path"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  />
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) => setEditorRow(index, 'value', e.target.value)}
                    placeholder="Value / Image URL"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  />
                  <label className="cursor-pointer rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100">
                    {isUploading ? 'UPLOADING...' : 'UPLOAD IMAGE'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleEditorRowImageChange(index, e)}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeEditorRow(index)}
                    className="rounded-lg border border-red-300 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    REMOVE
                  </button>
                </div>
              )
            })}
          </div>
          {editorRowUploadError ? <p className="mt-2 text-sm font-medium text-red-600">{editorRowUploadError}</p> : null}
          {editorRowUploadMessage ? <p className="mt-2 text-sm font-medium text-emerald-700">{editorRowUploadMessage}</p> : null}

          <div className="mt-3 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="min-w-0 flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                Delete Field By Path
              </label>
              <input
                type="text"
                value={deleteFieldPath}
                onChange={(e) => setDeleteFieldPath(e.target.value)}
                placeholder="example: hero.title"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <button
              type="button"
              onClick={handleDeleteFieldByPath}
              className="rounded-lg border border-red-300 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
            >
              DELETE FIELD
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addEditorRow}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ADD FIELD
            </button>
            <button
              type="button"
              onClick={handleSavePage}
              disabled={saveLoading || !selectedSlug}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saveLoading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
            <button
              type="button"
              onClick={handleResetPage}
              disabled={saveLoading || !selectedSlug}
              className="rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              DELETE CUSTOM CONTENT
            </button>
          </div>

          {editorError ? <p className="mt-3 text-sm font-medium text-red-600">{editorError}</p> : null}
          {saveMessage ? <p className="mt-3 text-sm font-medium text-emerald-700">{saveMessage}</p> : null}
        </article>
      </div>
    </section>
  )
}

export default AdminDashboard
