import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// HubSpot Blog Integration - Fetches blog posts from HubSpot Content API

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

  if (!apiKey) {
    throw new Error("HUBSPOT_API_KEY is not configured. Please add it to your Vercel environment variables.")
  }

  try {
    // Fetch blog posts from HubSpot Content API v2
    // HubSpot Content API v2 is the standard for blog posts
    // blogId is optional - if not provided, fetches from all blogs
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

// Extract slug from HubSpot URL or use provided slug
function extractSlugFromHubSpotPost(post: HubSpotBlogPost): string {
  // First, try the slug field
  if (post.slug) {
    return post.slug
  }
  
  // Try to extract from absoluteUrl or url
  if (post.absoluteUrl) {
    const urlParts = post.absoluteUrl.split("/")
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
    if (slug && slug !== "blog" && !slug.includes(".")) {
      return slug
    }
  }
  
  if (post.url) {
    const urlParts = post.url.split("/")
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
    if (slug && slug !== "blog" && !slug.includes(".")) {
      return slug
    }
  }
  
  // Fallback to ID
  return post.id.toString()
}

// Transform HubSpot post to our format
function transformHubSpotPost(post: HubSpotBlogPost) {
  // Calculate read time (approximately 200 words per minute)
  const wordCount = post.postBody?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0
  const readTime = Math.ceil(wordCount / 200)

  const slug = extractSlugFromHubSpotPost(post)

  return {
    slug: slug,
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
    // Store original data for matching
    originalSlug: post.slug,
    originalId: post.id.toString(),
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
      // Decode the slug in case it's URL encoded
      const decodedSlug = decodeURIComponent(slug).toLowerCase().trim()
      
      // Transform all posts first to get consistent slug format
      const transformedPosts = posts.map(transformHubSpotPost)
      
      // Try to find the post by transformed slug
      let post = transformedPosts.find(
        (p) =>
          p.slug?.toLowerCase() === decodedSlug ||
          p.slug?.toLowerCase() === slug.toLowerCase() ||
          p.originalSlug?.toLowerCase() === decodedSlug ||
          p.originalId === slug ||
          p.originalId === decodedSlug
      )

      // If not found by transformed slug, try original HubSpot data
      if (!post) {
        const originalPost = posts.find(
          (p: HubSpotBlogPost) =>
            p.slug?.toLowerCase() === decodedSlug ||
            p.slug?.toLowerCase() === slug.toLowerCase() ||
            p.id.toString() === slug ||
            p.id.toString() === decodedSlug ||
            p.absoluteUrl?.toLowerCase().includes(decodedSlug) ||
            p.url?.toLowerCase().includes(decodedSlug)
        )
        
        if (originalPost) {
          post = transformHubSpotPost(originalPost)
        }
      }

      if (!post) {
        const availableSlugs = transformedPosts.map((p) => p.slug)
        const availableIds = transformedPosts.map((p) => p.originalId)
        console.error(`Post not found for slug: ${slug} (decoded: ${decodedSlug})`)
        console.error(`Available slugs (first 5): ${availableSlugs.slice(0, 5).join(", ")}`)
        console.error(`Available IDs (first 5): ${availableIds.slice(0, 5).join(", ")}`)
        
        // Return more detailed error for debugging
        return NextResponse.json({ 
          error: "Post not found",
          debug: {
            searchedSlug: slug,
            decodedSlug: decodedSlug,
            availableSlugs: availableSlugs.slice(0, 10), // First 10 for debugging
            totalPosts: transformedPosts.length
          }
        }, { status: 404 })
      }

      // Remove debug fields before returning
      const { originalSlug, originalId, ...postData } = post as any
      return NextResponse.json({ post: postData })
    }

    // Otherwise, fetch all posts
    const posts = await fetchHubSpotBlogPosts()
    const transformedPosts = posts.map(transformHubSpotPost)

    // Sort by publish date (newest first)
    transformedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Remove debug fields before returning
    const cleanedPosts = transformedPosts.map(({ originalSlug, originalId, ...post }) => post)
    
    // Log first post for debugging (only in development)
    if (process.env.NODE_ENV !== 'production' && cleanedPosts.length > 0) {
      console.log('Sample post slug:', cleanedPosts[0].slug)
      console.log('Sample post title:', cleanedPosts[0].title)
    }

    return NextResponse.json({ posts: cleanedPosts })
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

