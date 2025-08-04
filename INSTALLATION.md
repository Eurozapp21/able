# AbleTools - Installation Guide

## Overview

AbleTools is a comprehensive rehabilitation equipment management system built with Node.js, React, TypeScript, and PostgreSQL. This guide covers complete installation for development and production environments.

## System Requirements

### Minimum Requirements:
- **Operating System**: Ubuntu 20.04+, CentOS 7+, macOS 10.15+, Windows 10+
- **Memory**: 2GB RAM (4GB+ recommended)
- **Storage**: 10GB free space
- **Node.js**: Version 18.0 or higher
- **Database**: PostgreSQL 12+ or access to Neon serverless PostgreSQL

### Recommended for Production:
- **Memory**: 4GB+ RAM
- **CPU**: 2+ cores
- **Storage**: 20GB+ SSD
- **Network**: Stable internet connection for database access

## Development Installation

### 1. Prerequisites Installation

#### Install Node.js (Ubuntu/Debian):
```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

#### Install Node.js (macOS):
```bash
# Using Homebrew
brew install node@18

# Or download from official website
# https://nodejs.org/en/download/
```

#### Install Node.js (Windows):
```bash
# Download installer from official website
# https://nodejs.org/en/download/
# Or use Chocolatey
choco install nodejs --version=18.19.0
```

### 2. Database Setup

#### Option A: Use Neon Serverless PostgreSQL (Recommended)
1. Create account at https://neon.tech
2. Create new project
3. Copy connection string
4. Skip to step 3

#### Option B: Local PostgreSQL Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
```

```sql
-- In PostgreSQL shell
CREATE DATABASE abletools_dev;
CREATE USER abletools_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE abletools_dev TO abletools_user;
\q
```

### 3. Project Installation

#### Clone and Install Dependencies:
```bash
# Clone the project (if from repository)
git clone https://github.com/yourusername/abletools.git
cd abletools

# Or if you have the project files locally
cd /path/to/abletools

# Install dependencies
npm install
```

#### Install Global Dependencies:
```bash
# Install TypeScript and development tools globally
npm install -g typescript tsx drizzle-kit

# Verify installations
tsx --version
drizzle-kit --version
```

### 4. Environment Configuration

#### Create Environment File:
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

#### Environment Variables (.env):
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/abletools_dev

# Or for Neon serverless:
# DATABASE_URL=postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/abletools

# Server Configuration
NODE_ENV=development
PORT=5000

# Session Configuration
SESSION_SECRET=your_very_long_random_secret_key_here

# Optional: External Services
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### 5. Database Migration

#### Push Database Schema:
```bash
# Create database tables
npm run db:push

# Verify database connection
node -e "
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
console.log('Database connection successful');
"
```

### 6. Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:5000
```

## Production Installation

### 1. Server Preparation

#### Update System:
```bash
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git unzip nginx postgresql-client
```

#### Install Node.js and PM2:
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 process manager
sudo npm install -g pm2 typescript tsx drizzle-kit

# Configure PM2 startup
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

### 2. Application Deployment

#### Create Application Directory:
```bash
# Create application directory
sudo mkdir -p /var/www/abletools
sudo chown $USER:$USER /var/www/abletools

# Navigate to application directory
cd /var/www/abletools
```

#### Deploy Application Files:
```bash
# Option 1: Clone from repository
git clone https://github.com/yourusername/abletools.git .

# Option 2: Upload and extract files
# Upload your project files to the server
# Extract if compressed

# Set proper permissions
sudo chown -R $USER:$USER /var/www/abletools
chmod -R 755 /var/www/abletools
```

#### Install Dependencies:
```bash
# Install production dependencies
npm ci --production

# Install development dependencies for building
npm install

# Build the application
npm run build
```

### 3. Production Environment Configuration

#### Create Production Environment:
```bash
# Create production environment file
nano .env.production
```

```env
# Production Database (Neon recommended)
DATABASE_URL=postgresql://prod_user:secure_password@your-neon-endpoint/abletools_prod

# Production Server Configuration
NODE_ENV=production
PORT=3000

# Security
SESSION_SECRET=very_long_random_production_secret_minimum_64_characters

# Domain Configuration
REPLIT_DOMAINS=your-domain.com

# External Services
PAYPAL_CLIENT_ID=live_paypal_client_id
PAYPAL_CLIENT_SECRET=live_paypal_client_secret
```

#### Setup Database:
```bash
# Push schema to production database
NODE_ENV=production npm run db:push
```

### 4. PM2 Configuration

#### Create PM2 Ecosystem File:
```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'abletools-production',
    script: 'server/index.ts',
    interpreter: 'node',
    interpreter_args: '--loader tsx',
    cwd: '/var/www/abletools',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    kill_timeout: 5000,
    restart_delay: 1000
  }]
};
```

#### Start Application:
```bash
# Create logs directory
mkdir -p logs

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Enable PM2 startup on boot
pm2 startup

# Check application status
pm2 status
pm2 logs abletools-production
```

### 5. Nginx Reverse Proxy Setup

#### Install and Configure Nginx:
```bash
# Install Nginx
sudo apt install -y nginx

# Create site configuration
sudo nano /etc/nginx/sites-available/abletools
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Main application proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Static assets with long cache
    location /assets/ {
        alias /var/www/abletools/client/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
}
```

#### Enable Site:
```bash
# Enable site and test configuration
sudo ln -s /etc/nginx/sites-available/abletools /etc/nginx/sites-enabled/
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 6. SSL Certificate Setup

#### Install Certbot:
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### 7. Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Check firewall status
sudo ufw status
```

### 8. Monitoring and Maintenance

#### Create Monitoring Script:
```bash
nano ~/monitor-abletools.sh
```

```bash
#!/bin/bash

echo "=== AbleTools Application Status ==="
echo "Date: $(date)"
echo ""

echo "PM2 Application Status:"
pm2 status

echo ""
echo "Application Logs (last 20 lines):"
pm2 logs abletools-production --lines 20

echo ""
echo "System Resources:"
free -h
df -h /var/www/abletools

echo ""
echo "Nginx Status:"
sudo systemctl status nginx --no-pager -l

echo ""
echo "Database Connection Test:"
cd /var/www/abletools
node -e "
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.production' });
const sql = neon(process.env.DATABASE_URL);
console.log('Database connection: OK');
" 2>/dev/null && echo "✓ Database accessible" || echo "✗ Database connection failed"
```

```bash
# Make script executable
chmod +x ~/monitor-abletools.sh

# Add to crontab for daily monitoring
echo "0 9 * * * ~/monitor-abletools.sh > ~/abletools-status.log 2>&1" | crontab -
```

## Troubleshooting

### Common Issues:

#### Port Already in Use:
```bash
# Kill process using port 5000
sudo lsof -ti:5000 | xargs kill -9

# Or change port in .env file
echo "PORT=5001" >> .env
```

#### Database Connection Issues:
```bash
# Test database connection
node -e "
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();
const sql = neon(process.env.DATABASE_URL);
sql\`SELECT version();\`.then(console.log).catch(console.error);
"
```

#### Permission Issues:
```bash
# Fix file permissions
sudo chown -R $USER:$USER /var/www/abletools
chmod -R 755 /var/www/abletools
```

#### Memory Issues:
```bash
# Check memory usage
free -h
pm2 monit

# Restart application if needed
pm2 restart abletools-production
```

## Support

For technical support or questions:
- Check application logs: `pm2 logs abletools-production`
- Monitor system resources: `pm2 monit`
- Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Database connectivity: Test with the provided connection script

## Security Recommendations

1. **Regular Updates**: Keep Node.js, npm, and system packages updated
2. **Environment Variables**: Never commit .env files to version control
3. **Database Security**: Use strong passwords and restrict database access
4. **SSL/TLS**: Always use HTTPS in production
5. **Firewall**: Only open necessary ports
6. **Backups**: Regular database backups (Neon provides automatic backups)
7. **Monitoring**: Set up log monitoring and alerting

Your AbleTools rehabilitation equipment management system is now ready for professional deployment!