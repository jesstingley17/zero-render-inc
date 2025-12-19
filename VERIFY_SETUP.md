# Verify Your HubSpot Reverse Proxy Setup

## Quick Verification Checklist

### ✅ Step 1: Check DNS Record

**In Cloudflare:**
1. Go to **DNS** → **Records**
2. Verify you have a CNAME record:
   - **Name:** `blog`
   - **Target:** `hubspot.com`
   - **Status:** Active (orange cloud or gray cloud)

### ✅ Step 2: Check Transform Rule

**In Cloudflare:**
1. Go to **Rules** → **Transform Rules**
2. Look for a rule named something like "HubSpot Reverse Proxy Header"
3. Verify it's configured:
   - **When:** `blog.zero-render.com/*`
   - **Action:** Set static header
   - **Header:** `X-HS-Public-Host`
   - **Value:** `blog.zero-render.com`
   - **Status:** Active/Deployed

### ✅ Step 3: Test the Reverse Proxy

**Visit this URL in your browser:**
```
https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test
```

**Expected Results:**
- ✅ **Success:** You see a message like "Reverse proxy validation successful" or similar
- ❌ **Failure:** You see an error about missing `X-HS-Public-Host` header

### ✅ Step 4: Test Blog Images

1. Visit a blog post on your site: `https://www.zero-render.com/blog/[any-post]`
2. Open browser DevTools (F12) → **Network** tab
3. Reload the page
4. Look for image requests
5. Check if images are loading from `blog.zero-render.com` instead of `cdn2.hubspot.net`

**What to look for:**
- ✅ Images loading from `blog.zero-render.com`
- ❌ Images still loading from `cdn2.hubspot.net` or other HubSpot domains

## Common Issues & Fixes

### Issue: DNS Not Resolving

**Symptom:** `blog.zero-render.com` doesn't load or shows DNS error

**Fix:**
- Wait 24-48 hours for DNS propagation
- Check DNS record is correct in Cloudflare
- Verify nameservers are pointing to Cloudflare

### Issue: Transform Rule Not Working

**Symptom:** Validation test fails with header error

**Fix:**
- Check Transform Rule is **Deployed** (not just saved)
- Verify rule matches `blog.zero-render.com` exactly
- Check rule order (more specific rules should come first)
- Try disabling and re-enabling the rule

### Issue: Images Still Loading from HubSpot CDN

**Symptom:** Blog images load from `cdn2.hubspot.net` instead of `blog.zero-render.com`

**Fix:**
- Clear browser cache
- Check that code is deployed (the URL rewriting happens in the API route)
- Verify `lib/hubspot-proxy.ts` is using `blog.zero-render.com`
- Check browser console for errors

### Issue: SSL Certificate Error

**Symptom:** Browser shows SSL warning for `blog.zero-render.com`

**Fix:**
- In Cloudflare, go to **SSL/TLS**
- Set mode to **Full** or **Full (strict)**
- Wait a few minutes for certificate to provision

## Testing Commands

### Test DNS Resolution
```bash
dig blog.zero-render.com
# Should show CNAME to hubspot.com
```

### Test Header with curl
```bash
curl -I https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test
# Check response headers
```

### Test from Different Location
Use online tools:
- https://dnschecker.org (check DNS propagation)
- https://www.webpagetest.org (test from different locations)

## Success Indicators

✅ **Everything is working if:**
1. `blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test` shows success
2. Blog images load from `blog.zero-render.com`
3. No console errors in browser
4. Blog posts display correctly

## Next Steps After Verification

Once everything is verified:
1. ✅ Monitor blog performance
2. ✅ Check HubSpot dashboard for reverse proxy status
3. ✅ Test from different devices/locations
4. ✅ Monitor Cloudflare analytics for traffic

## Need Help?

If something isn't working:
1. Check Cloudflare dashboard for any errors
2. Review browser console for JavaScript errors
3. Check Vercel deployment logs
4. Verify all environment variables are set


