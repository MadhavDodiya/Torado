import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '../utils/api'

const fetchPageContent = (slug) => fetchJson(`/api/content/${slug}`)

export default function usePageContent(slug, fallback = {}) {
  const enabled = Boolean(slug)

  const { data, isSuccess } = useQuery({
    queryKey: ['pageContent', slug],
    queryFn: () => fetchPageContent(slug),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  return useMemo(() => {
    if (isSuccess && data?.data) {
      return { ...fallback, ...data.data }
    }
    return fallback
  }, [fallback, data, isSuccess])
}
