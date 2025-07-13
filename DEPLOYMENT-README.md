# 🚀 AbleTools Website - cPanel Deployment Package

## 📦 What's Included

This deployment package contains everything needed to deploy your AbleTools website to cPanel hosting:

### 📋 Documentation
- `deployment-guide.md` - Complete step-by-step deployment guide
- `quick-deployment-checklist.md` - 30-minute quick deployment checklist
- `DEPLOYMENT-README.md` - This overview file

### 🔧 Configuration Files
- `.env.production.template` - Environment variables template
- `package-production.json` - Production package.json
- `drizzle.config.production.ts` - Production database configuration
- `build-production.sh` - Automated build script

### 💾 Database & Backend
- `server/production.ts` - PostgreSQL production database adapter
- `shared/schema.ts` - Complete database schema for all tables
- Migration support via Drizzle ORM

### 🎨 Frontend & Assets
- Complete React application with all pages
- All uploaded company images and assets
- Responsive design for all devices
- Admin interface with multilingual support

## ⚡ Quick Start (30 minutes)

1. **Follow the Quick Checklist:**
   ```bash
   cat quick-deployment-checklist.md
   ```

2. **Build for Production:**
   ```bash
   ./build-production.sh
   ```

3. **Upload to cPanel and Configure Database**
   - Follow steps in `deployment-guide.md`

## 🔑 Admin Access

Once deployed, access the admin area at:
- URL: `https://yourdomain.com/admin`
- Username: `admin`
- Password: `admin123`

## 🌟 Features Included

### Public Website
- ✅ Homepage with company branding
- ✅ Products catalog with categories
- ✅ Educational seminars and training
- ✅ Solutions and services
- ✅ Company information and contact
- ✅ News and events
- ✅ Downloadable brochures catalog

### Admin System
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Category management (CRUD)
- ✅ Seminar/Event management (CRUD)
- ✅ User management (CRUD)
- ✅ Multilingual content support (English/Greek)

### Technical Features
- ✅ PostgreSQL database integration
- ✅ Session-based authentication
- ✅ Responsive design
- ✅ SEO optimized
- ✅ SSL ready
- ✅ Production optimized builds

## 📞 Support

If you encounter any issues during deployment:

1. **Check the troubleshooting section** in `deployment-guide.md`
2. **Verify all steps** in `quick-deployment-checklist.md`
3. **Contact your hosting provider** for server-specific issues

## 🔧 System Requirements

### Hosting Requirements
- cPanel hosting with Node.js support (version 18+)
- PostgreSQL database access
- SSL certificate support
- At least 1GB storage space
- Memory: 512MB+ recommended

### Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Your AbleTools website is ready for professional deployment! 🎉**