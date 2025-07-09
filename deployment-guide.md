# AbleTools Website Deployment Guide

## Prerequisites for Linux Server

### 1. System Requirements
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL Server
sudo apt install mysql-server -y

# Install Nginx (web server)
sudo apt install nginx -y

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

### 2. MySQL Database Setup
```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Login to MySQL as root
sudo mysql -u root -p

# Create database and user
CREATE DATABASE abletools;
CREATE USER 'abletools_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON abletools.* TO 'abletools_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Deployment Steps

### 1. Upload Your Project Files

#### Option A: Using Git (Recommended)
```bash
# Clone your repository to the server
cd /var/www/
sudo git clone https://github.com/yourusername/abletools-website.git
sudo chown -R $USER:$USER /var/www/abletools-website
cd /var/www/abletools-website
```

#### Option B: Using SCP/SFTP
```bash
# From your local machine, upload files to server
scp -r /path/to/your/project user@your-server-ip:/var/www/abletools-website
```

#### Option C: Using File Manager (cPanel/DirectAdmin)
1. Create a new directory: `/var/www/abletools-website`
2. Upload all project files to this directory
3. Extract if uploaded as ZIP

### 2. Install Dependencies
```bash
cd /var/www/abletools-website

# Install Node.js dependencies
npm install

# Install production dependencies only (optional for smaller size)
# npm install --production
```

### 3. Environment Configuration
```bash
# Create environment file
nano .env

# Add these environment variables:
NODE_ENV=production
DATABASE_URL=mysql://abletools_user:your_secure_password@localhost:3306/abletools
PORT=5000
SESSION_SECRET=your_very_secure_session_secret_here
```

### 4. Build the Application
```bash
# Build the frontend
npm run build

# The build will create optimized files for production
```

### 5. Database Setup
```bash
# Run database migrations (if you have them)
# npm run db:migrate

# Or manually import your database schema
mysql -u abletools_user -p abletools < database-schema.sql
```

### 6. Start Application with PM2
```bash
# Start the application
pm2 start server/index.ts --name "abletools-website" --interpreter tsx

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions shown by the command above
```

### 7. Configure Nginx Reverse Proxy
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/abletools-website

# Add this configuration:
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Handle static assets
    location /attached_assets/ {
        alias /var/www/abletools-website/attached_assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/abletools-website /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 8. SSL Certificate (HTTPS)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

### 9. Firewall Configuration
```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Allow SSH (if not already allowed)
sudo ufw allow ssh

# Enable firewall
sudo ufw enable
```

## File Permissions and Security

### Set Proper Permissions
```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/abletools-website

# Set permissions
sudo chmod -R 755 /var/www/abletools-website
sudo chmod -R 644 /var/www/abletools-website/attached_assets/
```

### Secure MySQL
```bash
# Backup database regularly
mysqldump -u abletools_user -p abletools > backup_$(date +%Y%m%d).sql
```

## Monitoring and Maintenance

### Check Application Status
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs abletools-website

# Restart application
pm2 restart abletools-website

# Monitor system resources
pm2 monit
```

### Update Application
```bash
# Pull latest changes (if using Git)
cd /var/www/abletools-website
git pull origin main

# Install new dependencies
npm install

# Rebuild application
npm run build

# Restart with PM2
pm2 restart abletools-website
```

## Admin Access

### Default Admin Credentials
- URL: `https://your-domain.com/admin/login`
- Username: `admin`
- Password: `admin123`

**Important**: Change these credentials immediately after first login!

### Change Admin Password
```bash
# Connect to MySQL
mysql -u abletools_user -p abletools

# Update admin password (replace with bcrypt hash)
UPDATE users SET password = '$2a$10$newHashedPasswordHere' WHERE username = 'admin';
```

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   pm2 logs abletools-website
   
   # Check if port is in use
   sudo netstat -tulpn | grep :5000
   ```

2. **Database connection errors**
   ```bash
   # Test MySQL connection
   mysql -u abletools_user -p abletools
   
   # Check MySQL status
   sudo systemctl status mysql
   ```

3. **Nginx errors**
   ```bash
   # Check Nginx logs
   sudo tail -f /var/log/nginx/error.log
   
   # Test configuration
   sudo nginx -t
   ```

4. **Permission errors**
   ```bash
   # Fix ownership
   sudo chown -R www-data:www-data /var/www/abletools-website
   ```

## Backup Strategy

### Automated Backup Script
```bash
# Create backup script
sudo nano /usr/local/bin/abletools-backup.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/abletools"
mkdir -p $BACKUP_DIR

# Database backup
mysqldump -u abletools_user -p'your_password' abletools > $BACKUP_DIR/db_$DATE.sql

# Files backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz -C /var/www abletools-website

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

# Make executable
sudo chmod +x /usr/local/bin/abletools-backup.sh

# Add to crontab for daily backup at 2 AM
sudo crontab -e
# Add this line:
0 2 * * * /usr/local/bin/abletools-backup.sh
```

## Performance Optimization

### Enable Gzip Compression
Add to Nginx configuration:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Database Optimization
```sql
-- Add indexes for better performance
ALTER TABLE products ADD INDEX idx_category_id (category_id);
ALTER TABLE products ADD INDEX idx_featured (is_featured);
ALTER TABLE categories ADD INDEX idx_parent_id (parent_id);
```

Your website is now ready for production deployment on your Linux server!