# Quick Deployment Guide

## 5-Minute cPanel Setup

### Step 1: Upload (2 minutes)
1. Login to cPanel → File Manager
2. Go to `public_html/` → Create `abletools` folder
3. Upload all package files to `/public_html/abletools/`

### Step 2: Create Node.js App (2 minutes)
1. Find "Node.js" in cPanel
2. Create Application:
   ```
   Version: 18.x+
   Root: public_html/abletools
   Startup: start.js
   ```

### Step 3: Configure (1 minute)
1. Set Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
   PORT=5000
   ```

2. Install dependencies:
   ```bash
   npm install --production
   ```

3. Start the app in cPanel

### Step 4: Access
- Website: `https://yourdomain.com/abletools/`
- Admin: `https://yourdomain.com/abletools/admin`
- Login: admin / admin123

## Done! 🎉

Your professional rehabilitation equipment website is live!