import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../utils/api'

const contentCache = new Map()

function usePageContent(slug, fallback = {}) {
  const normalizedSlug = String(slug || '').trim().toLowerCase()
  const [contentBySlug, setContentBySlug] = useState({})

  useEffect(() => {
    if (!normalizedSlug || contentCache.has(normalizedSlug)) {
      return
    }

    let active = true

    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/content/${normalizedSlug}`)
        const data = await response.json().catch(() => ({}))

        if (!response.ok || !data?.data) {
          return
        }

        contentCache.set(normalizedSlug, data.data)
        if (active) {
          setContentBySlug((prev) => ({ ...prev, [normalizedSlug]: data.data }))
        }
      } catch {
        // no-op: keep fallback when request fails
      }
    }

    fetchContent()

    return () => {
      active = false
    }
  }, [normalizedSlug])

  if (!normalizedSlug) return fallback
  return contentBySlug[normalizedSlug] || contentCache.get(normalizedSlug) || fallback
}

export default usePageContent
