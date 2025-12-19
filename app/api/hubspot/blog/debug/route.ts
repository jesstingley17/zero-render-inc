import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const apiKey = process.env.HUBSPOT_API_KEY
  const blogId = process.env.HUBSPOT_BLOG_ID

  const debug = {
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + "..." : "not set",
    hasBlogId: !!blogId,
    blogId: blogId || "not set",
  }

  // Try to fetch from HubSpot
  if (apiKey) {
    try {
      const url = blogId
        ? `https://api.hubapi.com/content/api/v2/blog-posts?blogId=${blogId}&state=PUBLISHED&limit=5`
        : `https://api.hubapi.com/content/api/v2/blog-posts?state=PUBLISHED&limit=5`

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
      })

      debug.status = response.status
      debug.statusText = response.statusText

      if (response.ok) {
        const data = await response.json()
        debug.postCount = data.objects?.length || 0
        debug.success = true
      } else {
        const errorText = await response.text()
        debug.error = errorText
        debug.success = false
      }
    } catch (error: any) {
      debug.error = error.message
      debug.success = false
    }
  }

  return NextResponse.json(debug)
}

