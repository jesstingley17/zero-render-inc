# Reconfiguring hub.zero-render.com for HubSpot

## Current Situation

You currently have:
- `hub.zero-render.com` → **Starlight™ Hyperlift Manager** (Cloudflare service)

But for HubSpot reverse proxy, we need:
- `hub.zero-render.com` → **hubspot.com** (HubSpot's domain)

## Solution Options

### Option 1: Change hub.zero-render.com to HubSpot (Recommended)

**If you're not actively using Starlight Hyperlift Manager for `hub.zero-render.com`:**

1. **Go to Cloudflare Dashboard → DNS → Records**
2. **Find the CNAME record for `hub`**
3. **Edit it:**
   - Change the target from "Starlight™ Hyperlift Manager" to `hubspot.com`
   - Keep TTL as Auto or 3600
4. **Save the record**

5. **Then configure the Transform Rule** (see `HUBSPOT_REVERSE_PROXY_SETUP.md`):
   - Cloudflare Dashboard → Rules → Transform Rules
   - Create rule to add `X-HS-Public-Host: hub.zero-render.com` header

### Option 2: Use a Different Subdomain for HubSpot

**If you need to keep Starlight Hyperlift Manager on `hub.zero-render.com`:**

1. **Create a new subdomain** for HubSpot:
   - `blog.zero-render.com` OR
   - `assets.zero-render.com` OR
   - `hs.zero-render.com`

2. **Point the new subdomain to HubSpot:**
   - CNAME: `blog` (or your choice) → `hubspot.com`

3. **Update the code** to use the new subdomain:
   - Change `HUBSPOT_REVERSE_PROXY_DOMAIN` in `lib/hubspot-proxy.ts`
   - Update Cloudflare Transform Rule to match the new subdomain

4. **Keep `hub.zero-render.com`** pointing to Starlight Hyperlift Manager

## Quick Decision Guide

**Use Option 1 if:**
- ✅ You're not actively using Starlight Hyperlift Manager
- ✅ You want the simplest setup
- ✅ `hub.zero-render.com` isn't critical for other services

**Use Option 2 if:**
- ✅ You need Starlight Hyperlift Manager for other purposes
- ✅ You want to keep both services separate
- ✅ You don't mind updating the code

## Step-by-Step: Option 1 (Change to HubSpot)

### Step 1: Update DNS Record

1. Log into Cloudflare
2. Select your `zero-render.com` domain
3. Go to **DNS** → **Records**
4. Find the CNAME record for `hub`
5. Click **Edit**
6. Change **Target** from "Starlight™ Hyperlift Manager" to: `hubspot.com`
7. Click **Save**

### Step 2: Configure Cloudflare Transform Rule

1. In Cloudflare, go to **Rules** → **Transform Rules**
2. Click **Create rule** → **Modify Request Header**
3. Configure:
   - **Rule name:** `HubSpot Reverse Proxy Header`
   - **When incoming requests match:**
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `hub.zero-render.com`
   - **Then:**
     - **Action:** Set static
     - **Header name:** `X-HS-Public-Host`
     - **Value:** `hub.zero-render.com`
4. Click **Deploy**

### Step 3: Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- You can check propagation with: `dig hub.zero-render.com`

### Step 4: Test

Visit: `https://hub.zero-render.com/hubfs/hs-reverse-proxy-validation-test`

You should see HubSpot's validation success message.

## Step-by-Step: Option 2 (Use Different Subdomain)

If you choose this option, let me know which subdomain you want to use and I'll update the code for you!

## What About Starlight Hyperlift Manager?

If you need Starlight Hyperlift Manager for other purposes, you can:
- Use it on a different subdomain (like `storage.zero-render.com` or `files.zero-render.com`)
- Keep using it on `hub.zero-render.com` and use Option 2 above

## Need Help?

If you're not sure which option to choose, or need help with the configuration, just let me know!



