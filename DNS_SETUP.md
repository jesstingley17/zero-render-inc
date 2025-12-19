# DNS Configuration Guide

This guide explains how to configure DNS records for `hub.zero-render.com` and `cdn.zero-render.com` using your DNS provider's API.

## ⚠️ Security Notice

**NEVER commit API keys or credentials to the repository.** Always store them in:
- Vercel Environment Variables (recommended for production)
- Local `.env.local` file (for development, already in `.gitignore`)

## Storing Credentials

### Option 1: Vercel Environment Variables (Recommended)

1. Go to your Vercel project → Settings → Environment Variables
2. Add the following variables:
   - `DNS_API_KEY` = `4DtpQBqvknB4C6SaoAXpCewRzmC2ZIV6p9tFoVunzErbyRJ0xvqMVG7eoByenVXO`
   - `DNS_API_SECRET` = `91wnC12nDW7BlNtIiwfy` (if needed)
   - Apply to: Production, Preview, and Development

### Option 2: Local Development

Create a `.env.local` file in the project root (already in `.gitignore`):

```bash
DNS_API_KEY=4DtpQBqvknB4C6SaoAXpCewRzmC2ZIV6p9tFoVunzErbyRJ0xvqMVG7eoByenVXO
DNS_API_SECRET=91wnC12nDW7BlNtIiwfy
```

## DNS Records to Configure

### 1. HubSpot Reverse Proxy (`hub.zero-render.com`)

**CNAME Record:**
- **Name:** `hub`
- **Value:** `hubspot.com` (or your HubSpot domain)
- **TTL:** 3600 (1 hour) or Auto

**Purpose:** Routes HubSpot assets through your domain for the reverse proxy.

### 2. CDN Subdomain (`cdn.zero-render.com`)

**CNAME Record:**
- **Name:** `cdn`
- **Value:** `cname.vercel-dns.com` (or your Vercel deployment URL)
- **TTL:** 3600 (1 hour) or Auto

**Purpose:** Serves static assets (JS, CSS, images) from your CDN.

## Manual DNS Configuration

If you prefer to configure DNS manually through your provider's dashboard:

### Cloudflare
1. Go to Cloudflare Dashboard → DNS → Records
2. Add CNAME records as specified above
3. Configure Transform Rules for HubSpot reverse proxy (see `HUBSPOT_REVERSE_PROXY_SETUP.md`)

### Other DNS Providers
1. Log into your DNS provider's dashboard
2. Navigate to DNS management for `zero-render.com`
3. Add the CNAME records as specified above

## Automated DNS Configuration

If your DNS provider supports API access, you can use the `scripts/configure-dns.js` script (see below).

## Verification

After configuring DNS:

1. **Check DNS propagation:**
   ```bash
   dig hub.zero-render.com
   dig cdn.zero-render.com
   ```

2. **Test HubSpot reverse proxy:**
   - Visit: `https://hub.zero-render.com/hubfs/hs-reverse-proxy-validation-test`
   - Should see HubSpot validation success message

3. **Test CDN:**
   - Check browser DevTools → Network tab
   - Look for requests to `cdn.zero-render.com`

## Troubleshooting

**DNS not resolving:**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify nameservers are pointing to your DNS provider

**Reverse proxy validation failing:**
- Ensure `X-HS-Public-Host` header is configured (see `HUBSPOT_REVERSE_PROXY_SETUP.md`)
- Check Cloudflare Transform Rules are active
- Verify SSL certificate is valid

**CDN not working:**
- Check `NEXT_PUBLIC_CDN_URL` environment variable is set in Vercel
- Verify DNS is pointing to Vercel
- Check browser console for errors

