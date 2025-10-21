/**
 * Embedded Sanity Studio route
 * Handles all /studio/* routes using Next.js catch-all routing
 */
import { NextStudioPage } from 'next-sanity/studio'
import config from '../../../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudioPage config={config} />
}
