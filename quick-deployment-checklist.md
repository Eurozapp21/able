# AbleTools cPanel Deployment - Quick Checklist

## ✅ Phase 1: Database Setup (5 minutes)

1. **cPanel → PostgreSQL Databases**
   - Create database: `your_username_abletools`
   - Create user: `your_username_admin` 
   - Assign ALL PRIVILEGES
   - Note: host, port, database name, username, password

## ✅ Phase 2: Environment Configuration (2 minutes)

Edit `.env.production` file:
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/dbname
SESSION_SECRET=random_32_character_string_here
PORT=3000
```

## ✅ Phase 3: Build & Upload (10 minutes)

1. **Build locally:**
   ```bash
   ./build-production.sh
   ```

2. **Upload to cPanel:**
   - Via File Manager: Upload `production-files/*` to `public_html/`
   - Or via FTP: Upload entire `production-files/` content

## ✅ Phase 4: Node.js Setup (5 minutes)

1. **cPanel → Node.js Selector**
   - Create Application
   - Root: `/public_html/abletools`
   - Startup: `dist/server.js`
   - Version: Node 18+

2. **Environment Variables in Node.js App:**
   ```
   NODE_ENV=production
   DATABASE_URL=your_connection_string
   SESSION_SECRET=your_secret
   ```

3. **Install Dependencies:**
   - Click "Run NPM Install" in cPanel

## ✅ Phase 5: Database Migration (2 minutes)

**Terminal/SSH:**
```bash
cd public_html/abletools
npm run db:push
```

## ✅ Phase 6: Start Application (1 minute)

**cPanel → Node.js Selector:**
- Click "Start" button
- Verify status shows "Running"

## ✅ Phase 7: SSL & Testing (5 minutes)

1. **SSL Certificate:**
   - cPanel → SSL/TLS → Let's Encrypt
   - Generate for your domain

2. **Test Website:**
   - Visit: `https://yourdomain.com`
   - Admin: `https://yourdomain.com/admin` (admin/admin123)

## 🚨 Common Issues & Solutions

**Database Connection Error:**
- Check DATABASE_URL format exactly
- Verify PostgreSQL service running
- Confirm user has database privileges

**Application Won't Start:**
- Check Node.js version (18+ required)
- Verify all files uploaded correctly
- Check application logs in cPanel

**Images Not Loading:**
- Ensure `attached_assets/` folder uploaded
- Check file permissions (644 for files, 755 for folders)

**Admin Login Failed:**
- Database not migrated - run `npm run db:push`
- Check logs for database connection errors

## 📞 Need Help?

1. Check cPanel error logs
2. Verify all steps completed
3. Contact your hosting provider for server-specific issues

**Total Deployment Time: ~30 minutes**