# VPS Setup: Supporting Services (Keep Vercel for Main App)

## Strategy
- ✅ **Main Next.js app:** Stays on Vercel (automatic deployments, CDN, SSL)
- ✅ **VPS:** Used for supporting services (databases, background jobs, APIs, etc.)

## Initial VPS Setup

### Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or if you have a username:
ssh your-username@your-vps-ip
```

### Step 2: Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 3: Create a Non-Root User (Security Best Practice)

```bash
# Create new user
sudo adduser zerorender
sudo usermod -aG sudo zerorender

# Switch to new user
su - zerorender
```

### Step 4: Set Up Firewall

```bash
# Install UFW (Uncomplicated Firewall)
sudo apt install -y ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS (if you'll host anything)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
sudo ufw status
```

### Step 5: Install Essential Tools

```bash
sudo apt install -y \
  curl \
  wget \
  git \
  build-essential \
  vim \
  htop \
  net-tools
```

## Common Services You Can Run on VPS

### Option A: Database Server (PostgreSQL/MySQL)

**If you need a database for your app:**

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
```

```sql
CREATE DATABASE zerorender;
CREATE USER zerorender_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
\q
```

**Configure for remote access (if needed):**
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
# Set: listen_addresses = '*'

sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add: host    zerorender    zerorender_user    0.0.0.0/0    md5
```

### Option B: Redis (Caching/Sessions)

```bash
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### Option C: Background Job Processor

**Using Node.js with PM2:**

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Create a simple job processor
mkdir ~/jobs
cd ~/jobs
npm init -y
npm install node-cron
```

**Example job file (`jobs/processor.js`):**
```javascript
const cron = require('node-cron');

// Example: Run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running background job...');
  // Your job logic here
});

console.log('Job processor started');
```

**Run with PM2:**
```bash
pm2 start jobs/processor.js --name "job-processor"
pm2 save
pm2 startup
```

### Option D: API Server (Separate from Next.js)

**If you need a separate API:**

```bash
# Install Node.js (if not already)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Create API directory
mkdir ~/api-server
cd ~/api-server
npm init -y
npm install express
```

**Example API (`api-server/index.js`):**
```javascript
const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3001, () => {
  console.log('API server running on port 3001');
});
```

**Run with PM2:**
```bash
pm2 start api-server/index.js --name "api-server"
pm2 save
```

### Option E: File Storage/Backup

**Set up for file storage:**

```bash
# Create storage directory
sudo mkdir -p /var/storage/zero-render
sudo chown zerorender:zerorender /var/storage/zero-render

# Install S3-compatible tools if needed
# Or use as simple file server
```

## Connecting VPS Services to Vercel

### Environment Variables in Vercel

**Add these to Vercel → Settings → Environment Variables:**

```
DATABASE_URL=postgresql://user:password@your-vps-ip:5432/zerorender
REDIS_URL=redis://your-vps-ip:6379
API_SERVER_URL=https://api.zero-render.com
```

### Using VPS Services from Next.js

**In your Next.js API routes:**

```typescript
// Example: Connect to VPS database
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  const result = await pool.query('SELECT * FROM table')
  return Response.json(result.rows)
}
```

## Security Best Practices

### 1. SSH Key Authentication

```bash
# On your local machine, generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy to VPS
ssh-copy-id zerorender@your-vps-ip

# Disable password authentication (after testing)
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
sudo systemctl restart sshd
```

### 2. Regular Updates

```bash
# Set up automatic security updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Monitor Resources

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Check disk space
df -h

# Check memory
free -h
```

## Useful Commands

```bash
# Check running services
sudo systemctl status

# View logs
sudo journalctl -u service-name

# Check PM2 processes
pm2 list
pm2 logs
pm2 monit

# Check disk usage
df -h
du -sh /path/to/directory

# Check network connections
netstat -tulpn
```

## What Services Do You Need?

**Tell me what you want to run on the VPS:**
- Database? (PostgreSQL, MySQL, MongoDB)
- Caching? (Redis)
- Background jobs? (Cron, queue processor)
- API server? (Separate from Next.js)
- File storage? (S3-compatible, or simple storage)
- Something else?

I can provide specific setup instructions for what you need!

## Quick Start: Basic Setup

**If you just want to set up the VPS for future use:**

```bash
# 1. Connect
ssh root@your-vps-ip

# 2. Update
sudo apt update && sudo apt upgrade -y

# 3. Create user
sudo adduser zerorender
sudo usermod -aG sudo zerorender

# 4. Set up firewall
sudo apt install -y ufw
sudo ufw allow 22/tcp
sudo ufw enable

# 5. Install basics
sudo apt install -y curl wget git build-essential

# Done! VPS is ready for services
```


