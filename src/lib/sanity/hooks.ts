import { useEffect, useState } from 'react'
import {
  PropertyQueryResult,
  SanityAgent,
  BlogQueryResult,
  PropertyFilters,
  PropertiesResponse,
  AgentsResponse,
  BlogResponse
} from './types'
import {
  getFeaturedProperties,
  getAllProperties,
  getFeaturedAgents,
  getAllAgents,
  getBlogPosts,
  getPropertyStats,
  getRecentlyAddedProperties,
  searchProperties
} from './queries'

// Properties Hooks
export function useFeaturedProperties(limit: number = 4) {
  const [properties, setProperties] = useState<PropertyQueryResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const data = await getFeaturedProperties(limit)
        setProperties(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [limit])

  return { properties, loading, error, refetch: () => fetchProperties() }
}

export function useProperties(filters?: PropertyFilters, page: number = 1, limit: number = 12) {
  const [data, setData] = useState<PropertiesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const result = await getAllProperties(filters, page, limit)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters, page, limit])

  return { 
    properties: data?.properties || [], 
    total: data?.total || 0, 
    hasMore: data?.hasMore || false, 
    loading, 
    error 
  }
}

export function useRecentProperties(limit: number = 6) {
  const [properties, setProperties] = useState<PropertyQueryResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const data = await getRecentlyAddedProperties(limit)
        setProperties(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [limit])

  return { properties, loading, error }
}

// Agents Hooks
export function useFeaturedAgents(limit: number = 4) {
  const [agents, setAgents] = useState<SanityAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true)
        const data = await getFeaturedAgents(limit)
        setAgents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch agents')
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [limit])

  return { agents, loading, error }
}

export function useAllAgents() {
  const [data, setData] = useState<AgentsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true)
        const result = await getAllAgents()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch agents')
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  return { 
    agents: data?.agents || [], 
    total: data?.total || 0, 
    loading, 
    error 
  }
}

// Blog Hooks
export function useBlogPosts(limit: number = 4) {
  const [data, setData] = useState<BlogResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const result = await getBlogPosts(limit)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  return { 
    posts: data?.posts || [], 
    total: data?.total || 0, 
    hasMore: data?.hasMore || false, 
    loading, 
    error 
  }
}

// Statistics Hook
export function usePropertyStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const data = await getPropertyStats()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}

// Search Hook
export function usePropertySearch(searchTerm: string, limit: number = 10) {
  const [properties, setProperties] = useState<PropertyQueryResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProperties([])
      return
    }

    async function search() {
      try {
        setLoading(true)
        const data = await searchProperties(searchTerm, limit)
        setProperties(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timeoutId = setTimeout(search, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, limit])

  return { properties, loading, error }
}

// Generic data fetcher hook
export function useSanityData<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refetch()
  }, deps)

  return { data, loading, error, refetch }
}