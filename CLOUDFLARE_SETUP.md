# Cloudflare + Vercel Setup for zero-render.com

## Current Status
✅ Domain is in Vercel
✅ Using Cloudflare for DNS
❌ DNS records need to be added

## Step-by-Step: Add DNS Records in Cloudflare

### Step 1: Get DNS Records from Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your project
   - Go to: **Settings** → **Domains**
   - Find: `zero-render.com`

2. **Copy the DNS Records:**
   - Vercel will show you something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21 (or similar IP)
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com (or similar)
     ```
   - **IMPORTANT:** Copy these EXACT values

### Step 2: Add Records in Cloudflare

1. **Log into Cloudflare:**
   - Visit: https://dash.cloudflare.com
   - Select domain: `zero-render.com`

2. **Go to DNS Settings:**
   - Click: **DNS** → **Records**
   - You'll see existing records (if any)

3. **Add A Record for Root Domain:**

   Click **"Add record"** and configure:
   
   - **Type:** `A`
   - **Name:** `@` (or leave blank - means root domain)
   - **IPv4 address:** `[Paste the IP from Vercel]` (usually starts with 76.76.x.x)
   - **Proxy status:** ✅ **Proxied** (orange cloud icon) - **IMPORTANT!**
   - **TTL:** Auto
   - Click: **Save**

4. **Add CNAME Record for WWW:**

   Click **"Add record"** again and configure:
   
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Target:** `[Paste the value from Vercel]` (usually `cname.vercel-dns.com`)
   - **Proxy status:** ✅ **Proxied** (orange cloud icon) - **IMPORTANT!**
   - **TTL:** Auto
   - Click: **Save**

### Step 3: Verify Nameservers

**Check if nameservers are correct:**

1. In Cloudflare dashboard, go to: **Overview**
2. You'll see nameservers like:
   ```
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```

3. **Check at your domain registrar:**
   - Where you bought the domain (Spaceship, etc.)
   - Go to DNS/Nameserver settings
   - Make sure they match Cloudflare's nameservers
   - If they don't match, update them to Cloudflare's nameservers

### Step 4: Wait and Test

**Wait 1-5 minutes** (Cloudflare proxied records propagate quickly)

**Then test:**
```bash
# Test DNS
dig zero-render.com
dig www.zero-render.com

# Should show Cloudflare IPs (if proxied) or Vercel IPs
```

**Or test in browser:**
- Visit: `https://zero-render.com`
- Visit: `https://www.zero-render.com`
- Both should load your Vercel site

### Step 5: Check Vercel Status

1. Go back to Vercel: **Settings** → **Domains**
2. Check status of `zero-render.com`:
   - ✅ **Valid Configuration** = Working!
   - ⚠️ **Invalid Configuration** = DNS not propagated yet, wait longer
   - ❌ **Error** = Check DNS records match exactly

## Important Notes

### Proxy Status (Orange Cloud)
- ✅ **Proxied (Orange Cloud):** Recommended
  - Uses Cloudflare's CDN
  - Faster propagation (1-5 minutes)
  - Better security
  - Free SSL

- ⚠️ **DNS Only (Gray Cloud):** Not recommended
  - Slower propagation (5-30 minutes)
  - No CDN benefits

### Common Mistakes

1. **Wrong IP Address:**
   - ❌ Don't use a random IP
   - ✅ Use the EXACT IP Vercel shows you

2. **Wrong CNAME Target:**
   - ❌ Don't use `vercel.com`
   - ✅ Use the EXACT value Vercel shows (usually `cname.vercel-dns.com`)

3. **Not Proxied:**
   - ❌ Gray cloud (DNS only)
   - ✅ Orange cloud (Proxied) - Better!

4. **Nameservers Not Updated:**
   - If nameservers don't point to Cloudflare, DNS won't work
   - Update at your domain registrar

## Troubleshooting

### Issue: "Invalid Configuration" in Vercel

**Check:**
1. DNS records match EXACTLY what Vercel shows
2. Records are "Proxied" (orange cloud) in Cloudflare
3. Wait 5-10 minutes for propagation
4. Clear browser cache and try again

### Issue: Domain Resolves but Shows Error

**Possible causes:**
1. SSL certificate not provisioned yet (wait 5-10 minutes)
2. Deployment failed (check Vercel deployments)
3. DNS not fully propagated (wait longer)

### Issue: One Works, Other Doesn't

- If `www.zero-render.com` works but `zero-render.com` doesn't:
  - Check A record is added correctly
  - Make sure it's proxied

- If `zero-render.com` works but `www.zero-render.com` doesn't:
  - Check CNAME record is added correctly
  - Make sure it's proxied

## Quick Checklist

- [ ] Got DNS records from Vercel (A and CNAME)
- [ ] Added A record in Cloudflare: `@` → Vercel IP (Proxied)
- [ ] Added CNAME record in Cloudflare: `www` → Vercel CNAME (Proxied)
- [ ] Verified nameservers point to Cloudflare
- [ ] Waited 5 minutes for propagation
- [ ] Tested: `https://zero-render.com` loads
- [ ] Tested: `https://www.zero-render.com` loads
- [ ] Vercel shows "Valid Configuration"

## Still Not Working?

**If you've done everything and it's still not working:**

1. **Double-check DNS records:**
   - In Cloudflare: DNS → Records
   - Compare with Vercel's requirements
   - Make sure they match EXACTLY

2. **Check Vercel deployment:**
   - Go to Deployments tab
   - Make sure latest deployment is successful (green)

3. **Test DNS propagation:**
   - Visit: https://dnschecker.org
   - Enter: `zero-render.com`
   - Select: A record
   - Check if it shows Cloudflare/Vercel IPs globally

4. **Contact support:**
   - Vercel: https://vercel.com/support
   - Cloudflare: https://support.cloudflare.com

## Need the Exact Records?

**If you can't find the records in Vercel, tell me and I'll help you locate them!**

Or share what you see in:
- Vercel → Settings → Domains → `zero-render.com`
- Cloudflare → DNS → Records

I can help verify they're correct!

