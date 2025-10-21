import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import { SanityImage } from './types'

const builder = imageUrlBuilder(client)

// Generate image URL from Sanity image object
export function urlFor(source: SanityImage | string) {
  return builder.image(source)
}

// Safe image URL generator with fallback
export function safeImageUrl(image?: SanityImage | string, fallback?: string) {
  const defaultFallback = "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"
  try {
    if (!image) return fallback || defaultFallback
    
    // Check if image has valid asset reference
    if (typeof image === 'object' && (!image.asset || !image.asset._ref)) {
      return fallback || defaultFallback
    }
    
    const url = urlFor(image).url()
    return url || fallback || defaultFallback
  } catch {
    return fallback || defaultFallback
  }
}

// Generate optimized image URL with specific dimensions
export function getImageUrl(image: SanityImage | string, width?: number, height?: number, quality: number = 80) {
  try {
    let url = urlFor(image).quality(quality)
    
    if (width) {
      url = url.width(width)
    }
    
    if (height) {
      url = url.height(height)
    }
    
    return url.url()
  } catch {
    return "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"
  }
}

// Generate responsive image URLs for different screen sizes
export function getResponsiveImageUrls(image: SanityImage | string) {
  return {
    mobile: safeImageUrl(getImageUrl(image, 480, 320, 75)),
    tablet: safeImageUrl(getImageUrl(image, 768, 512, 80)),
    desktop: safeImageUrl(getImageUrl(image, 1200, 800, 85)),
    large: safeImageUrl(getImageUrl(image, 1600, 1067, 90))
  }
}

// Generate image srcSet for responsive images
export function getImageSrcSet(image: SanityImage | string) {
  const urls = getResponsiveImageUrls(image)
  return [
    `${urls.mobile} 480w`,
    `${urls.tablet} 768w`,
    `${urls.desktop} 1200w`,
    `${urls.large} 1600w`
  ].join(', ')
}

// Generate thumbnail URL
export function getThumbnailUrl(image: SanityImage | string, size: number = 200) {
  try {
    return urlFor(image)
      .width(size)
      .height(size)
      .fit('crop')
      .crop('center')
      .quality(80)
      .url()
  } catch {
    return "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=200&h=200&q=80"
  }
}

// Generate property card image URL with safe fallback
export function getPropertyCardImageUrl(image: SanityImage | string) {
  const placeholder = "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"
  
  try {
    // Check if image has valid asset reference
    if (typeof image === 'object' && (!image.asset || !image.asset._ref)) {
      return placeholder
    }
    
    const url = urlFor(image)
      .width(400)
      .height(300)
      .fit('crop')
      .crop('center')
      .quality(85)
      .url()
      
    return url || placeholder
  } catch {
    return placeholder
  }
}

// Generate hero image URL
export function getHeroImageUrl(image: SanityImage | string) {
  try {
    return urlFor(image)
      .width(1600)
      .height(900)
      .fit('crop')
      .crop('center')
      .quality(90)
      .url()
  } catch {
    return "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&h=900&q=80"
  }
}

// Generate agent avatar URL
export function getAgentAvatarUrl(image: SanityImage | string, size: number = 100) {
  try {
    return urlFor(image)
      .width(size)
      .height(size)
      .fit('crop')
      .crop('face')
      .quality(85)
      .url()
  } catch {
    return `https://images.unsplash.com/photo-1558222217-42c7baf5f8b9?q=80&w=${size}&auto=format&fit=crop&ixid=fallback`
  }
}

// Generate blog post image URL
export function getBlogImageUrl(image: SanityImage | string, width: number = 800, height: number = 400) {
  try {
    return urlFor(image)
      .width(width)
      .height(height)
      .fit('crop')
      .crop('center')
      .quality(85)
      .url()
  } catch {
    return `https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=${width}&h=${height}&q=80`
  }
}

// Get image metadata
export function getImageMetadata(image: SanityImage) {
  try {
    return {
      alt: image.alt || '',
      url: urlFor(image).url(),
      width: urlFor(image).width(800).url(),
      height: urlFor(image).height(600).url()
    }
  } catch {
    return {
      alt: '',
      url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&h=600&q=80",
      width: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
      height: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&h=600&q=80"
    }
  }
}

// Generate Next.js Image component props
export function getNextImageProps(image: SanityImage | string, width?: number, height?: number) {
  const src = width && height ? safeImageUrl(image) : safeImageUrl(image)
  const alt = typeof image === 'object' && image.alt ? image.alt : 'Property image'
  
  return {
    src,
    alt,
    ...(width && { width }),
    ...(height && { height })
  }
}