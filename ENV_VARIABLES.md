# Environment Variables Reference

This document lists all environment variables used in the ZeroRender project.

## 🔒 Security

**NEVER commit environment variables to the repository.** Always use:
- Vercel Environment Variables for production
- `.env.local` for local development (already in `.gitignore`)

## Required Variables

### HubSpot Integration

```bash
HUBSPOT_API_KEY=your_hubspot_api_key
HUBSPOT_BLOG_ID=your_blog_id  # Optional
```

**Where to get:**
- HubSpot → Settings → Integrations → Private Apps
- Create a private app with "Content" read permissions

### DNS API (Optional - for automated DNS configuration)

```bash
DNS_API_KEY=your_dns_api_key
DNS_API_SECRET=your_dns_api_secret  # If required by provider
```

**Note:** These are only needed if you're using automated DNS configuration scripts.

### Email (Resend)

```bash
RESEND_API_KEY=your_resend_api_key
```

**Where to get:**
- Resend Dashboard → API Keys

### CDN Configuration (Optional)

```bash
NEXT_PUBLIC_CDN_URL=https://cdn.zero-render.com
```

**Purpose:** Serves static assets from your CDN subdomain.

### Pinecone (Optional - for AI search features)

```bash
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_environment
PINECONE_INDEX_NAME=your_index_name
```

**Where to get:**
- Pinecone Dashboard → API Keys

### Supabase (Optional - for authentication)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to get:**
- Supabase Dashboard → Settings → API

### Stripe (Optional - for payments)

```bash
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

**Where to get:**
- Stripe Dashboard → Developers → API Keys

## Setting Up in Vercel

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key:** Variable name (e.g., `HUBSPOT_API_KEY`)
   - **Value:** Your actual API key/secret
   - **Environment:** Select Production, Preview, and/or Development
4. Click **Save**

## Setting Up Locally

1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local  # If you have an example file
   # Or create manually
   ```

2. Add your variables:
   ```bash
   HUBSPOT_API_KEY=your_key_here
   RESEND_API_KEY=your_key_here
   # ... etc
   ```

3. The `.env.local` file is already in `.gitignore` and won't be committed.

## Verifying Variables

After setting up, verify your environment variables are loaded:

```bash
# Check if variables are set (won't show values for security)
node -e "console.log(Object.keys(process.env).filter(k => k.includes('HUBSPOT') || k.includes('RESEND')))"
```

## Troubleshooting

**"API key not configured" errors:**
- Check variable names match exactly (case-sensitive)
- Verify variables are set in the correct environment (Production/Preview/Development)
- Restart your development server after adding new variables
- In Vercel, redeploy after adding new variables

**Variables not loading in production:**
- Ensure variables are added to the Production environment in Vercel
- Redeploy your application after adding variables
- Check Vercel deployment logs for errors

**Local development issues:**
- Ensure `.env.local` is in the project root (not in a subdirectory)
- Restart your dev server: `npm run dev`
- Check that `.env.local` is not accidentally committed (check `.gitignore`)



