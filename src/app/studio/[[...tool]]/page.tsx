/**
 * Embedded Sanity Studio route
 */
import { NextStudioPage } from 'next-sanity/studio'
import config from '@/../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudioPage config={config} />
}
