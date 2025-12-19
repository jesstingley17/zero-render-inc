import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Edge Middleware for HubSpot Reverse Proxy
 * 
 * This middleware adds the X-HS-Public-Host header for HubSpot reverse proxy requests.
 * However, this typically needs to be configured at the CDN/proxy level (Cloudflare, etc.)
 * for it to work properly with HubSpot's validation.
 */
export function middleware(request: NextRequest) {
  // Check if this is a request to blog.zero-render.com (HubSpot reverse proxy)
  const host = request.headers.get("host")
  const isHubspotProxy = host?.includes("blog.zero-render.com")

  if (isHubspotProxy) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)
    
    // Add the HubSpot reverse proxy header
    requestHeaders.set("X-HS-Public-Host", "blog.zero-render.com")
    
    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // For all other requests, continue normally
  return NextResponse.next()
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

