# 🚀 AbleTools MySQL Live Deployment Guide

## Complete Step-by-Step Instructions

### **Database Credentials**
```
Host: localhost
Port: 3306
Database: abletools_db  
Username: abletools_user
Password: abletools_password_2025
```

---

## **Option 1: cPanel Shared Hosting** (Most Common)

### **Step 1: Create MySQL Database**
1. **Log into cPanel**
2. **Find "MySQL Databases"**
3. **Create Database:**
   - Database Name: `abletools_db`
   - Click "Create Database"

4. **Create User:**
   - Username: `abletools_user`
   - Password: `abletools_password_2025`
   - Click "Create User"

5. **Add User to Database:**
   - Select user: `abletools_user`
   - Select database: `abletools_db`
   - Check "ALL PRIVILEGES"
   - Click "Make Changes"

### **Step 2: Upload Files**
1. **Extract files** to `public_html/abletools/`
2. **File structure should be:**
   ```
   public_html/abletools/
   ├── index.js
   ├── package.json
   ├── .env
   └── dist/
   ```

### **Step 3: Setup Node.js App**
1. **Find "Node.js Selector" in cPanel**
2. **Create App:**
   - Node.js Version: `18.x` or higher
   - Application Root: `public_html/abletools`
   - Application URL: `abletools`
   - Startup File: `index.js`

### **Step 4: Update Environment**
1. **Edit `.env` file** with your actual database details:
   ```bash
   # Update if your host uses prefixed names
   MYSQL_DATABASE=yourusername_abletools_db
   MYSQL_USER=yourusername_abletools_user
   MYSQL_PASSWORD=abletools_password_2025
   ```

### **Step 5: Install & Start**
1. **SSH or Terminal in cPanel:**
   ```bash
   cd ~/public_html/abletools
   npm install --production
   ```

2. **Start application** from Node.js Selector
3. **Test:** Visit `https://yourdomain.com/abletools/`

---

## **Option 2: VPS/Cloud Server** 

### **Step 1: Install MySQL**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server mysql-client

# CentOS/RHEL  
sudo yum install mysql-server mysql
```

### **Step 2: Create Database**
```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE abletools_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'abletools_user'@'localhost' IDENTIFIED BY 'abletools_password_2025';
GRANT ALL PRIVILEGES ON abletools_db.* TO 'abletools_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **Step 3: Deploy Application**
```bash
# Upload files to server
cd /var/www/abletools

# Install dependencies
npm install --production

# Test database connection
node mysql-test.js

# Start with PM2
sudo npm install -g pm2
pm2 start index.js --name abletools-mysql
pm2 save
pm2 startup
```

### **Step 4: Setup Nginx (Optional)**
```bash
sudo nano /etc/nginx/sites-available/abletools
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location /abletools {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/abletools /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## **Testing Your Deployment**

### **Step 1: Test Database Connection**
```bash
node mysql-test.js
```

**Expected output:**
```
✅ MySQL connection successful!
📋 MySQL Version: 8.0.x
🗄️ Database: abletools_db
👤 User: abletools_user@localhost
🎉 All tests passed!
```

### **Step 2: Test Website**
1. **Homepage:** `https://yourdomain.com/abletools/`
2. **Admin Login:** `https://yourdomain.com/abletools/admin`
   - Username: `admin`
   - Password: `admin123`

### **Step 3: Verify Features**
- ✅ Product catalog loads
- ✅ Seminars page works  
- ✅ Admin panel accessible
- ✅ Categories display
- ✅ Contact form submits

---

## **Troubleshooting Common Issues**

### **Issue: Database Connection Failed**
```bash
# Check MySQL is running
sudo systemctl status mysql

# Start MySQL if stopped
sudo systemctl start mysql

# Check database exists
mysql -u abletools_user -p
USE abletools_db;
SHOW TABLES;
```

### **Issue: Access Denied**
```sql
-- Reset user permissions
GRANT ALL PRIVILEGES ON abletools_db.* TO 'abletools_user'@'localhost';
FLUSH PRIVILEGES;
```

### **Issue: App Won't Start**
```bash
# Check Node.js version
node --version

# Check port availability
netstat -nlp | grep :5000

# Check application logs
pm2 logs abletools-mysql
```

### **Issue: cPanel Database Names**
Most cPanel hosts prefix database names:
```bash
# Update .env with actual names
MYSQL_DATABASE=cpanelusername_abletools_db
MYSQL_USER=cpanelusername_abletools_user
```

---

## **Post-Deployment Checklist**

### **Security**
- [ ] Change admin password from default
- [ ] Update SESSION_SECRET in .env
- [ ] Enable MySQL SSL if available
- [ ] Set up firewall rules

### **Performance**
- [ ] Enable MySQL query cache
- [ ] Configure connection pooling
- [ ] Set up log rotation
- [ ] Monitor resource usage

### **Backup**
- [ ] Setup MySQL backups
- [ ] Schedule regular database dumps
- [ ] Test backup restoration
- [ ] Document recovery procedures

---

## **Success Indicators**

✅ **Website loads at:** `https://yourdomain.com/abletools/`  
✅ **Admin panel accessible:** `https://yourdomain.com/abletools/admin`  
✅ **Database connection:** `node mysql-test.js` passes  
✅ **API endpoints:** `/api/products`, `/api/categories` return data  
✅ **User login:** admin/admin123 works  
✅ **All pages load:** Products, About, Contact, Education  

---

## **Support Commands**

```bash
# Check application status
pm2 status

# View application logs  
pm2 logs abletools-mysql

# Restart application
pm2 restart abletools-mysql

# Check database tables
mysql -u abletools_user -p -D abletools_db -e "SHOW TABLES;"

# Test API endpoints
curl http://localhost:5000/api/health
```

Your AbleTools MySQL application is now deployed and ready for production use!