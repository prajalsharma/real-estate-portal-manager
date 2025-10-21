import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import { SanityImage } from './types'

const builder = imageUrlBuilder(client)

// Generate image URL from Sanity image object
export function urlFor(source: SanityImage | string) {
  return builder.image(source)
}

// Generate optimized image URL with specific dimensions
export function getImageUrl(image: SanityImage | string, width?: number, height?: number, quality: number = 80) {
  let url = urlFor(image).quality(quality)
  
  if (width) {
    url = url.width(width)
  }
  
  if (height) {
    url = url.height(height)
  }
  
  return url.url()
}

// Generate responsive image URLs for different screen sizes
export function getResponsiveImageUrls(image: SanityImage | string) {
  return {
    mobile: getImageUrl(image, 480, 320, 75),
    tablet: getImageUrl(image, 768, 512, 80),
    desktop: getImageUrl(image, 1200, 800, 85),
    large: getImageUrl(image, 1600, 1067, 90)
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
  return urlFor(image)
    .width(size)
    .height(size)
    .fit('crop')
    .crop('center')
    .quality(80)
    .url()
}

// Generate property card image URL
export function getPropertyCardImageUrl(image: SanityImage | string) {
  return urlFor(image)
    .width(400)
    .height(300)
    .fit('crop')
    .crop('center')
    .quality(85)
    .url()
}

// Generate hero image URL
export function getHeroImageUrl(image: SanityImage | string) {
  return urlFor(image)
    .width(1600)
    .height(900)
    .fit('crop')
    .crop('center')
    .quality(90)
    .url()
}

// Generate agent avatar URL
export function getAgentAvatarUrl(image: SanityImage | string, size: number = 100) {
  return urlFor(image)
    .width(size)
    .height(size)
    .fit('crop')
    .crop('face')
    .quality(85)
    .url()
}

// Generate blog post image URL
export function getBlogImageUrl(image: SanityImage | string, width: number = 800, height: number = 400) {
  return urlFor(image)
    .width(width)
    .height(height)
    .fit('crop')
    .crop('center')
    .quality(85)
    .url()
}

// Get image metadata
export function getImageMetadata(image: SanityImage) {
  return {
    alt: image.alt || '',
    url: urlFor(image).url(),
    width: urlFor(image).width(800).url(),
    height: urlFor(image).height(600).url()
  }
}

// Generate Next.js Image component props
export function getNextImageProps(image: SanityImage | string, width?: number, height?: number) {
  const src = width && height ? getImageUrl(image, width, height) : urlFor(image).url()
  const alt = typeof image === 'object' && image.alt ? image.alt : 'Property image'
  
  return {
    src,
    alt,
    ...(width && { width }),
    ...(height && { height })
  }
}