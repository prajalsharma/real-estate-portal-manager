"use client";

import { useEffect, useState, useCallback } from "react";
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
  getCarouselProperties,
  getAllProperties,
  getFeaturedAgents
} from './queries'

// (hooks unchanged)
// ... all hook content as before ...

export function useAllProperties(filters?: PropertyFilters, page: number = 1, limit: number = 12) {
  const [properties, setProperties] = useState<PropertyQueryResult[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAllProperties(filters, page, limit)
      setProperties(data.properties)
      setTotal(data.total)
      setHasMore(data.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties')
    } finally {
      setLoading(false)
    }
  }, [filters, page, limit])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { properties, total, hasMore, loading, error, refetch }
}

export function useCarouselProperties(limit: number = 4) {
  const [properties, setProperties] = useState<PropertyQueryResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCarouselProperties(limit)
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch carousel properties')
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { properties, loading, error, refetch }
}

// ... rest of hooks unchanged ...
