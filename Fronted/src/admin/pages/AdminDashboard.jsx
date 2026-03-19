import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { buildApiUrl } from '../../utils/api'
import { clearAuth } from '../../utils/auth'

const EMPTY_ROW = { path: '', value: '' }

const DEFAULT_PRICING_FORM = {
  pageTitle: 'Pricing Plan',
  heroWatermark: 'Pricing',
  sectionTag: 'How We Charge',
  sectionTitle: 'Pricing Plans',
  sectionDescription:
    'Etiam euismod libero id neque facilisis elementum in eget ligula. Ut consequat varius blandit. Duis quis tortor quis lacus facilisis.',
  billingMonthlyLabel: 'Monthly',
  billingYearlyLabel: 'Yearly',
  billingSaveBadge: 'Save 2 Months',
  includesLabel: 'This Plan Includes Global Relations',
  enterpriseText: 'Need custom enterprise pricing?',
  enterpriseCtaText: 'Talk to our team',
  plans: [
    {
      id: 'small',
      name: 'Small Plan',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      description: 'Best for startup teams who need structured finance basics.',
      cta: 'Start Small Plan',
      featured: false,
      featuresText:
        '+ All Financial Tasks\n+ Economic Market Survey\n- Sales Operations\n- Auto Intelligence\n- 24/7 Support\n- Technology Services',
    },
    {
      id: 'smart',
      name: 'Smart Plan',
      monthlyPrice: 249,
      yearlyPrice: 2490,
      description: 'For growing businesses that need full planning and execution.',
      cta: 'Start Smart Plan',
      featured: true,
      featuresText:
        '+ All Financial Tasks\n+ Economic Market Survey\n+ Sales Operations\n+ Auto Intelligence\n- 24/7 Support\n- Technology Services',
    },
    {
      id: 'super',
      name: 'Super Plan',
      monthlyPrice: 349,
      yearlyPrice: 3490,
      description: 'Advanced package for high-scale operations and dedicated support.',
      cta: 'Start Super Plan',
      featured: false,
      featuresText:
        '+ All Financial Tasks\n+ Economic Market Survey\n+ Sales Operations\n+ Auto Intelligence\n+ 24/7 Support\n+ Technology Services',
    },
  ],
}

const cloneDefaultPricingForm = () => ({
  ...DEFAULT_PRICING_FORM,
  plans: DEFAULT_PRICING_FORM.plans.map((plan) => ({ ...plan })),
})

const getFeatureTextFromArray = (features = []) =>
  features
    .map((feature) => `${feature?.active ? '+' : '-'} ${String(feature?.text || '').trim()}`.trim())
    .filter(Boolean)
    .join('\n')

const normalizePricingForm = (content = {}) => {
  const fallback = cloneDefaultPricingForm()
  const incomingPlans = Array.isArray(content?.plans) ? content.plans : []

  return {
    pageTitle: String(content?.pageTitle || fallback.pageTitle),
    heroWatermark: String(content?.heroWatermark || fallback.heroWatermark),
    sectionTag: String(content?.sectionTag || fallback.sectionTag),
    sectionTitle: String(content?.sectionTitle || fallback.sectionTitle),
    sectionDescription: String(content?.sectionDescription || fallback.sectionDescription),
    billingMonthlyLabel: String(content?.billingMonthlyLabel || fallback.billingMonthlyLabel),
    billingYearlyLabel: String(content?.billingYearlyLabel || fallback.billingYearlyLabel),
    billingSaveBadge: String(content?.billingSaveBadge || fallback.billingSaveBadge),
    includesLabel: String(content?.includesLabel || fallback.includesLabel),
    enterpriseText: String(content?.enterpriseText || fallback.enterpriseText),
    enterpriseCtaText: String(content?.enterpriseCtaText || fallback.enterpriseCtaText),
    plans: fallback.plans.map((defaultPlan, index) => {
      const incomingPlan = incomingPlans[index] || {}
      const monthlyPrice = Number(incomingPlan?.monthlyPrice ?? incomingPlan?.price ?? defaultPlan.monthlyPrice)
      const yearlyPrice = Number(incomingPlan?.yearlyPrice ?? monthlyPrice * 10)
      const incomingFeatures = Array.isArray(incomingPlan?.features) ? incomingPlan.features : []

      return {
        id: String(incomingPlan?.id || defaultPlan.id),
        name: String(incomingPlan?.name || defaultPlan.name),
        monthlyPrice: Number.isFinite(monthlyPrice) ? monthlyPrice : defaultPlan.monthlyPrice,
        yearlyPrice: Number.isFinite(yearlyPrice) ? yearlyPrice : defaultPlan.yearlyPrice,
        description: String(incomingPlan?.description || defaultPlan.description),
        cta: String(incomingPlan?.cta || defaultPlan.cta),
        featured: Boolean(incomingPlan?.featured ?? defaultPlan.featured),
        featuresText: incomingFeatures.length
          ? getFeatureTextFromArray(incomingFeatures)
          : defaultPlan.featuresText,
      }
    }),
  }
}

const parseFeaturesFromText = (value = '') =>
  String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const isActive = !line.startsWith('-')
      const text = line.replace(/^[-+]\s*/, '').trim()
      return text ? { text, active: isActive } : null
    })
    .filter(Boolean)

const buildPricingContentFromForm = (form) => ({
  pageTitle: String(form.pageTitle || '').trim(),
  heroWatermark: String(form.heroWatermark || '').trim(),
  sectionTag: String(form.sectionTag || '').trim(),
  sectionTitle: String(form.sectionTitle || '').trim(),
  sectionDescription: String(form.sectionDescription || '').trim(),
  billingMonthlyLabel: String(form.billingMonthlyLabel || '').trim(),
  billingYearlyLabel: String(form.billingYearlyLabel || '').trim(),
  billingSaveBadge: String(form.billingSaveBadge || '').trim(),
  includesLabel: String(form.includesLabel || '').trim(),
  enterpriseText: String(form.enterpriseText || '').trim(),
  enterpriseCtaText: String(form.enterpriseCtaText || '').trim(),
  plans: (Array.isArray(form.plans) ? form.plans : []).map((plan, index) => {
    const monthlyPrice = Number(plan.monthlyPrice)
    const yearlyPrice = Number(plan.yearlyPrice)
    return {
      id: String(plan.id || `plan-${index + 1}`).trim(),
      name: String(plan.name || '').trim(),
      monthlyPrice: Number.isFinite(monthlyPrice) ? monthlyPrice : 0,
      yearlyPrice: Number.isFinite(yearlyPrice) ? yearlyPrice : 0,
      description: String(plan.description || '').trim(),
      cta: String(plan.cta || '').trim(),
      featured: Boolean(plan.featured),
      features: parseFeaturesFromText(plan.featuresText),
    }
  }),
})

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
  const [searchParams, setSearchParams] = useSearchParams()

  const [contentList, setContentList] = useState([])
  const [_listLoading, setListLoading] = useState(true)
  const [_listError, setListError] = useState('')

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
  const [rowUploadLoadingKey, setRowUploadLoadingKey] = useState('')
  const [newRowUploadError, setNewRowUploadError] = useState('')
  const [newRowUploadMessage, setNewRowUploadMessage] = useState('')
  const [editorRowUploadError, setEditorRowUploadError] = useState('')
  const [editorRowUploadMessage, setEditorRowUploadMessage] = useState('')
  const [pricingForm, setPricingForm] = useState(() => cloneDefaultPricingForm())
  const [pricingSaveLoading, setPricingSaveLoading] = useState(false)
  const [pricingSaveError, setPricingSaveError] = useState('')
  const [pricingSaveMessage, setPricingSaveMessage] = useState('')

  const token = useMemo(() => localStorage.getItem('token') || '', [])
  const sidebarSlug = useMemo(() => String(searchParams.get('page') || '').trim().toLowerCase(), [searchParams])

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
      if (!selectedSlug && !sidebarSlug && items[0]?.slug) setSelectedSlug(items[0].slug)
    } catch (error) {
      setListError(error.message || 'Unable to load page list.')
    } finally {
      setListLoading(false)
    }
  }, [adminFetch, selectedSlug, sidebarSlug])

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

  useEffect(() => {
    if (!sidebarSlug) return
    setSelectedSlug(sidebarSlug)
  }, [sidebarSlug])

  useEffect(() => {
    if (selectedSlug !== 'pricingplan') return
    setPricingForm(normalizePricingForm(selectedPage?.content || {}))
    setPricingSaveError('')
    setPricingSaveMessage('')
  }, [selectedPage, selectedSlug])

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
      handleSelectPage(slug)
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

  const setPricingField = (key, value) => {
    setPricingForm((prev) => ({ ...prev, [key]: value }))
  }

  const setPricingPlanField = (index, key, value) => {
    setPricingForm((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, i) => (i === index ? { ...plan, [key]: value } : plan)),
    }))
  }

  const handleSavePricingForm = async () => {
    if (selectedSlug !== 'pricingplan') return

    setPricingSaveLoading(true)
    setPricingSaveError('')
    setPricingSaveMessage('')
    try {
      const content = buildPricingContentFromForm(pricingForm)
      const data = await adminFetch('/api/admin/content/pricingplan', {
        method: 'PUT',
        body: JSON.stringify({ content }),
      })

      const pageData = data?.data || null
      setSelectedPage(pageData)
      const rows = flattenObject(pageData?.content || {})
      setEditorRows(rows.length ? rows : [EMPTY_ROW])
      setPricingSaveMessage('Pricing plan content saved successfully.')
      await loadContentList()
    } catch (error) {
      setPricingSaveError(error.message || 'Pricing plan save failed.')
    } finally {
      setPricingSaveLoading(false)
    }
  }

  const selectedPageTitle = selectedPage?.content?.pageTitle || selectedSlug || 'Select Page'
  const totalPages = contentList.length
  const customPages = contentList.filter((item) => item?.hasCustomContent).length

  const handleSelectPage = (slug) => {
    if (!slug) return
    setSelectedSlug(slug)
    const next = new URLSearchParams(searchParams)
    next.set('page', slug)
    setSearchParams(next)
  }

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

      <div>
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

          {selectedSlug === 'pricingplan' ? (
            <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-indigo-950">Pricing Plan Form</h3>
                <button
                  type="button"
                  onClick={() => setPricingForm(normalizePricingForm(selectedPage?.content || {}))}
                  className="rounded-lg border border-indigo-300 bg-white px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  RESET FORM
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={pricingForm.pageTitle}
                  onChange={(e) => setPricingField('pageTitle', e.target.value)}
                  placeholder="Page Title"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.heroWatermark}
                  onChange={(e) => setPricingField('heroWatermark', e.target.value)}
                  placeholder="Hero Watermark"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.sectionTag}
                  onChange={(e) => setPricingField('sectionTag', e.target.value)}
                  placeholder="Section Tag"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.sectionTitle}
                  onChange={(e) => setPricingField('sectionTitle', e.target.value)}
                  placeholder="Section Title"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <textarea
                  value={pricingForm.sectionDescription}
                  onChange={(e) => setPricingField('sectionDescription', e.target.value)}
                  placeholder="Section Description"
                  rows={3}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 md:col-span-2"
                />
                <input
                  type="text"
                  value={pricingForm.billingMonthlyLabel}
                  onChange={(e) => setPricingField('billingMonthlyLabel', e.target.value)}
                  placeholder="Monthly Label"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.billingYearlyLabel}
                  onChange={(e) => setPricingField('billingYearlyLabel', e.target.value)}
                  placeholder="Yearly Label"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.billingSaveBadge}
                  onChange={(e) => setPricingField('billingSaveBadge', e.target.value)}
                  placeholder="Yearly Badge Text"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.includesLabel}
                  onChange={(e) => setPricingField('includesLabel', e.target.value)}
                  placeholder="Includes Label"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.enterpriseText}
                  onChange={(e) => setPricingField('enterpriseText', e.target.value)}
                  placeholder="Enterprise Text"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <input
                  type="text"
                  value={pricingForm.enterpriseCtaText}
                  onChange={(e) => setPricingField('enterpriseCtaText', e.target.value)}
                  placeholder="Enterprise CTA Text"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div className="mt-4 space-y-4">
                {pricingForm.plans.map((plan, index) => (
                  <div key={`pricing-form-plan-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="mb-3 text-sm font-bold text-slate-800">Plan {index + 1}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        type="text"
                        value={plan.id}
                        onChange={(e) => setPricingPlanField(index, 'id', e.target.value)}
                        placeholder="Plan Id"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                      />
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => setPricingPlanField(index, 'name', e.target.value)}
                        placeholder="Plan Name"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                      />
                      <input
                        type="number"
                        value={plan.monthlyPrice}
                        onChange={(e) => setPricingPlanField(index, 'monthlyPrice', e.target.value)}
                        placeholder="Monthly Price"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                      />
                      <input
                        type="number"
                        value={plan.yearlyPrice}
                        onChange={(e) => setPricingPlanField(index, 'yearlyPrice', e.target.value)}
                        placeholder="Yearly Price"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                      />
                      <input
                        type="text"
                        value={plan.cta}
                        onChange={(e) => setPricingPlanField(index, 'cta', e.target.value)}
                        placeholder="Button Text"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                      />
                      <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={Boolean(plan.featured)}
                          onChange={(e) => setPricingPlanField(index, 'featured', e.target.checked)}
                        />
                        Featured Plan
                      </label>
                      <textarea
                        value={plan.description}
                        onChange={(e) => setPricingPlanField(index, 'description', e.target.value)}
                        placeholder="Plan Description"
                        rows={2}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 md:col-span-2"
                      />
                      <textarea
                        value={plan.featuresText}
                        onChange={(e) => setPricingPlanField(index, 'featuresText', e.target.value)}
                        placeholder={'+ Feature one\n- Feature two'}
                        rows={6}
                        className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs outline-none focus:border-slate-500 md:col-span-2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSavePricingForm}
                  disabled={pricingSaveLoading}
                  className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pricingSaveLoading ? 'SAVING PRICING...' : 'SAVE PRICING FORM'}
                </button>
                {pricingSaveError ? <p className="text-sm font-medium text-red-600">{pricingSaveError}</p> : null}
                {pricingSaveMessage ? <p className="text-sm font-medium text-emerald-700">{pricingSaveMessage}</p> : null}
              </div>
            </div>
          ) : null}

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
