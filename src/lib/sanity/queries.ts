import { groq } from 'next-sanity'
import { client } from './client'
import {
  PropertyQueryResult,
  SanityAgent,
  BlogQueryResult,
  PropertyFilters,
  PropertiesResponse,
  AgentsResponse,
  BlogResponse,
  PROPERTY_QUERY_FIELDS,
  AGENT_QUERY_FIELDS,
  BLOG_QUERY_FIELDS
} from './types'

// Properties Queries
export const getFeaturedAgents = async (limit: number = 4): Promise<SanityAgent[]> => {
  const query = groq`
    *[_type == "agent"] | order(sold desc) [0...${limit}] {
      ${AGENT_QUERY_FIELDS}
    }
  `
  return await client.fetch(query)
}

export const getCarouselProperties = async (limit: number = 4): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property" && carousel == true && (status == "For Sale" || status == "For Rent")] | order(publishedAt desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  return await client.fetch(query)
}

export const getAllProperties = async (filters?: PropertyFilters, page: number = 1, limit: number = 12): Promise<PropertiesResponse> => {
  const offset = (page - 1) * limit
  let filterConditions = '_type == "property"'
  
  if (filters?.location) {
    filterConditions += ` && (address.city match "*${filters.location}*" || address.region match "*${filters.location}*")`
  }
  
  if (filters?.propertyType) {
    filterConditions += ` && propertyType == "${filters.propertyType}"`
  }
  
  if (filters?.status) {
    filterConditions += ` && status == "${filters.status}"`
  }
  
  if (filters?.minPrice) {
    filterConditions += ` && price >= ${filters.minPrice}`
  }
  
  if (filters?.maxPrice) {
    filterConditions += ` && price <= ${filters.maxPrice}`
  }
  
  if (filters?.beds) {
    if (filters.beds === '5+') {
      filterConditions += ` && beds >= 5`
    } else {
      filterConditions += ` && beds == ${filters.beds}`
    }
  }
  
  // Note: NO filtering on featured or carousel flags here, all properties fetched
  
  const propertiesQuery = groq`
    *[${filterConditions}] | order(publishedAt desc) [${offset}...${offset + limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  
  const countQuery = groq`count(*[${filterConditions}])`
  
  const [properties, total] = await Promise.all([
    client.fetch(propertiesQuery),
    client.fetch(countQuery)
  ])
  
  return {
    properties,
    total,
    hasMore: total > offset + limit
  }
}
