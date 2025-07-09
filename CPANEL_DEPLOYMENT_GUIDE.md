# AbleTools Website - cPanel Deployment Guide

## ❌ The Problem
You've uploaded source code to public_html, but this is a **Node.js application** that needs special setup. cPanel's public folder is for static websites (HTML/CSS/JS), not Node.js applications.

## ✅ Solutions for cPanel Hosting

### Option 1: Check if Your cPanel Supports Node.js (Recommended)

#### Step 1: Check Node.js Support
1. **Login to cPanel**
2. **Look for "Node.js" or "Node.js Apps"** in the control panel
3. **If you see it** - your hosting supports Node.js applications

#### Step 2: Create Node.js App (if supported)
1. **Click "Node.js Apps"**
2. **Create Application:**
   - Node.js Version: 18.x or 20.x
   - Application Mode: Production
   - Application Root: `abletools-website`
   - Application URL: your domain
   - Application Startup File: `server/index.js`

#### Step 3: Upload and Configure
```bash
# Upload your files to the app root (NOT public_html)
# Usually: /home/username/abletools-website/

# Create .env file in app root:
NODE_ENV=production
DATABASE_URL=mysql://your_db_user:your_db_password@localhost:3306/your_db_name
PORT=3000
SESSION_SECRET=your_secure_session_secret
```

#### Step 4: Install Dependencies
1. **In cPanel Node.js interface:**
2. **Click "NPM Install"** or run in terminal:
```bash
npm install
npm run build
```

#### Step 5: Start Application
1. **Click "Start App"** in cPanel Node.js interface

---

### Option 2: Build Static Version (If No Node.js Support)

If your cPanel doesn't support Node.js, we need to create a static version:

#### Step 1: Build Static Files Locally
On your computer (or in Replit):
```bash
# Install dependencies
npm install

# Build production version
npm run build

# This creates a 'dist' folder with static files
```

#### Step 2: Create PHP Backend for Database
Since you can't run Node.js, create simple PHP files for database operations:

**Create `api.php` in public_html:**
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_db_username';
$password = 'your_db_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$request = $_GET['action'] ?? '';

switch($request) {
    case 'products':
        $stmt = $pdo->query("SELECT * FROM products WHERE is_featured = 1 LIMIT 6");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'categories':
        $stmt = $pdo->query("SELECT * FROM categories WHERE parent_id IS NULL");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'seminars':
        $stmt = $pdo->query("SELECT * FROM seminars LIMIT 6");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    default:
        echo json_encode(['error' => 'Invalid action']);
}
?>
```

#### Step 3: Upload Static Files
1. **Upload contents of `dist` folder** to `public_html`
2. **Upload `api.php`** to `public_html`
3. **Upload database schema** and import via phpMyAdmin

---

### Option 3: Use Subdomain for Node.js

Some cPanel hosts allow Node.js on subdomains:

1. **Create subdomain:** `app.yourdomain.com`
2. **Point subdomain** to Node.js application
3. **Main domain** redirects to subdomain

---

## 🔧 Quick Fix for Current Situation

### Immediate Steps:
1. **Remove files from public_html/public folder**
2. **Check cPanel for "Node.js Apps" section**
3. **If no Node.js support:**
   - Contact your hosting provider
   - Ask if they support Node.js applications
   - Consider upgrading hosting plan

### Database Setup (if not done):
1. **cPanel → MySQL Databases**
2. **Create database:** `yourusername_abletools`
3. **Create user:** `yourusername_dbuser`
4. **Set password** and note credentials
5. **Import database schema** via phpMyAdmin

## 🏆 Best Hosting Options for Node.js

If your current cPanel doesn't support Node.js:

### Recommended Hosts:
- **A2 Hosting** - Node.js support on shared hosting
- **HostGator** - Business plans include Node.js
- **SiteGround** - GoGeek plan supports Node.js
- **DigitalOcean** - VPS with full control
- **Heroku** - Easy Node.js deployment
- **Vercel** - Excellent for React + Node.js

## 📞 Contact Your Hosting Provider

**Ask them:**
1. "Do you support Node.js applications?"
2. "Can I run Express.js applications?"
3. "How do I deploy a React + Node.js app?"
4. "Do you have application hosting separate from web hosting?"

## 🚨 Important Notes

- **cPanel public_html is for static websites** (HTML, CSS, JS, PHP)
- **Node.js apps need special hosting** or VPS access
- **Your application is full-stack** and requires server-side processing
- **Database operations need backend** (Node.js or PHP)

The 404 error occurs because you've uploaded source code that needs compilation and a Node.js server to run. The browser is looking for HTML files but finding JavaScript source code instead.

Let me know what Node.js options your cPanel provides, and I'll help you configure it properly!