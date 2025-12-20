# Cloudflare DNS Records - Exact Configuration for Vercel

## Step 1: Get DNS Records from Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click your project
   - Go to: **Settings** → **Domains**
   - Click on: `zero-render.com`

2. **Vercel will show you EXACT records needed:**
   - **A Record IP:** (usually `76.76.21.21` or similar)
   - **CNAME Target:** (usually `cname.vercel-dns.com` or similar)
   - **Copy these EXACT values**

## Step 2: Configure in Cloudflare

### Go to Cloudflare DNS Settings

1. **Go to:** https://dash.cloudflare.com
2. **Select:** `zero-render.com`
3. **Go to:** **DNS** → **Records**
4. **Click:** **"Add record"**

## Record 1: A Record (Root Domain)

**Configure exactly like this:**

```
Type:        A
Name:        @
IPv4 address: [Paste IP from Vercel - usually 76.76.21.21]
Proxy status: ⚪ DNS only (gray cloud) ← MUST BE GRAY!
TTL:         Auto
```

**Visual Guide:**
```
┌─────────────────────────────────────────┐
│ Type: A                                  │
│ Name: @                                  │
│ IPv4 address: 76.76.21.21               │
│ Proxy: ⚪ DNS only  ← Click to make gray │
│ TTL: Auto                                │
│ [Save]                                   │
└─────────────────────────────────────────┘
```

**Important:**
- Name should be `@` (or leave blank) - means root domain
- Proxy MUST be **gray cloud** (DNS only), NOT orange (Proxied)
- Use EXACT IP from Vercel

## Record 2: CNAME Record (WWW)

**Configure exactly like this:**

```
Type:        CNAME
Name:        www
Target:      [Paste CNAME from Vercel - usually cname.vercel-dns.com]
Proxy status: ⚪ DNS only (gray cloud) ← MUST BE GRAY!
TTL:         Auto
```

**Visual Guide:**
```
┌─────────────────────────────────────────┐
│ Type: CNAME                              │
│ Name: www                                │
│ Target: cname.vercel-dns.com            │
│ Proxy: ⚪ DNS only  ← Click to make gray │
│ TTL: Auto                                │
│ [Save]                                   │
└─────────────────────────────────────────┘
```

**Important:**
- Name should be just `www` (not `www.zero-render.com`)
- Target should be EXACT value from Vercel
- Proxy MUST be **gray cloud** (DNS only), NOT orange (Proxied)

## What It Should Look Like in Cloudflare

**After adding both records, you should see:**

```
Type    Name    Content/Target              Proxy    TTL
A       @       76.76.21.21                ⚪ No    Auto
CNAME   www     cname.vercel-dns.com       ⚪ No    Auto
```

**NOT like this (wrong):**
```
Type    Name    Content/Target              Proxy    TTL
A       @       76.76.21.21                🟠 Yes   Auto  ❌ WRONG
CNAME   www     cname.vercel-dns.com       🟠 Yes   Auto  ❌ WRONG
A       @       216.150.1.1                ⚪ No    Auto  ❌ WRONG IP
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Records Are Proxied (Orange Cloud)
- **Wrong:** 🟠 Proxied (orange cloud)
- **Right:** ⚪ DNS only (gray cloud)
- **Fix:** Click the proxy icon to toggle to gray

### ❌ Mistake 2: Wrong IP Address
- **Wrong:** Using `216.150.1.1` or any random IP
- **Right:** Use EXACT IP from Vercel (usually `76.76.21.21`)
- **Fix:** Delete wrong record, add new one with correct IP

### ❌ Mistake 3: Wrong CNAME Target
- **Wrong:** `vercel.com` or `www.vercel.com`
- **Right:** `cname.vercel-dns.com` (or what Vercel shows)
- **Fix:** Update target to match Vercel exactly

### ❌ Mistake 4: Wrong Name Field
- **Wrong:** `www.zero-render.com` or `zero-render.com`
- **Right:** For A record: `@` (or blank), For CNAME: `www`
- **Fix:** Use just `@` for root, just `www` for subdomain

### ❌ Mistake 5: Multiple A Records
- **Wrong:** Two A records with different IPs
- **Right:** Only ONE A record pointing to Vercel IP
- **Fix:** Delete the wrong one (usually `216.150.1.1`)

## Step-by-Step: Adding Records

### Adding A Record:

1. Click **"Add record"**
2. **Type:** Select `A` from dropdown
3. **Name:** Type `@` (or leave blank)
4. **IPv4 address:** Paste IP from Vercel
5. **Proxy status:** Click to make it **gray** (DNS only)
   - If it's orange, click it once to toggle to gray
6. **TTL:** Leave as `Auto`
7. Click **"Save"**

### Adding CNAME Record:

1. Click **"Add record"** again
2. **Type:** Select `CNAME` from dropdown
3. **Name:** Type `www` (just "www", nothing else)
4. **Target:** Paste CNAME value from Vercel
5. **Proxy status:** Click to make it **gray** (DNS only)
   - If it's orange, click it once to toggle to gray
6. **TTL:** Leave as `Auto`
7. Click **"Save"**

## Verifying Records Are Correct

**After adding, check:**

1. **A Record:**
   - ✅ Type is `A`
   - ✅ Name is `@` (or blank)
   - ✅ IPv4 matches Vercel exactly
   - ✅ Proxy is **gray** (DNS only)
   - ✅ TTL is `Auto`

2. **CNAME Record:**
   - ✅ Type is `CNAME`
   - ✅ Name is `www`
   - ✅ Target matches Vercel exactly
   - ✅ Proxy is **gray** (DNS only)
   - ✅ TTL is `Auto`

## After Configuration

**Wait 5-10 minutes, then test:**

```bash
# Test DNS resolution
dig www.zero-render.com
dig zero-render.com

# Should return IP addresses (not empty)
```

**Or test in browser:**
- Visit: `https://www.zero-render.com`
- Visit: `https://zero-render.com`
- Both should load your Vercel site

## Quick Checklist

- [ ] Got A record IP from Vercel
- [ ] Got CNAME target from Vercel
- [ ] Added A record: `@` → Vercel IP (gray cloud)
- [ ] Added CNAME: `www` → Vercel CNAME (gray cloud)
- [ ] Deleted any wrong A records (like 216.150.1.1)
- [ ] Verified both are "DNS only" (gray), not "Proxied" (orange)
- [ ] Waited 5-10 minutes
- [ ] Tested: `dig www.zero-render.com` returns IP
- [ ] Tested: Site loads in browser

## Still Not Working?

**If records look correct but site still doesn't load:**

1. **Double-check values match Vercel exactly**
2. **Verify both are gray cloud (DNS only)**
3. **Check Vercel dashboard:** Settings → Domains → Should show "Valid Configuration"
4. **Wait longer:** DNS can take up to 48 hours to fully propagate
5. **Clear DNS cache:** `sudo dscacheutil -flushcache` (Mac) or restart computer

## Need Help?

**Share with me:**
1. What IP does Vercel show for A record?
2. What CNAME target does Vercel show?
3. What do you see in Cloudflare → DNS → Records?
4. Are they gray (DNS only) or orange (Proxied)?

I can help verify they're configured correctly!


