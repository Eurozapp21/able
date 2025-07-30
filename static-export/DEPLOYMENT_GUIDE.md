# AbleTools Static Deployment Guide

## 🎯 Quick Start Options

### 1. GitHub Pages (Free Hosting)
```bash
# Create new repository on GitHub
# Upload all files from static-export folder
# Go to Settings > Pages
# Select "Deploy from a branch" > main branch
# Your site will be live at https://username.github.io/repo-name
```

### 2. Netlify Drop (Easiest)
1. Visit [netlify.com](https://netlify.com)
2. Drag the entire `static-export` folder to Netlify Drop
3. Get instant live URL

### 3. Local Testing
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 🔧 File Structure Requirements

Keep this exact structure when deploying:
```
/
├── index.html
├── data.js
├── assets/
│   ├── index-*.css
│   └── index-*.js
├── attached_assets/
│   └── [all image files]
└── README.md
```

## ⚠️ Important Notes

- **Relative Paths**: All paths are relative (./assets/) for maximum compatibility
- **No Backend**: This is purely frontend - contact forms need backend integration
- **HTTPS Recommended**: Some features work best with HTTPS (use production hosting)
- **Image Optimization**: All images are included for full visual fidelity

## 🌐 Production Hosting Options

### Traditional Web Hosting (cPanel/FTP)
1. Download FTP client (FileZilla)
2. Upload all files to `public_html/` or `www/`
3. Set file permissions to 644 for files, 755 for folders

### Cloud Hosting
- **Vercel**: Import from GitHub repository
- **Surge.sh**: `npm install -g surge && surge`
- **Firebase Hosting**: Follow Firebase console setup

## 📱 Mobile Optimization

- Responsive design works on all devices
- Touch-friendly navigation
- Optimized images for mobile networks
- AbleTools yellow branding preserved

## ✅ Quality Assurance Checklist

- [ ] Homepage loads with hero banner
- [ ] Product categories display with images
- [ ] Navigation menu works on mobile
- [ ] All images load correctly
- [ ] AbleTools yellow branding visible
- [ ] Contact information displays
- [ ] Footer links work properly

Your static AbleTools website is ready for deployment!