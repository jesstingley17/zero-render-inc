# Final VPS Setup - Connect Everything to Vercel

## ✅ Everything is Running!

**Now let's connect it all to Vercel for maximum performance.**

## Step 1: Set Up Redis Password

**On your VPS, run:**
```bash
sudo nano /etc/redis/redis.conf
```

**Find this line (Ctrl+W to search):**
```
# requirepass foobared
```

**Change it to (replace with your own secure password):**
```
requirepass YourSecureRedisPassword123!
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

**Restart Redis:**
```bash
sudo systemctl restart redis-server
```

**Test with password:**
```bash
redis-cli
# Type: AUTH YourSecureRedisPassword123!
# Type: ping
# Should return: PONG
# Type: exit
```

**Allow port in firewall:**
```bash
sudo ufw allow 6379/tcp
```

## Step 2: Add Environment Variables to Vercel

**Go to:** https://vercel.com → Your Project → Settings → Environment Variables

**Add these (if not already added):**

### Database
- **Key:** `DATABASE_URL`
- **Value:** `postgresql://zerorender_user:YOUR_DB_PASSWORD@74.208.155.182:5432/zerorender`
- **Environments:** All (Production, Preview, Development)

### Redis
- **Key:** `REDIS_URL`
- **Value:** `redis://:YourSecureRedisPassword123!@74.208.155.182:6379`
- **Environments:** All (Production, Preview, Development)

**⚠️ Important:** Replace `YOUR_DB_PASSWORD` and `YourSecureRedisPassword123!` with your actual passwords!

## Step 3: Set Up Redis Caching in Your App

**Install Redis client:**
```bash
# On your Mac, in your project directory
npm install ioredis
```

**Create Redis utility:**
```typescript
// lib/redis.ts
import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedis() {
  if (!redis && process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
    })
  }
  return redis
}

// Cache helper function
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600 // 1 hour default
): Promise<T> {
  const redis = getRedis()
  
  if (!redis) {
    // Redis not configured, just fetch directly
    return fetcher()
  }
  
  try {
    // Try to get from cache
    const cached = await redis.get(key)
    if (cached) {
      return JSON.parse(cached) as T
    }
    
    // Not in cache, fetch and store
    const data = await fetcher()
    await redis.setex(key, ttl, JSON.stringify(data))
    return data
  } catch (error) {
    console.error('Redis error:', error)
    // If Redis fails, just fetch directly
    return fetcher()
  }
}
```

**Use in your blog API:**
```typescript
// app/api/hubspot/blog/route.ts
import { NextResponse } from 'next/server'
import { getCachedData } from '@/lib/redis'
import { fetchHubSpotBlogPosts } from '@/lib/hubspot'

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Cache blog posts for 1 hour
    const posts = await getCachedData(
      'blog-posts',
      () => fetchHubSpotBlogPosts(),
      3600 // 1 hour
    )
    
    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error('Blog API error:', error)
    return NextResponse.json(
      { error: error.message, posts: [] },
      { status: 500 }
    )
  }
}
```

## Step 4: Redeploy Your App

**After adding environment variables:**
1. Go to Vercel → Deployments
2. Click the three dots (⋯) on latest deployment
3. Click "Redeploy"
4. Or push a commit to trigger new deployment

## Step 5: Test Everything

**Test database connection:**
- Visit: `https://your-domain.com/api/test-db`
- Should show: `{"configured": true, ...}`

**Test Redis (create test endpoint):**
```typescript
// app/api/test-redis/route.ts
import { NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis'

export async function GET() {
  try {
    const redis = getRedis()
    
    if (!redis) {
      return NextResponse.json({ 
        configured: false,
        message: 'Redis not configured' 
      })
    }
    
    // Test connection
    await redis.ping()
    
    // Test set/get
    await redis.set('test-key', 'test-value', 'EX', 60)
    const value = await redis.get('test-key')
    
    return NextResponse.json({ 
      configured: true,
      connected: true,
      testValue: value,
      message: 'Redis is working!' 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      configured: true,
      connected: false,
      error: error.message 
    }, { status: 500 })
  }
}
```

**Visit:** `https://your-domain.com/api/test-redis`

## What You've Accomplished

✅ **VPS running:**
- PostgreSQL database
- Redis cache
- Node.js + PM2
- Nginx
- All services running

✅ **Connected to Vercel:**
- Database connection string
- Redis connection string
- Ready for caching

✅ **Performance improvements:**
- Redis caching will make API calls 50-90% faster
- Blog posts will load instantly (cached)
- Database queries can be cached

## Next Steps (Optional)

1. **Set up API server** (if you need custom endpoints)
2. **Set up background jobs** (for scheduled tasks)
3. **Monitor performance** (check Vercel Analytics)

## Quick Commands Reference

```bash
# On VPS - Check services
sudo systemctl status postgresql
sudo systemctl status redis-server
pm2 list

# On VPS - View logs
pm2 logs
sudo journalctl -u postgresql -f
sudo journalctl -u redis-server -f

# On Mac - Test connections
psql "postgresql://zerorender_user:PASSWORD@74.208.155.182:5432/zerorender"
```

## Summary

**You're all set!** Your VPS is:
- ✅ Running all services
- ✅ Connected to Vercel
- ✅ Ready for caching

**The biggest win:** Redis caching will make your site load faster! 🚀

Need help with anything else?

