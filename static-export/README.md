# AbleTools - Static Website Export

This is a static HTML/CSS/JavaScript export of the AbleTools rehabilitation equipment management system, preserving the complete UI/UX experience.

## 🚀 What's Included

- **Complete Frontend**: React application compiled to static HTML/CSS/JavaScript
- **All Images**: Original company assets and product images in `attached_assets/` folder
- **Responsive Design**: Mobile, tablet, and desktop optimized layouts
- **AbleTools Branding**: Authentic yellow/green color scheme and professional styling
- **Static Data**: Pre-loaded product catalog, seminars, events, and company information

## 📁 File Structure

```
static-export/
├── index.html              # Main HTML file
├── data.js                 # Static data (products, categories, events, etc.)
├── assets/                 # Compiled CSS and JavaScript
│   ├── index-*.css        # Compiled Tailwind CSS styles
│   └── index-*.js         # Compiled React application
├── attached_assets/        # Company images and assets
│   ├── logos/
│   ├── products/
│   └── banners/
└── README.md              # This file
```

## 🌐 How to Use

### Option 1: Simple File Opening
1. Extract the zip file to any folder
2. Open `index.html` in any modern web browser
3. Navigate through all sections: Home, Products, Education, Solutions, etc.

### Option 2: Local Web Server (Recommended)
For best performance and to avoid CORS issues:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## ✨ Features Preserved

- **Homepage**: Hero banners, featured products, achievements, HUR video section
- **Products**: Category navigation, product listings, detailed product pages
- **Education**: Seminars and training courses with registration information
- **Solutions**: Sensory rooms, multi-sensory solutions, consultation services
- **About Us**: Company information, vision, team expertise
- **Contact**: Contact forms, location maps, department information
- **Newsroom**: Company news and announcements
- **Catalogue**: Downloadable brochures and product catalogs

## 🎨 Design Elements

- **Colors**: AbleTools yellow (#ffeb3b) and professional gray palette
- **Typography**: Modern, accessible font choices
- **Images**: All authentic company and product photography
- **Icons**: Lucide React icons throughout the interface
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Works perfectly on all device sizes

## 🔧 Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom AbleTools theming
- **Components**: shadcn/ui component library
- **Icons**: Lucide React icon library
- **Build**: Vite production build (optimized and minified)

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS/Android)

## 🚀 Deployment Options

### GitHub Pages
1. Create a new repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Create account at netlify.com
2. Drag and drop the entire folder to Netlify
3. Your site will be automatically deployed

### Traditional Web Hosting
1. Upload all files to your web server's public folder
2. Ensure file permissions are set correctly
3. Access via your domain name

## 📞 Support

For questions about the AbleTools system or technical support:

- **Email**: info@abletools.com.cy
- **Phone**: +357 22 123456
- **Website**: www.abletools.com.cy
- **Address**: Strovolos, Cyprus

## 📋 Notes

- This static export contains sample data for demonstration
- For live data integration, use the full Replit application
- All images are optimized for web delivery
- The design maintains 100% visual fidelity to the original application
- Contact forms will need backend integration for production use

---

**AbleTools Ltd** - "Your Ability to Dream!"