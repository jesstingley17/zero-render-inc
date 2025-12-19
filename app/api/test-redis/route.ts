import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { REDIS_URL } = process.env
    
    if (!REDIS_URL) {
      return NextResponse.json({ 
        configured: false,
        message: "REDIS_URL not configured",
        connected: false
      })
    }
    
    // Try to connect to Redis
    let redis: any = null
    let connected = false
    let testValue = null
    let error = null
    
    try {
      // Dynamically import ioredis (in case it's not installed)
      let Redis: any
      try {
        Redis = (await import("ioredis")).default
      } catch (importError) {
        error = "ioredis package not installed. Run: npm install ioredis"
        return NextResponse.json({ 
          configured: !!REDIS_URL,
          connected: false,
          error,
          message: "Redis configured but ioredis package is missing"
        })
      }
      
      redis = new Redis(REDIS_URL, {
        maxRetriesPerRequest: 1,
        connectTimeout: 5000,
        lazyConnect: true,
      })
      
      await redis.connect()
      await redis.ping()
      connected = true
      
      // Test set/get
      await redis.set("test-key", "test-value", "EX", 60)
      testValue = await redis.get("test-key")
      
      await redis.quit()
    } catch (redisError: any) {
      error = redisError.message
      if (redis) {
        try {
          await redis.quit()
        } catch {
          // Ignore quit errors
        }
      }
    }
    
    return NextResponse.json({ 
      configured: true,
      connected,
      testValue,
      error: error || undefined,
      message: connected 
        ? "Redis is working! ✅" 
        : error 
        ? `Redis error: ${error}` 
        : "Redis configured but connection failed"
    })
  } catch (error: any) {
    return NextResponse.json({ 
      configured: false,
      connected: false,
      error: error.message,
      message: "Error testing Redis"
    }, { status: 500 })
  }
}

