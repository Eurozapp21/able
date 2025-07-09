# 🚀 AbleTools Website - FTP Deployment Guide

## Overview
This guide will help you deploy your AbleTools rehabilitation equipment website to shared hosting via FTP.

## 🔧 Prerequisites

### What You Need:
- FTP client (FileZilla, WinSCP, or cPanel File Manager)
- MySQL database access on your hosting provider
- Node.js support on your hosting (if available) OR static hosting capability

## 📋 Step-by-Step Deployment Process

### Step 1: Prepare Your Files for Upload

#### Option A: Static Website (Recommended for Shared Hosting)
Most shared hosting providers don't support Node.js. Here's how to create a static version:

1. **Build the frontend:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with static files.

2. **Create a static version of your content:**
   - Copy all files from the `dist` folder
   - Copy `attached_assets` folder for images
   - Create a simple PHP backend (if your host supports PHP)

#### Option B: Full Node.js Application (VPS/Dedicated Server)
If your hosting supports Node.js:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Files to upload:**
   - `dist/` folder (built application)
   - `node_modules/` (or run `npm install` on server)
   - `package.json`
   - `attached_assets/` folder
   - Database configuration files

### Step 2: Database Setup

#### Create MySQL Database:
1. **Log into your hosting control panel (cPanel/Plesk)**
2. **Go to MySQL Databases**
3. **Create a new database:**
   - Database name: `your_domain_abletools`
   - Username: `your_domain_abletools_user`
   - Password: (create a strong password)
   - Grant ALL privileges

#### Import Database Structure:
```sql
-- Run this SQL in your hosting's phpMyAdmin or database tool

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postcode VARCHAR(20),
  occupation VARCHAR(100),
  role VARCHAR(20) DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  image VARCHAR(500),
  parent_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT NOT NULL,
  images TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  specifications TEXT,
  price VARCHAR(50),
  sku VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seminars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'seminar',
  start_date DATE,
  end_date DATE,
  time_start TIME,
  time_end TIME,
  location VARCHAR(255),
  instructor VARCHAR(255),
  price VARCHAR(50),
  max_participants INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'event',
  event_date DATE,
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  date_achieved DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  link VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE catalogue_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE brochures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT NOT NULL,
  file_path VARCHAR(500),
  download_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiry_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enquiry_id INT NOT NULL,
  user_id INT,
  message TEXT NOT NULL,
  is_from_user BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: FTP Upload Process

#### Using FileZilla (Recommended):
1. **Download FileZilla** from https://filezilla-project.org/
2. **Connect to your server:**
   - Host: Your domain or server IP
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

3. **Navigate to public_html** (or your domain folder)
4. **Upload your files:**
   - Create folder: `abletools-website`
   - Upload all built files maintaining folder structure
   - Upload `attached_assets` folder with all images

#### Using cPanel File Manager:
1. **Login to cPanel**
2. **Open File Manager**
3. **Go to public_html**
4. **Create new folder:** `abletools-website`
5. **Upload files:**
   - Upload as ZIP and extract, OR
   - Upload individual files/folders

### Step 4: Configuration for Shared Hosting

#### Create .htaccess file for Apache (if using static hosting):
```apache
# .htaccess for AbleTools Website
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L,QSA]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
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

# Browser caching
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

### Step 5: Environment Configuration

#### Create environment file for database connection:
```
DB_HOST=localhost
DB_NAME=your_domain_abletools
DB_USER=your_domain_abletools_user
DB_PASSWORD=your_database_password
DB_PORT=3306
```

### Step 6: Testing Your Deployment

1. **Visit your website:** `https://yourdomain.com/abletools-website/`
2. **Check all pages load correctly**
3. **Test image loading from attached_assets**
4. **Verify database connections work**
5. **Test contact forms and enquiries**

### Step 7: Common Issues and Solutions

#### Issue 1: Images not loading
**Solution:** Check attached_assets folder path and permissions

#### Issue 2: Database connection errors
**Solution:** 
- Verify database credentials
- Check host allows external connections
- Ensure database user has proper privileges

#### Issue 3: 404 errors on page navigation
**Solution:** Ensure .htaccess file is properly configured

#### Issue 4: CSS/JS files not loading
**Solution:** Check file paths and permissions (755 for folders, 644 for files)

## 🔧 Alternative: Static Website Version

If your hosting doesn't support Node.js, you can create a static version:

1. **Export content to JSON files**
2. **Use client-side JavaScript to load content**
3. **Create simple contact forms using PHP**
4. **Use static images instead of dynamic uploads**

## 📞 Support

If you need help with any step:
1. Check your hosting provider's documentation
2. Contact your hosting support for database setup
3. Use cPanel tutorials for file management
4. Test thoroughly before going live

## 🚀 Go Live Checklist

- [ ] Database created and populated
- [ ] All files uploaded via FTP
- [ ] Images and assets accessible
- [ ] .htaccess file configured
- [ ] Environment variables set
- [ ] All pages load correctly
- [ ] Contact forms working
- [ ] Mobile responsive design verified
- [ ] SSL certificate installed
- [ ] Domain pointing to correct folder

Your AbleTools website is now ready for visitors!