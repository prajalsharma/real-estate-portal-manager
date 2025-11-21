import { NextRequest, NextResponse } from 'next/server'
import { getAllProperties } from '@/lib/sanity/queries'
import { PropertyFilters } from '@/lib/sanity/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Extract filter parameters from URL with validation
    const locationParam = searchParams.get('location')
    const propertyTypeParam = searchParams.get('propertyType')
    const statusParam = searchParams.get('status')
    const minPriceParam = searchParams.get('minPrice')
    const maxPriceParam = searchParams.get('maxPrice')
    const bedsParam = searchParams.get('beds')
    
    // Parse numeric values with validation
    const minPrice = minPriceParam ? Number(minPriceParam) : undefined
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined
    
    // Validate numeric inputs
    if ((minPriceParam && isNaN(minPrice!)) || (maxPriceParam && isNaN(maxPrice!))) {
      return NextResponse.json({
        success: false,
        error: 'Invalid price values. Please provide valid numbers.',
        properties: [],
        total: 0
      }, { status: 400 })
    }
    
    // Validate price range
    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      return NextResponse.json({
        success: false,
        error: 'Minimum price cannot be greater than maximum price.',
        properties: [],
        total: 0
      }, { status: 400 })
    }
    
    const filters: PropertyFilters = {
      location: locationParam?.trim() || undefined,
      propertyType: propertyTypeParam?.trim() || undefined,
      status: statusParam?.trim() || undefined,
      minPrice: minPrice !== undefined && !isNaN(minPrice) && minPrice >= 0 ? minPrice : undefined,
      maxPrice: maxPrice !== undefined && !isNaN(maxPrice) && maxPrice >= 0 ? maxPrice : undefined,
      beds: bedsParam?.trim() || undefined,
    }
    
    // Remove undefined/empty values to create clean filter object
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => {
        if (v === undefined || v === null) return false
        if (typeof v === 'string' && v.trim() === '') return false
        return true
      })
    ) as PropertyFilters
    
    // Validate pagination parameters
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(Math.max(1, Number(searchParams.get('limit')) || 12), 100) // Max 100 per page
    
    // Log the search for debugging
    console.log('🔍 Search API called with filters:', cleanFilters)
    
    // Query Sanity database
    const result = await getAllProperties(cleanFilters, page, limit)
    
    console.log(` Search completed: Found ${result.total} properties`)
    
    return NextResponse.json({
      success: true,
      properties: result.properties,
      total: result.total,
      hasMore: result.hasMore,
      filters: cleanFilters,
      page,
      limit
    })
  } catch (error) {
    console.error('❌ Search API error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Search failed',
      properties: [],
      total: 0
    }, { status: 500 })
  }
}
