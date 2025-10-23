'use client'

import dynamic from 'next/dynamic'
import config from '../../../spasic/sanity.config'

// Load Studio on the client only to avoid SSR tool resolution issues
const Studio = dynamic(() => import('next-sanity/studio').then(m => m.NextStudio), { ssr: false })

export default function StudioPage() {
  return <Studio config={config} />
}
