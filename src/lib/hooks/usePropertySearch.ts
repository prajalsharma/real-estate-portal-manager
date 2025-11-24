import { useState } from 'react'
import { PropertyQueryResult, PropertyFilters } from '@/lib/sanity/types'

interface SearchState {
  properties: PropertyQueryResult[]
  total: number
  loading: boolean
  error: string | null
  hasMore: boolean
}

interface SearchResponse {
  success: boolean
  properties: PropertyQueryResult[]
  total: number
  hasMore: boolean
  error?: string
}

export function usePropertySearch() {
  const [state, setState] = useState<SearchState>({
    properties: [],
    total: 0,
    loading: false,
    error: null,
    hasMore: false
  })

  const searchProperties = async (filters: PropertyFilters, page: number = 1, limit: number = 12) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Build query string from filters
      const params = new URLSearchParams()
      
      if (filters.location) params.append('location', filters.location)
      if (filters.propertyType) params.append('propertyType', filters.propertyType)
      if (filters.status) params.append('status', filters.status)
      if (filters.minPrice) params.append('minPrice', String(filters.minPrice))
      if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice))
      if (filters.beds) params.append('beds', filters.beds)
      
      params.append('page', String(page))
      params.append('limit', String(limit))
      
      console.log('🔍 Calling search API with params:', params.toString())
      
      const response = await fetch(`/api/search-properties?${params.toString()}`)
      const data: SearchResponse = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Search failed')
      }
      
      console.log('✅ Search results:', { total: data.total, count: data.properties.length })
      
      setState({
        properties: data.properties,
        total: data.total,
        hasMore: data.hasMore,
        loading: false,
        error: null
      })
      
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed'
      console.error('❌ Search error:', errorMessage)
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }))
      throw error
    }
  }

  const clearSearch = () => {
    setState({
      properties: [],
      total: 0,
      loading: false,
      error: null,
      hasMore: false
    })
  }

  return {
    properties: state.properties,
    total: state.total,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    searchProperties,
    clearSearch
  }
}
