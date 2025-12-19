# VPS Ubuntu 22.04 Server Setup Guide (Ionos)

## What You Have
- **VPS:** Ubuntu 22.04 server from Ionos
- **Current Setup:** Next.js app on Vercel
- **Options:** Use VPS for hosting, reverse proxy, or other services

## Option 1: Host Next.js on VPS (Instead of Vercel)

### Prerequisites
- SSH access to your VPS
- Domain pointing to VPS IP (or keep using Vercel)

### Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

### Step 2: Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 3: Install Node.js

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 4: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Step 5: Clone Your Repository

```bash
# Install git if not already installed
sudo apt install -y git

# Clone your repo
cd /var/www
sudo git clone https://github.com/jesstingley17/zero-render-inc.git zero-render
cd zero-render

# Install dependencies
npm install
```

### Step 6: Build and Run

```bash
# Build the app
npm run build

# Start with PM2
pm2 start npm --name "zero-render" -- start
pm2 save
pm2 startup
```

### Step 7: Install Nginx (Reverse Proxy)

```bash
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/zero-render
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name zero-render.com www.zero-render.com;

    location / {
        proxy_pass http://localhost:3000;
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
sudo ln -s /etc/nginx/sites-available/zero-render /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Install SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d zero-render.com -d www.zero-render.com
```

### Step 9: Update DNS

**In Cloudflare, point to your VPS:**
- A record: `@` → [Your VPS IP] (gray cloud)
- CNAME: `www` → [Your VPS IP] (or A record)

## Option 2: Keep Vercel, Use VPS for Other Services

**If you want to keep using Vercel but use VPS for:**
- Database server
- Background jobs
- API services
- Other applications

**Just set up the VPS for those specific services.**

## Option 3: Use VPS as Reverse Proxy/CDN

**Use VPS to:**
- Cache content
- Load balance
- Add additional security
- Route traffic

## Recommended: Stay on Vercel

**For your Next.js app, I recommend:**
- ✅ **Keep using Vercel** (easier, automatic deployments, CDN, SSL)
- ✅ **Use VPS for other services** (if needed)
- ✅ **Or use VPS for staging/testing**

**Why:**
- Vercel handles deployments automatically
- Built-in CDN and SSL
- No server management needed
- Scales automatically

## Quick Setup Commands

**If you want to set up the VPS anyway:**

```bash
# 1. Connect to VPS
ssh root@your-vps-ip

# 2. Update system
sudo apt update && sudo apt upgrade -y

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# 4. Install PM2
sudo npm install -g pm2

# 5. Clone and setup (adjust path as needed)
cd /var/www
sudo git clone https://github.com/jesstingley17/zero-render-inc.git
cd zero-render-inc
npm install
npm run build
pm2 start npm --name "zero-render" -- start
pm2 save
pm2 startup
```

## What Do You Want to Use the VPS For?

**Tell me:**
1. Do you want to move the site from Vercel to VPS?
2. Or use VPS for something else?
3. What's your goal with the VPS?

I can provide specific setup instructions based on what you need!

