🚀 AbleTools Production Files - Ready for cPanel Upload

📁 UPLOAD ALL FILES IN THIS FOLDER TO CPANEL:
1. index.js               - Main server application (80KB)
2. public/               - Website files folder (23MB)
3. attached_assets/      - Company images folder (21MB)
4. package.json          - Node.js dependencies
5. .env.production       - Environment configuration (database already configured)

🎯 CPANEL UPLOAD STEPS:
1. Login to cPanel → File Manager
2. Navigate to public_html/
3. Create folder: "abletools"
4. Upload ALL 5 items above to public_html/abletools/

🔧 CPANEL NODE.JS SETUP:
1. cPanel → Node.js Selector
2. Create Application:
   - App root: /public_html/abletools
   - App URL: abletools (or your preferred subdomain)
   - App startup file: index.js
   - Node.js version: 18+ or latest
3. Click "Create"
4. Click "Run NPM Install"
5. Click "Start App"

✅ YOUR WEBSITE WILL BE LIVE AT:
https://yourdomain.com/abletools

🔐 ADMIN ACCESS:
URL: https://yourdomain.com/abletools/admin
Username: admin
Password: admin123

📊 DATABASE:
Your PostgreSQL connection is already configured in .env.production:
- User: abletoolscom_dbengruser
- Database: abletoolscom_dbengrweb
- Password: dbengrpwd140725

Note: No client/ or server/ folders needed - everything is compiled!