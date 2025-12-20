# Database Setup - Next Steps

## ✅ Database Created! Now What?

## Step 1: Test the Connection

**Exit PostgreSQL if you're still in it:**
```sql
\q
```

**Test the connection:**
```bash
psql -h localhost -U zerorender_user -d zerorender
```

**Enter the password you set when creating the user.**

**If you see:** `zerorender=>` **it's working!**

**Type:** `\q` **to exit.**

## Step 2: Enable Remote Access (For Vercel)

**Your Vercel app needs to connect from outside the VPS, so we need to allow remote connections:**

### A. Edit PostgreSQL Config

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```

**Find this line (use Ctrl+W to search):**
```
#listen_addresses = 'localhost'
```

**Change it to:**
```
listen_addresses = '*'
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

### B. Edit Access Control

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

**Scroll to the bottom and add this line:**
```
host    zerorender    zerorender_user    0.0.0.0/0    md5
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

### C. Restart PostgreSQL

```bash
sudo systemctl restart postgresql
```

### D. Allow Port in Firewall

```bash
sudo ufw allow 5432/tcp
```

**Verify firewall:**
```bash
sudo ufw status
```

**You should see:** `5432/tcp` in the list

## Step 3: Get Your Connection String

**Format:**
```
postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender
```

**Example (replace with your actual password):**
```
postgresql://zerorender_user:MySecurePass123!@74.208.155.182:5432/zerorender
```

**⚠️ Important:** Replace `YOUR_PASSWORD` with the password you set when creating the user!

## Step 4: Add to Vercel

1. **Go to:** https://vercel.com → Your Project → **Settings** → **Environment Variables**

2. **Click:** "Add New"

3. **Add:**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender`
   - **Environment:** Production, Preview, Development (check all)

4. **Click:** "Save"

## Step 5: Test Connection from Vercel

**After adding to Vercel, you can test it in your Next.js app:**

**Create a test file:** `app/api/test-db/route.ts`

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { DATABASE_URL } = process.env
    
    if (!DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
    }
    
    // Test connection (you'll need to install pg or use your ORM)
    // This is just a basic test
    return NextResponse.json({ 
      message: 'Database URL configured',
      hasUrl: !!DATABASE_URL 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

**Or if you're using Prisma/Drizzle/etc, test with your ORM.**

## Verify Everything

**From your VPS, test remote connection:**
```bash
# Test from localhost
psql -h localhost -U zerorender_user -d zerorender

# If that works, test from outside (from your Mac)
# You'll need to install psql on Mac first:
# brew install postgresql
# Then:
psql "postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender"
```

## Common Issues

### "Connection refused" from Vercel
- **Check:** Did you complete Step 2 (remote access)?
- **Check:** Is PostgreSQL running? `sudo systemctl status postgresql`
- **Check:** Is firewall allowing port 5432? `sudo ufw status`

### "Password authentication failed"
- **Check:** Are you using the correct password?
- **Check:** Did you add the `pg_hba.conf` entry correctly?

### "Database does not exist"
- **Check:** Did you create the database? `sudo -u postgres psql -l`

## Security Notes

⚠️ **Important:**
- Your connection string contains a password - keep it secret!
- Never commit it to Git
- Consider restricting IPs in `pg_hba.conf` instead of `0.0.0.0/0` for better security
- Use strong passwords

## Next Steps After Database

1. ✅ Set up Redis (for caching)
2. ✅ Set up API server (if needed)
3. ✅ Set up background jobs (if needed)
4. ✅ Connect your Next.js app to the database

## Quick Reference

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# View databases
sudo -u postgres psql -l

# Test connection
psql -h localhost -U zerorender_user -d zerorender

# Check firewall
sudo ufw status
```

Need help with any step? Let me know!


