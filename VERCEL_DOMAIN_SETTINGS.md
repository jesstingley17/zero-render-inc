# Vercel Domain Settings: Connected vs Redirected

## Question: Should domains be "Connected" or "Redirected"?

### ✅ Answer: **CONNECTED** (Not Redirected)

**In Vercel Dashboard → Settings → Domains:**

- **Connected:** ✅ **CORRECT** - Domain serves your Vercel project
- **Redirected:** ❌ **WRONG** - Domain redirects to another domain (not what you want)

### How to Set It Up:

1. **Go to Vercel:** Settings → Domains
2. **For `zero-render.com`:**
   - Should be **Connected** to your project
   - NOT redirected
3. **For `www.zero-render.com`:**
   - Should be **Connected** to your project
   - OR can be redirected to `zero-render.com` (optional, but connected is fine)

### What "Connected" Means:
- Domain serves your Next.js app from Vercel
- Your site loads when someone visits the domain
- This is what you want!

### What "Redirected" Means:
- Domain automatically redirects visitors to another URL
- Your site doesn't load on that domain
- Only use this if you want to redirect (e.g., redirect www to non-www)

## Recommendation:

**Set both domains to "Connected":**
- `zero-render.com` → Connected
- `www.zero-render.com` → Connected

This way both URLs work and serve your site.

