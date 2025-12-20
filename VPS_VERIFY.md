# Verify VPS Services - Quick Check

## Run These Commands on Your VPS

### 1. Check PostgreSQL

```bash
sudo systemctl status postgresql
```

**Should show:** `active (running)` in green

**Test connection:**
```bash
psql -h localhost -U zerorender_user -d zerorender
```

**Enter your password. If you see `zerorender=>`, it's working!**

**Type `\q` to exit.**

### 2. Check Redis

```bash
sudo systemctl status redis-server
```

**Should show:** `active (running)` in green

**Test Redis:**
```bash
redis-cli ping
```

**Should return:** `PONG`

**If it asks for password:**
```bash
redis-cli
# Then type: AUTH your_password
# Then type: ping
# Should return: PONG
```

### 3. Check Node.js

```bash
node --version
npm --version
```

**Should show version numbers (like `v20.x.x`)**

### 4. Check PM2

```bash
pm2 list
```

**Shows running processes (might be empty if nothing is running yet)**

### 5. Check Nginx

```bash
sudo systemctl status nginx
```

**Should show:** `active (running)` in green

### 6. Check Firewall

```bash
sudo ufw status
```

**Should show:**
- `Status: active`
- Ports 22, 80, 443 allowed
- Port 5432 allowed (for PostgreSQL)
- Port 6379 allowed (for Redis, if configured)

### 7. Check Disk Space

```bash
df -h
```

**Should show available space (you have 80GB)**

### 8. Check Memory

```bash
free -h
```

**Should show memory usage (you have 2GB RAM)**

## Quick All-in-One Check

**Run this to check everything at once:**
```bash
echo "=== PostgreSQL ===" && sudo systemctl is-active postgresql
echo "=== Redis ===" && sudo systemctl is-active redis-server
echo "=== Nginx ===" && sudo systemctl is-active nginx
echo "=== Node.js ===" && node --version
echo "=== PM2 ===" && pm2 list
echo "=== Firewall ===" && sudo ufw status | head -5
```

## What to Look For

✅ **Good signs:**
- All services show `active (running)`
- PostgreSQL connection works
- Redis responds with `PONG`
- Node.js shows version
- Firewall is active

❌ **Problems:**
- Services show `inactive` or `failed`
- Can't connect to database
- Redis doesn't respond
- Firewall is inactive

## If Something Isn't Working

### PostgreSQL not running:
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Redis not running:
```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### Nginx not running:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Can't connect to database:
```bash
# Check if database exists
sudo -u postgres psql -l | grep zerorender

# Check if user exists
sudo -u postgres psql -c "\du" | grep zerorender_user
```

## Test Database Connection from Outside

**From your Mac (after installing psql):**
```bash
brew install postgresql
psql "postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender"
```

**If this works, your database is accessible from Vercel!**

## Summary

**Run the checks above and let me know:**
1. Which services are running?
2. Can you connect to the database?
3. Does Redis respond?

**This will tell us what's working and what needs fixing!**


