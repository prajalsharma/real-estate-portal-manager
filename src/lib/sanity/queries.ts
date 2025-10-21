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
export const getFeaturedProperties = async (limit: number = 4): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property" && featured == true && status in ["For Sale", "For Rent"]] | order(publishedAt desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  return await client.fetch(query)
}

export const getAllProperties = async (filters?: PropertyFilters, page: number = 1, limit: number = 12): Promise<PropertiesResponse> => {
  const offset = (page - 1) * limit
  
  // Build filter conditions
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
  
  if (filters?.featured !== undefined) {
    filterConditions += ` && featured == ${filters.featured}`
  }

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

export const getPropertyBySlug = async (slug: string): Promise<PropertyQueryResult | null> => {
  const query = groq`
    *[_type == "property" && slug.current == $slug][0] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  return await client.fetch(query, { slug })
}

// Agents Queries
export const getAllAgents = async (): Promise<AgentsResponse> => {
  const agentsQuery = groq`
    *[_type == "agent"] | order(sold desc) {
      ${AGENT_QUERY_FIELDS}
    }
  `
  
  const countQuery = groq`count(*[_type == "agent"])`
  
  const [agents, total] = await Promise.all([
    client.fetch(agentsQuery),
    client.fetch(countQuery)
  ])
  
  return { agents, total }
}

export const getFeaturedAgents = async (limit: number = 4): Promise<SanityAgent[]> => {
  const query = groq`
    *[_type == "agent"] | order(sold desc) [0...${limit}] {
      ${AGENT_QUERY_FIELDS}
    }
  `
  return await client.fetch(query)
}

export const getAgentById = async (id: string): Promise<SanityAgent | null> => {
  const query = groq`
    *[_type == "agent" && _id == $id][0] {
      ${AGENT_QUERY_FIELDS}
    }
  `
  return await client.fetch(query, { id })
}

// Blog Queries
export const getBlogPosts = async (limit: number = 4): Promise<BlogResponse> => {
  const postsQuery = groq`
    *[_type == "blogPost"] | order(publishedAt desc) [0...${limit}] {
      ${BLOG_QUERY_FIELDS}
    }
  `
  
  const countQuery = groq`count(*[_type == "blogPost"])`
  
  const [posts, total] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(countQuery)
  ])
  
  return {
    posts,
    total,
    hasMore: total > limit
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogQueryResult | null> => {
  const query = groq`
    *[_type == "blogPost" && slug.current == $slug][0] {
      ${BLOG_QUERY_FIELDS}
    }
  `
  return await client.fetch(query, { slug })
}

// Location Queries
export const getLocations = async () => {
  const query = groq`
    *[_type == "location"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      region,
      country,
      coordinates,
      description,
      image,
      featured,
      "propertyCount": count(*[_type == "property" && address.city match name])
    }
  `
  return await client.fetch(query)
}

// Search Queries
export const searchProperties = async (searchTerm: string, limit: number = 10): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property" && (
      title match "*${searchTerm}*" ||
      description match "*${searchTerm}*" ||
      address.city match "*${searchTerm}*" ||
      address.region match "*${searchTerm}*" ||
      features[] match "*${searchTerm}*"
    )] | order(_score desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  return await client.fetch(query)
}

// Statistics Queries
export const getPropertyStats = async () => {
  const queries = {
    totalProperties: groq`count(*[_type == "property"])`,
    forSale: groq`count(*[_type == "property" && status == "For Sale"])`,
    forRent: groq`count(*[_type == "property" && status == "For Rent"])`,
    sold: groq`count(*[_type == "property" && status == "Sold"])`,
    averagePrice: groq`math::avg(*[_type == "property" && status == "For Sale"].price)`,
    totalAgents: groq`count(*[_type == "agent"])`,
    totalLocations: groq`count(*[_type == "location"])`
  }
  
  const results = await Promise.all(
    Object.entries(queries).map(async ([key, query]) => [
      key,
      await client.fetch(query)
    ])
  )
  
  return Object.fromEntries(results)
}

// Recently Added
export const getRecentlyAddedProperties = async (limit: number = 6): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property"] | order(_createdAt desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  return await client.fetch(query)
}

// Similar Properties
export const getSimilarProperties = async (propertyId: string, propertyType: string, limit: number = 4): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property" && _id != $propertyId && propertyType == $propertyType] | order(publishedAt desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `
  return await client.fetch(query, { propertyId, propertyType })
}