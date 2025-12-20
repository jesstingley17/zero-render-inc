#!/bin/bash

# Complete VPS Setup Script for ZeroRender
# Run this script on your Ubuntu 22.04 VPS

set -e  # Exit on error

echo "🚀 Starting ZeroRender VPS Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root or with sudo"
    exit 1
fi

echo -e "${GREEN}Step 1: Updating system...${NC}"
apt update && apt upgrade -y

echo -e "${GREEN}Step 2: Installing essential tools...${NC}"
apt install -y curl wget git build-essential vim htop net-tools ufw

echo -e "${GREEN}Step 3: Setting up firewall...${NC}"
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo -e "${GREEN}Step 4: Installing PostgreSQL...${NC}"
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql

echo -e "${GREEN}Step 5: Installing Redis...${NC}"
apt install -y redis-server
systemctl start redis-server
systemctl enable redis-server

echo -e "${GREEN}Step 6: Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo -e "${GREEN}Step 7: Installing PM2...${NC}"
npm install -g pm2

echo -e "${GREEN}Step 8: Installing Nginx...${NC}"
apt install -y nginx

echo -e "${GREEN}Step 9: Installing Certbot...${NC}"
apt install -y certbot python3-certbot-nginx

echo -e "${GREEN}Step 10: Installing monitoring tools...${NC}"
apt install -y htop iotop nethogs

echo -e "${GREEN}Step 11: Setting up automatic security updates...${NC}"
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades -f noninteractive

echo -e "${GREEN}Step 12: Creating storage directories...${NC}"
mkdir -p /var/storage/zero-render/{uploads,backups,public}
chmod -R 755 /var/storage/zero-render

echo ""
echo -e "${GREEN}✅ Basic setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create database user: sudo -u postgres psql"
echo "2. Set up services in ~/services directory"
echo "3. Configure Nginx"
echo "4. Set up SSL certificates"
echo ""
echo "See VPS_FULL_SETUP.md for detailed instructions!"


