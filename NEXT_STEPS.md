# Next Steps Checklist

## ✅ Completed
- [x] DNS API credentials added to Vercel environment variables
- [x] HubSpot reverse proxy integration code implemented
- [x] Blog content URL rewriting configured

## 🔧 Next Steps

### 1. Configure DNS Records

You need to add two CNAME records in your DNS provider:

#### Record 1: HubSpot Reverse Proxy
- **Type:** CNAME
- **Name:** `hub`
- **Value:** `hubspot.com` (or your specific HubSpot domain)
- **TTL:** 3600 or Auto

#### Record 2: CDN Subdomain
- **Type:** CNAME
- **Name:** `cdn`
- **Value:** `cname.vercel-dns.com` (or your Vercel deployment URL)
- **TTL:** 3600 or Auto

**Where to configure:**
- If using **Cloudflare**: Dashboard → DNS → Records → Add record
- If using **other DNS provider**: Their DNS management dashboard

### 2. Configure HubSpot Reverse Proxy Header (Cloudflare)

If you're using Cloudflare, you need to add a Transform Rule:

1. Go to Cloudflare Dashboard → Rules → Transform Rules
2. Click "Create rule" → "Modify Request Header"
3. Configure:
   - **Rule name:** `HubSpot Reverse Proxy Header`
   - **When:** `hub.zero-render.com/*`
   - **Then:** Modify Request Header
     - **Header name:** `X-HS-Public-Host`
     - **Value:** `hub.zero-render.com`
     - **Operation:** Set static
4. Deploy the rule

### 3. Add CDN Environment Variable (Vercel)

1. Go to Vercel project → Settings → Environment Variables
2. Add:
   - **Key:** `NEXT_PUBLIC_CDN_URL`
   - **Value:** `https://cdn.zero-render.com`
   - **Environment:** Production, Preview, Development
3. Save and redeploy

### 4. Verify Everything Works

After DNS propagates (can take 24-48 hours):

1. **Test HubSpot Reverse Proxy:**
   ```
   https://hub.zero-render.com/hubfs/hs-reverse-proxy-validation-test
   ```
   Should show HubSpot validation success

2. **Test CDN:**
   - Visit your site
   - Open browser DevTools → Network tab
   - Look for requests to `cdn.zero-render.com`

3. **Test Blog:**
   - Visit a blog post
   - Check that images load from `hub.zero-render.com`
   - Verify blog content displays correctly

## 📚 Reference Documents

- `DNS_SETUP.md` - Detailed DNS configuration guide
- `HUBSPOT_REVERSE_PROXY_SETUP.md` - HubSpot reverse proxy setup
- `CDN_SETUP.md` - CDN configuration details
- `ENV_VARIABLES.md` - All environment variables reference

## ⚠️ Important Notes

- DNS changes can take **24-48 hours** to propagate globally
- The HubSpot reverse proxy header **must** be configured at the CDN level (Cloudflare), not in your app
- After adding `NEXT_PUBLIC_CDN_URL`, you'll need to **redeploy** your Vercel project
- Test in an incognito window to avoid caching issues

## 🆘 Need Help?

If something isn't working:
1. Check the troubleshooting sections in the setup guides
2. Verify DNS records are correct using `dig` or online DNS checkers
3. Check Vercel deployment logs for errors
4. Verify environment variables are set correctly in Vercel


