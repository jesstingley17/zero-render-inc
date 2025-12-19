# Vercel DNS Setup: DNS Only (Not Proxied)

## Important: Vercel Requires DNS Only
✅ Vercel wants DNS records to be **DNS only** (gray cloud), NOT proxied
✅ This is correct for Vercel deployments

## Step-by-Step: Configure DNS Records for Vercel

### Step 1: Get DNS Records from Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click your project
   - Go to: **Settings** → **Domains**
   - Click on: `zero-render.com`

2. **Vercel will show you EXACT records needed:**
   - **A Record:** IP address (usually `76.76.21.21`)
   - **CNAME:** Target for www (usually `cname.vercel-dns.com`)
   - **Copy these EXACT values**

### Step 2: Configure Records in Cloudflare

1. **Go to Cloudflare:**
   - https://dash.cloudflare.com
   - Select: `zero-render.com`
   - Go to: **DNS** → **Records**

2. **Delete Wrong Records:**
   - Delete A record with IP `216.150.1.1` (wrong IP)
   - Delete any other incorrect A records

3. **Add/Update A Record (Root Domain):**
   - Click **"Add record"** (or edit existing)
   - **Type:** `A`
   - **Name:** `@` (or leave blank - means root domain)
   - **IPv4 address:** `76.76.21.21` (or EXACT IP from Vercel)
   - **Proxy status:** ⚪ **DNS only** (gray cloud) - **MUST BE GRAY!**
   - **TTL:** Auto
   - Click **Save**

4. **Add/Update CNAME Record (WWW):**
   - Click **"Add record"** (or edit existing)
   - **Type:** `CNAME`
   - **Name:** `www` (just "www", not "www.zero-render.com")
   - **Target:** `cname.vercel-dns.com` (or EXACT value from Vercel)
   - **Proxy status:** ⚪ **DNS only** (gray cloud) - **MUST BE GRAY!**
   - **TTL:** Auto
   - Click **Save**

### Step 3: Verify Records Are DNS Only

**CRITICAL:** Both records MUST show gray cloud (DNS only), NOT orange cloud (Proxied)

**To check:**
- Look at the records you just added/updated
- The proxy icon should be **GRAY** (DNS only)
- If it's **ORANGE** (Proxied), click it to toggle to gray

### Step 4: Wait and Test

**After making changes:**
1. **Wait 5-10 minutes** for DNS propagation
2. **Test DNS:**
   ```bash
   dig www.zero-render.com
   dig zero-render.com
   ```
   - Should return IP addresses (not empty)
3. **Test in browser:**
   - Visit: `https://www.zero-render.com`
   - Visit: `https://zero-render.com`
   - Should load your site!

## Visual Guide: What Records Should Look Like

**In Cloudflare DNS → Records, you should see:**

```
Type    Name    Content/Target              Proxy    TTL
A       @       76.76.21.21                 ⚪ No    Auto
CNAME   www     cname.vercel-dns.com        ⚪ No    Auto
```

**NOT:**
```
Type    Name    Content/Target              Proxy    TTL
A       @       76.76.21.21                 🟠 Yes   Auto  ❌ WRONG - Should be gray
CNAME   www     cname.vercel-dns.com        🟠 Yes   Auto  ❌ WRONG - Should be gray
A       @       216.150.1.1                 ⚪ No    Auto  ❌ WRONG IP
```

## Why DNS Only for Vercel?

- **Vercel handles SSL and CDN** - doesn't need Cloudflare proxy
- **DNS only** allows Vercel to manage everything
- **Proxied** would put Cloudflare in front, which can cause issues with Vercel

## Common Issues

### Issue: Records Are Proxied (Orange)
**Fix:** Click the proxy icon to toggle to gray (DNS only)

### Issue: Wrong IP Address
**Fix:** Use EXACT IP from Vercel, not a random IP

### Issue: Wrong CNAME Target
**Fix:** Use EXACT value from Vercel (usually `cname.vercel-dns.com`)

### Issue: Multiple A Records
**Fix:** Delete all except the one pointing to Vercel IP

## Quick Checklist

- [ ] Got DNS records from Vercel (A IP and CNAME target)
- [ ] Deleted wrong A record (216.150.1.1)
- [ ] Added/Updated A record: `@` → Vercel IP (DNS only ⚪)
- [ ] Added/Updated CNAME: `www` → Vercel CNAME (DNS only ⚪)
- [ ] Verified both are "DNS only" (gray cloud)
- [ ] Waited 5-10 minutes
- [ ] Tested: `dig www.zero-render.com` returns IP
- [ ] Tested: `dig zero-render.com` returns IP
- [ ] Tested: `https://www.zero-render.com` loads
- [ ] Tested: `https://zero-render.com` loads

## Still Not Working?

**If you've done everything and it's still not working:**

1. **Double-check records:**
   - In Cloudflare → DNS → Records
   - Verify A record IP matches Vercel exactly
   - Verify CNAME target matches Vercel exactly
   - Verify both are DNS only (gray), not proxied (orange)

2. **Check Vercel status:**
   - Go to Settings → Domains
   - Check status of `zero-render.com`
   - Should show "Valid Configuration"

3. **Test DNS resolution:**
   ```bash
   dig www.zero-render.com +short
   dig zero-render.com +short
   ```
   - Should return IP addresses
   - If empty, records aren't configured correctly

4. **Check nameservers:**
   ```bash
   dig NS zero-render.com
   ```
   - Should show Cloudflare nameservers

5. **Clear DNS cache:**
   - Mac: `sudo dscacheutil -flushcache`
   - Or restart computer

## Need Help?

**Share with me:**
1. What IP does Vercel show for the A record?
2. What CNAME target does Vercel show for www?
3. What do you see in Cloudflare → DNS → Records?
4. Are the records DNS only (gray) or proxied (orange)?

I can help verify they're configured correctly!

