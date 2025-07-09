# Self-Hosting Guide - Deploy React.js App on Your Own Server

## Server Requirements

### Minimum System Requirements:
- **Linux Server** (Ubuntu 20.04+ recommended)
- **Node.js 18+** installed
- **MySQL 8.0+** database
- **2GB RAM** minimum
- **20GB storage** minimum
- **Root/sudo access**

### Check Your Server Type:
```bash
# Check if you have Node.js support
node --version
npm --version

# Check MySQL
mysql --version

# Check system info
uname -a
lsb_release -a
```

## Option 1: VPS/Dedicated Server (Recommended)

### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

### Step 2: Database Setup
```bash
# Create database
sudo mysql -u root -p

CREATE DATABASE abletools_db;
CREATE USER 'abletools_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON abletools_db.* TO 'abletools_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Deploy Application
```bash
# Create application directory
sudo mkdir -p /var/www/abletools
sudo chown $USER:$USER /var/www/abletools
cd /var/www/abletools

# Upload your code (via FTP, SCP, or Git)
# Then install dependencies
npm install

# Build the application
npm run build

# Create environment file
nano .env
```

### Step 4: Environment Configuration
Create `.env` file:
```env
NODE_ENV=production
DATABASE_URL=mysql://abletools_user:your_secure_password@localhost:3306/abletools_db
SESSION_SECRET=your_very_long_random_secret_string_here
PORT=3000
```

### Step 5: Start Application
```bash
# Start with PM2
pm2 start dist/index.js --name "abletools"
pm2 startup
pm2 save

# Check status
pm2 status
```

### Step 6: Nginx Reverse Proxy
```bash
# Install Nginx
sudo apt install nginx -y

# Create site configuration
sudo nano /etc/nginx/sites-available/abletools
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name www.abletools.com.cy abletools.com.cy;
    
    # Serve static files
    location /attached_assets/ {
        alias /var/www/abletools/attached_assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Proxy API requests
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Serve React app
    location / {
        try_files $uri $uri/ @proxy;
    }
    
    location @proxy {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/abletools /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d www.abletools.com.cy -d abletools.com.cy

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Option 2: Shared Hosting (if Node.js supported)

### Check Node.js Support:
Most shared hosting providers don't support Node.js applications. Contact your hosting provider to confirm:
- Node.js version support
- PM2 or process management
- Database access
- Port binding permissions

### If Node.js is NOT supported:
You'll need to use a static build approach (see STATIC_VERSION_BUILDER.md)

## Option 3: Docker Deployment

### Create Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy application
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/index.js"]
```

### Deploy with Docker:
```bash
# Build image
docker build -t abletools-app .

# Run container
docker run -d \
  --name abletools \
  -p 3000:3000 \
  -e DATABASE_URL="mysql://user:pass@host:3306/db" \
  -e SESSION_SECRET="your_secret" \
  --restart unless-stopped \
  abletools-app
```

## Monitoring & Maintenance

### Application Monitoring:
```bash
# Check PM2 status
pm2 status
pm2 logs abletools

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check database
sudo systemctl status mysql
```

### Backup Script:
```bash
#!/bin/bash
# Create backup directory
mkdir -p /backup/$(date +%Y%m%d)

# Backup database
mysqldump -u abletools_user -p abletools_db > /backup/$(date +%Y%m%d)/database.sql

# Backup files
tar -czf /backup/$(date +%Y%m%d)/app_files.tar.gz /var/www/abletools
```

### Update Process:
```bash
# Stop application
pm2 stop abletools

# Backup current version
cp -r /var/www/abletools /var/www/abletools_backup

# Update code
cd /var/www/abletools
# Upload new files
npm install
npm run build

# Start application
pm2 start abletools
```

## Security Considerations

### Firewall Setup:
```bash
# Install UFW
sudo apt install ufw -y

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Regular Updates:
```bash
# System updates
sudo apt update && sudo apt upgrade -y

# Node.js security updates
npm audit fix

# PM2 updates
pm2 update
```

## Troubleshooting

### Common Issues:
1. **Port already in use**: Check with `netstat -tlnp | grep :3000`
2. **Database connection**: Verify MySQL credentials and host
3. **File permissions**: Ensure proper ownership `chown -R $USER:$USER /var/www/abletools`
4. **Memory issues**: Monitor with `htop` or `free -h`

### Logs Location:
- Application logs: `pm2 logs abletools`
- Nginx logs: `/var/log/nginx/access.log` and `/var/log/nginx/error.log`
- MySQL logs: `/var/log/mysql/error.log`

## Performance Optimization

### Enable Gzip:
```nginx
# Add to nginx config
gzip on;
gzip_vary on;
gzip_types text/css application/javascript image/svg+xml;
```

### Database Optimization:
```sql
-- Create indexes for better performance
ALTER TABLE products ADD INDEX idx_category (category_id);
ALTER TABLE products ADD INDEX idx_featured (is_featured);
```

Your React.js application will run perfectly on your own server with full control and customization options.