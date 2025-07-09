# AbleTools Deployment Guide for Shared Servers

## Overview

This guide provides step-by-step instructions for deploying the AbleTools rehabilitation equipment management system to various shared hosting environments.

## Deployment Options

### Option 1: Node.js Enabled Shared Hosting

If your shared hosting provider supports Node.js applications:

#### Requirements
- Node.js 18+ support
- PostgreSQL or MySQL database
- SSH access (recommended)
- At least 512MB RAM

#### Steps

1. **Prepare the Application**
   ```bash
   # Build the frontend
   npm run build
   
   # Install production dependencies only
   npm ci --production
   ```

2. **Upload Files**
   - Upload the entire project folder to your hosting directory
   - Ensure `node_modules` is included or run `npm install` on the server

3. **Database Setup**
   - Create a PostgreSQL or MySQL database through your hosting control panel
   - Update the `DATABASE_URL` environment variable
   - Run database migrations: `npm run db:push`

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   NODE_ENV=production
   PORT=3000
   ```

5. **Start the Application**
   ```bash
   npm start
   ```

### Option 2: Static Hosting with API Backend

For shared hosting that doesn't support Node.js but allows PHP/Python backends:

#### Frontend (Static)
1. Build the React application:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder contents to your public_html directory

3. Configure your web server to serve the React app:
   - Create an `.htaccess` file for Apache servers:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

#### Backend API
Convert the Express.js API to PHP or Python scripts that connect to your database.

### Option 3: cPanel Shared Hosting

Most shared hosting providers use cPanel. Here's the specific process:

#### Prerequisites
- cPanel access
- MySQL database support
- File Manager or FTP access

#### Steps

1. **Create Database**
   - Log into cPanel
   - Go to "MySQL Databases"
   - Create a new database named `abletools`
   - Create a database user and assign privileges

2. **Upload Files**
   - Use File Manager or FTP to upload the project
   - Place in `public_html` or subdirectory

3. **Configure Database**
   - Update database connection in `server/storage.ts`
   - Use MySQL instead of PostgreSQL if required

4. **Set Up Node.js App**
   - In cPanel, look for "Node.js App" or "Node.js Selector"
   - Create a new application
   - Set startup file to `server/index.js`
   - Install dependencies

### Option 4: Subdomain Deployment

If you want to deploy to a subdomain (e.g., app.yourdomain.com):

1. **Create Subdomain**
   - In cPanel, go to "Subdomains"
   - Create `app` subdomain pointing to a folder

2. **Upload Application**
   - Upload the built application to the subdomain folder
   - Follow the same database setup process

3. **Configure DNS**
   - Ensure DNS records point to your hosting server
   - Set up SSL certificate if available

## Database Migration Guide

### From In-Memory to Production Database

Since the current application uses in-memory storage, you'll need to migrate to a persistent database:

1. **Update Storage Configuration**
   ```typescript
   // In server/storage.ts
   import { drizzle } from 'drizzle-orm/postgres-js';
   import postgres from 'postgres';
   
   const connectionString = process.env.DATABASE_URL!;
   const client = postgres(connectionString);
   export const db = drizzle(client);
   ```

2. **Run Database Migrations**
   ```bash
   npm run db:push
   ```

3. **Seed Initial Data**
   Create a seed script to populate the database with initial categories, products, and content.

## Environment Variables

Set these environment variables on your hosting platform:

```env
# Database
DATABASE_URL=your_database_connection_string

# Application
NODE_ENV=production
PORT=3000

# Security
SESSION_SECRET=your_secure_session_secret

# Email (if using contact forms)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

## Performance Optimization

### 1. Enable Compression
Add to your `.htaccess` file:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 2. Enable Caching
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. Optimize Images
- Compress images in the `attached_assets` folder
- Use WebP format where possible
- Implement lazy loading

## Security Configuration

### SSL Certificate
- Enable SSL through your hosting provider
- Force HTTPS redirects:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Security Headers
Add to `.htaccess`:
```apache
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

## Troubleshooting Common Issues

### Node.js Version Conflicts
- Check your hosting provider's Node.js version
- Update `package.json` engines field if needed
- Use `nvm` if available to switch versions

### Database Connection Issues
- Verify database credentials
- Check if database server is accessible
- Ensure firewall allows connections

### File Permission Problems
- Set correct permissions: `chmod 755` for directories, `chmod 644` for files
- Ensure the web server can read all files

### Memory Limits
- Optimize your application's memory usage
- Consider using process managers like PM2
- Monitor resource usage

## Maintenance

### Regular Updates
- Keep Node.js and npm packages updated
- Monitor security vulnerabilities
- Backup database regularly

### Monitoring
- Set up error logging
- Monitor application performance
- Check server resources regularly

## Support

If you encounter issues during deployment:

1. Check your hosting provider's documentation
2. Contact their support team for Node.js specific issues
3. Review server logs for error messages
4. Test the application locally first

## Hosting Provider Recommendations

### Node.js Friendly Shared Hosts
- **Hostinger**: Good Node.js support, affordable
- **A2 Hosting**: Excellent performance, developer-friendly
- **SiteGround**: Reliable, good support
- **Bluehost**: Popular, easy to use

### VPS Alternatives
If shared hosting limitations are too restrictive:
- **DigitalOcean**: Developer-friendly, good documentation
- **Linode**: Reliable, good performance
- **Vultr**: Affordable, multiple locations

---

*This deployment guide is specifically tailored for the AbleTools rehabilitation equipment management system. Adjust configurations based on your specific hosting environment and requirements.*