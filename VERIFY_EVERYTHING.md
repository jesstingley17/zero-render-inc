# Verify Everything is Working

## Quick Verification Checklist

### ✅ On VPS
- [ ] Redis password set in `/etc/redis/redis.conf`
- [ ] Redis restarted and working
- [ ] Firewall allows port 6379
- [ ] PostgreSQL running
- [ ] Database accessible

### ✅ In Vercel
- [ ] `DATABASE_URL` environment variable added
- [ ] `REDIS_URL` environment variable added
- [ ] App redeployed after adding variables

### ✅ In Your Code
- [ ] `ioredis` package installed
- [ ] Redis utility created (optional, for caching)

## Test Everything

### Test 1: Database Connection

**Visit:** `https://your-domain.com/api/test-db`

**Should return:**
```json
{
  "configured": true,
  "hasUrl": true,
  "message": "Database URL is configured!"
}
```

### Test 2: Redis Connection

**I'll create a test endpoint for you!**

### Test 3: From VPS

**SSH to VPS and test:**
```bash
# Test Redis
redis-cli
# Type: AUTH YourSecureRedisPassword123!
# Type: ping
# Should return: PONG

# Test Database
psql -h localhost -U zerorender_user -d zerorender
# Enter password
# Should see: zerorender=>
# Type: \q to exit
```

## What to Do Next

**If everything is working:**
1. ✅ You're all set!
2. ✅ Your VPS is connected to Vercel
3. ✅ Ready to use Redis for caching

**If something isn't working:**
- Check the error messages
- Verify environment variables in Vercel
- Make sure you redeployed after adding variables

Let me know what you see when you test!

