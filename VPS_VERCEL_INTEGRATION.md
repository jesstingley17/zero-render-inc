# VPS + Vercel Integration Guide

## ✅ Your VPS IS Already Connected to Vercel!

**How it works:**
- **Vercel** hosts your Next.js website
- **VPS** provides the database and services
- They're connected via environment variables

## Current Setup

```
┌─────────────────────────────────┐
│  Vercel (Your Website)          │
│                                  │
│  Next.js App                     │
│  ┌────────────────────────────┐  │
│  │ DATABASE_URL env var      │  │
│  │ = postgresql://...         │  │
│  │ @74.208.155.182           │  │
│  └────────────────────────────┘  │
└─────────────────────────────────┘
              │
              │ connects via
              │ DATABASE_URL
              ▼
┌─────────────────────────────────┐
│  VPS (74.208.155.182)           │
│                                  │
│  PostgreSQL Database             │
│  Redis Cache                     │
│  API Server (optional)           │
└─────────────────────────────────┘
```

## What's Already Connected

### ✅ Database Connection

**In Vercel → Environment Variables:**
- `DATABASE_URL=postgresql://zerorender_user:PASSWORD@74.208.155.182:5432/zerorender`

**Your Next.js app can now:**
- Connect to PostgreSQL
- Query the database
- Store data

**Example usage in your code:**
```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const { DATABASE_URL } = process.env
  
  // Use your ORM (Prisma, Drizzle, etc.) to connect
  // const db = connect(DATABASE_URL)
  // const users = await db.query('SELECT * FROM users')
  
  return NextResponse.json({ message: 'Connected to VPS database!' })
}
```

## What Else You Can Add

### 1. Redis Cache Connection

**On VPS:**
```bash
# Redis is already installed
# Just get the connection string
```

**Add to Vercel:**
- **Key:** `REDIS_URL`
- **Value:** `redis://:YOUR_REDIS_PASSWORD@74.208.155.182:6379`

**Use in your app:**
```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

// Cache data
await redis.set('key', 'value')
const value = await redis.get('key')
```

### 2. Custom API Server

**If you set up the API server on VPS:**

**Add to Vercel:**
- **Key:** `API_SERVER_URL`
- **Value:** `http://74.208.155.182:3001` (or `https://api.zero-render.com` if you set up SSL)

**Use in your app:**
```typescript
// app/api/proxy/route.ts
export async function GET() {
  const apiUrl = process.env.API_SERVER_URL
  const response = await fetch(`${apiUrl}/health`)
  return NextResponse.json(await response.json())
}
```

### 3. File Storage

**If you set up file storage on VPS:**

**Add to Vercel:**
- **Key:** `STORAGE_URL`
- **Value:** `http://74.208.155.182/storage` (or your storage endpoint)

## Complete Integration Checklist

### ✅ Already Done
- [x] PostgreSQL installed on VPS
- [x] Database created
- [x] Remote access configured
- [x] `DATABASE_URL` added to Vercel
- [x] Next.js app can connect

### 🔄 Optional Next Steps

#### Redis Setup
```bash
# On VPS
sudo nano /etc/redis/redis.conf
# Set: requirepass YOUR_PASSWORD
sudo systemctl restart redis-server
sudo ufw allow 6379/tcp
```

**Add to Vercel:**
```
REDIS_URL=redis://:YOUR_PASSWORD@74.208.155.182:6379
```

#### API Server Setup
```bash
# On VPS (if you want a separate API)
cd ~/services/api
npm install express cors
# Create server.js (see VPS_QUICK_START.md)
pm2 start server.js --name "api-server"
```

**Add to Vercel:**
```
API_SERVER_URL=http://74.208.155.182:3001
```

#### SSL/HTTPS for API (Optional)
```bash
# On VPS
sudo certbot --nginx -d api.zero-render.com
```

**Then use HTTPS in Vercel:**
```
API_SERVER_URL=https://api.zero-render.com
```

## Using VPS Services in Your Next.js App

### Database Example (Prisma)

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}
```

```typescript
// app/api/users/route.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}
```

### Redis Example

```typescript
// lib/redis.ts
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!)

// app/api/cache/route.ts
import { redis } from '@/lib/redis'

export async function GET() {
  await redis.set('test', 'value')
  const value = await redis.get('test')
  return NextResponse.json({ value })
}
```

### API Server Example

```typescript
// app/api/external/route.ts
export async function GET() {
  const apiUrl = process.env.API_SERVER_URL
  const response = await fetch(`${apiUrl}/data`)
  const data = await response.json()
  return NextResponse.json(data)
}
```

## Security Best Practices

### 1. Use Environment Variables
✅ **Good:** Store connection strings in Vercel environment variables  
❌ **Bad:** Hardcode connection strings in your code

### 2. Restrict Database Access
```bash
# On VPS, edit pg_hba.conf
# Instead of 0.0.0.0/0, use Vercel IP ranges (if possible)
# Or use a VPN/private network
```

### 3. Use Strong Passwords
- Database passwords
- Redis passwords
- API keys

### 4. Enable SSL/TLS
- Use `postgresql://` with SSL enabled
- Use `redis://` with TLS (if available)
- Use HTTPS for API endpoints

## Monitoring Your VPS

### Check Services from Vercel

**Create a health check endpoint:**
```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: false,
    redis: false,
    api: false
  }
  
  // Test database
  try {
    // Test connection
    checks.database = true
  } catch (e) {
    checks.database = false
  }
  
  // Test Redis
  try {
    // Test connection
    checks.redis = true
  } catch (e) {
    checks.redis = false
  }
  
  // Test API
  try {
    const response = await fetch(process.env.API_SERVER_URL + '/health')
    checks.api = response.ok
  } catch (e) {
    checks.api = false
  }
  
  return NextResponse.json(checks)
}
```

## Troubleshooting

### "Connection refused" from Vercel
- **Check:** Firewall allows port: `sudo ufw status`
- **Check:** Service is running: `sudo systemctl status postgresql`
- **Check:** Service is listening: `sudo netstat -tlnp | grep 5432`

### "Password authentication failed"
- **Check:** Password in environment variable matches VPS
- **Check:** User exists: `sudo -u postgres psql -c "\du"`

### "Database does not exist"
- **Check:** Database exists: `sudo -u postgres psql -l`
- **Check:** Connection string has correct database name

## Summary

✅ **Your VPS is already connected to Vercel via `DATABASE_URL`**

**You can add:**
- Redis for caching
- Custom API server
- File storage
- Background jobs

**All connected via environment variables in Vercel!**

The VPS and Vercel work together seamlessly - Vercel hosts your app, VPS provides the services. 🚀

