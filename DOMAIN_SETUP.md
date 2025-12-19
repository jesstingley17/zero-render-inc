# Domain Setup Guide: zero-render.com

## The Problem
The domain `zero-render.com` is not loading because DNS records are not configured correctly.

## Quick Fix: Configure Domain in Vercel

### Step 1: Add Domain to Vercel Project

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `zero-render` project

2. **Add Domain**
   - Go to: **Settings** → **Domains**
   - Click: **Add Domain**
   - Enter: `zero-render.com`
   - Click: **Add**

3. **Add WWW Domain**
   - Click: **Add Domain** again
   - Enter: `www.zero-render.com`
   - Click: **Add**

### Step 2: Configure DNS Records

Vercel will show you the DNS records you need to add. You'll need to add these records in your DNS provider (likely Cloudflare or Spaceship).

#### Option A: If Using Cloudflare (Recommended)

1. **Log into Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com
   - Select: `zero-render.com`

2. **Add DNS Records**
   - Go to: **DNS** → **Records**
   - Click: **Add record**

   **Record 1: Root Domain (A Record)**
   - **Type:** A
   - **Name:** `@` (or leave blank for root)
   - **IPv4 address:** `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   - **Proxy status:** ✅ **Proxied** (orange cloud)
   - **TTL:** Auto
   - Click: **Save**

   **Record 2: WWW Subdomain (CNAME)**
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `cname.vercel-dns.com` (or the value Vercel shows you)
   - **Proxy status:** ✅ **Proxied** (orange cloud)
   - **TTL:** Auto
   - Click: **Save**

#### Option B: If Using Spaceship (Domain Registrar)

1. **Log into Spaceship**
   - Go to: https://spaceship.com
   - Navigate to your domain: `zero-render.com`

2. **Update Nameservers to Cloudflare** (Recommended)
   - Get Cloudflare nameservers from Cloudflare dashboard
   - In Spaceship: Go to **DNS Settings** → **Nameservers**
   - Update to Cloudflare nameservers (e.g., `alice.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
   - Then follow **Option A** above

3. **OR Add DNS Records Directly in Spaceship**
   - Go to: **DNS Management**
   - Add the A and CNAME records as shown in Vercel dashboard

### Step 3: Verify DNS Configuration

After adding DNS records:

1. **Check DNS Propagation**
   ```bash
   dig zero-render.com
   dig www.zero-render.com
   ```

2. **Wait for Propagation**
   - **Cloudflare (Proxied):** 1-5 minutes
   - **Other DNS providers:** 5-30 minutes
   - **Nameserver changes:** 24-48 hours

3. **Test the Domain**
   - Visit: `https://zero-render.com`
   - Visit: `https://www.zero-render.com`
   - Both should load your Vercel deployment

### Step 4: SSL Certificate

Vercel automatically provisions SSL certificates for your domains. This usually happens within a few minutes after DNS is configured correctly.

## Common Issues

### Issue: Domain Shows "Invalid Configuration" in Vercel

**Cause:** DNS records not pointing to Vercel

**Fix:**
1. Check DNS records match what Vercel shows
2. Wait for DNS propagation
3. Verify nameservers are correct

### Issue: Domain Resolves but Shows "Not Found"

**Cause:** Domain not added to Vercel project

**Fix:**
1. Add domain in Vercel dashboard (Settings → Domains)
2. Wait a few minutes for Vercel to configure

### Issue: SSL Certificate Not Provisioning

**Cause:** DNS not configured correctly or not propagated

**Fix:**
1. Verify DNS records are correct
2. Wait for DNS propagation
3. Check Vercel dashboard for SSL status
4. May take up to 24 hours for SSL to provision

## Quick Checklist

- [ ] Domain added to Vercel project (Settings → Domains)
- [ ] DNS A record added: `@` → Vercel IP (or CNAME to Vercel)
- [ ] DNS CNAME record added: `www` → `cname.vercel-dns.com`
- [ ] Nameservers pointing to DNS provider (if using Cloudflare)
- [ ] Waited for DNS propagation (1-5 min for Cloudflare, up to 48 hours for nameservers)
- [ ] Tested: `https://zero-render.com` loads
- [ ] Tested: `https://www.zero-render.com` loads
- [ ] SSL certificate provisioned (check Vercel dashboard)

## Next Steps

Once the domain is working:
1. Configure redirects (www to non-www or vice versa) in Vercel
2. Set up any subdomains (blog, cdn, etc.)
3. Verify all pages load correctly

## Need Help?

If the domain still doesn't work:
1. Check Vercel deployment logs
2. Verify DNS records using: https://dnschecker.org
3. Check Vercel dashboard for any error messages
4. Contact Vercel support if needed

