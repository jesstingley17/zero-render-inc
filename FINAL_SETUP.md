# Final Setup Instructions - Using blog.zero-render.com for HubSpot

## ✅ Decision Made

Since you're using **Starlight Hyperlift Manager** on `hub.zero-render.com`, we'll use **`blog.zero-render.com`** for the HubSpot reverse proxy instead.

## What You Need to Configure

### 1. DNS Record for HubSpot

**In Cloudflare (or your DNS provider):**

1. Go to **DNS** → **Records**
2. Add a new **CNAME record**:
   - **Name:** `blog`
   - **Target:** `hubspot.com`
   - **TTL:** Auto or 3600
3. **Save**

This creates: `blog.zero-render.com` → `hubspot.com`

### 2. Cloudflare Transform Rule

**In Cloudflare Dashboard:**

1. Go to **Rules** → **Transform Rules**
2. Click **Create rule** → **Modify Request Header**
3. Configure:
   - **Rule name:** `HubSpot Reverse Proxy Header`
   - **When incoming requests match:**
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `blog.zero-render.com`
   - **Then:**
     - **Action:** Set static
     - **Header name:** `X-HS-Public-Host`
     - **Value:** `blog.zero-render.com`
4. Click **Deploy**

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
- ✅ Work automatically once DNS and Cloudflare rules are configured

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
- ✅ `blog.zero-render.com` → **HubSpot** (new CNAME record)
- ✅ Cloudflare Transform Rule for `blog.zero-render.com` (add header)
- ✅ Code updated to use `blog.zero-render.com`
- ✅ HubSpot will auto-validate (no manual config usually needed)

## Next Steps

1. ✅ Add the DNS CNAME record for `blog.zero-render.com` → `hubspot.com`
2. ✅ Create the Cloudflare Transform Rule (add `X-HS-Public-Host` header)
3. ⏳ Wait for DNS propagation (24-48 hours)
4. ✅ Test the reverse proxy validation URL: `https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
5. ✅ HubSpot will automatically validate and recognize the reverse proxy
6. ✅ Check that blog images load correctly from `blog.zero-render.com`

That's it! 🎉

