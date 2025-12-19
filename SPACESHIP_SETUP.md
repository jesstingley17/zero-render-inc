# Spaceship DNS Setup for HubSpot Reverse Proxy

## Current Setup

- **DNS Provider:** Spaceship
- **Domain:** `zero-render.com`
- **Target Subdomain:** `blog.zero-render.com` (for HubSpot reverse proxy)

## The Challenge

HubSpot requires the `X-HS-Public-Host: blog.zero-render.com` header to be added **before** the request reaches HubSpot. Spaceship DNS alone may not support adding custom headers.

## Solutions

### Solution 1: Use Cloudflare in Front (Recommended)

Cloudflare has a free tier and can add headers easily:

1. **Sign up for Cloudflare (free)**
2. **Add your domain to Cloudflare**
3. **Update your domain's nameservers** to point to Cloudflare
4. **In Cloudflare:**
   - Add DNS record: `blog` CNAME → `hubspot.com`
   - Create Transform Rule to add `X-HS-Public-Host` header
5. **Spaceship can still be used** for other services (like Starlight)

**Benefits:**
- ✅ Free
- ✅ Easy header modification
- ✅ Better performance (CDN)
- ✅ Can keep Spaceship for other services

### Solution 2: Test Next.js Middleware

Your `middleware.ts` already adds the header, but it may not work for HubSpot validation:

1. **Deploy your Next.js app**
2. **Test:** Visit `https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
3. **If it works:** Great! No additional setup needed
4. **If it fails:** You'll need Solution 1 or 3

### Solution 3: Use a Reverse Proxy Service

Services that can add headers:
- **Cloudflare** (free tier recommended)
- **Nginx** (if you have server access)
- **AWS CloudFront** (if using AWS)
- **Other reverse proxy services**

## Step-by-Step: Spaceship DNS Only

If you just want to set up DNS in Spaceship first:

1. **Log into Spaceship**
2. **Go to DNS Management** for `zero-render.com`
3. **Add CNAME record:**
   - **Name:** `blog`
   - **Target:** `hubspot.com`
   - **TTL:** 3600
4. **Save**

**Then:** You'll still need to add the header using one of the solutions above.

## Recommended Approach

**Best option:** Use Cloudflare's free tier in front of your DNS:
- Free
- Easy to configure
- Reliable header modification
- Better performance
- You can still use Spaceship for Starlight and other services

## Questions?

If you're not sure which approach to use, I recommend:
1. Start with Solution 1 (Cloudflare) - it's the most reliable
2. If you prefer not to use Cloudflare, test Solution 2 (middleware) first
3. If middleware doesn't work, you'll need a proxy service

