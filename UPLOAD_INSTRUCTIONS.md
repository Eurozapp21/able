# AbleTools Website - Upload Instructions

## 📁 Source Code Location
Your complete website source code is in this Replit project. Here's what you need:

### Essential Files to Upload:
```
📦 Your Website Files
├── 📁 client/          # React frontend
├── 📁 server/          # Express.js backend  
├── 📁 shared/          # Shared TypeScript schemas
├── 📁 attached_assets/ # Images and media files
├── 📄 package.json     # Dependencies
├── 📄 package-lock.json
├── 📄 tsconfig.json    # TypeScript config
├── 📄 vite.config.ts   # Build configuration
├── 📄 tailwind.config.ts
├── 📄 postcss.config.js
├── 📄 components.json
├── 📄 drizzle.config.ts
└── 📄 deployment-guide.md
```

## 🗄️ Database Credentials

### Where to Get Database Info:

#### Option 1: Your Hosting Provider (Most Common)
1. **Login to your hosting control panel** (cPanel, DirectAdmin, etc.)
2. **Find "MySQL Databases" section**
3. **Create new database:**
   - Database Name: `yourusername_abletools`
   - Username: `yourusername_dbuser` 
   - Password: `create_secure_password`
4. **Note these credentials - you'll need them!**

#### Option 2: VPS/Dedicated Server
If you have root access to your server:
```bash
# Install MySQL
sudo apt install mysql-server
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
CREATE DATABASE abletools;
CREATE USER 'abletools_user'@'localhost' IDENTIFIED BY 'SecurePassword123';
GRANT ALL PRIVILEGES ON abletools.* TO 'abletools_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📤 How to Download Your Source Code

### Method 1: Download Individual Files (Easiest)
1. **In Replit, click on each folder** (client, server, shared, attached_assets)
2. **Right-click → Download** each folder
3. **Download individual files:** package.json, tsconfig.json, etc.
4. **Keep the same folder structure** on your computer

### Method 2: Git Clone (If you connected GitHub)
```bash
git clone https://github.com/yourusername/your-repo-name.git
```

### Method 3: Export from Replit
1. **Click the three dots menu** in Replit
2. **Select "Download as ZIP"**
3. **Extract the ZIP file** on your computer

## 🚀 Upload to Your Server

### Method 1: File Manager (cPanel/DirectAdmin)
1. **Login to your hosting control panel**
2. **Open File Manager**
3. **Navigate to public_html/** (or your domain folder)
4. **Create folder:** `abletools-website`
5. **Upload all files** maintaining the folder structure
6. **Extract if uploaded as ZIP**

### Method 2: FTP/SFTP Upload
```bash
# Using SCP (if you have SSH access)
scp -r /path/to/your/project user@your-server-ip:/var/www/abletools-website

# Using SFTP client (FileZilla, WinSCP)
# Connect to your server and upload the entire project folder
```

### Method 3: Git (if your server has Git)
```bash
# On your server
cd /var/www/
git clone https://github.com/yourusername/your-repo.git abletools-website
```

## ⚙️ Configuration After Upload

### 1. Create Environment File
Create `.env` file in your project root:
```bash
NODE_ENV=production
DATABASE_URL=mysql://your_db_user:your_db_password@localhost:3306/your_db_name
PORT=5000
SESSION_SECRET=your_very_secure_random_string_here
```

### Example:
```bash
NODE_ENV=production
DATABASE_URL=mysql://abletools_user:SecurePass123@localhost:3306/abletools
PORT=5000
SESSION_SECRET=k8h3j9m2n4v7x1z5q6w8e0r3t5y7u9i1o2p4a6s8d0f2g4h6j8k0l2m4n6
```

### 2. Install Dependencies
```bash
cd /var/www/abletools-website
npm install
```

### 3. Build the Application
```bash
npm run build
```

## 🔐 Admin Access
After deployment, access your admin panel at:
- **URL:** `https://your-domain.com/admin/login`
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Change these credentials immediately after first login!

## 📋 Quick Checklist
- [ ] Downloaded all source code files
- [ ] Created MySQL database and user
- [ ] Noted database credentials (name, username, password)
- [ ] Uploaded files to server maintaining folder structure
- [ ] Created .env file with correct database credentials
- [ ] Installed Node.js dependencies (`npm install`)
- [ ] Built the application (`npm run build`)
- [ ] Started the application (see deployment-guide.md)
- [ ] Tested admin login
- [ ] Changed default admin password

## 🆘 Need Help?
Refer to the complete `deployment-guide.md` for detailed server setup instructions including:
- Node.js installation
- PM2 process management
- Nginx configuration
- SSL certificate setup
- Security configuration

Your website includes:
✅ Complete CMS system
✅ Admin dashboard
✅ Product management
✅ Multilingual support (English/Greek)
✅ MySQL database
✅ Responsive design
✅ All original AbleTools content and styling