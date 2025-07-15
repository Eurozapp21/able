# 🚀 AbleTools Python - cPanel Deployment Guide

## Complete Step-by-Step Instructions for cPanel Hosting

### 📋 Prerequisites

**What You Need:**
- ✅ cPanel hosting account with Python support
- ✅ PostgreSQL database access
- ✅ SSH access (recommended) or File Manager
- ✅ Your `abletools-python-complete.tar.gz` file

**Database Credentials (Already Configured):**
- **Host:** localhost
- **Database:** abletoolscom_dbengrweb
- **Username:** abletoolscom_dbengruser
- **Password:** dbengrpwd140725

---

## 📂 Step 1: Upload Files to cPanel

### Option A: Using File Manager (Recommended)

1. **Login to cPanel**
   - Access your hosting control panel
   - Click on "File Manager"

2. **Navigate to Directory**
   - Go to `public_html/` (for main domain)
   - OR create `public_html/abletools/` (for subdirectory)

3. **Upload the Package**
   - Click "Upload" button
   - Select `abletools-python-complete.tar.gz`
   - Wait for upload to complete

4. **Extract Files**
   - Right-click on `abletools-python-complete.tar.gz`
   - Select "Extract"
   - Choose extraction location
   - Delete the tar.gz file after extraction

### Option B: Using SSH (Advanced)

```bash
# Connect to your server via SSH
ssh your-username@your-domain.com

# Navigate to web directory
cd public_html

# Upload via SCP (run this from your local machine)
scp abletools-python-complete.tar.gz your-username@your-domain.com:~/public_html/

# Extract on server
tar -xzf abletools-python-complete.tar.gz
rm abletools-python-complete.tar.gz
```

---

## ⚙️ Step 2: Python Application Setup

### 2.1 Access Python Selector

1. **Find Python App**
   - In cPanel, look for "Python Selector" or "Python App"
   - May be under "Software" or "Programming" section

2. **Create New Application**
   - Click "Create Application"
   - Fill in the details:

### 2.2 Application Configuration

```
Python Version: 3.11 (or highest available)
Application Root: /public_html/abletools (or your chosen directory)
Application URL: abletools (or leave blank for main domain)
Application Startup File: python-production.py
Application Entry Point: main:app
```

### 2.3 Environment Variables

Add these environment variables in the Python app settings:

```
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
SECRET_KEY=77e0c1e85f08d19d7e28b45e932676a5
PORT=8000
DEBUG=False
```

---

## 📦 Step 3: Install Dependencies

### 3.1 Access Terminal or SSH

1. **Via cPanel Terminal:**
   - Look for "Terminal" in cPanel
   - Navigate to your application directory

2. **Install Python Packages:**
   ```bash
   cd /home/your-username/public_html/abletools
   pip install -r requirements.txt
   ```

### 3.2 Alternative: Manual Installation

If pip install fails, install packages individually:

```bash
pip install fastapi==0.116.1
pip install uvicorn==0.35.0
pip install sqlalchemy==2.0.41
pip install psycopg2-binary==2.9.10
pip install pydantic==2.11.7
pip install python-multipart==0.0.20
pip install jinja2==3.1.6
pip install python-jose==3.5.0
pip install passlib==1.7.4
pip install bcrypt==4.3.0
pip install alembic==1.16.4
pip install python-dotenv==1.1.1
```

---

## 🗄️ Step 4: Database Configuration

### 4.1 Verify Database Connection

Your database is already configured with these settings:
- Host: localhost
- Database: abletoolscom_dbengrweb
- User: abletoolscom_dbengruser
- Password: dbengrpwd140725

### 4.2 Initialize Database

Run the database seeder to create tables and sample data:

```bash
cd /home/your-username/public_html/abletools
python data_seeder.py
```

This will create:
- All database tables
- Admin user (admin/admin123)
- Sample products, categories, seminars
- Company banners and achievements

---

## 🌐 Step 5: Configure Web Server

### 5.1 Create .htaccess File

Create `.htaccess` in your web directory:

```apache
RewriteEngine On

# Handle Python app
RewriteCond %{REQUEST_URI} !^/static/
RewriteCond %{REQUEST_URI} !^/attached_assets/
RewriteRule ^api/(.*)$ http://localhost:8000/api/$1 [P,L]

# Serve static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /public/index.html [L]
```

### 5.2 Start Python Application

In cPanel Python App manager:
1. Click "Restart" to start your application
2. Check the status - should show "Running"
3. Note the application URL

---

## 🔧 Step 6: File Permissions

Set correct permissions for your files:

```bash
# Make startup script executable
chmod +x start.sh
chmod +x python-production.py

# Set directory permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Ensure Python files are executable
chmod +x *.py
```

---

## 🎯 Step 7: Test Your Deployment

### 7.1 Check Website Access

Visit your URLs:
- **Main Website:** `https://yourdomain.com/abletools/`
- **Admin Panel:** `https://yourdomain.com/abletools/admin`
- **API Documentation:** `https://yourdomain.com/abletools/docs`

### 7.2 Test Admin Login

1. Go to admin panel
2. Login with: `admin` / `admin123`
3. Verify all sections work:
   - Dashboard statistics
   - Products management
   - Categories management
   - Users management
   - Seminars and events

### 7.3 Verify API Endpoints

Test these endpoints in your browser:
- `/api/products` - Should show product list
- `/api/categories` - Should show categories
- `/api/banners` - Should show homepage banners

---

## 🔍 Step 8: Troubleshooting

### Common Issues and Solutions

**Issue: Python app won't start**
```bash
# Check Python version
python --version

# Verify all dependencies installed
pip list

# Check for errors in startup
python python-production.py
```

**Issue: Database connection failed**
- Verify database credentials in .env file
- Ensure PostgreSQL is running on your server
- Check database permissions

**Issue: Static files not loading**
- Verify .htaccess configuration
- Check file permissions (755 for directories, 644 for files)
- Ensure public/ directory exists

**Issue: 500 Internal Server Error**
- Check error logs in cPanel
- Verify all Python dependencies installed
- Ensure startup file path is correct

### Log Files to Check

1. **Python Application Logs:**
   - Usually in `/home/username/logs/`
   - Look for application-specific error logs

2. **Apache Error Logs:**
   - In cPanel: "Error Logs" section
   - Check for recent errors

3. **Database Logs:**
   - PostgreSQL logs if accessible
   - Connection errors

---

## ✅ Step 9: Production Optimization

### 9.1 Security Settings

1. **Update Secret Key:**
   ```bash
   # Generate new secret key
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
   Update in environment variables

2. **Set Debug Mode:**
   ```
   DEBUG=False
   ```

### 9.2 Performance Optimization

1. **Enable Gzip Compression** in .htaccess:
   ```apache
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
   </IfModule>
   ```

2. **Set Cache Headers:**
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

---

## 🎉 Step 10: Go Live!

Your AbleTools website is now live with:

✅ **Complete Python/FastAPI backend**
✅ **React frontend with responsive design**
✅ **Full admin system for content management**
✅ **Multilingual support (English/Greek)**
✅ **Professional company branding**
✅ **PostgreSQL database integration**
✅ **Secure authentication system**

### Final URLs:
- **Website:** `https://yourdomain.com/abletools/`
- **Admin:** `https://yourdomain.com/abletools/admin`
- **API Docs:** `https://yourdomain.com/abletools/docs`

### Admin Credentials:
- **Username:** admin
- **Password:** admin123

Your professional rehabilitation equipment website is now powered by modern Python technology and ready to serve your customers! 🚀