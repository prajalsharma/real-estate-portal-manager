import { createClient } from '@sanity/client'
import { cache } from 'react'

export const client = createClient({
  projectId: '8dj9jthx',
  dataset:'production' ,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_API_TOKEN, // Only if you want to update content with the client
})

// Cached client for server-side rendering
export const cachedClient = cache(client.fetch.bind(client))

export default client