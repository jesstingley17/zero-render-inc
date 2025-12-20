# Blog Subdomain (blog.zero-render.com) - HubSpot Setup

## Your Current Setup: ✅ CORRECT!

**In Cloudflare, you have:**
```
Type:    CNAME
Name:    blog
Target:  hubspot.com
Proxy:   🟠 Proxied (orange cloud) ← THIS IS CORRECT!
```

## Why This is Correct:

### Different Rules for Different Subdomains:

1. **Main Domain (zero-render.com, www.zero-render.com):**
   - **Proxy:** ⚪ DNS only (gray cloud)
   - **Why:** Vercel requires DNS only for main domains
   - **Purpose:** Serves your Next.js app

2. **Blog Subdomain (blog.zero-render.com):**
   - **Proxy:** 🟠 Proxied (orange cloud) ← **CORRECT!**
   - **Why:** HubSpot reverse proxy needs Cloudflare proxy
   - **Purpose:** Serves HubSpot blog content through your domain

## Why Blog Needs to be Proxied:

- **HubSpot reverse proxy** requires Cloudflare's proxy to work
- The proxy adds necessary headers (`X-HS-Public-Host`) that HubSpot needs
- Without proxy, HubSpot validation will fail
- This is different from Vercel domains which need DNS only

## Summary:

**Your Cloudflare DNS should look like this:**

```
Type    Name    Content/Target              Proxy    Purpose
A       @       76.76.21.21                ⚪ No    Vercel (main domain)
CNAME   www     cname.vercel-dns.com       ⚪ No    Vercel (www)
CNAME   blog    hubspot.com                🟠 Yes  HubSpot (blog) ← CORRECT!
```

## This is Perfect! ✅

- Main domains: DNS only (gray) for Vercel
- Blog subdomain: Proxied (orange) for HubSpot
- Everything is configured correctly!

## No Changes Needed

Your blog subdomain setup is correct. Keep it as is!


