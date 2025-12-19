# Complete VPS Setup: All Services

## What We're Installing
1. ✅ PostgreSQL Database
2. ✅ Redis (Caching)
3. ✅ Node.js + PM2 (Background Jobs)
4. ✅ API Server (Express)
5. ✅ File Storage Setup
6. ✅ Security & Monitoring

## Step-by-Step Setup

### Step 1: Initial Server Setup

**Connect to your VPS:**
```bash
ssh root@your-vps-ip
```

**Run initial setup:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Create non-root user
sudo adduser zerorender
sudo usermod -aG sudo zerorender

# Switch to new user
su - zerorender
```

### Step 2: Install PostgreSQL Database

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
```

**In PostgreSQL prompt, run:**
```sql
CREATE DATABASE zerorender;
CREATE USER zerorender_user WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
ALTER DATABASE zerorender OWNER TO zerorender_user;
\q
```

**Configure for remote access (if needed):**
```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/*/main/postgresql.conf
# Find and uncomment: listen_addresses = '*'

# Edit access control
sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add at the end:
# host    zerorender    zerorender_user    0.0.0.0/0    md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Step 3: Install Redis

```bash
# Install Redis
sudo apt install -y redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf
# Find and set: bind 127.0.0.1 (or 0.0.0.0 if you need remote access)
# Find and set: requirepass YOUR_REDIS_PASSWORD

# Start and enable Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Test Redis
redis-cli ping
# Should return: PONG
```

### Step 4: Install Node.js and PM2

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Set up PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

### Step 5: Set Up Background Job Processor

```bash
# Create jobs directory
mkdir -p ~/services/jobs
cd ~/services/jobs

# Initialize Node.js project
npm init -y

# Install dependencies
npm install node-cron dotenv

# Create job processor
cat > processor.js << 'EOF'
require('dotenv').config();
const cron = require('node-cron');

console.log('Job processor started at', new Date().toISOString());

// Example: Run every hour
cron.schedule('0 * * * *', () => {
  console.log('Hourly job running at', new Date().toISOString());
  // Add your job logic here
});

// Example: Run every day at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('Daily job running at', new Date().toISOString());
  // Add your daily job logic here
});

// Keep process alive
console.log('Job processor is running...');
EOF

# Create .env file
cat > .env << 'EOF'
NODE_ENV=production
# Add your environment variables here
EOF

# Start with PM2
pm2 start processor.js --name "job-processor"
pm2 save
```

### Step 6: Set Up API Server

```bash
# Create API directory
mkdir -p ~/services/api
cd ~/services/api

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv

# Create API server
cat > server.js << 'EOF'
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'zero-render-api'
  });
});

// Example API endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
EOF

# Create .env file
cat > .env << 'EOF'
NODE_ENV=production
PORT=3001
# Add your API environment variables here
EOF

# Start with PM2
pm2 start server.js --name "api-server"
pm2 save
```

### Step 7: Set Up File Storage

```bash
# Create storage directories
sudo mkdir -p /var/storage/zero-render/{uploads,backups,public}
sudo chown -R zerorender:zerorender /var/storage/zero-render

# Set permissions
chmod -R 755 /var/storage/zero-render
```

### Step 8: Install and Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config for API server
sudo nano /etc/nginx/sites-available/zero-render-api
```

**Add this configuration:**
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

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/zero-render-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Step 9: Install SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (if you have api.zero-render.com subdomain)
sudo certbot --nginx -d api.zero-render.com

# Or if you want to use the main domain
# sudo certbot --nginx -d api.zero-render.com -d www.api.zero-render.com
```

### Step 10: Set Up Firewall

```bash
# Install UFW
sudo apt install -y ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow PostgreSQL (if you need remote access)
# sudo ufw allow 5432/tcp

# Allow Redis (if you need remote access - not recommended)
# sudo ufw allow 6379/tcp

# Enable firewall
sudo ufw enable
sudo ufw status
```

### Step 11: Set Up Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Set up log rotation
sudo nano /etc/logrotate.d/zerorender
```

**Add:**
```
/var/log/zerorender/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 zerorender zerorender
    sharedscripts
}
```

### Step 12: Set Up Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Configure
sudo dpkg-reconfigure -plow unattended-upgrades

# Enable
sudo systemctl enable unattended-upgrades
sudo systemctl start unattended-upgrades
```

## Verify Everything is Running

```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Check Redis
sudo systemctl status redis-server
redis-cli ping

# Check PM2 processes
pm2 list
pm2 logs

# Check Nginx
sudo systemctl status nginx

# Check firewall
sudo ufw status

# Check disk space
df -h

# Check memory
free -h
```

## Environment Variables for Vercel

**Add these to Vercel → Settings → Environment Variables:**

```
# Database
DATABASE_URL=postgresql://zerorender_user:YOUR_PASSWORD@your-vps-ip:5432/zerorender

# Redis
REDIS_URL=redis://:YOUR_REDIS_PASSWORD@your-vps-ip:6379

# API Server
API_SERVER_URL=http://your-vps-ip:3001
# Or if you set up subdomain:
# API_SERVER_URL=https://api.zero-render.com
```

## Useful Commands

```bash
# View PM2 processes
pm2 list
pm2 logs
pm2 monit
pm2 restart all
pm2 stop all
pm2 start all

# PostgreSQL commands
sudo -u postgres psql
sudo systemctl restart postgresql
sudo systemctl status postgresql

# Redis commands
redis-cli
redis-cli ping
sudo systemctl restart redis-server

# Nginx commands
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx

# View logs
pm2 logs
sudo journalctl -u postgresql
sudo journalctl -u redis-server
sudo journalctl -u nginx
```

## Security Checklist

- [ ] Changed default PostgreSQL password
- [ ] Changed default Redis password
- [ ] Firewall configured (UFW)
- [ ] SSH key authentication set up
- [ ] Non-root user created
- [ ] Automatic security updates enabled
- [ ] SSL certificates installed
- [ ] Strong passwords set for all services

## Next Steps

1. **Update Vercel environment variables** with your VPS connection strings
2. **Test connections** from your Next.js app
3. **Set up monitoring** and alerts
4. **Configure backups** for database
5. **Set up log aggregation** (optional)

## Need Help?

If you run into issues:
1. Check service status: `sudo systemctl status service-name`
2. Check logs: `sudo journalctl -u service-name`
3. Check PM2: `pm2 logs`
4. Verify firewall: `sudo ufw status`

Let me know if you need help with any step!

