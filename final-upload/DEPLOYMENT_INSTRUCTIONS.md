# AbleTools Deployment Instructions

## Complete Step-by-Step Guide

### Prerequisites
- Node.js 18+ installed on server
- PostgreSQL database access
- Web hosting with Node.js support (cPanel, VPS, Cloud hosting)

---

## Method 1: cPanel Hosting

### Step 1: Upload Files
1. **Login to cPanel** and open File Manager
2. **Navigate** to `public_html/` directory
3. **Create folder** named `abletools`
4. **Upload** all files from this package to `/public_html/abletools/`

### Step 2: Node.js Application Setup
1. **Find Node.js Selector** in cPanel (usually under "Software")
2. **Create Application** with these settings:
   ```
   Node.js Version: 18.x or higher
   Application Root: public_html/abletools
   Application URL: abletools
   Application Startup File: start.js
   ```

### Step 3: Environment Configuration
1. **Set Environment Variables** in Node.js app settings:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
   PORT=5000
   SESSION_SECRET=abletools_session_secret_key_2025
   ```

### Step 4: Install Dependencies
1. **Open Terminal** in cPanel or use SSH
2. **Navigate** to application directory:
   ```bash
   cd ~/public_html/abletools
   ```
3. **Install packages**:
   ```bash
   npm install --production
   ```

### Step 5: Database Setup
Your PostgreSQL database should already exist with these credentials:
- Host: localhost
- Database: abletoolscom_dbengrweb
- User: abletoolscom_dbengruser
- Password: dbengrpwd140725

If you need to create tables, the application will create them automatically on first run.

### Step 6: Start Application
1. **Go back to Node.js App** in cPanel
2. **Click "Restart"** to start the application
3. **Verify status** shows "Running"

### Step 7: Access Your Website
- **Main Site:** `https://yourdomain.com/abletools/`
- **Admin Panel:** `https://yourdomain.com/abletools/admin`
- **Login:** admin / admin123

---

## Method 2: VPS/Dedicated Server

### Step 1: Server Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL (if not already installed)
sudo apt install postgresql postgresql-contrib
```

### Step 2: Upload and Setup
```bash
# Create application directory
sudo mkdir -p /var/www/abletools
cd /var/www/abletools

# Upload your files (via SCP, FTP, or Git)
# Ensure all package files are in this directory

# Set permissions
sudo chown -R www-data:www-data /var/www/abletools
sudo chmod -R 755 /var/www/abletools
```

### Step 3: Install Dependencies
```bash
cd /var/www/abletools
npm install --production
```

### Step 4: Configure Environment
```bash
# Edit environment file
nano .env.production

# Update database URL if needed:
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
```

### Step 5: Setup Process Manager (PM2)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application with PM2
pm2 start start.js --name "abletools"

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

### Step 6: Configure Nginx (Optional)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
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
    
    location /attached_assets/ {
        alias /var/www/abletools/attached_assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Method 3: Cloud Hosting (Heroku, Railway, etc.)

### Step 1: Prepare for Deployment
1. **Create** `Procfile` in root directory:
   ```
   web: node start.js
   ```

2. **Update** environment variables in hosting platform:
   ```
   NODE_ENV=production
   DATABASE_URL=your_postgresql_url
   PORT=$PORT
   SESSION_SECRET=abletools_session_secret_key_2025
   ```

### Step 2: Deploy
```bash
# Initialize git repository (if not done)
git init
git add .
git commit -m "Initial deployment"

# Deploy to your platform
# For Heroku:
heroku create your-app-name
git push heroku main

# For Railway:
railway login
railway init
railway up
```

---

## Verification Steps

### Test Your Deployment
1. **Visit main website** - Should load homepage with company branding
2. **Check admin panel** - Login with admin/admin123
3. **Test API endpoints**:
   - `/api/products` - Should return product list
   - `/api/categories` - Should return categories
   - `/api/banners` - Should return homepage banners

### Common Issues and Solutions

**Issue: Application won't start**
```bash
# Check logs
pm2 logs abletools  # For PM2
# Or check cPanel error logs

# Verify Node.js version
node --version  # Should be 18+

# Check dependencies
npm ls --production
```

**Issue: Database connection failed**
- Verify PostgreSQL is running
- Check database credentials in .env.production
- Ensure database exists and user has permissions

**Issue: Static files not loading**
- Check file permissions (755 for directories, 644 for files)
- Verify attached_assets directory exists
- Check web server configuration

**Issue: Admin panel 404**
- Ensure React routes are configured correctly
- Check if build includes all necessary files
- Verify server serves index.html for unknown routes

---

## Security Considerations

### Production Security
1. **Change default admin password** after first login
2. **Update SESSION_SECRET** to a strong random value
3. **Enable HTTPS** in production
4. **Set up firewall** to only allow necessary ports
5. **Regular security updates** for Node.js and dependencies

### Database Security
1. **Use strong database passwords**
2. **Limit database user permissions**
3. **Enable PostgreSQL SSL** if available
4. **Regular database backups**

---

## Maintenance

### Regular Tasks
1. **Monitor application logs** for errors
2. **Update dependencies** regularly: `npm update`
3. **Database backups** - Set up automated backups
4. **SSL certificate renewal** if using Let's Encrypt
5. **Monitor server resources** (CPU, memory, disk space)

### Backup Strategy
```bash
# Database backup
pg_dump abletoolscom_dbengrweb > backup_$(date +%Y%m%d).sql

# Application backup
tar -czf abletools_backup_$(date +%Y%m%d).tar.gz /var/www/abletools
```

---

## Support Information

### Application Features
- Complete rehabilitation equipment catalog
- Multilingual support (English/Greek)
- Admin content management system
- User registration and authentication
- Seminar and training management
- News and events publishing
- Contact and enquiry system

### Technical Support
- Check application logs for error details
- Verify database connectivity
- Ensure all environment variables are set
- Monitor server resources and performance

Your AbleTools website is now ready for production deployment!