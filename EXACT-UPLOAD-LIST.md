# 🎯 EXACT Files to Upload to cPanel

## ✅ Upload These 5 Items to Your cPanel

### 1. Built Application Files
**From the `dist/` folder:**
- `dist/index.js` → Upload this to your server
- `dist/public/` → Upload entire folder (contains website files)

### 2. Production Configuration  
**Copy and edit:**
- `package-production.json` → Rename to `package.json` and upload
- `.env.production.template` → Rename to `.env.production`, edit with your database details, then upload

### 3. Company Images
**From the project:**
- `attached_assets/` → Upload entire folder (contains all company images)

## 📂 Your cPanel Structure Should Look Like:

```
📁 public_html/abletools/
├── 📄 package.json
├── 📄 .env.production  
├── 📄 index.js
├── 📁 public/
│   ├── 📄 index.html
│   └── 📁 assets/
│       ├── 📄 index-[hash].css
│       └── 📄 index-[hash].js
└── 📁 attached_assets/
    ├── 📄 logo1_1751991035400.png
    ├── 📄 products_home_1751993768399.jpg
    └── ... (all other images)
```

## ⚡ 3-Step Upload Process

### Step 1: Upload Core Files
1. Login to cPanel → File Manager
2. Navigate to `public_html/`
3. Create folder: `abletools`
4. Upload these files to `public_html/abletools/`:
   - `dist/index.js`
   - `package-production.json` (rename to `package.json`)

### Step 2: Upload Website Files  
1. Upload the entire `dist/public/` folder
2. Your files should be at: `public_html/abletools/public/`

### Step 3: Upload Assets & Config
1. Upload entire `attached_assets/` folder
2. Edit `.env.production.template` with your database info
3. Rename to `.env.production` and upload

## 🔧 After Upload: cPanel Setup

1. **Node.js App Setup:**
   - Application Root: `/public_html/abletools`  
   - Startup File: `index.js`
   - Node Version: 18+

2. **Install Dependencies:**
   - Run "npm install" in cPanel

3. **Database Setup:**
   - Create PostgreSQL database
   - Update `.env.production` file
   - Run: `npm run db:push`

## 💾 Total Upload Size: ~20-30MB

**That's it! These are the ONLY files you need to upload.**