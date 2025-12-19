# HubSpot Reverse Proxy Setup Guide

This guide explains how to configure `hub.zero-render.com` as a reverse proxy for HubSpot.

## The Error

```
/hubfs/hs-reverse-proxy-validation-test
Failed: Make sure that requests being forwarded from the proxy include an 'X-HS-Public-Host' header with the value hub.zero-render.com
```

## Solution: Configure Your CDN/Proxy

The `X-HS-Public-Host` header must be added at the **CDN/Proxy level**, not in your Next.js application. Here's how to set it up:

### Option 1: Cloudflare (Recommended)

1. **Add the subdomain in Cloudflare:**
   - Go to Cloudflare Dashboard → DNS
   - Add a CNAME record: `hub.zero-render.com` → `hubspot.com` (or your HubSpot domain)

2. **Create a Page Rule or Transform Rule:**
   - Go to Rules → Transform Rules → Modify Request Header
   - Create a new rule:
     - **Rule name:** HubSpot Reverse Proxy Header
     - **When incoming requests match:** `hub.zero-render.com/*`
     - **Then modify request header:**
       - **Header name:** `X-HS-Public-Host`
       - **Value:** `hub.zero-render.com`
       - **Operation:** Set static

3. **Configure SSL/TLS:**
   - Ensure SSL/TLS mode is set to "Full" or "Full (strict)"
   - This ensures secure connections to HubSpot

### Option 2: Vercel Edge Middleware (Application Level)

I've created `middleware.ts` in your project that adds the header. However, **this may not work for HubSpot validation** because:

- HubSpot validates the proxy before requests reach your application
- The header needs to be added at the CDN/proxy level (before it hits Vercel)

**For Vercel deployments**, you'll still need to configure this at the CDN level (Cloudflare, etc.) that sits in front of Vercel.

The middleware is included as a backup, but Cloudflare configuration (Option 1) is recommended.

### Option 3: Nginx/Apache (If self-hosting)

Add to your Nginx configuration:

```nginx
location / {
    proxy_pass https://hubspot.com;
    proxy_set_header X-HS-Public-Host hub.zero-render.com;
    proxy_set_header Host hubspot.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Testing

After configuration, test the reverse proxy:

1. Visit: `https://hub.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
2. You should see a success message from HubSpot
3. Check in HubSpot Settings → Website → Reverse Proxy to verify

## What This Enables

Once configured, `hub.zero-render.com` can be used for:
- HubSpot-hosted assets (images, files, etc.)
- Faster content delivery
- Better SEO (using your own domain)
- Custom branding

## Important Notes

- The header must be set at the **proxy/CDN level**, not in your Next.js app
- HubSpot will validate the reverse proxy before it becomes active
- This is separate from your main website - it's specifically for HubSpot content
- DNS changes may take 24-48 hours to propagate

## Troubleshooting

**Still getting validation errors:**
- Verify the header is being sent (use browser DevTools → Network tab)
- Check that DNS is properly configured
- Ensure SSL certificate is valid for `hub.zero-render.com`
- Wait for DNS propagation (can take up to 48 hours)

**Header not being added:**
- Double-check your Cloudflare/Vercel configuration
- Verify the rule is active and matches the correct domain
- Test with curl: `curl -H "X-HS-Public-Host: hub.zero-render.com" https://hub.zero-render.com/hubfs/hs-reverse-proxy-validation-test`

