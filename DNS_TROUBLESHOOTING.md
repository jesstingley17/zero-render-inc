# DNS Troubleshooting: blog.zero-render.com Not Found

## The Problem

Browser can't find `blog.zero-render.com` - this means the DNS record doesn't exist or hasn't propagated yet.

## Quick Fix: Add DNS Record in Cloudflare

### Step 1: Add CNAME Record in Cloudflare

1. **Log into Cloudflare Dashboard**
2. **Select your domain:** `zero-render.com`
3. **Go to:** DNS → Records
4. **Click:** "Add record"
5. **Configure:**
   - **Type:** CNAME
   - **Name:** `blog` (just "blog", not "blog.zero-render.com")
   - **Target:** `hubspot.com`
   - **Proxy status:** 
     - ✅ **Proxied** (orange cloud) - Recommended (uses Cloudflare's proxy)
     - ⚠️ **DNS only** (gray cloud) - Will work but won't use Cloudflare features
   - **TTL:** Auto
6. **Click:** Save

### Step 2: Verify the Record

After saving, you should see:
- **Type:** CNAME
- **Name:** blog
- **Content/Target:** hubspot.com
- **Proxy:** Proxied (orange cloud) or DNS only (gray cloud)

### Step 3: Wait for DNS Propagation

- **Cloudflare (Proxied):** Usually works within 1-5 minutes
- **Cloudflare (DNS only):** Can take 5-30 minutes
- **Other DNS providers:** Can take 24-48 hours

## Check DNS Propagation

### Option 1: Use Online Tool
Visit: https://dnschecker.org
- Enter: `blog.zero-render.com`
- Select: CNAME
- Click: Search
- Should show `hubspot.com` or `hubspot.com.cdn.cloudflare.net` (if proxied)

### Option 2: Command Line
```bash
dig blog.zero-render.com
# or
nslookup blog.zero-render.com
```

Should return a CNAME to `hubspot.com`

### Option 3: Cloudflare Dashboard
- Go to DNS → Records
- Check if the record shows as "Active"

## Common Issues

### Issue: Record Not Showing in Cloudflare

**Possible causes:**
- Record wasn't saved
- Wrong domain selected
- Need to refresh the page

**Fix:**
- Double-check you're in the right domain
- Try adding the record again
- Refresh the DNS records page

### Issue: DNS Still Not Resolving After Adding

**Possible causes:**
- Nameservers not pointing to Cloudflare
- DNS propagation delay
- Record configured incorrectly

**Fix:**
1. **Check nameservers:**
   - In Cloudflare: Go to Overview
   - Check if nameservers match what's at your domain registrar
   - If not, update nameservers at your registrar

2. **Wait a bit longer:**
   - If using Cloudflare proxy: Should work in 1-5 minutes
   - If DNS only: Can take up to 30 minutes
   - Clear browser cache and try again

3. **Verify record:**
   - Make sure Name is just `blog` (not `blog.zero-render.com`)
   - Make sure Target is `hubspot.com` (not `www.hubspot.com`)

### Issue: Nameservers Not Pointing to Cloudflare

**Check:**
1. In Cloudflare: Go to Overview
2. Note the nameservers (e.g., `alice.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
3. At your domain registrar (Spaceship), update nameservers to match
4. Wait for nameserver propagation (can take 24-48 hours)

## Step-by-Step: Full Setup

### 1. Add Domain to Cloudflare (If Not Already Done)

1. Sign up/login to Cloudflare
2. Click "Add a Site"
3. Enter: `zero-render.com`
4. Select plan: Free
5. Cloudflare will scan your DNS records
6. Update nameservers at your registrar (Spaceship) to point to Cloudflare

### 2. Add CNAME Record

1. In Cloudflare: DNS → Records
2. Add record:
   - Type: CNAME
   - Name: `blog`
   - Target: `hubspot.com`
   - Proxy: Proxied (orange cloud)
3. Save

### 3. Wait and Test

1. Wait 1-5 minutes (if proxied) or 5-30 minutes (if DNS only)
2. Test: Visit `https://blog.zero-render.com`
3. Should resolve (may show HubSpot error, but DNS is working)

## Next Steps After DNS Works

Once `blog.zero-render.com` resolves:

1. **Add Transform Rule** (for the `X-HS-Public-Host` header)
2. **Test validation:** `https://blog.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
3. **Verify blog images** load from `blog.zero-render.com`

## Quick Checklist

- [ ] Domain added to Cloudflare
- [ ] Nameservers updated at registrar (Spaceship)
- [ ] CNAME record added: `blog` → `hubspot.com`
- [ ] Record shows as "Active" in Cloudflare
- [ ] Waited for DNS propagation
- [ ] Test: `blog.zero-render.com` resolves (even if shows error)

## Still Not Working?

If DNS still doesn't resolve after following these steps:
1. Check Cloudflare dashboard for any errors
2. Verify nameservers are correct
3. Contact Cloudflare support
4. Check if domain registrar (Spaceship) has any restrictions



