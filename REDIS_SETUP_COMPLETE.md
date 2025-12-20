# Redis Setup - Next Steps

## ✅ Redis is Running!

**Your output shows:**
- ✅ Redis is active and running
- ✅ Ready to accept connections
- ✅ Running on port 6379

## Test Redis Connection

**Run this command:**
```bash
redis-cli ping
```

**Should return:** `PONG`

**If it asks for a password:**
```bash
redis-cli
# Then type: AUTH your_password
# Then type: ping
# Should return: PONG
```

## Set Up Redis Password (For Vercel)

**To use Redis from Vercel, you need a password:**

```bash
# Edit Redis config
sudo nano /etc/redis/redis.conf
```

**Find this line (use Ctrl+W to search):**
```
# requirepass foobared
```

**Change it to (replace with your password):**
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

## Add to Vercel

**After setting password, add to Vercel:**
1. Go to Vercel → Settings → Environment Variables
2. Add:
   - **Key:** `REDIS_URL`
   - **Value:** `redis://:YourSecureRedisPassword123!@74.208.155.182:6379`
   - **Environments:** All (Production, Preview, Development)
3. Save

## Use Redis in Your App

**Install Redis client:**
```bash
# On your Mac, in your project
npm install ioredis
```

**Create Redis utility:**
```typescript
// lib/redis.ts
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!)

// Cache helper
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600
): Promise<T> {
  const cached = await redis.get(key)
  if (cached) {
    return JSON.parse(cached) as T
  }
  
  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}
```

**Use in API routes:**
```typescript
// app/api/hubspot/blog/route.ts
import { getCachedData } from '@/lib/redis'

export async function GET() {
  const posts = await getCachedData(
    'blog-posts',
    () => fetchHubSpotBlogPosts(),
    3600 // Cache for 1 hour
  )
  
  return NextResponse.json(posts)
}
```

## Verify Everything

**Check Redis is accessible:**
```bash
# From VPS
redis-cli ping

# Should return: PONG
```

**Check firewall:**
```bash
sudo ufw status | grep 6379
```

**Should show:** `6379/tcp` allowed

## Summary

✅ **Redis is running!**

**Next steps:**
1. Set password (if you want to use from Vercel)
2. Add `REDIS_URL` to Vercel
3. Use Redis for caching in your app

**This will make your site faster!** 🚀


