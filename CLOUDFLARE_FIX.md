# Fix Cloudflare DNS Records - Step by Step

## Current Issues Found:
1. ❌ Two A records (one is wrong: 216.150.1.1)
2. ❌ A records are "DNS only" (should be "Proxied")
3. ❌ Missing CNAME for www.zero-render.com
4. ⚠️ Nameservers still pointing to Spaceship

## Step 1: Fix A Record for Root Domain

1. **In Cloudflare Dashboard:**
   - Go to: **DNS** → **Records**
   - Find the A record with IP: `216.150.1.1`
   - Click **Edit** (or the three dots menu)
   - Click **Delete** to remove it
   - Confirm deletion

2. **Edit the Correct A Record:**
   - Find the A record with IP: `76.76.21.21`
   - Click **Edit**
   - Change **Proxy status** from "DNS only" (gray cloud) to **"Proxied"** (orange cloud)
   - Click **Save**

## Step 2: Add CNAME for WWW

1. **In Cloudflare Dashboard:**
   - Go to: **DNS** → **Records**
   - Click **"Add record"**

2. **Configure the CNAME:**
   - **Type:** `CNAME`
   - **Name:** `www` (just "www", not "www.zero-render.com")
   - **Target:** `cname.vercel-dns.com` (or check Vercel dashboard for exact value)
   - **Proxy status:** ✅ **Proxied** (orange cloud) - IMPORTANT!
   - **TTL:** Auto
   - Click **Save**

## Step 3: Get Exact CNAME Value from Vercel

**To get the exact CNAME value:**

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to: **Settings** → **Domains**
4. Click on: `www.zero-render.com`
5. Look for the DNS record it shows
6. Copy the **exact** CNAME target value
7. Use that in Step 2 above

## Step 4: Update Nameservers (IMPORTANT!)

**Your nameservers are still pointing to Spaceship. They need to point to Cloudflare.**

1. **Get Cloudflare Nameservers:**
   - In Cloudflare dashboard
   - Go to: **Overview**
   - You'll see nameservers like:
     ```
     alice.ns.cloudflare.com
     bob.ns.cloudflare.com
     ```
   - Copy both nameservers

2. **Update at Spaceship:**
   - Go to: https://spaceship.com
   - Log in
   - Find domain: `zero-render.com`
   - Go to: **DNS Settings** or **Nameservers**
   - Replace the current nameservers:
     - `launch1.spaceship.net`
     - `launch2.spaceship.net`
   - With Cloudflare's nameservers:
     - `alice.ns.cloudflare.com` (or whatever Cloudflare shows)
     - `bob.ns.cloudflare.com` (or whatever Cloudflare shows)
   - Save

3. **Wait 24-48 hours** for nameserver propagation

## ⚠️ Important: Email May Break Temporarily

**Your email is using Spaceship mail (mx1.spacemail.com, mx2.spacemail.com).**

**After updating nameservers to Cloudflare:**
- Email should still work (MX records will be in Cloudflare)
- But if email breaks, you may need to:
  - Keep MX records in Cloudflare pointing to spacemail.com
  - Or configure email forwarding in Cloudflare

## Quick Checklist

- [ ] Deleted incorrect A record (216.150.1.1)
- [ ] Changed A record (76.76.21.21) to "Proxied" (orange cloud)
- [ ] Added CNAME record: `www` → `cname.vercel-dns.com` (Proxied)
- [ ] Got exact CNAME value from Vercel dashboard
- [ ] Updated nameservers at Spaceship to Cloudflare
- [ ] Waited 5 minutes (for DNS) or 24-48 hours (for nameservers)
- [ ] Tested: `https://zero-render.com`
- [ ] Tested: `https://www.zero-render.com`

## After Making Changes

**Wait 5-10 minutes, then test:**

```bash
# Test DNS
dig zero-render.com
dig www.zero-render.com

# Test in browser
# Visit: https://zero-render.com
# Visit: https://www.zero-render.com
```

**Check Vercel:**
- Go to: Settings → Domains
- Should show "Valid Configuration" for both domains

## If You Need the Exact CNAME Value

**Go to Vercel and check:**
1. Dashboard → Your Project → Settings → Domains
2. Click on `www.zero-render.com`
3. It will show you the exact CNAME target to use

**Or tell me and I can help you find it!**

