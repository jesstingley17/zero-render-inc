# URGENT: DNS_PROBE_FINISHED_NXDOMAIN Error Fix

## The Problem
`DNS_PROBE_FINISHED_NXDOMAIN` means DNS cannot find your domain. This happens when:
- Nameservers aren't pointing to Cloudflare
- Domain isn't properly added to Cloudflare
- DNS records aren't configured

## Root Cause
Your nameservers are still pointing to **Spaceship** (`launch1.spaceship.net`, `launch2.spaceship.net`) instead of **Cloudflare**.

## IMMEDIATE FIX: Update Nameservers

### Step 1: Get Cloudflare Nameservers

1. **Log into Cloudflare:**
   - Go to: https://dash.cloudflare.com
   - Select domain: `zero-render.com`
   - Go to: **Overview** tab

2. **Copy the Nameservers:**
   - You'll see something like:
     ```
     alice.ns.cloudflare.com
     bob.ns.cloudflare.com
     ```
   - **Copy both nameservers exactly**

### Step 2: Update Nameservers at Spaceship

1. **Log into Spaceship:**
   - Go to: https://spaceship.com
   - Log in to your account

2. **Find Your Domain:**
   - Go to: **Domains** or **My Domains**
   - Click on: `zero-render.com`

3. **Update Nameservers:**
   - Look for: **DNS Settings**, **Nameservers**, or **DNS Management**
   - Find where it shows:
     ```
     launch1.spaceship.net
     launch2.spaceship.net
     ```
   - **Replace them** with Cloudflare's nameservers:
     ```
     [First Cloudflare nameserver from Step 1]
     [Second Cloudflare nameserver from Step 1]
     ```
   - Click **Save** or **Update**

### Step 3: Verify DNS Records in Cloudflare

**After updating nameservers, make sure these records exist in Cloudflare:**

1. **Go to Cloudflare:** DNS → Records

2. **Check/Add A Record:**
   - Type: **A**
   - Name: `@` (or blank for root)
   - IPv4: `76.76.21.21` (or the IP Vercel shows you)
   - Proxy: ✅ **Proxied** (orange cloud)
   - TTL: Auto

3. **Check/Add CNAME Record:**
   - Type: **CNAME**
   - Name: `www`
   - Target: `cname.vercel-dns.com` (or what Vercel shows)
   - Proxy: ✅ **Proxied** (orange cloud)
   - TTL: Auto

### Step 4: Wait for Propagation

**Nameserver changes take 24-48 hours to propagate globally.**

**However:**
- Cloudflare (if nameservers are correct): Usually works within 1-2 hours
- You can test immediately after updating (may take a few minutes)

### Step 5: Test

**After updating nameservers, wait 10-30 minutes, then test:**

```bash
# Check nameservers
dig NS zero-render.com

# Should show Cloudflare nameservers, not Spaceship
```

**Or use online tools:**
- https://dnschecker.org
- Enter: `zero-render.com`
- Select: NS (Nameserver)
- Check if it shows Cloudflare nameservers globally

## Alternative: If You Can't Update Nameservers

**If you can't update nameservers at Spaceship, you have two options:**

### Option 1: Use Spaceship DNS (Not Recommended)
- Keep nameservers at Spaceship
- Add DNS records in Spaceship (not Cloudflare)
- Less reliable, slower

### Option 2: Transfer Domain to Cloudflare (Recommended)
- Transfer domain registration to Cloudflare
- Automatic nameserver configuration
- Better performance and reliability

## Quick Checklist

- [ ] Got Cloudflare nameservers from Cloudflare dashboard
- [ ] Updated nameservers at Spaceship to Cloudflare's
- [ ] Verified A record exists in Cloudflare (76.76.21.21, Proxied)
- [ ] Verified CNAME record exists in Cloudflare (www → cname.vercel-dns.com, Proxied)
- [ ] Waited 10-30 minutes (or up to 48 hours for full propagation)
- [ ] Tested: `dig NS zero-render.com` shows Cloudflare nameservers
- [ ] Tested: `https://www.zero-render.com` loads

## Still Getting NXDOMAIN?

**If you've updated nameservers and still getting the error:**

1. **Double-check nameservers:**
   ```bash
   dig NS zero-render.com
   ```
   - Should show Cloudflare nameservers
   - If still showing Spaceship, wait longer or check Spaceship settings

2. **Check Cloudflare:**
   - Make sure domain is active in Cloudflare
   - Check for any errors or warnings
   - Verify DNS records are correct

3. **Clear DNS cache:**
   - On your computer: `sudo dscacheutil -flushcache` (Mac) or restart
   - Or use different DNS: 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)

4. **Wait longer:**
   - Nameserver changes can take up to 48 hours
   - Check https://dnschecker.org to see global propagation

## Need Help?

**If you're stuck:**
1. Share what nameservers Cloudflare shows you
2. Share what you see in Spaceship's nameserver settings
3. I can help you verify the exact configuration needed

