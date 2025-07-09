# Shared Hosting Deployment Checklist

## Pre-Deployment Checklist

### ✅ Hosting Requirements
- [ ] Node.js 18+ support confirmed with hosting provider
- [ ] Database access (PostgreSQL or MySQL) available
- [ ] SSH access available (recommended)
- [ ] At least 512MB RAM allocated
- [ ] SSL certificate available

### ✅ Application Preparation
- [ ] Run deployment script: `./scripts/deploy.sh`
- [ ] Update `.env` file with production database credentials
- [ ] Test application locally with production database
- [ ] Verify all attached assets are included
- [ ] Check file permissions are correct

### ✅ Database Setup
- [ ] Create production database through hosting control panel
- [ ] Note database connection details:
  - Host: ________________
  - Port: ________________
  - Database name: ________________
  - Username: ________________
  - Password: ________________
- [ ] Test database connection
- [ ] Run database migrations if needed

## Deployment Steps

### Step 1: Upload Files
- [ ] Upload `abletools-deployment.tar.gz` to your hosting account
- [ ] Extract files to your web directory (public_html or subdirectory)
- [ ] Verify all files are uploaded correctly

### Step 2: Configuration
- [ ] Update `.env` file with your actual database credentials:
  ```env
  DATABASE_URL=postgresql://username:password@host:port/database
  NODE_ENV=production
  PORT=3000
  SESSION_SECRET=your-secure-session-secret
  ```
- [ ] Set correct file permissions (755 for directories, 644 for files)
- [ ] Configure Node.js application in hosting control panel

### Step 3: Dependencies
- [ ] Install Node.js dependencies: `npm install`
- [ ] Verify all packages installed correctly
- [ ] Check for any installation errors

### Step 4: Database Migration
- [ ] Run database setup: `npm run db:push`
- [ ] Verify database tables are created
- [ ] Check if seed data is populated

### Step 5: Start Application
- [ ] Start the Node.js application: `npm start`
- [ ] Check application logs for errors
- [ ] Verify application is running on correct port

## Post-Deployment Verification

### ✅ Website Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Product pages display properly
- [ ] Search functionality works
- [ ] Contact forms submit successfully
- [ ] User registration/login works
- [ ] Admin panel accessible (if applicable)

### ✅ API Endpoints
- [ ] `/api/banners` returns data
- [ ] `/api/products` returns data
- [ ] `/api/categories` returns data
- [ ] `/api/seminars` returns data
- [ ] `/api/events` returns data
- [ ] `/api/achievements` returns data

### ✅ Security
- [ ] HTTPS is enforced
- [ ] Security headers are set
- [ ] Database credentials are not exposed
- [ ] Session management works correctly

### ✅ Performance
- [ ] Page load times are acceptable
- [ ] Images load quickly
- [ ] Database queries are optimized
- [ ] Caching headers are set

## Troubleshooting Common Issues

### Database Connection Issues
```bash
# Check database connection
npm run db:test

# Common solutions:
# 1. Verify DATABASE_URL format
# 2. Check database server is running
# 3. Ensure firewall allows connections
# 4. Verify database user permissions
```

### Node.js Application Issues
```bash
# Check application logs
npm run logs

# Common solutions:
# 1. Verify Node.js version compatibility
# 2. Check all dependencies are installed
# 3. Ensure correct file permissions
# 4. Verify port configuration
```

### Frontend Issues
```bash
# Check if build files exist
ls -la client/dist/

# Common solutions:
# 1. Rebuild frontend: npm run build
# 2. Check .htaccess configuration
# 3. Verify static file serving
```

## Support Contacts

### Hosting Provider Support
- Check your hosting provider's documentation for Node.js apps
- Contact support if you encounter Node.js specific issues
- Ask about database connection limits and configuration

### Development Team
- Technical issues: [Your development team contact]
- Database problems: [Database administrator contact]
- Deployment questions: [DevOps team contact]

## Maintenance Schedule

### Daily
- [ ] Check application logs for errors
- [ ] Monitor database performance
- [ ] Verify website is accessible

### Weekly
- [ ] Review security logs
- [ ] Check for software updates
- [ ] Backup database

### Monthly
- [ ] Update Node.js dependencies
- [ ] Review performance metrics
- [ ] Check SSL certificate expiration

---

**Important Notes:**
- Always test changes in a staging environment first
- Keep backups of your database and application files
- Monitor server resources to prevent overload
- Document any custom configurations for future reference

**Emergency Contacts:**
- Hosting Provider: [Your hosting provider's emergency contact]
- Domain Registrar: [Your domain registrar's contact]
- Development Team: [Emergency development contact]