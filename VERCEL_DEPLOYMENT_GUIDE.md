# Deploy Your React.js AbleTools Website to Vercel

## Step 1: Prepare Your Code for GitHub

### Download Your Complete Project
From this Replit project, download these folders and files:
- `client/` folder (React.js frontend)
- `server/` folder (Express.js backend)
- `shared/` folder (TypeScript schemas)
- `attached_assets/` folder (all images)
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `components.json`
- `drizzle.config.ts`

Keep the exact same folder structure on your computer.

## Step 2: Create GitHub Repository

### 2.1 Create GitHub Account
1. Go to **github.com**
2. **Sign up** for free account
3. **Verify your email**

### 2.2 Create Repository
1. **Click "New repository"**
2. **Repository name:** `abletools-website`
3. **Description:** `AbleTools Cyprus - Rehabilitation Equipment Website`
4. **Make it Public** (required for free deployment)
5. **Click "Create repository"**

### 2.3 Upload Your Code
GitHub will show you upload options:

**Option A: Upload via Web Interface**
1. **Click "uploading an existing file"**
2. **Drag and drop** all your folders and files
3. **Commit changes** with message "Initial upload"

**Option B: Use Git Commands (if you have Git installed)**
```bash
git clone https://github.com/yourusername/abletools-website.git
cd abletools-website
# Copy all your files here
git add .
git commit -m "Initial upload"
git push origin main
```

## Step 3: Deploy to Vercel

### 3.1 Create Vercel Account
1. Go to **vercel.com**
2. **Sign up with GitHub** (use same GitHub account)
3. **Authorize Vercel** to access your repositories

### 3.2 Import Your Project
1. **Click "New Project"**
2. **Find your `abletools-website` repository**
3. **Click "Import"**
4. **Framework Preset:** Vite (should auto-detect)
5. **Root Directory:** Leave as default
6. **Build Settings:** Leave as default
7. **Click "Deploy"**

Vercel will automatically:
- Build your React.js frontend
- Set up your Express.js backend
- Create deployment URL

## Step 4: Set Up Database

### 4.1 Add Vercel Postgres Database
1. **In your Vercel project dashboard**
2. **Go to "Storage" tab**
3. **Click "Create Database"**
4. **Select "Postgres"**
5. **Choose region** (closest to your users)
6. **Create database**

### 4.2 Get Database Connection String
Vercel will provide environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

## Step 5: Configure Environment Variables

### 5.1 Add Environment Variables
In Vercel dashboard:
1. **Go to "Settings" tab**
2. **Click "Environment Variables"**
3. **Add these variables:**

```
NODE_ENV=production
DATABASE_URL=[your_postgres_url_from_vercel]
SESSION_SECRET=your_secure_random_string_here_make_it_long_and_random
PORT=3000
```

### 5.2 Redeploy
1. **Go to "Deployments" tab**
2. **Click "Redeploy"** to apply environment variables

## Step 6: Update Database Configuration

### 6.1 Modify for PostgreSQL
Since Vercel uses PostgreSQL (not MySQL), update your code:

In `server/routes.ts`, change:
```javascript
// Replace MySQL storage with PostgreSQL
const storage = new PostgreSQLStorage(process.env.DATABASE_URL);
```

### 6.2 Database Schema
Your database will automatically create tables when the app starts.

## Step 7: Custom Domain Setup

### 7.1 Add Your Domain
1. **In Vercel dashboard**
2. **Go to "Settings" → "Domains"**
3. **Add your domain:** `www.abletools.com.cy`
4. **Follow DNS configuration** instructions

### 7.2 Update DNS Records
In your domain provider (where you bought the domain):
1. **Add CNAME record:**
   - Name: `www`
   - Value: `cname.vercel-dns.com`
2. **Add A record for root domain:**
   - Name: `@`
   - Value: `76.76.19.61` (Vercel's IP)

## Step 8: Admin Access

After deployment, your admin panel will be at:
- **URL:** `https://your-domain.com/admin/login`
- **Username:** `admin`
- **Password:** `admin123`

Change these credentials immediately after first login.

## Benefits You'll Get

✅ **Automatic HTTPS** - SSL certificate included
✅ **Global CDN** - Fast loading worldwide
✅ **Automatic deployments** - Update by pushing to GitHub
✅ **Zero server maintenance** - Vercel handles everything
✅ **Built-in database** - PostgreSQL included
✅ **Professional infrastructure** - 99.99% uptime
✅ **Free tier** - No monthly costs for your usage

## Troubleshooting

### Common Issues:
1. **Build fails:** Check package.json dependencies
2. **Database errors:** Verify environment variables
3. **404 errors:** Ensure proper routing configuration

### Get Help:
- **Vercel Discord:** Community support
- **Vercel Docs:** Comprehensive guides
- **GitHub Issues:** Report problems

## Cost Comparison

**Vercel Free Tier includes:**
- 100GB bandwidth/month
- 1000 serverless function invocations/hour
- PostgreSQL database
- Custom domains
- SSL certificates
- Global CDN

**Perfect for your AbleTools website!**

Your React.js application will work flawlessly on Vercel's modern infrastructure designed specifically for JavaScript frameworks.