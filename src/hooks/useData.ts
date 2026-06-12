import { useState, useEffect, useRef } from 'react'

export function useData<T>(fetchFn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchFnRef = useRef(fetchFn)

  useEffect(() => {
    fetchFnRef.current = fetchFn
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFnRef.current()
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}