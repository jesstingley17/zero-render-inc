# Quick Start: Your Ionos VPS Setup

## Your VPS Details
- **IP Address:** 74.208.155.182
- **User:** root
- **OS:** Ubuntu 22.04
- **Specs:** 2 vCPU, 2GB RAM, 80GB SSD
- **Location:** United States

## Step 1: Get Your Password

1. **In Ionos dashboard:** Click "View password" to get your initial root password
2. **Save it securely** - you'll need it to connect

## Step 2: Connect to Your VPS

**On your Mac, open Terminal and run:**

```bash
ssh root@74.208.155.182
```

**When prompted:**
- Enter the password you got from Ionos
- It might ask to accept the host key - type `yes`

## Step 3: Run the Automated Setup

**Once connected, run:**

```bash
# Download the setup script
wget https://raw.githubusercontent.com/jesstingley17/zero-render-inc/main/vps-setup.sh

# Make it executable
chmod +x vps-setup.sh

# Run it
./vps-setup.sh
```

**This will install:**
- PostgreSQL
- Redis
- Node.js
- PM2
- Nginx
- Certbot
- Firewall
- Monitoring tools

## Step 4: After Script Completes

**Follow these manual steps:**

### A. Set Up PostgreSQL Database

```bash
# Create database and user
sudo -u postgres psql
```

**In PostgreSQL, run:**
```sql
CREATE DATABASE zerorender;
CREATE USER zerorender_user WITH PASSWORD 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
ALTER DATABASE zerorender OWNER TO zerorender_user;
\q
```

**Note the password you set - you'll need it for Vercel!**

### B. Set Up Redis Password

```bash
# Edit Redis config
sudo nano /etc/redis/redis.conf
```

**Find and set:**
```
requirepass YOUR_REDIS_PASSWORD_HERE
```

**Restart Redis:**
```bash
sudo systemctl restart redis-server
```

### C. Set Up Background Job Processor

```bash
# Create directory
mkdir -p ~/services/jobs
cd ~/services/jobs

# Initialize project
npm init -y
npm install node-cron dotenv

# Create processor file
cat > processor.js << 'EOF'
require('dotenv').config();
const cron = require('node-cron');

console.log('Job processor started');

// Hourly job
cron.schedule('0 * * * *', () => {
  console.log('Hourly job:', new Date().toISOString());
});

// Daily job at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('Daily job:', new Date().toISOString());
});
EOF

# Start with PM2
pm2 start processor.js --name "job-processor"
pm2 save
```

### D. Set Up API Server

```bash
# Create directory
mkdir -p ~/services/api
cd ~/services/api

# Initialize project
npm init -y
npm install express cors dotenv

# Create server file
cat > server.js << 'EOF'
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(3001, '0.0.0.0', () => {
  console.log('API server running on port 3001');
});
EOF

# Start with PM2
pm2 start server.js --name "api-server"
pm2 save
```

### E. Set Up Nginx for API

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/zero-render-api
```

**Add:**
```nginx
server {
    listen 80;
    server_name api.zero-render.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable:**
```bash
sudo ln -s /etc/nginx/sites-available/zero-render-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: Verify Everything

```bash
# Check services
sudo systemctl status postgresql
sudo systemctl status redis-server
sudo systemctl status nginx
pm2 list

# Test Redis
redis-cli ping

# Test API (from VPS)
curl http://localhost:3001/health
```

## Step 6: Get Connection Strings for Vercel

**Your connection strings:**

```
# Database
DATABASE_URL=postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender

# Redis
REDIS_URL=redis://:YOUR_REDIS_PASSWORD@74.208.155.182:6379

# API Server
API_SERVER_URL=http://74.208.155.182:3001
```

**Add these to Vercel → Settings → Environment Variables**

## Step 7: Set Up SSL (Optional - if you have api.zero-render.com subdomain)

```bash
# If you set up api.zero-render.com subdomain in Cloudflare
sudo certbot --nginx -d api.zero-render.com
```

## Security Notes

**Important:**
- Change the default passwords!
- Set up SSH key authentication (recommended)
- Keep firewall enabled
- Regular updates are automatic

## Quick Commands Reference

```bash
# Connect to VPS
ssh root@74.208.155.182

# Check services
pm2 list
pm2 logs
sudo systemctl status postgresql
sudo systemctl status redis-server

# Restart services
pm2 restart all
sudo systemctl restart postgresql
sudo systemctl restart redis-server
sudo systemctl restart nginx

# View logs
pm2 logs
sudo journalctl -u postgresql -f
sudo journalctl -u redis-server -f
```

## Need Help?

If you get stuck:
1. Check service status: `sudo systemctl status service-name`
2. Check PM2: `pm2 list` and `pm2 logs`
3. Check firewall: `sudo ufw status`
4. Check disk space: `df -h`

Let me know if you need help with any step!

