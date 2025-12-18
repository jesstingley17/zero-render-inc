import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

interface HubSpotBlogPost {
  id: string
  name: string
  slug: string
  state: string
  publishDate: number
  created: number
  updated: number
  featuredImage: string | null
  postSummary: string
  postBody: string
  metaDescription: string
  blogAuthorDisplayName: string
  authorName: string
  absoluteUrl: string
  url: string
  [key: string]: any // Allow additional properties from HubSpot
}

// Helper function to fetch blog posts from HubSpot
async function fetchHubSpotBlogPosts() {
  const apiKey = process.env.HUBSPOT_API_KEY
  const blogId = process.env.HUBSPOT_BLOG_ID
  const blogDomain = process.env.HUBSPOT_BLOG_DOMAIN

  if (!apiKey) {
    throw new Error("HUBSPOT_API_KEY is not configured")
  }

  if (!blogId && !blogDomain) {
    throw new Error("HUBSPOT_BLOG_ID or HUBSPOT_BLOG_DOMAIN must be configured")
  }

  try {
    // Fetch blog posts from HubSpot Content API v2
    // HubSpot Content API v2 is the standard for blog posts
    const url = blogId
      ? `https://api.hubapi.com/content/api/v2/blog-posts?blogId=${blogId}&state=PUBLISHED&limit=50`
      : `https://api.hubapi.com/content/api/v2/blog-posts?state=PUBLISHED&limit=50`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HubSpot API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data.objects || []
  } catch (error) {
    console.error("HubSpot API error:", error)
    throw error
  }
}

// Transform HubSpot post to our format
function transformHubSpotPost(post: HubSpotBlogPost) {
  // Calculate read time (approximately 200 words per minute)
  const wordCount = post.postBody?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0
  const readTime = Math.ceil(wordCount / 200)

  return {
    slug: post.slug || post.id.toString(),
    title: post.name || "Untitled",
    excerpt: post.postSummary || post.metaDescription || "",
    author: post.blogAuthorDisplayName || post.authorName || "ZeroRender Team",
    date: new Date(post.publishDate || post.created).toISOString().split("T")[0],
    readTime: `${readTime} min read`,
    category: "Blog", // You can map this from HubSpot topics/tags if needed
    content: post.postBody || "",
    featuredImage: post.featuredImage || null,
    url: post.absoluteUrl || post.url || "",
    metaDescription: post.metaDescription || "",
  }
}

// GET /api/hubspot/blog - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    // If slug is provided, fetch a single post
    if (slug) {
      const posts = await fetchHubSpotBlogPosts()
      const post = posts.find((p: HubSpotBlogPost) => p.slug === slug || p.id.toString() === slug)

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      return NextResponse.json({ post: transformHubSpotPost(post) })
    }

    // Otherwise, fetch all posts
    const posts = await fetchHubSpotBlogPosts()
    const transformedPosts = posts.map(transformHubSpotPost)

    // Sort by publish date (newest first)
    transformedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ posts: transformedPosts })
  } catch (error) {
    console.error("Blog API error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch blog posts",
        posts: [], // Return empty array on error so the page still loads
      },
      { status: 500 }
    )
  }
}

