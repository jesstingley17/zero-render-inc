/**
 * HubSpot Reverse Proxy Utilities
 * 
 * Rewrites HubSpot URLs to use the reverse proxy domain (blog.zero-render.com)
 * This improves performance and ensures all assets load through your domain.
 * 
 * Note: Using blog.zero-render.com instead of hub.zero-render.com to avoid
 * conflict with Starlight Hyperlift Manager deployment.
 */

const HUBSPOT_REVERSE_PROXY_DOMAIN = 'blog.zero-render.com'

/**
 * Common HubSpot domain patterns to replace
 */
const HUBSPOT_DOMAINS = [
  'cdn2.hubspot.net',
  'cdn.hubspot.com',
  'hubspotusercontent30.net',
  'hubspotusercontent20.net',
  'hubspotusercontent10.net',
  'hubspotusercontent.net',
  'hs-sites.com',
  'hs-sitescontent.com',
  'hsforms.com',
  'api.hubapi.com',
]

/**
 * Check if a URL is a HubSpot URL
 */
function isHubSpotUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url.startsWith('/') ? `https://hubspot.com${url}` : url)
    const hostname = urlObj.hostname.toLowerCase()
    
    // Check if it's a HubSpot domain
    return HUBSPOT_DOMAINS.some(domain => hostname.includes(domain)) ||
           hostname.includes('hubspot') ||
           urlObj.pathname.startsWith('/hubfs/') ||
           urlObj.pathname.startsWith('/hs-fs/')
  } catch {
    // If URL parsing fails, check if it's a relative HubSpot path
    return url.startsWith('/hubfs/') || url.startsWith('/hs-fs/')
  }
}

/**
 * Rewrite a HubSpot URL to use the reverse proxy
 */
export function rewriteHubSpotUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return url || null
  
  // If already using reverse proxy, return as-is
  if (url.includes(HUBSPOT_REVERSE_PROXY_DOMAIN)) {
    return url
  }
  
  // If not a HubSpot URL, return as-is
  if (!isHubSpotUrl(url)) {
    return url
  }
  
  try {
    // Handle relative URLs (starting with /)
    if (url.startsWith('/')) {
      // If it's a HubSpot path like /hubfs/ or /hs-fs/, prepend the reverse proxy domain
      if (url.startsWith('/hubfs/') || url.startsWith('/hs-fs/')) {
        return `https://${HUBSPOT_REVERSE_PROXY_DOMAIN}${url}`
      }
      // Otherwise, return as-is (might be a relative path on our site)
      return url
    }
    
    // Handle protocol-relative URLs (//)
    if (url.startsWith('//')) {
      const urlObj = new URL(`https:${url}`)
      return `https://${HUBSPOT_REVERSE_PROXY_DOMAIN}${urlObj.pathname}${urlObj.search}${urlObj.hash}`
    }
    
    // Handle full URLs
    const urlObj = new URL(url)
    return `https://${HUBSPOT_REVERSE_PROXY_DOMAIN}${urlObj.pathname}${urlObj.search}${urlObj.hash}`
  } catch (error) {
    // If URL parsing fails, return original
    console.warn('Failed to rewrite HubSpot URL:', url, error)
    return url
  }
}

/**
 * Rewrite all HubSpot URLs in HTML content
 * This replaces img src, a href, and other asset URLs
 */
export function rewriteHubSpotContent(html: string | null | undefined): string {
  if (!html || typeof html !== 'string') return html || ''
  
  // Replace img src attributes and rewrite URLs
  html = html.replace(
    /<img([^>]*)\ssrc=["']([^"']+)["']([^>]*)>/gi,
    (match, before, src, after) => {
      const rewrittenSrc = rewriteHubSpotUrl(src)
      
      // Extract existing width/height if present
      const widthMatch = match.match(/width=["']?(\d+)["']?/i)
      const heightMatch = match.match(/height=["']?(\d+)["']?/i)
      
      // Add width, height, and lazy loading attributes if not present
      let optimizedAfter = after
      if (!widthMatch) {
        optimizedAfter = ` width="800"${optimizedAfter}`
      }
      if (!heightMatch) {
        optimizedAfter = ` height="600"${optimizedAfter}`
      }
      if (!match.includes('loading=')) {
        optimizedAfter = ` loading="lazy" decoding="async"${optimizedAfter}`
      }
      if (!match.includes('style=')) {
        optimizedAfter = ` style="max-width: 100%; height: auto;"${optimizedAfter}`
      }
      
      // Use the rewritten URL directly (not Next.js image optimization for now)
      // This ensures images load correctly
      return `<img${before} src="${rewrittenSrc}"${optimizedAfter}>`
    }
  )
  
  // Replace a href attributes (for links to HubSpot assets)
  html = html.replace(
    /<a([^>]*)\shref=["']([^"']+)["']([^>]*)>/gi,
    (match, before, href, after) => {
      // Only rewrite if it's a HubSpot URL
      if (isHubSpotUrl(href)) {
        const rewrittenHref = rewriteHubSpotUrl(href)
        return `<a${before} href="${rewrittenHref}"${after}>`
      }
      return match
    }
  )
  
  // Replace background-image URLs in style attributes
  html = html.replace(
    /style=["']([^"']*background-image:\s*url\(([^)]+)\)[^"']*)["']/gi,
    (match, styleContent, url) => {
      if (isHubSpotUrl(url)) {
        const rewrittenUrl = rewriteHubSpotUrl(url)
        return `style="${styleContent.replace(url, rewrittenUrl)}"`
      }
      return match
  })
  
  // Replace srcset attributes (for responsive images)
  html = html.replace(
    /srcset=["']([^"']+)["']/gi,
    (match, srcset) => {
      const rewrittenSrcset = srcset
        .split(',')
        .map((src: string) => {
          const parts = src.trim().split(/\s+/)
          const url = parts[0]
          const descriptor = parts.slice(1).join(' ')
          if (isHubSpotUrl(url)) {
            return `${rewriteHubSpotUrl(url)} ${descriptor}`.trim()
          }
          return src.trim()
        })
        .join(', ')
      return `srcset="${rewrittenSrcset}"`
    }
  )
  
  return html
}

