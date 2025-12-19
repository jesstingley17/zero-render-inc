# Final Setup Instructions - Using blog.zero-render.com for HubSpot

## ✅ Decision Made

Since you're using **Starlight Hyperlift Manager** on `hub.zero-render.com`, we'll use **`blog.zero-render.com`** for the HubSpot reverse proxy instead.

## What You Need to Configure

### 1. DNS Record for HubSpot

**In Spaceship DNS:**

1. Log into your Spaceship account
2. Go to **DNS Management** for `zero-render.com`
3. Add a new **CNAME record**:
   - **Name/Host:** `blog`
   - **Target/Value:** `hubspot.com`
   - **TTL:** 3600 (or Auto if available)
4. **Save**

This creates: `blog.zero-render.com` → `hubspot.com`

### 2. Add Reverse Proxy Header

**Important:** Spaceship doesn't have the same header modification features as Cloudflare. You have a few options:

#### Option A: Use Cloudflare in Front (Recommended if possible)

If you can add Cloudflare in front of Spaceship:
1. Point your domain's nameservers to Cloudflare
2. Configure Cloudflare Transform Rule as described in `HUBSPOT_REVERSE_PROXY_SETUP.md`
3. Cloudflare will add the header before forwarding to Spaceship/HubSpot

#### Option B: Use Next.js Middleware (May work)

The `middleware.ts` file in your project already adds the header. However, **this may not work** because HubSpot validates the proxy before requests reach your Next.js app.

To test if it works:
1. Deploy your Next.js app
2. Visit: `https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
3. Check if HubSpot validates it

#### Option C: Use a Proxy Service

You might need to use a service like:
- Cloudflare (free tier) in front of your DNS
- A reverse proxy service that can add headers
- Nginx or similar if you have server access

**Note:** The `X-HS-Public-Host` header **must** be added before the request reaches HubSpot. If Spaceship doesn't support this, you'll need an intermediary service.

### 3. Configure HubSpot (Optional but Recommended)

**In HubSpot Dashboard:**

HubSpot should automatically detect the reverse proxy once DNS and headers are configured, but you can verify/configure it:

1. Go to **Settings** → **Website** → **Domains & URLs**
2. Look for **Reverse Proxy** section
3. HubSpot will automatically validate `blog.zero-render.com` when you visit:
   ```
   https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test
   ```
4. Once validated, HubSpot will recognize the reverse proxy

**Note:** HubSpot validates the reverse proxy automatically - you don't need to manually add it in most cases. The validation happens when you visit the test URL.

### 4. Keep Starlight on hub.zero-render.com

✅ **No changes needed** - Keep `hub.zero-render.com` pointing to Starlight Hyperlift Manager as it is.

## What the Code Does

The code has been updated to:
- ✅ Rewrite all HubSpot URLs to use `blog.zero-render.com`
- ✅ Process blog images, assets, and content through the reverse proxy
- ✅ Middleware attempts to add the `X-HS-Public-Host` header (may need additional proxy layer)

## Testing

After DNS propagates (24-48 hours):

1. **Test HubSpot reverse proxy:**
   ```
   https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test
   ```
   Should show HubSpot validation success message.

2. **Test blog:**
   - Visit a blog post on your site
   - Check browser DevTools → Network tab
   - Verify images load from `blog.zero-render.com`

## Summary

- ✅ `hub.zero-render.com` → **Starlight Hyperlift Manager** (keep as is)
- ✅ `blog.zero-render.com` → **HubSpot** (new CNAME record in Spaceship)
- ⚠️ **Header configuration needed** - Spaceship may not support adding headers directly
- ✅ Code updated to use `blog.zero-render.com`
- ✅ Middleware included (may need additional proxy layer)

## Next Steps

1. ✅ Add the DNS CNAME record in Spaceship: `blog.zero-render.com` → `hubspot.com`
2. ⚠️ **Configure header addition** - Choose one of the options above (Cloudflare, middleware test, or proxy service)
3. ⏳ Wait for DNS propagation (24-48 hours)
4. ✅ Test the reverse proxy validation URL: `https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
5. ✅ If validation fails, you'll need to add a proxy layer that can modify headers
6. ✅ Check that blog images load correctly from `blog.zero-render.com`

## Important Note

**The `X-HS-Public-Host` header is critical** - HubSpot requires it for reverse proxy validation. If Spaceship doesn't support adding custom headers, you'll need to:
- Use Cloudflare (free) in front of your DNS, OR
- Use a reverse proxy service, OR
- Test if the Next.js middleware works (less likely to work for validation)

That's it! 🎉

