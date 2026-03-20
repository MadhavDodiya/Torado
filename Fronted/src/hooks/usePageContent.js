import { useEffect, useState } from 'react'
import { buildApiUrl } from '../utils/api'

const contentCache = new Map()

function usePageContent(slug, fallback = {}) {
  const normalizedSlug = String(slug || '').trim().toLowerCase()

  const [contentBySlug, setContentBySlug] = useState(() => {
    if (normalizedSlug && contentCache.has(normalizedSlug)) {
      return { [normalizedSlug]: contentCache.get(normalizedSlug) }
    }
    return {}
  })

  useEffect(() => {
    if (!normalizedSlug) return

    // Cache hit: no state update needed if already seeded
    if (contentCache.has(normalizedSlug)) {
      const cached = contentCache.get(normalizedSlug)
      setContentBySlug((prev) => {
        if (prev[normalizedSlug]) return prev
        return { ...prev, [normalizedSlug]: cached }
      })
      return
    }

    let active = true

    const fetchContent = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/content/${normalizedSlug}`))

        if (!response.ok) return

        const data = await response.json().catch(() => null)

        if (!data?.data) return

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
  return contentBySlug[normalizedSlug] ?? contentCache.get(normalizedSlug) ?? fallback
}

export default usePageContent