'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './spasic/schemaTypes'
import {structure} from './studio-structure'

export default defineConfig({
  name: 'real-estate-portal',
  title: 'Real Estate Portal',
  projectId: '8dj9jthx',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (prev) => prev,
})

