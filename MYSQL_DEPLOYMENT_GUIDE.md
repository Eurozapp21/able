# 🚀 AbleTools MySQL Deployment Guide

## Complete MySQL Conversion & Deployment Instructions

Your AbleTools project has been successfully converted from PostgreSQL to MySQL with all functionality preserved.

### 📊 **MySQL Database Credentials**

**Development/Production Database:**
```
Host: localhost
Port: 3306
Database: abletools_db
Username: abletools_user
Password: abletools_password_2025
```

**Connection URL:**
```
mysql://abletools_user:abletools_password_2025@localhost:3306/abletools_db
```

### 🗄️ **Database Setup Instructions**

#### **Step 1: Install MySQL Server**

**On cPanel Hosting:**
- MySQL is usually pre-installed
- Create database through cPanel MySQL Database section

**On Ubuntu/Debian VPS:**
```bash
sudo apt update
sudo apt install mysql-server mysql-client
sudo mysql_secure_installation
```

**On CentOS/RHEL:**
```bash
sudo yum install mysql-server mysql
sudo systemctl start mysqld
sudo systemctl enable mysqld
sudo mysql_secure_installation
```

#### **Step 2: Create Database and User**

**Method 1: Through cPanel**
1. Go to MySQL Databases
2. Create database: `abletools_db`
3. Create user: `abletools_user` with password: `abletools_password_2025`
4. Add user to database with ALL PRIVILEGES

**Method 2: Through MySQL Command Line**
```sql
-- Connect as root user
mysql -u root -p

-- Create database
CREATE DATABASE abletools_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'abletools_user'@'localhost' IDENTIFIED BY 'abletools_password_2025';

-- Grant all privileges
GRANT ALL PRIVILEGES ON abletools_db.* TO 'abletools_user'@'localhost';

-- Reload privileges
FLUSH PRIVILEGES;

-- Exit
exit
```

### 🔧 **Application Setup**

#### **Step 3: Test MySQL Connection**
```bash
# Test your MySQL connection
npm run test-mysql

# or manually
node mysql-connection-test.js
```

#### **Step 4: Start MySQL Version**
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 📁 **File Structure Changes**

**New MySQL Files:**
```
abletools/
├── .env.mysql                    # MySQL environment config
├── mysql-connection-test.js      # Connection testing
├── package-mysql.json           # MySQL dependencies
├── shared/mysql-schema.ts        # MySQL data schemas
└── server/
    ├── mysql-storage.ts          # MySQL database operations
    ├── mysql-seeder.ts           # Sample data seeder
    └── mysql-index.ts            # MySQL server entry point
```

### 🚀 **Deployment Methods**

#### **Method 1: cPanel Hosting**

**Step 1: Upload Files**
1. Upload all project files to `public_html/abletools/`
2. Ensure `.env.mysql` is in the root directory

**Step 2: Create Node.js Application**
1. In cPanel, find "Node.js Selector" or "Node.js App"
2. Create application with these settings:
   ```
   Node.js Version: 18.x+
   Application Root: public_html/abletools
   Application URL: abletools
   Application Startup File: server/mysql-index.js
   ```

**Step 3: Set Environment Variables**
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=yourusername_abletools_db
MYSQL_USER=yourusername_abletools_user
MYSQL_PASSWORD=abletools_password_2025
NODE_ENV=production
PORT=5000
SESSION_SECRET=abletools_mysql_session_secret_key_2025
```

**Step 4: Install Dependencies and Start**
```bash
cd ~/public_html/abletools
cp package-mysql.json package.json
npm install --production
```
Start the application in cPanel Node.js manager.

#### **Method 2: VPS/Cloud Deployment**

**Step 1: Server Setup**
```bash
# Clone/upload your project
cd /var/www/abletools

# Setup MySQL version
cp package-mysql.json package.json
cp .env.mysql .env

# Install dependencies
npm install --production
```

**Step 2: Build and Start**
```bash
# Build the application
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start with PM2
pm2 start server/mysql-index.js --name abletools-mysql

# Save PM2 configuration
pm2 save
pm2 startup
```

**Step 3: Configure Nginx (Optional)**
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
}
```

### 🔍 **Verification Steps**

#### **Test Your MySQL Deployment**
1. **Website Access:** `https://yourdomain.com/abletools/`
2. **Admin Panel:** `https://yourdomain.com/abletools/admin`
3. **Login:** admin / admin123
4. **Database Connection:** Should show all sample data

#### **API Endpoints Test**
- `/api/products` - Product catalog
- `/api/categories` - Product categories
- `/api/seminars` - Educational seminars
- `/api/events` - News and events
- `/api/banners` - Homepage banners

### 🛠️ **Troubleshooting**

#### **Common MySQL Issues**

**Connection Refused:**
```bash
# Check MySQL status
sudo systemctl status mysql

# Start MySQL if stopped
sudo systemctl start mysql
```

**Access Denied:**
```sql
-- Reset user permissions
GRANT ALL PRIVILEGES ON abletools_db.* TO 'abletools_user'@'localhost';
FLUSH PRIVILEGES;
```

**Database Not Found:**
```sql
-- Create database if it doesn't exist
CREATE DATABASE abletools_db;
```

**cPanel Database Naming:**
Most cPanel hosts prefix databases and usernames:
```
Database: yourusername_abletools_db
Username: yourusername_abletools_user
```
Update your `.env.mysql` accordingly.

### 🎯 **Key Features Preserved**

✅ **Complete Admin System** - Full CRUD operations
✅ **User Authentication** - Session-based login
✅ **Product Management** - Categories, products, search
✅ **Content Management** - Seminars, events, news
✅ **File Uploads** - Company assets and images
✅ **Enquiry System** - Customer support tickets
✅ **Multilingual Support** - English/Greek content
✅ **Responsive Design** - Mobile-friendly interface

### 📊 **Database Schema**

**Tables Created Automatically:**
- `users` - User accounts and admin access
- `categories` - Product categories (hierarchical)
- `products` - Product catalog with images
- `seminars` - Educational seminars and training
- `events` - Company news and events
- `enquiries` - Customer support tickets
- `enquiry_messages` - Support conversations
- `achievements` - Company achievements
- `banners` - Homepage carousel
- `catalogue_categories` - Brochure categories
- `brochures` - Downloadable brochures
- `sessions` - User session storage

### 🌐 **Live Website URLs**
- **Main Site:** `https://yourdomain.com/abletools/`
- **Admin Panel:** `https://yourdomain.com/abletools/admin`
- **Products:** `https://yourdomain.com/abletools/products`
- **About Us:** `https://yourdomain.com/abletools/about`
- **Contact:** `https://yourdomain.com/abletools/contact`

### 👤 **Admin Access**
- **Username:** admin
- **Password:** admin123
- **Role:** Full administrative access

Your AbleTools website is now fully converted to MySQL and ready for deployment on any MySQL-compatible hosting provider!