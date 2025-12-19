# Do You Need to Add blog.zero-render.com to Vercel?

## Answer: ❌ **NO, You Don't Need To**

## Why Not?

### How It Works:

1. **Main Domain (zero-render.com, www.zero-render.com):**
   - Points to **Vercel** → Serves your Next.js app
   - **Must be added to Vercel** ✅

2. **Blog Subdomain (blog.zero-render.com):**
   - Points to **HubSpot** → Serves HubSpot blog content
   - **NOT served by Vercel** → Don't add to Vercel ❌

## The Flow:

```
blog.zero-render.com
    ↓
Cloudflare DNS (CNAME → hubspot.com, Proxied)
    ↓
HubSpot servers
    ↓
Blog content loads
```

**Vercel is NOT involved in this flow.**

## What You Should Have in Vercel:

**Vercel Dashboard → Settings → Domains:**

✅ **Add these:**
- `zero-render.com` → Connected
- `www.zero-render.com` → Connected

❌ **Don't add:**
- `blog.zero-render.com` → This goes to HubSpot, not Vercel

## Summary:

- **Main domains** → Add to Vercel (they serve your app)
- **Blog subdomain** → Don't add to Vercel (it goes to HubSpot)
- **Blog is configured in Cloudflare only** (CNAME to hubspot.com)

## Your Setup Should Be:

**Vercel:**
- `zero-render.com` ✅
- `www.zero-render.com` ✅
- `blog.zero-render.com` ❌ (not needed)

**Cloudflare:**
- `zero-render.com` → A record → Vercel IP (DNS only)
- `www.zero-render.com` → CNAME → Vercel CNAME (DNS only)
- `blog.zero-render.com` → CNAME → hubspot.com (Proxied)

This is correct! ✅

