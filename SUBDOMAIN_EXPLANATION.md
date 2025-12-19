# Subdomain Explanation: hub vs cdn

Let me clarify the difference between these two subdomains - they serve **completely different purposes**:

## 🎯 Two Different Subdomains, Two Different Purposes

### 1. `hub.zero-render.com` - HubSpot Reverse Proxy

**What it does:**
- Acts as a **reverse proxy** for HubSpot's content
- Routes HubSpot blog images and assets through YOUR domain instead of HubSpot's CDN
- Makes blog images appear to come from `hub.zero-render.com` instead of `cdn2.hubspot.net`

**How it works:**
- You create a CNAME: `hub.zero-render.com` → `hubspot.com`
- Cloudflare (or your proxy) intercepts requests
- Adds the `X-HS-Public-Host` header that HubSpot requires
- Forwards the request to HubSpot
- HubSpot serves the content, but it looks like it's coming from your domain

**What you might have set up:**
- If you created `hub.zero-render.com` and pointed it to **storage** (like Cloudflare R2, AWS S3, etc.), that's NOT what we need
- We need it to point to **HubSpot**, not storage

**Current status:**
- The code is already set up to rewrite HubSpot URLs to use `hub.zero-render.com`
- You just need to configure the DNS and Cloudflare rules

---

### 2. `cdn.zero-render.com` - Your Site's CDN

**What it does:**
- Serves YOUR website's static files (JavaScript, CSS, fonts, images)
- Makes your site load faster by serving assets from a CDN
- Points to your Vercel deployment

**How it works:**
- You create a CNAME: `cdn.zero-render.com` → `cname.vercel-dns.com` (or your Vercel URL)
- Next.js serves static assets from this subdomain
- Vercel's CDN caches and serves them globally

**What you might have set up:**
- If you created `cdn.zero-render.com` for storage, that's fine - but we need it to point to Vercel, not storage

---

## 🤔 What Did You Actually Set Up?

**Question:** When you created `hub.zero-render.com`, did you:
- [ ] Point it to HubSpot?
- [ ] Point it to storage (R2, S3, Cloudflare R2, etc.)?
- [ ] Point it to something else?

**If you pointed it to storage:**
- That's a different use case
- For HubSpot reverse proxy, we need it to point to `hubspot.com`
- You could use a different subdomain for storage if needed (like `storage.zero-render.com`)

---

## ✅ What You Actually Need

### For HubSpot Blog Integration:

1. **`hub.zero-render.com`** 
   - CNAME → `hubspot.com` (NOT storage)
   - Cloudflare Transform Rule to add `X-HS-Public-Host` header
   - This makes blog images load from your domain

### For Site Performance:

2. **`cdn.zero-render.com`**
   - CNAME → `cname.vercel-dns.com` (or your Vercel deployment)
   - Environment variable: `NEXT_PUBLIC_CDN_URL=https://cdn.zero-render.com`
   - This serves your site's static files faster

---

## 🔄 If You Already Set Up Storage

If you already have `hub.zero-render.com` pointing to storage:

**Option 1:** Use a different subdomain for HubSpot
- Use `blog.zero-render.com` or `assets.zero-render.com` for HubSpot
- Update the code to use that subdomain instead

**Option 2:** Reconfigure `hub.zero-render.com`
- Change it from storage to HubSpot reverse proxy
- Use a different subdomain for storage (like `storage.zero-render.com`)

**Option 3:** Keep both
- `hub.zero-render.com` → HubSpot (for blog)
- `storage.zero-render.com` → Your storage (for other files)

---

## 📋 Quick Checklist

- [ ] Check what `hub.zero-render.com` currently points to
- [ ] If it points to storage, decide: change it or use different subdomain
- [ ] Configure `hub.zero-render.com` → `hubspot.com` (CNAME)
- [ ] Add Cloudflare Transform Rule for `X-HS-Public-Host` header
- [ ] Configure `cdn.zero-render.com` → `cname.vercel-dns.com` (CNAME)
- [ ] Add `NEXT_PUBLIC_CDN_URL` environment variable in Vercel

---

## 💡 Summary

- **`hub`** = HubSpot blog assets (images, files from HubSpot)
- **`cdn`** = Your site's static files (JS, CSS, fonts from your code)

They're completely separate and serve different purposes!

