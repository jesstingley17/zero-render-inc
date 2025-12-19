import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { DATABASE_URL } = process.env
    
    if (!DATABASE_URL) {
      return NextResponse.json({ 
        error: "DATABASE_URL not configured",
        configured: false 
      }, { status: 500 })
    }
    
    // Basic check - connection string exists
    return NextResponse.json({ 
      message: "Database URL is configured",
      configured: true,
      hasUrl: !!DATABASE_URL,
      // Don't expose the full URL in production!
      urlPrefix: DATABASE_URL.split("@")[0] + "@...",
      host: DATABASE_URL.includes("@") ? DATABASE_URL.split("@")[1]?.split("/")[0] : "unknown"
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      configured: false 
    }, { status: 500 })
  }
}

