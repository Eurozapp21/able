# AbleTools Website - cPanel Deployment Guide

## Prerequisites

Before starting deployment, ensure you have:
- cPanel hosting account with Node.js support
- PostgreSQL database access
- SSH access (optional but recommended)
- Domain name configured

## Phase 1: Database Setup

### Step 1: Create PostgreSQL Database in cPanel

1. **Login to cPanel**
   - Go to your hosting provider's cPanel login page
   - Enter your credentials

2. **Create Database**
   - Find "PostgreSQL Databases" in the Databases section
   - Click "Create Database"
   - Database name: `abletools_prod` (or your preferred name)
   - Click "Create Database"

3. **Create Database User**
   - In the same section, find "Add New User"
   - Username: `abletools_user` (or your preferred username)
   - Password: Generate a strong password (save it securely)
   - Click "Create User"

4. **Assign User to Database**
   - In "Add User to Database" section
   - Select your user and database
   - Grant "ALL PRIVILEGES"
   - Click "Make Changes"

5. **Note Connection Details**
   ```
   Database Name: your_cpanel_username_abletools_prod
   Username: your_cpanel_username_abletools_user
   Password: [your_generated_password]
   Host: localhost (or your hosting provider's PostgreSQL host)
   Port: 5432 (default PostgreSQL port)
   ```

### Step 2: Environment Variables Setup

Create a `.env.production` file with your database credentials:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database_name
SESSION_SECRET=your_very_long_random_session_secret_here
PORT=3000
```

Example:
```bash
NODE_ENV=production
DATABASE_URL=postgresql://myuser_abletools_user:mypassword@localhost:5432/myuser_abletools_prod
SESSION_SECRET=your_very_long_random_session_secret_here_at_least_32_characters
PORT=3000
```

## Phase 2: Build the Application

### Step 3: Prepare Local Build

1. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

2. **Build the Application**
   ```bash
   npm run build
   ```

3. **Prepare Production Files**
   Create the following structure:
   ```
   production-files/
   ├── dist/
   │   ├── assets/       (built frontend files)
   │   └── server.js     (built server file)
   ├── attached_assets/  (your uploaded images)
   ├── package.json
   ├── .env.production
   └── drizzle/          (database migrations)
   ```

## Phase 3: Upload Files to cPanel

### Step 4: Upload via File Manager

1. **Access File Manager**
   - In cPanel, open "File Manager"
   - Navigate to your domain's public_html folder
   - Create a new folder called `abletools` (or use public_html directly)

2. **Upload Files**
   - Upload all files from your `production-files` folder
   - Ensure file permissions are correct (644 for files, 755 for folders)

3. **Upload Node.js Files**
   - Make sure `package.json` and all dependencies are uploaded
   - Upload the `dist` folder with built application
   - Upload `attached_assets` folder with all images

### Step 5: Alternative - Upload via FTP/SFTP

If you prefer FTP:
```bash
# Using scp (if SSH access available)
scp -r production-files/* username@yourserver.com:/home/username/public_html/abletools/

# Or use FTP client like FileZilla
# Server: your-domain.com
# Username: your-cpanel-username
# Password: your-cpanel-password
# Port: 21 (FTP) or 22 (SFTP)
```

## Phase 4: Configure Node.js Application

### Step 6: Setup Node.js in cPanel

1. **Access Node.js Selector**
   - In cPanel, find "Node.js Selector" or "Node.js App"
   - Click to open

2. **Create Node.js Application**
   - Click "Create Application"
   - Node.js Version: Select latest stable (18.x or 20.x)
   - Application Mode: Production
   - Application Root: `/public_html/abletools` (or your chosen path)
   - Application URL: your-domain.com (or subdomain)
   - Application Startup File: `dist/server.js`

3. **Set Environment Variables**
   - In the Node.js app settings, add environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=your_database_connection_string
   SESSION_SECRET=your_session_secret
   PORT=3000
   ```

### Step 7: Install Dependencies

1. **Using cPanel Terminal** (if available)
   ```bash
   cd /home/username/public_html/abletools
   npm install --production
   ```

2. **Or using Node.js Selector**
   - In the Node.js app interface
   - Click "Run NPM Install"

## Phase 5: Database Migration

### Step 8: Initialize Database Schema

1. **Install PostgreSQL Client** (if using SSH)
   ```bash
   npm install -g postgres
   ```

2. **Run Database Migration**
   ```bash
   cd /home/username/public_html/abletools
   npm run db:push
   ```

3. **Verify Database Connection**
   Create a test file to verify connection:
   ```javascript
   // test-db.js
   const { Client } = require('pg');
   const client = new Client({
     connectionString: process.env.DATABASE_URL
   });
   
   client.connect()
     .then(() => console.log('Database connected successfully'))
     .catch(err => console.error('Database connection error:', err))
     .finally(() => client.end());
   ```

   Run: `node test-db.js`

## Phase 6: Configure Web Server

### Step 9: Setup Domain/Subdomain

1. **Configure Domain**
   - In cPanel, go to "Subdomains" or "Addon Domains"
   - Create subdomain: `admin.yourdomain.com` (optional)
   - Point to your application folder

2. **Update .htaccess** (if needed)
   Create `.htaccess` in your application root:
   ```apache
   RewriteEngine On
   RewriteRule ^(?!.*\.(js|css|png|jpg|jpeg|gif|ico|svg)).*$ index.html [QSA,L]
   ```

### Step 10: Start the Application

1. **Start via cPanel**
   - In Node.js Selector, click "Start" for your application
   - Monitor the status and logs

2. **Or via SSH**
   ```bash
   cd /home/username/public_html/abletools
   npm start
   ```

## Phase 7: SSL Certificate Setup

### Step 11: Enable HTTPS

1. **Free SSL via cPanel**
   - Go to "SSL/TLS" section
   - Click "Let's Encrypt"
   - Generate certificate for your domain

2. **Force HTTPS Redirect**
   Add to `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## Phase 8: Testing and Verification

### Step 12: Test Website Functionality

1. **Basic Functionality**
   - Visit your website: `https://yourdomain.com`
   - Test homepage loading
   - Verify all images display correctly
   - Test navigation between pages

2. **Admin Access**
   - Go to: `https://yourdomain.com/admin`
   - Login with: admin / admin123
   - Test admin functionality

3. **Database Operations**
   - Test creating new products/categories
   - Verify data persistence
   - Test search functionality

## Phase 9: Monitoring and Maintenance

### Step 13: Setup Monitoring

1. **Log Monitoring**
   - Check application logs in cPanel
   - Monitor error logs regularly

2. **Database Backup**
   - Setup automatic backups in cPanel
   - Test backup restoration process

3. **Performance Monitoring**
   - Monitor server resources
   - Check website loading speed

## Troubleshooting Common Issues

### Database Connection Issues
- Verify DATABASE_URL format
- Check PostgreSQL service status
- Confirm user permissions

### File Upload Issues
- Check file permissions (644/755)
- Verify file paths in code
- Ensure attached_assets folder uploaded

### Node.js Issues
- Check Node.js version compatibility
- Verify package.json dependencies
- Monitor application logs

### SSL Certificate Issues
- Ensure domain propagation complete
- Check SSL certificate installation
- Verify .htaccess redirect rules

## Final Checklist

- [ ] Database created and configured
- [ ] Environment variables set
- [ ] Files uploaded to cPanel
- [ ] Node.js application configured
- [ ] Dependencies installed
- [ ] Database schema migrated
- [ ] SSL certificate installed
- [ ] Website accessible and functional
- [ ] Admin panel working
- [ ] All images displaying correctly
- [ ] Search functionality working
- [ ] Contact forms functional

## Support Contacts

If you encounter issues:
1. Check your hosting provider's documentation
2. Contact hosting support for server-specific issues
3. Verify all configuration steps completed correctly

Your AbleTools website should now be live and fully functional on cPanel hosting!