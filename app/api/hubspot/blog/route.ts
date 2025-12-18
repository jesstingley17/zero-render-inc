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
    // Include post_body in the fields to get the full content
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

// Helper function to fetch a single blog post by ID to get full content
async function fetchHubSpotBlogPostById(postId: string) {
  const apiKey = process.env.HUBSPOT_API_KEY

  if (!apiKey) {
    throw new Error("HUBSPOT_API_KEY is not configured")
  }

  try {
    const response = await fetch(
      `https://api.hubapi.com/content/api/v2/blog-posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HubSpot API error: ${response.status} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("HubSpot API error fetching post:", error)
    throw error
  }
}

// Extract slug from HubSpot URL or use provided slug
function extractSlugFromHubSpotPost(post: HubSpotBlogPost): string {
  // First, try the slug field (HubSpot's native slug)
  if (post.slug) {
    // Clean the slug - remove any query parameters or fragments
    return post.slug.split('?')[0].split('#')[0].trim()
  }
  
  // Try to extract from absoluteUrl or url
  if (post.absoluteUrl) {
    try {
      const url = new URL(post.absoluteUrl)
      const pathParts = url.pathname.split("/").filter(p => p)
      const slug = pathParts[pathParts.length - 1] // Get last path segment
      if (slug && slug !== "blog" && !slug.includes(".")) {
        return slug
      }
    } catch (e) {
      // If URL parsing fails, try string splitting
      const urlParts = post.absoluteUrl.split("/")
      let slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
      if (slug) {
        slug = slug.split('?')[0].split('#')[0] // Remove query params and hash
        if (slug && slug !== "blog" && !slug.includes(".")) {
          return slug
        }
      }
    }
  }
  
  if (post.url) {
    try {
      const url = new URL(post.url)
      const pathParts = url.pathname.split("/").filter(p => p)
      const slug = pathParts[pathParts.length - 1]
      if (slug && slug !== "blog" && !slug.includes(".")) {
        return slug
      }
    } catch (e) {
      // If URL parsing fails, try string splitting
      const urlParts = post.url.split("/")
      let slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
      if (slug) {
        slug = slug.split('?')[0].split('#')[0] // Remove query params and hash
        if (slug && slug !== "blog" && !slug.includes(".")) {
          return slug
        }
      }
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

  // Generate a URL-friendly slug from the title if slug is missing
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  // Try multiple slug sources
  let slug = post.slug
  
  // If no slug, try to extract from URL
  if (!slug && post.absoluteUrl) {
    const urlParts = post.absoluteUrl.split("/")
    slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
    // Clean up the slug
    if (slug) {
      slug = slug.split('?')[0].split('#')[0] // Remove query params and hash
      if (slug === 'blog' || slug.includes('.')) {
        slug = null // Invalid slug
      }
    }
  }
  
  // If still no slug, generate from title
  if (!slug && post.name) {
    slug = generateSlug(post.name)
  }
  
  // Final fallback to ID
  if (!slug) {
    slug = post.id.toString()
  }

  // Normalize the slug to ensure consistency
  const normalizeSlug = (s: string): string => {
    return s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const normalizedSlug = normalizeSlug(slug)

  return {
    slug: normalizedSlug,
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
    originalUrl: post.absoluteUrl || post.url || "",
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
      
      // Normalize the search slug the same way we normalize in transformHubSpotPost
      const normalizeSlug = (s: string): string => {
        return decodeURIComponent(s)
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      }
      
      const normalizedSearchSlug = normalizeSlug(slug)
      const decodedSlug = decodeURIComponent(slug).toLowerCase().trim()
      const searchSlug = slug.toLowerCase().trim()
      
      // Transform all posts first to get consistent slug format
      const transformedPosts = posts.map(transformHubSpotPost)
      
      // Try multiple matching strategies - prioritize exact normalized match
      let post = transformedPosts.find((p) => {
        const pSlug = p.slug?.toLowerCase().trim()
        const pOriginalSlug = p.originalSlug?.toLowerCase().trim()
        const pOriginalId = p.originalId?.toLowerCase().trim()
        
        return (
          // Exact normalized match (most reliable)
          pSlug === normalizedSearchSlug ||
          // Other exact matches
          pSlug === decodedSlug ||
          pSlug === searchSlug ||
          pOriginalSlug === normalizedSearchSlug ||
          pOriginalSlug === decodedSlug ||
          pOriginalSlug === searchSlug ||
          // ID match
          pOriginalId === slug ||
          pOriginalId === decodedSlug ||
          pOriginalId === searchSlug ||
          // Partial matches (less reliable but might help)
          (pSlug && normalizedSearchSlug && pSlug.includes(normalizedSearchSlug)) ||
          (pSlug && normalizedSearchSlug && normalizedSearchSlug.includes(pSlug)) ||
          // Try matching against URL
          p.originalUrl?.toLowerCase().includes(decodedSlug) ||
          p.originalUrl?.toLowerCase().includes(searchSlug) ||
          p.originalUrl?.toLowerCase().includes(normalizedSearchSlug)
        )
      })

      // If still not found, try original HubSpot data directly
      if (!post) {
        const originalPost = posts.find((p: HubSpotBlogPost) => {
          const pSlug = p.slug?.toLowerCase().trim()
          const pId = p.id.toString().toLowerCase().trim()
          const pUrl = (p.absoluteUrl || p.url || '').toLowerCase()
          
          return (
            pSlug === decodedSlug ||
            pSlug === searchSlug ||
            pId === slug ||
            pId === decodedSlug ||
            pId === searchSlug ||
            pUrl.includes(decodedSlug) ||
            pUrl.includes(searchSlug)
          )
        })
        
        if (originalPost) {
          post = transformHubSpotPost(originalPost)
        }
      }

      if (!post) {
        const availableSlugs = transformedPosts.map((p) => ({
          slug: p.slug,
          originalSlug: p.originalSlug,
          id: p.originalId,
          title: p.title
        }))
        
        console.error(`Post not found for slug: ${slug} (decoded: ${decodedSlug})`)
        console.error(`Available posts (first 3):`, availableSlugs.slice(0, 3))
        
        // Return more detailed error for debugging
        return NextResponse.json({ 
          error: "Post not found",
          debug: {
            searchedSlug: slug,
            decodedSlug: decodedSlug,
            availablePosts: availableSlugs.slice(0, 5), // First 5 for debugging
            totalPosts: transformedPosts.length
          }
        }, { status: 404 })
      }

      // If post body is empty or missing, fetch the full post by ID to get complete content
      if (!post.content || post.content.trim() === '') {
        try {
          const fullPost = await fetchHubSpotBlogPostById(post.originalId)
          if (fullPost && fullPost.postBody) {
            post.content = fullPost.postBody
          }
        } catch (error) {
          console.error("Failed to fetch full post content:", error)
          // Continue with existing content (even if empty)
        }
      }

      // Remove debug fields before returning
      const { originalSlug, originalId, originalUrl, ...postData } = post as any
      return NextResponse.json({ post: postData })
    }

    // Otherwise, fetch all posts
    const posts = await fetchHubSpotBlogPosts()
    const transformedPosts = posts.map(transformHubSpotPost)

    // Sort by publish date (newest first)
    transformedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Remove debug fields before returning
    const cleanedPosts = transformedPosts.map(({ originalSlug, originalId, originalUrl, ...post }) => post)
    
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

