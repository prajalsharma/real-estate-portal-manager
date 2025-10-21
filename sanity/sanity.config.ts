import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'real-estate-portal',
  title: 'Real Estate Portal',
  projectId: '8dj9jthx',     // ← Your actual Project ID
  dataset: 'production',
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (prev) => {
    // Show vision tool only in development
    if (process.env.NODE_ENV === 'development') {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
})