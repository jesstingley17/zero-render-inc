# Create Database - Step by Step

## You're getting this error because the database hasn't been created yet.

## Quick Fix - Run These Commands

**On your VPS, run:**

```bash
# Step 1: Connect to PostgreSQL
sudo -u postgres psql
```

**You should see:** `postgres=#`

**Step 2: Create the database**
```sql
CREATE DATABASE zerorender;
```

**You should see:** `CREATE DATABASE`

**Step 3: Create the user (replace with your password)**
```sql
CREATE USER zerorender_user WITH PASSWORD 'YourSecurePassword123!';
```

**You should see:** `CREATE ROLE`

**Step 4: Grant permissions**
```sql
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
```

**You should see:** `GRANT`

**Step 5: Make user the owner**
```sql
ALTER DATABASE zerorender OWNER TO zerorender_user;
```

**You should see:** `ALTER DATABASE`

**Step 6: Exit**
```sql
\q
```

## Test It Works

```bash
# Test connection
psql -h localhost -U zerorender_user -d zerorender
```

**Enter your password when prompted.**

**If you see:** `zerorender=>` **it's working!**

**Type:** `\q` **to exit.**

## All Commands in One Block

**Copy and paste this entire block:**

```bash
sudo -u postgres psql << EOF
CREATE DATABASE zerorender;
CREATE USER zerorender_user WITH PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
ALTER DATABASE zerorender OWNER TO zerorender_user;
\q
EOF
```

**⚠️ Remember to change `YourSecurePassword123!` to your actual password!**

## Verify Database Exists

```bash
# List all databases
sudo -u postgres psql -l
```

**You should see `zerorender` in the list.**

## Common Issues

### "role already exists"
- The user already exists, that's okay
- Just continue with the GRANT commands

### "database already exists"
- The database already exists, that's okay
- Just continue with the GRANT commands

### "permission denied"
- Make sure you're using `sudo -u postgres psql`
- You need root/sudo access

## Next Steps

After creating the database:
1. ✅ Enable remote access (see DATABASE_SETUP.md Step 8)
2. ✅ Add connection string to Vercel
3. ✅ Test connection from your app


