# Site Speed Optimization Guide

## Why the VPS Database Won't Help Site Speed

**The VPS database is for:**
- Storing data (users, content, etc.)
- Running queries when needed

**It won't help because:**
- Your homepage doesn't query the database on load
- Database queries happen on-demand (API calls, forms, etc.)
- The homepage is client-side rendered, not using the database

## What Actually Affects Site Speed

### 1. **Client-Side Rendering** (Current Issue)
Your homepage is `"use client"` which means:
- JavaScript must download and execute before content shows
- Slower initial load
- Not SEO-friendly

### 2. **No Caching**
- No Redis cache for API responses
- No static generation
- Every request is fresh

### 3. **Image Optimization**
- Large images not optimized
- No Next.js Image component
- No lazy loading

### 4. **DNS Issues** (We've been fixing this)
- DNS propagation delays
- This is separate from code performance

## Solutions

### Solution 1: Set Up Redis Caching (VPS)

**This WILL help with speed!**

**On VPS:**
```bash
# Redis is already installed
# Just configure password
sudo nano /etc/redis/redis.conf
# Set: requirepass YOUR_REDIS_PASSWORD
sudo systemctl restart redis-server
sudo ufw allow 6379/tcp
```

**Add to Vercel:**
- `REDIS_URL=redis://:YOUR_PASSWORD@74.208.155.182:6379`

**Use in your app:**
```typescript
// lib/redis.ts
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!)

// Cache API responses
export async function getCachedData(key: string, fetcher: () => Promise<any>, ttl = 3600) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  
  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}
```

### Solution 2: Convert Homepage to Static Generation

**Current:** Client-side rendered (slow)
**Better:** Static generation (fast)

**Option A: Keep as client component but optimize:**
```typescript
// app/page.tsx - Add metadata export
export const metadata = {
  title: 'ZeroRender - AI-Powered Digital Experiences',
  description: '...'
}

// Keep "use client" but optimize loading
```

**Option B: Split into server/client components:**
```typescript
// app/page.tsx (Server Component - no "use client")
import { HomePageClient } from '@/components/home-page-client'

export default function Page() {
  return <HomePageClient />
}
```

### Solution 3: Optimize Images

**Current:**
```tsx
<img src="/logo_bw_inverted.png" alt="ZeroRender" />
```

**Better:**
```tsx
import Image from 'next/image'

<Image 
  src="/logo_bw_inverted.png" 
  alt="ZeroRender"
  width={120}
  height={40}
  priority
  loading="eager"
/>
```

**For team images:**
```tsx
<Image
  src="/tyler-plymale.jpg"
  alt="Tyler Plymale"
  width={300}
  height={400}
  loading="lazy"
  placeholder="blur"
/>
```

### Solution 4: Enable Vercel Caching

**Add to `next.config.mjs`:**
```javascript
export default {
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static optimization
  experimental: {
    optimizeCss: true,
  },
}
```

### Solution 5: Lazy Load Heavy Components

**You're already doing this! ✅**
```typescript
const ContactForm = dynamic(() => import("@/components/contact-form"), {
  ssr: false,
})
```

**But you can optimize more:**
```typescript
// Lazy load sections below the fold
const TeamSection = dynamic(() => import("@/components/team-section"), {
  loading: () => <div>Loading...</div>,
})
```

## Quick Wins (Do These First)

### 1. Set Up Redis Caching

**This is the biggest win from your VPS!**

```bash
# On VPS
sudo nano /etc/redis/redis.conf
# Add: requirepass YourSecurePassword123!
sudo systemctl restart redis-server
```

**Add to Vercel:**
```
REDIS_URL=redis://:YourSecurePassword123!@74.208.155.182:6379
```

**Use for API caching:**
```typescript
// app/api/hubspot/blog/route.ts
import { redis } from '@/lib/redis'

export async function GET() {
  const cacheKey = 'blog-posts'
  
  // Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) {
    return NextResponse.json(JSON.parse(cached))
  }
  
  // Fetch from HubSpot
  const posts = await fetchHubSpotBlogPosts()
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(posts))
  
  return NextResponse.json(posts)
}
```

### 2. Optimize Images

**Install:**
```bash
npm install next/image
```

**Replace all `<img>` with `<Image>`**

### 3. Add Loading States

**Show content faster:**
```typescript
// Show skeleton while loading
{loading ? <Skeleton /> : <Content />}
```

## Performance Checklist

- [ ] Set up Redis caching on VPS
- [ ] Add Redis connection to Vercel
- [ ] Cache API responses with Redis
- [ ] Convert images to Next.js Image component
- [ ] Enable static generation where possible
- [ ] Add loading states
- [ ] Optimize fonts (you're using Geist - good!)
- [ ] Minimize JavaScript bundle size
- [ ] Enable Vercel Edge Caching

## Testing Performance

**Use these tools:**
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WebPageTest:** https://www.webpagetest.org/
- **Vercel Analytics:** Already installed! Check dashboard

## Expected Improvements

**With Redis caching:**
- API responses: 50-90% faster
- Blog posts: Instant (cached)
- Database queries: Cached results

**With image optimization:**
- Initial load: 30-50% faster
- Bandwidth: 50-70% reduction

**With static generation:**
- First Contentful Paint: 40-60% faster
- Time to Interactive: 30-50% faster

## Summary

**The VPS database won't help site speed** - it's for data storage.

**But Redis caching on the VPS WILL help!** Set it up to cache:
- API responses
- Blog posts
- Database query results
- Any expensive operations

**Also optimize:**
- Images (use Next.js Image)
- Static generation
- Code splitting (you're already doing this)

Let me know if you want help setting up Redis caching - that's the biggest performance win from your VPS!

