import { type NextRequest, NextResponse } from "next/server"
import { rewriteHubSpotUrl, rewriteHubSpotContent } from "@/lib/hubspot-proxy"

// Force dynamic rendering since we use request.url
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
  featuredImageAltText: string | null
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
export async function fetchHubSpotBlogPosts() {
  const apiKey = process.env.HUBSPOT_API_KEY
  const blogId = process.env.HUBSPOT_BLOG_ID

  if (!apiKey) {
    // Return empty array instead of throwing - don't break the site
    console.warn("HUBSPOT_API_KEY is not configured. Blog posts will be empty.")
    return []
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
      // Add timeout and better caching
      next: { revalidate: 300 }, // Cache for 5 minutes
      signal: AbortSignal.timeout(10000), // 10 second timeout
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

// Helper function to fetch author avatar from HubSpot Blog Authors API
async function fetchHubSpotAuthorAvatar(authorName: string): Promise<string | null> {
  const apiKey = process.env.HUBSPOT_API_KEY

  if (!apiKey || !authorName) {
    return null
  }

  try {
    // Try to fetch from Blog Authors API
    const response = await fetch(
      `https://api.hubapi.com/content/api/v2/blog-authors?name=${encodeURIComponent(authorName)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      if (data.objects && data.objects.length > 0) {
        const author = data.objects[0]
        // Check multiple possible fields for avatar
        const avatar = author.avatar || 
                      author.avatarUrl || 
                      author.image || 
                      author.profileImage ||
                      author.avatar_url ||
                      author.profile_image ||
                      null
        return avatar ? rewriteHubSpotUrl(avatar) : null
      }
    }
  } catch (error) {
    // Silently fail - author avatar is optional
    console.debug("Could not fetch author avatar from HubSpot:", error)
  }

  return null
}

// Map author names to local images as fallback
const AUTHOR_IMAGE_MAP: Record<string, string> = {
  "Jessica-Lee Tingley": "/jessica-lee-tingley.jpg",
  "Jessica Lee Tingley": "/jessica-lee-tingley.jpg",
  "Tyler Plymale": "/tyler-plymale.jpg",
  "ZeroRender Team": "/logo_bw_inverted.png",
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
export function transformHubSpotPost(post: HubSpotBlogPost) {
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

  // Extract featured image - try multiple possible fields
  let featuredImage = post.featuredImage || 
                      post.featured_image || 
                      post.featuredImageUrl || 
                      post.image || 
                      null

  // If no featured image, try to extract first image from post body
  if (!featuredImage && post.postBody) {
    const imgMatch = post.postBody.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
    if (imgMatch && imgMatch[1]) {
      featuredImage = imgMatch[1]
    }
  }

  // Rewrite featured image URL to use reverse proxy
  if (featuredImage) {
    featuredImage = rewriteHubSpotUrl(featuredImage)
  }

  // Get content from multiple possible field names
  let postContent = post.postBody || 
                     post.post_body || 
                     post.body || 
                     post.content ||
                     post.html ||
                     post.html_content ||
                     post.post_html ||
                     ""
  
  // Rewrite all HubSpot URLs in content to use reverse proxy
  if (postContent) {
    postContent = rewriteHubSpotContent(postContent)
  }

  // Recalculate read time from actual content
  const actualWordCount = postContent ? postContent.replace(/<[^>]*>/g, "").split(/\s+/).length : wordCount
  const actualReadTime = Math.ceil(actualWordCount / 200)

  // Extract author from multiple possible fields
  const author = post.blogAuthorDisplayName || 
                post.blog_author_display_name ||
                post.authorName || 
                post.author_name ||
                post.author ||
                post.blogAuthor ||
                post.blog_author ||
                "ZeroRender Team"

  // Extract author avatar/profile picture - check multiple field names and nested objects
  let authorAvatar = post.blogAuthorAvatar ||
                      post.blog_author_avatar ||
                      post.authorAvatar ||
                      post.author_avatar ||
                      post.authorImage ||
                      post.author_image ||
                      post.authorProfileImage ||
                      post.author_profile_image ||
                      (typeof post.blogAuthor === 'object' && post.blogAuthor?.avatar) ||
                      (typeof post.blogAuthor === 'object' && post.blogAuthor?.image) ||
                      (typeof post.blogAuthor === 'object' && post.blogAuthor?.avatarUrl) ||
                      (typeof post.author === 'object' && post.author?.avatar) ||
                      (typeof post.author === 'object' && post.author?.image) ||
                      null
  
  // Rewrite author avatar URL to use reverse proxy
  if (authorAvatar) {
    authorAvatar = rewriteHubSpotUrl(authorAvatar)
  } else {
    // Fallback: Try to get from local image map
    const author = post.blogAuthorDisplayName || 
                   post.blog_author_display_name ||
                   post.authorName || 
                   post.author_name ||
                   post.author ||
                   post.blogAuthor ||
                   post.blog_author ||
                   "ZeroRender Team"
    
    if (typeof author === 'string' && AUTHOR_IMAGE_MAP[author]) {
      authorAvatar = AUTHOR_IMAGE_MAP[author]
    }
  }

  // Extract author bio - check multiple field names and nested objects
  const authorBio = post.blogAuthorBio ||
                   post.blog_author_bio ||
                   post.authorBio ||
                   post.author_bio ||
                   (typeof post.blogAuthor === 'object' && post.blogAuthor?.bio) ||
                   (typeof post.author === 'object' && post.author?.bio) ||
                   ""

  // Extract author email/username for potential profile link - check multiple field names and nested objects
  const authorEmail = post.blogAuthorEmail ||
                     post.blog_author_email ||
                     post.authorEmail ||
                     (typeof post.blogAuthor === 'object' && post.blogAuthor?.email) ||
                     (typeof post.author === 'object' && post.author?.email) ||
                     null

  return {
    slug: normalizedSlug,
    title: post.name || "Untitled",
    excerpt: post.postSummary || post.metaDescription || "",
    author: author,
    authorAvatar: authorAvatar,
    authorBio: authorBio,
    authorEmail: authorEmail,
    date: new Date(post.publishDate || post.created).toISOString().split("T")[0],
    readTime: `${actualReadTime} min read`,
    category: "Blog", // You can map this from HubSpot topics/tags if needed
    content: postContent,
    featuredImage: featuredImage,
    featuredImageAlt: post.featuredImageAltText || post.featured_image_alt || null,
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

      // Always fetch the full post by ID to ensure we have complete content
      // HubSpot's listing API may not return the full postBody
      try {
        const fullPost = await fetchHubSpotBlogPostById(post.originalId)
        if (fullPost) {
          // Update content with full post body - check multiple possible field names
          let postContent = fullPost.postBody || 
                             fullPost.post_body || 
                             fullPost.body || 
                             fullPost.content ||
                             fullPost.html ||
                             fullPost.html_content
          
          if (postContent) {
            // Rewrite all HubSpot URLs in content to use reverse proxy
            post.content = rewriteHubSpotContent(postContent)
          } else {
            console.warn(`No content found for post ${post.originalId}. Available fields:`, Object.keys(fullPost))
          }
          
          // Update author from full post if available
          const fullAuthor = fullPost.blogAuthorDisplayName || 
                            fullPost.blog_author_display_name ||
                            fullPost.authorName || 
                            fullPost.author_name ||
                            fullPost.author ||
                            fullPost.blogAuthor ||
                            fullPost.blog_author
          
          if (fullAuthor && fullAuthor !== "ZeroRender Team") {
            post.author = fullAuthor
          }

          // Update author avatar - check multiple possible field names and nested objects
          let fullAuthorAvatar = fullPost.blogAuthorAvatar ||
                                  fullPost.blog_author_avatar ||
                                  fullPost.authorAvatar ||
                                  fullPost.author_avatar ||
                                  fullPost.authorImage ||
                                  fullPost.author_image ||
                                  fullPost.authorProfileImage ||
                                  fullPost.author_profile_image ||
                                  fullPost.blogAuthor?.avatar ||
                                  fullPost.blogAuthor?.image ||
                                  fullPost.blogAuthor?.avatarUrl ||
                                  fullPost.author?.avatar ||
                                  fullPost.author?.image ||
                                  fullPost.blog_author?.avatar ||
                                  (typeof fullPost.blogAuthor === 'object' && fullPost.blogAuthor?.avatar) ||
                                  null
          
          if (fullAuthorAvatar && !post.authorAvatar) {
            // Rewrite author avatar URL to use reverse proxy
            post.authorAvatar = rewriteHubSpotUrl(fullAuthorAvatar)
          } else if (!post.authorAvatar) {
            // Try to fetch from Blog Authors API as fallback
            const authorName = post.author || fullPost.blogAuthorDisplayName || fullPost.authorName
            if (authorName) {
              try {
                const fetchedAvatar = await fetchHubSpotAuthorAvatar(authorName)
                if (fetchedAvatar) {
                  post.authorAvatar = fetchedAvatar
                } else {
                  // Final fallback: use local image map
                  if (AUTHOR_IMAGE_MAP[authorName]) {
                    post.authorAvatar = AUTHOR_IMAGE_MAP[authorName]
                  }
                }
              } catch (error) {
                // If fetch fails, try local image map
                if (authorName && AUTHOR_IMAGE_MAP[authorName]) {
                  post.authorAvatar = AUTHOR_IMAGE_MAP[authorName]
                }
              }
            }
          }

          // Update author bio - check multiple possible field names and nested objects
          const fullAuthorBio = fullPost.blogAuthorBio ||
                               fullPost.blog_author_bio ||
                               fullPost.authorBio ||
                               fullPost.author_bio ||
                               fullPost.blogAuthor?.bio ||
                               fullPost.author?.bio ||
                               fullPost.blog_author?.bio ||
                               (typeof fullPost.blogAuthor === 'object' && fullPost.blogAuthor?.bio) ||
                               ""
          
          if (fullAuthorBio && !post.authorBio) {
            post.authorBio = fullAuthorBio
          }

          // Update author email - check multiple possible field names and nested objects
          const fullAuthorEmail = fullPost.blogAuthorEmail ||
                                 fullPost.blog_author_email ||
                                 fullPost.authorEmail ||
                                 fullPost.blogAuthor?.email ||
                                 fullPost.author?.email ||
                                 fullPost.blog_author?.email ||
                                 (typeof fullPost.blogAuthor === 'object' && fullPost.blogAuthor?.email) ||
                                 null
          
          if (fullAuthorEmail && !post.authorEmail) {
            post.authorEmail = fullAuthorEmail
          }

          // Debug logging to see what HubSpot actually returns
          if (process.env.NODE_ENV !== 'production') {
            console.log('Full post author data:', {
              blogAuthor: fullPost.blogAuthor,
              blogAuthorDisplayName: fullPost.blogAuthorDisplayName,
              authorName: fullPost.authorName,
              availableFields: Object.keys(fullPost).filter(k => k.toLowerCase().includes('author') || k.toLowerCase().includes('avatar') || k.toLowerCase().includes('bio'))
            })
          }
          
          // Also update other fields that might be more complete in the full post
          let fullFeaturedImage = fullPost.featuredImage || 
                                   fullPost.featured_image || 
                                   fullPost.featuredImageUrl || 
                                   fullPost.image
          if (fullFeaturedImage && !post.featuredImage) {
            // Rewrite featured image URL to use reverse proxy
            post.featuredImage = rewriteHubSpotUrl(fullFeaturedImage)
          }
          if (fullPost.featuredImageAltText && !post.featuredImageAlt) {
            post.featuredImageAlt = fullPost.featuredImageAltText
          }
          if (fullPost.metaDescription && !post.metaDescription) {
            post.metaDescription = fullPost.metaDescription
          }
          
          // If still no featured image, extract from post body
          if (!post.featuredImage && postContent) {
            const imgMatch = postContent.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
            if (imgMatch && imgMatch[1]) {
              // Rewrite extracted image URL to use reverse proxy
              post.featuredImage = rewriteHubSpotUrl(imgMatch[1])
            }
          }
        } else {
          console.warn(`Full post fetch returned no data for ID: ${post.originalId}`)
        }
      } catch (error) {
        console.error("Failed to fetch full post content:", error)
        console.error("Post ID:", post.originalId)
        // Continue with existing content from listing
      }

      // Remove debug fields before returning
      const { originalSlug, originalId, originalUrl, ...postData } = post as any
      
      // Add cache headers for better performance
      const response = NextResponse.json({ post: postData })
      response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      
      return response
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

    // Add cache headers for better performance
    const response = NextResponse.json({ posts: cleanedPosts })
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    
    return response
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

