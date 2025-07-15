# ⚡ AbleTools Python - Quick cPanel Setup

## 🚀 5-Minute Deployment Guide

### Step 1: Upload Files (2 minutes)
1. **Login to cPanel** → File Manager
2. **Navigate** to `public_html/`
3. **Upload** `abletools-python-complete.tar.gz`
4. **Extract** the archive
5. **Delete** the tar.gz file

### Step 2: Create Python App (2 minutes)
1. **Find** "Python Selector" or "Python App" in cPanel
2. **Create Application** with these settings:
   ```
   Python Version: 3.11+
   App Root: /public_html/abletools
   Startup File: cpanel-startup.py
   Entry Point: main:app
   ```

### Step 3: Set Environment Variables (1 minute)
Add these in Python App settings:
```
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
SECRET_KEY=77e0c1e85f08d19d7e28b45e932676a5
DEBUG=False
PORT=8000
```

### Step 4: Install Dependencies & Start
```bash
# In cPanel Terminal or SSH:
cd ~/public_html/abletools
pip install -r requirements.txt
```

Click **"Start"** in Python App manager.

### Step 5: Test Your Site
- **Website:** `https://yourdomain.com/abletools/`
- **Admin:** `https://yourdomain.com/abletools/admin`
- **Login:** admin / admin123

## ✅ Done!
Your professional rehabilitation equipment website is now live on Python! 🎉

### 🆘 Need Help?
Check the full `CPANEL_DEPLOYMENT_GUIDE.md` for detailed troubleshooting.