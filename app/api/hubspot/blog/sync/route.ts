import { NextRequest, NextResponse } from "next/server"
import { fetchHubSpotBlogPosts, transformHubSpotPost } from "../route"

// Force dynamic rendering
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// POST /api/hubspot/blog/sync - Sync blog posts from HubSpot
export async function POST(request: NextRequest) {
  try {
    console.log("Starting blog sync...")
    
    // Fetch latest blog posts from HubSpot
    const posts = await fetchHubSpotBlogPosts()
    
    if (posts.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No blog posts found. Check HubSpot API configuration.",
        postsCount: 0,
      }, { status: 200 })
    }
    
    // Transform posts to our format
    const transformedPosts = posts.map(transformHubSpotPost)
    
    // Sort by publish date (newest first)
    transformedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Get summary information
    const summary = {
      totalPosts: transformedPosts.length,
      latestPost: transformedPosts[0] ? {
        title: transformedPosts[0].title,
        slug: transformedPosts[0].slug,
        date: transformedPosts[0].date,
        author: transformedPosts[0].author,
      } : null,
      authors: [...new Set(transformedPosts.map(p => p.author))],
      dateRange: {
        oldest: transformedPosts[transformedPosts.length - 1]?.date,
        newest: transformedPosts[0]?.date,
      },
    }
    
    console.log(`Blog sync complete: ${transformedPosts.length} posts synced`)
    
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${transformedPosts.length} blog posts`,
      summary,
      postsCount: transformedPosts.length,
      syncedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Blog sync error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to sync blog posts",
      },
      { status: 500 }
    )
  }
}

// GET /api/hubspot/blog/sync - Get sync status
export async function GET(request: NextRequest) {
  try {
    const posts = await fetchHubSpotBlogPosts()
    const transformedPosts = posts.map(transformHubSpotPost)
    
    return NextResponse.json({
      success: true,
      postsCount: transformedPosts.length,
      lastChecked: new Date().toISOString(),
      message: `Found ${transformedPosts.length} blog posts`,
    })
  } catch (error) {
    console.error("Blog sync status error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to check blog sync status",
      },
      { status: 500 }
    )
  }
}

