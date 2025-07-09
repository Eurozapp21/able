# Upload React.js Website to cPanel Shared Hosting

## Step 1: Prepare Static Build

Since cPanel shared hosting typically doesn't support Node.js, we'll create a static version of your React.js website that works on any hosting.

### 1.1 Download Project Files
From this Replit, download these folders to your computer:
- `client/` folder (complete)
- `attached_assets/` folder (all images)
- `package.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`

### 1.2 Install Dependencies Locally
On your computer, open terminal/command prompt in the project folder:
```bash
# Navigate to your project folder
cd path/to/your/abletools-project

# Install dependencies
npm install

# Build static version
npm run build
```

This creates a `dist` folder with all static files.

## Step 2: Modify for Static Hosting

### 2.1 Create Static Data Files
Create these data files in `client/src/data/`:

**products.json:**
```json
[
  {
    "id": 1,
    "name": "Bingo Evolution",
    "category": "Pediatric Equipment",
    "price": "Contact for pricing",
    "image": "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
    "description": "Advanced pediatric mobility solution with twin configuration for enhanced stability and support.",
    "specifications": "Weight capacity: 75kg, Adjustable height: 45-65cm",
    "features": ["Twin wheel design", "Adjustable support", "Safety brakes", "Ergonomic handles"]
  },
  {
    "id": 2,
    "name": "Mimos Pillow",
    "category": "Therapy Equipment",
    "price": "€125",
    "image": "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
    "description": "Specialized therapeutic pillow for head shape correction and pressure relief.",
    "specifications": "Size: 23x31cm, Material: Medical grade foam",
    "features": ["Pressure redistribution", "Breathable design", "Washable cover", "Clinical validation"]
  }
]
```

**seminars.json:**
```json
[
  {
    "id": 1,
    "title": "Advanced Rehabilitation Techniques",
    "date": "2025-08-15",
    "duration": "2 days",
    "location": "Nicosia, Cyprus",
    "price": "€450",
    "description": "Comprehensive training on modern rehabilitation methodologies and equipment usage.",
    "image": "/attached_assets/seminar_1752044011822.jpeg"
  },
  {
    "id": 2,
    "title": "HUR Spinal Cord Rehabilitation",
    "date": "2025-09-20",
    "duration": "3 days",
    "location": "Limassol, Cyprus",
    "price": "€650",
    "description": "Specialized training for spinal cord rehabilitation using HUR equipment.",
    "image": "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg"
  }
]
```

### 2.2 Update Components for Static Data
Replace API calls with static imports in your React components:

```typescript
// Instead of useQuery hooks, use:
import productsData from '../data/products.json'
import seminarsData from '../data/seminars.json'

// Use directly in components:
const products = productsData
const seminars = seminarsData
```

### 2.3 Configure Contact Forms
Use Formspree for contact forms (free service):

1. Go to formspree.io
2. Create free account
3. Create new form
4. Get form endpoint URL
5. Update contact form:

```typescript
// In contact form component
const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
}
```

## Step 3: Build Static Version

### 3.1 Update Vite Config
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './', // Important for relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './attached_assets')
    }
  }
})
```

### 3.2 Build Production Version
```bash
# Clean previous builds
rm -rf dist

# Build static version
npm run build

# Verify build
ls dist/
```

## Step 4: Upload to cPanel

### 4.1 Access cPanel File Manager
1. Login to your cPanel
2. Open "File Manager"
3. Navigate to `public_html` folder
4. Delete any existing files (backup first!)

### 4.2 Upload Built Files
**Option A: Upload ZIP File**
1. Compress entire `dist` folder contents (not the folder itself)
2. Upload ZIP to `public_html`
3. Extract ZIP in cPanel File Manager
4. Delete ZIP file

**Option B: Upload Individual Files**
1. Upload all files from `dist` folder to `public_html`
2. Upload `attached_assets` folder to `public_html/attached_assets`
3. Maintain exact folder structure

### 4.3 Verify File Structure
Your `public_html` should look like:
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── other assets
├── attached_assets/
│   ├── logo.png
│   ├── banner images
│   └── product images
└── .htaccess (create this)
```

## Step 5: Configure .htaccess

### 5.1 Create .htaccess File
In cPanel File Manager, create new file `.htaccess` in `public_html`:

```apache
# React Router Support
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle client-side routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  
  # Cache static assets
  <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
  </FilesMatch>
  
  # Security headers
  Header always set X-Frame-Options DENY
  Header always set X-Content-Type-Options nosniff
  
  # Compress files
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
  </IfModule>
</IfModule>

# Error pages
ErrorDocument 404 /index.html
```

## Step 6: Test Your Website

### 6.1 Check Website Functionality
Visit your domain and verify:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] All pages display properly
- [ ] Images show correctly
- [ ] Forms work (if using Formspree)
- [ ] Mobile responsive design
- [ ] No console errors

### 6.2 Test All Pages
- [ ] Home page
- [ ] About page
- [ ] Products catalog
- [ ] Solutions page
- [ ] Seminars/Education
- [ ] Newsroom
- [ ] Contact page

## Step 7: Domain and SSL Setup

### 7.1 Point Domain to Hosting
In your domain registrar:
1. Update nameservers to your hosting provider
2. Or add A record pointing to hosting IP
3. Add CNAME for www subdomain

### 7.2 Enable SSL Certificate
In cPanel:
1. Go to "SSL/TLS"
2. Enable "Let's Encrypt SSL"
3. Force HTTPS redirects

## Troubleshooting

### Common Issues:

**1. White screen/blank page:**
- Check browser console for errors
- Verify all files uploaded correctly
- Check .htaccess syntax

**2. Images not loading:**
- Verify attached_assets folder uploaded
- Check image file names match exactly
- Ensure proper file permissions (644)

**3. Navigation not working:**
- Verify .htaccess file exists
- Check mod_rewrite is enabled on server
- Contact hosting support if needed

**4. CSS/styling issues:**
- Clear browser cache
- Check if CSS files uploaded correctly
- Verify Tailwind CSS compiled properly

### Getting Help:
- Check cPanel error logs
- Contact hosting provider support
- Use browser developer tools
- Test on different devices/browsers

## Benefits of This Approach

✅ **Works on any cPanel hosting**
✅ **No Node.js required**
✅ **Fast loading times**
✅ **Professional React.js design**
✅ **Mobile responsive**
✅ **SEO friendly**
✅ **Free SSL certificate**
✅ **Low hosting costs**

Your React.js AbleTools website will work perfectly on cPanel shared hosting with this static build approach. You keep all the beautiful design and functionality while ensuring compatibility with standard web hosting.

## Maintenance

### Updating Content:
1. Edit JSON data files
2. Rebuild: `npm run build`
3. Upload new dist folder contents
4. Clear browser cache

### Adding New Pages:
1. Create React component
2. Add to router
3. Rebuild and upload
4. Update navigation

Your professional rehabilitation equipment website will be live and fully functional on your cPanel hosting!