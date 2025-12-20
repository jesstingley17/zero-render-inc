# Nameserver Fix: Cloudflare Configured But Site Not Loading

## The Problem
✅ Cloudflare DNS records are configured correctly
❌ But nameservers at Spaceship still point to Spaceship (not Cloudflare)
❌ Result: DNS queries go to Spaceship → No records found → NXDOMAIN error

## Why This Happens
When you type `www.zero-render.com`:
1. Browser asks: "Where are the DNS records for zero-render.com?"
2. System checks nameservers (currently pointing to Spaceship)
3. Queries Spaceship's DNS servers
4. Spaceship doesn't have your Cloudflare records → Returns "domain not found"
5. Browser shows: `ERR_NAME_NOT_RESOLVED`

**Even though Cloudflare has the correct records, the world is asking Spaceship (which doesn't have them).**

## The Fix: Update Nameservers at Spaceship

### Step 1: Get Cloudflare Nameservers

1. **Go to Cloudflare Dashboard:**
   - https://dash.cloudflare.com
   - Select: `zero-render.com`
   - Go to: **Overview** tab

2. **Find Nameservers Section:**
   - Look for "Nameservers" or "DNS" section
   - You'll see something like:
     ```
     alice.ns.cloudflare.com
     bob.ns.cloudflare.com
     ```
   - **Copy both nameservers exactly**

### Step 2: Update at Spaceship (Domain Registrar)

1. **Log into Spaceship:**
   - https://spaceship.com
   - Go to your account

2. **Find Domain Management:**
   - Go to: **Domains** or **My Domains**
   - Click on: `zero-render.com`

3. **Find Nameserver Settings:**
   - Look for: **Nameservers**, **DNS Settings**, or **DNS Management**
   - You'll currently see:
     ```
     launch1.spaceship.net
     launch2.spaceship.net
     ```
   - Or it might show as "Custom Nameservers" or "Default Nameservers"

4. **Change to Cloudflare:**
   - Click **Edit** or **Change Nameservers**
   - Select **Custom Nameservers** (if option exists)
   - Enter Cloudflare's nameservers:
     ```
     [First nameserver from Cloudflare]
     [Second nameserver from Cloudflare]
     ```
   - Click **Save** or **Update**

### Step 3: Verify the Change

**Wait 5-10 minutes, then check:**

```bash
dig NS zero-render.com
```

**Should show Cloudflare nameservers, NOT Spaceship.**

**Or use online tool:**
- https://dnschecker.org
- Enter: `zero-render.com`
- Select: NS (Nameserver)
- Should show Cloudflare nameservers globally

### Step 4: Test the Site

**After nameservers are updated:**
- Wait 10-30 minutes for propagation
- Visit: `https://www.zero-render.com`
- Should load your site!

## Important Notes

### Why Nameservers Matter
- **Nameservers = "Where to look for DNS records"**
- If nameservers point to Spaceship → Queries go to Spaceship
- If nameservers point to Cloudflare → Queries go to Cloudflare (where your records are)

### Propagation Time
- **Cloudflare nameservers:** Usually work within 1-2 hours
- **Full global propagation:** Can take 24-48 hours
- **You can test immediately** (may take a few minutes)

### What If I Can't Find Nameserver Settings in Spaceship?

**Try these locations:**
1. Domain settings → DNS Management
2. Domain settings → Advanced → Nameservers
3. Account → Domains → zero-render.com → DNS
4. Contact Spaceship support if you can't find it

## Quick Checklist

- [ ] Got Cloudflare nameservers from Cloudflare dashboard
- [ ] Logged into Spaceship
- [ ] Found nameserver settings for zero-render.com
- [ ] Changed from Spaceship nameservers to Cloudflare nameservers
- [ ] Saved the changes
- [ ] Waited 10-30 minutes
- [ ] Verified: `dig NS zero-render.com` shows Cloudflare
- [ ] Tested: `https://www.zero-render.com` loads

## Still Not Working?

**If you've updated nameservers and it's still not working:**

1. **Double-check nameservers:**
   ```bash
   dig NS zero-render.com
   ```
   - If still showing Spaceship → Changes haven't propagated yet (wait longer)
   - If showing Cloudflare → Check Cloudflare DNS records

2. **Verify Cloudflare DNS records:**
   - Go to Cloudflare → DNS → Records
   - Make sure A and CNAME records exist and are correct
   - Make sure they're "Proxied" (orange cloud)

3. **Check Cloudflare status:**
   - Make sure domain is active in Cloudflare
   - Check for any warnings or errors

4. **Clear DNS cache:**
   - On your computer: `sudo dscacheutil -flushcache` (Mac)
   - Or restart your computer
   - Or use different DNS: 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)

## Need Help?

**If you're stuck:**
1. Share what nameservers Cloudflare shows you
2. Share what you see in Spaceship's nameserver settings
3. Share the output of: `dig NS zero-render.com`

I can help verify the exact configuration!


