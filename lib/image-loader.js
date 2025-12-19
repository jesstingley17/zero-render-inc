/**
 * Custom image loader for CDN integration
 * This allows Next.js Image component to use your CDN subdomain
 */
export default function myImageLoader({ src, width, quality }) {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL
  
  // If CDN is configured, use it for images
  if (cdnUrl) {
    // Handle external URLs
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }
    
    // Handle local images - serve through CDN
    return `${cdnUrl}${src}?w=${width}&q=${quality || 75}`
  }
  
  // Fallback to default Next.js image optimization
  return src
}

