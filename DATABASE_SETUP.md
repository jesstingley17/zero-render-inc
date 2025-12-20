# PostgreSQL Database Setup - Step by Step

## Prerequisites
- You're connected to your VPS: `ssh root@74.208.155.182`
- PostgreSQL is installed (from the setup script)

## Step 1: Access PostgreSQL

```bash
sudo -u postgres psql
```

You should see a prompt like: `postgres=#`

## Step 2: Create the Database

```sql
CREATE DATABASE zerorender;
```

You should see: `CREATE DATABASE`

## Step 3: Create a User

**Replace `YOUR_SECURE_PASSWORD_HERE` with a strong password:**

```sql
CREATE USER zerorender_user WITH PASSWORD 'YOUR_SECURE_PASSWORD_HERE';
```

**Example with a password:**
```sql
CREATE USER zerorender_user WITH PASSWORD 'MySecurePass123!@#';
```

You should see: `CREATE ROLE`

## Step 4: Grant Permissions

```sql
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
```

You should see: `GRANT`

## Step 5: Make User the Owner

```sql
ALTER DATABASE zerorender OWNER TO zerorender_user;
```

You should see: `ALTER DATABASE`

## Step 6: Exit PostgreSQL

```sql
\q
```

You're back to the regular terminal.

## Step 7: Test the Connection

**Test with the postgres user:**
```bash
sudo -u postgres psql -d zerorender
```

**If that works, type `\q` to exit.**

**Test with your new user (from your regular user account):**
```bash
psql -h localhost -U zerorender_user -d zerorender
```

**Enter the password you set in Step 3.**

If you see `zerorender=>`, it's working! Type `\q` to exit.

## Step 8: Configure Remote Access (Optional)

**If you want to connect from Vercel/your app, you need to allow remote connections:**

### A. Edit PostgreSQL Config

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```

**Find this line:**
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

**Add this line at the end:**
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

## Step 9: Get Your Connection String

**Your connection string format:**
```
postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender
```

**Example:**
```
postgresql://zerorender_user:MySecurePass123!@#@74.208.155.182:5432/zerorender
```

## Step 10: Add to Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender`
3. **Save**

## Verify Everything Works

**From your VPS, test:**
```bash
# Connect to database
psql -h localhost -U zerorender_user -d zerorender

# Once connected, try:
SELECT version();
```

**You should see PostgreSQL version info.**

**Type `\q` to exit.**

## Common Issues

### Issue: "password authentication failed"
- **Solution:** Make sure you're using the correct password from Step 3

### Issue: "could not connect to server"
- **Solution:** Check if PostgreSQL is running: `sudo systemctl status postgresql`
- **Solution:** If not running, start it: `sudo systemctl start postgresql`

### Issue: "permission denied"
- **Solution:** Make sure you ran all the GRANT commands in Steps 4-5

### Issue: Can't connect from outside VPS
- **Solution:** Make sure you completed Step 8 (Remote Access configuration)
- **Solution:** Check firewall: `sudo ufw status`
- **Solution:** Verify PostgreSQL is listening: `sudo netstat -tlnp | grep 5432`

## Quick Reference Commands

```bash
# Connect to database
psql -h localhost -U zerorender_user -d zerorender

# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# View databases
sudo -u postgres psql -l

# View users
sudo -u postgres psql -c "\du"

# Test connection string
psql "postgresql://zerorender_user:YOUR_PASSWORD@localhost:5432/zerorender"
```

## Security Notes

⚠️ **Important:**
- Use a **strong password** (mix of letters, numbers, symbols)
- If you enabled remote access, consider restricting IPs in `pg_hba.conf` instead of `0.0.0.0/0`
- Keep your `DATABASE_URL` secret - never commit it to Git
- Regularly update PostgreSQL: `sudo apt update && sudo apt upgrade postgresql`

## Next Steps

After database setup:
1. ✅ Add `DATABASE_URL` to Vercel environment variables
2. ✅ Test connection from your Next.js app
3. ✅ Set up database migrations (if using Prisma, Drizzle, etc.)
4. ✅ Create initial tables/schema

Need help with any step? Let me know!


