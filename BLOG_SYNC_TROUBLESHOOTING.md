# HubSpot Blog Sync Troubleshooting

## Quick Diagnosis

**After Vercel deploys, visit:**
```
https://your-domain.com/api/hubspot/blog/debug
```

**This will show you:**
- ✅ If `HUBSPOT_API_KEY` is configured
- ✅ If `HUBSPOT_BLOG_ID` is set
- ✅ API response status
- ✅ Number of posts found
- ✅ Any error messages

## Common Issues & Fixes

### Issue 1: API Key Not Configured

**Symptoms:**
- Debug endpoint shows: `hasApiKey: false`
- Blog page shows: "No blog posts yet"

**Fix:**
1. Go to **Vercel** → Your Project → **Settings** → **Environment Variables**
2. Check if `HUBSPOT_API_KEY` exists
3. If missing, add it:
   - **Key:** `HUBSPOT_API_KEY`
   - **Value:** Your HubSpot API key
   - **Environments:** All (Production, Preview, Development)
4. **Redeploy** your app

### Issue 2: API Key Invalid or Expired

**Symptoms:**
- Debug endpoint shows: `status: 401` or `status: 403`
- Error message about authentication

**Fix:**
1. Go to **HubSpot** → Settings → Integrations → Private Apps
2. Check if your API key is still active
3. If expired, create a new one
4. Update `HUBSPOT_API_KEY` in Vercel
5. **Redeploy**

### Issue 3: Wrong Blog ID

**Symptoms:**
- Debug endpoint shows: `postCount: 0`
- But you know you have published posts

**Fix:**
1. Get your correct Blog ID from HubSpot:
   - Go to **HubSpot** → Content → Blog
   - Click on your blog
   - The Blog ID is in the URL: `blogId=XXXXX`
2. Add to Vercel:
   - **Key:** `HUBSPOT_BLOG_ID`
   - **Value:** Your blog ID
3. **Redeploy**

### Issue 4: No Published Posts

**Symptoms:**
- Debug endpoint shows: `postCount: 0`
- API returns successfully but no posts

**Fix:**
1. Check HubSpot:
   - Go to **HubSpot** → Content → Blog
   - Make sure you have posts with status: **Published**
   - Draft posts won't appear

### Issue 5: API Rate Limiting

**Symptoms:**
- Debug endpoint shows: `status: 429`
- Error about rate limits

**Fix:**
- Wait a few minutes and try again
- HubSpot has rate limits on API calls
- The code already handles this gracefully

### Issue 6: API Endpoint Changed

**Symptoms:**
- Debug endpoint shows: `status: 404` or `status: 500`
- Error about endpoint not found

**Fix:**
- HubSpot API might have changed
- Check HubSpot API documentation
- Update the API endpoint in `app/api/hubspot/blog/route.ts`

## Step-by-Step Fix

### Step 1: Check Environment Variables

**In Vercel:**
1. Go to: Settings → Environment Variables
2. Verify:
   - ✅ `HUBSPOT_API_KEY` exists and has a value
   - ✅ `HUBSPOT_BLOG_ID` exists (optional but recommended)

### Step 2: Test Debug Endpoint

**After deployment:**
1. Visit: `https://your-domain.com/api/hubspot/blog/debug`
2. Check the response:
   ```json
   {
     "hasApiKey": true,
     "hasBlogId": true,
     "status": 200,
     "postCount": 5,
     "success": true
   }
   ```

### Step 3: Check Vercel Logs

**In Vercel Dashboard:**
1. Go to: Your Project → Logs
2. Look for:
   - "HubSpot API error"
   - "HUBSPOT_API_KEY not configured"
   - Any error messages

### Step 4: Verify HubSpot Setup

**In HubSpot:**
1. Go to: Settings → Integrations → Private Apps
2. Verify your API key has:
   - ✅ Content read permissions
   - ✅ Blog read permissions
3. Check your blog:
   - Go to: Content → Blog
   - Verify you have **Published** posts

## Quick Test

**Test the blog API directly:**
```bash
# From your Mac
curl https://your-domain.com/api/hubspot/blog/debug
```

**Should return JSON with diagnostic info.**

## If Still Not Working

**Check:**
1. ✅ API key is correct in Vercel
2. ✅ Blog ID is correct (if using)
3. ✅ You have published posts in HubSpot
4. ✅ API key has correct permissions
5. ✅ No errors in Vercel logs

**Then:**
- Visit the debug endpoint and share the results
- Check Vercel logs for specific error messages

## Summary

**Most common fix:**
1. Check `HUBSPOT_API_KEY` in Vercel
2. Verify it's correct and active
3. Redeploy after updating
4. Test with debug endpoint

The debug endpoint will tell you exactly what's wrong! 🔍

