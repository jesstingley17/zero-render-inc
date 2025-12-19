/**
 * Custom image loader for CDN integration
 * This allows Next.js Image component to use cdn.zero-render.com
 * 
 * Note: For Next.js Image optimization to work with CDN, you may need to:
 * 1. Configure your CDN to proxy image optimization requests to Vercel
 * 2. Or use a service like Cloudflare Images or Imgix
 */
export default function myImageLoader({ src, width, quality }) {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.zero-render.com'
  
  // Handle external URLs (from HubSpot, etc.) - return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // If it's already from our CDN, return as-is
    if (src.includes('cdn.zero-render.com')) {
      return src
    }
    // For external images, you might want to proxy through CDN
    // For now, return external URLs as-is
    return src
  }
  
  // Handle local images - serve through CDN
  // Next.js will optimize these, then serve from CDN
  return `${cdnUrl}${src}?w=${width}&q=${quality || 75}`
}

