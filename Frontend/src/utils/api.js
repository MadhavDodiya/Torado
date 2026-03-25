const rawApiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim()
export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, '')

export const buildApiUrl = (path = '') => {
  const normalizedPath = String(path || '').startsWith('/') ? String(path || '') : `/${String(path || '')}`
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath
}

export const fetchJson = async (path = '', options = {}) => {
  const response = await fetch(buildApiUrl(path), options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed')
  }

  return payload
}

export const getFriendlyApiError = (error, fallbackMessage = 'Something went wrong') => {
  if (error?.name === 'TypeError' && /fetch/i.test(String(error?.message || ''))) {
    return 'Server se connection nahi ho raha. API/Backend URL check karo.'
  }
  return error?.message || fallbackMessage
}
