# CDN Setup Guide for ZeroRender

This guide explains how to configure `cdn.zero-render.com` to improve site performance.

## Quick Setup

1. **Add Environment Variable in Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_CDN_URL` = `https://cdn.zero-render.com`
   - Apply to: Production, Preview, and Development (or just Production)

2. **Configure Your CDN:**
   - Point `cdn.zero-render.com` to your Vercel deployment
   - Or configure it to cache static assets from Vercel

## What Gets Served from CDN

Once configured, the following will be served from `cdn.zero-render.com`:

- ✅ JavaScript bundles (`/_next/static/`)
- ✅ CSS files (`/_next/static/`)
- ✅ Fonts and other static assets
- ✅ Optimized images (if configured)

## CDN Provider Options

### Option 1: Cloudflare (Recommended)
1. Add `cdn.zero-render.com` as a subdomain in Cloudflare
2. Point it to your Vercel deployment
3. Enable caching for static assets
4. Set cache rules:
   - `/_next/static/*` → Cache for 1 year
   - `/_next/image*` → Cache for 1 month
   - Other assets → Cache for 1 week

### Option 2: Vercel's Built-in CDN
Vercel already provides a global CDN, but you can use a custom subdomain:
1. Add `cdn.zero-render.com` as a custom domain in Vercel
2. Configure DNS to point to Vercel
3. Vercel will automatically serve from CDN

### Option 3: AWS CloudFront
1. Create a CloudFront distribution
2. Point origin to your Vercel deployment
3. Configure `cdn.zero-render.com` as an alternate domain name
4. Set up caching behaviors

## Image Optimization with CDN

For Next.js Image optimization to work with your CDN:

**Option A: Proxy Image Requests**
- Configure your CDN to proxy `/_next/image` requests to Vercel
- Vercel handles optimization, CDN caches the result

**Option B: Use External Image Service**
- Use Cloudflare Images, Imgix, or Cloudinary
- Update `lib/image-loader.js` to use their API

## Testing

After setup, verify CDN is working:

1. Check browser DevTools → Network tab
2. Look for requests to `cdn.zero-render.com`
3. Verify `Cache-Control` headers are set correctly
4. Test from different locations using tools like:
   - https://www.webpagetest.org
   - https://tools.pingdom.com

## Environment Variables

```bash
# Production
NEXT_PUBLIC_CDN_URL=https://cdn.zero-render.com

# Development (optional - can leave unset to use local assets)
NEXT_PUBLIC_CDN_URL=
```

## Troubleshooting

**Assets not loading from CDN:**
- Check environment variable is set in Vercel
- Verify DNS is pointing correctly
- Check CDN configuration allows the domain

**Images not optimized:**
- Ensure `NEXT_PUBLIC_CDN_URL` is set
- Check that image loader is working
- Verify CDN can proxy to Vercel's image optimization

**Build errors:**
- Make sure `lib/image-loader.js` exists
- Check that image domains are whitelisted in `next.config.mjs`

## Performance Benefits

Using a CDN provides:
- ⚡ Faster global load times
- 📦 Better caching of static assets
- 🌍 Reduced server load
- 💰 Lower bandwidth costs
- 🚀 Improved Core Web Vitals scores



