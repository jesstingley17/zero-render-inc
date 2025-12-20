# Add Database to Vercel - Final Steps

## Step 1: Verify Everything Works

**On your VPS, test the connection:**
```bash
psql -h localhost -U zerorender_user -d zerorender
```

**Enter your password. If you see `zerorender=>`, it's working!**

**Type `\q` to exit.**

## Step 2: Get Your Connection String

**Format:**
```
postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender
```

**⚠️ Important:** Replace `YOUR_PASSWORD` with the actual password you set when creating the user!

**Example:**
```
postgresql://zerorender_user:MySecurePass123!@74.208.155.182:5432/zerorender
```

## Step 3: Add to Vercel

1. **Go to:** https://vercel.com
2. **Select your project:** `zero-render` (or whatever it's called)
3. **Click:** Settings (top menu)
4. **Click:** Environment Variables (left sidebar)
5. **Click:** "Add New" button
6. **Fill in:**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender`
   - **Environments:** Check all three boxes:
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
7. **Click:** "Save"

## Step 4: Redeploy Your App

**After adding the environment variable:**

1. **Go to:** Your project → Deployments
2. **Click:** The three dots (⋯) on the latest deployment
3. **Click:** "Redeploy"
4. **Or:** Push a new commit to trigger a new deployment

**This ensures Vercel picks up the new environment variable.**

## Step 5: Test in Your App

**You can test the connection in your Next.js app:**

**Create:** `app/api/test-db/route.ts`

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { DATABASE_URL } = process.env
    
    if (!DATABASE_URL) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not configured',
        configured: false 
      }, { status: 500 })
    }
    
    // Basic check - connection string exists
    return NextResponse.json({ 
      message: 'Database URL is configured',
      configured: true,
      hasUrl: !!DATABASE_URL,
      // Don't expose the full URL in production!
      urlPrefix: DATABASE_URL.split('@')[0] + '@...'
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      configured: false 
    }, { status: 500 })
  }
}
```

**Then visit:** `https://your-domain.com/api/test-db`

**Should return:** `{"message":"Database URL is configured","configured":true,...}`

## Step 6: Connect with Your ORM (Optional)

**If you're using Prisma, Drizzle, or another ORM:**

### Prisma Example:
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Then run:**
```bash
npx prisma generate
npx prisma db push
```

### Drizzle Example:
```typescript
// lib/db.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
export const db = drizzle(client)
```

## Verify Connection String Format

**Your connection string should look like:**
```
postgresql://username:password@host:port/database
```

**Breaking it down:**
- `postgresql://` - Protocol
- `zerorender_user` - Username
- `:` - Separator
- `YOUR_PASSWORD` - Password (no spaces, URL-encode special chars if needed)
- `@` - Separator
- `74.208.155.182` - Your VPS IP
- `:5432` - PostgreSQL port
- `/zerorender` - Database name

## Common Issues

### "Environment variable not found"
- **Fix:** Make sure you added it to all environments (Production, Preview, Development)
- **Fix:** Redeploy your app after adding the variable

### "Connection refused" from Vercel
- **Check:** Did you complete the remote access setup? (Step 2 in DATABASE_NEXT_STEPS.md)
- **Check:** Is firewall allowing port 5432? `sudo ufw status`
- **Check:** Is PostgreSQL listening? `sudo netstat -tlnp | grep 5432`

### "Password authentication failed"
- **Fix:** Double-check the password in your connection string
- **Fix:** Test the password locally first: `psql -h localhost -U zerorender_user -d zerorender`

### Special characters in password
- **If your password has special characters:** You may need to URL-encode them
- **Example:** `@` becomes `%40`, `#` becomes `%23`, `$` becomes `%24`
- **Or:** Change the password to one without special characters

## Security Notes

⚠️ **Important:**
- Never commit `DATABASE_URL` to Git
- Keep your password secure
- Consider using Vercel's environment variable encryption
- Regularly rotate passwords

## Next Steps

After database is connected:
1. ✅ Set up your database schema (tables, etc.)
2. ✅ Test database operations in your app
3. ✅ Set up Redis (for caching)
4. ✅ Set up API server (if needed)
5. ✅ Set up background jobs (if needed)

## Quick Test Commands

**From your VPS:**
```bash
# Test local connection
psql -h localhost -U zerorender_user -d zerorender

# Check if PostgreSQL is listening
sudo netstat -tlnp | grep 5432

# Check firewall
sudo ufw status
```

**From your Mac (after installing psql):**
```bash
brew install postgresql
psql "postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender"
```

You're all set! Add the connection string to Vercel and you're good to go! 🚀


