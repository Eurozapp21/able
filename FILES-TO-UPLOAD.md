# 📁 Files to Upload to cPanel

## Required Files for cPanel Upload

You need to upload these **core files and folders** to your cPanel hosting:

### 1. 📦 Main Application Files
```
📁 Your cPanel public_html folder should contain:

├── 📄 package.json (rename from package-production.json)
├── 📄 .env.production (your database configuration)
├── 📁 dist/
│   ├── 📄 index.js (built server file)
│   └── 📁 assets/ (built frontend files)
├── 📁 attached_assets/ (all your company images)
├── 📁 drizzle/ (database migration files)
└── 📁 node_modules/ (will be created when you run npm install)
```

### 2. 🗂️ Essential Files List

**Copy these files from your project:**

1. **Server Files:**
   - `package-production.json` → rename to `package.json`
   - `dist/index.js` (built server)
   - `dist/assets/` folder (built frontend)

2. **Configuration:**
   - `.env.production.template` → rename to `.env.production` and edit

3. **Assets:**
   - `attached_assets/` folder (all images)

4. **Database:**
   - `drizzle/` folder (if exists)
   - `drizzle.config.production.ts`

### 3. 🔧 Quick Upload Steps

**Option A: File Manager (Recommended)**
1. Login to cPanel → File Manager
2. Go to `public_html/` 
3. Create folder: `abletools`
4. Upload all files above to `public_html/abletools/`

**Option B: FTP Upload**
1. Use FTP client (FileZilla, etc.)
2. Connect to your server
3. Upload to `/public_html/abletools/`

### 4. ⚠️ Don't Upload These
- `node_modules/` (will be installed on server)
- `.git/` folder
- Development files (`.ts`, `.tsx` source files)
- `client/src/` folder (already built into dist/)

### 5. 📋 After Upload Checklist
1. ✅ Edit `.env.production` with your database details
2. ✅ Setup Node.js app in cPanel pointing to `dist/index.js`
3. ✅ Run "npm install" in cPanel
4. ✅ Run database migration: `npm run db:push`
5. ✅ Start the application

## 🚀 Minimum Required Files

If you want the **absolute minimum**, upload these:

1. `package-production.json` (rename to package.json)
2. `dist/index.js` (your built server)
3. `dist/assets/` (your built frontend)
4. `attached_assets/` (company images)
5. `.env.production` (database config)

**Total Size: ~10-50MB** depending on images

---

**Need the built files?** Run `npm run build` in your project first to create the `dist/` folder.