import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { muxInput } from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'real-estate-portal',
  title: 'Real Estate Portal',
  projectId: '8dj9jthx',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
    muxInput(), // <-- add Mux for video uploads
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (prev) => prev,
})
