#!/bin/bash

# AbleTools Production Deployment Script

echo "🚀 Starting AbleTools deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Create production environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/abletools

# Application Configuration
NODE_ENV=production
PORT=3000

# Security
SESSION_SECRET=your-secure-random-session-secret-here

# Email Configuration (Optional)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
EOF
    echo "⚠️  Please update the .env file with your actual database credentials and settings."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build the frontend
echo "🔨 Building frontend..."
npm run build

# Create production directories
echo "📁 Creating production directories..."
mkdir -p dist/server
mkdir -p dist/client
mkdir -p dist/shared
mkdir -p dist/attached_assets

# Copy built files
echo "📋 Copying built files..."
cp -r client/dist/* dist/client/
cp -r server/* dist/server/
cp -r shared/* dist/shared/
cp -r attached_assets/* dist/attached_assets/

# Create production package.json
echo "📄 Creating production package.json..."
cat > dist/package.json << EOF
{
  "name": "abletools-production",
  "version": "1.0.0",
  "description": "AbleTools Rehabilitation Equipment Management System",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js",
    "db:push": "drizzle-kit push:pg"
  },
  "dependencies": {
    "express": "^4.18.2",
    "drizzle-orm": "^0.29.0",
    "postgres": "^3.4.0",
    "mysql2": "^3.6.0",
    "bcryptjs": "^2.4.3",
    "express-session": "^1.17.3",
    "connect-pg-simple": "^9.0.1",
    "zod": "^3.22.4",
    "cors": "^2.8.5"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Copy environment file
cp .env dist/

# Create startup script
echo "🔧 Creating startup script..."
cat > dist/start.sh << 'EOF'
#!/bin/bash
echo "Starting AbleTools application..."
export NODE_ENV=production
node server/index.js
EOF
chmod +x dist/start.sh

# Create .htaccess for Apache servers
echo "🌐 Creating .htaccess file..."
cat > dist/.htaccess << 'EOF'
# AbleTools Apache Configuration

RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Compression
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

# Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOF

# Create deployment README
echo "📖 Creating deployment README..."
cat > dist/DEPLOYMENT_README.md << 'EOF'
# AbleTools Deployment Package

## Quick Start

1. Upload all files to your web server
2. Update the .env file with your database credentials
3. Install dependencies: `npm install`
4. Run the application: `npm start`

## Files Included

- `server/` - Backend application
- `client/` - Frontend build files
- `shared/` - Shared schemas and types
- `attached_assets/` - Media files
- `.env` - Environment configuration
- `package.json` - Dependencies and scripts
- `start.sh` - Startup script
- `.htaccess` - Apache configuration

## Database Setup

1. Create a PostgreSQL or MySQL database
2. Update DATABASE_URL in .env file
3. Run database migrations if needed

## Support

For technical support, contact your development team.
EOF

# Create deployment archive
echo "📦 Creating deployment archive..."
cd dist
tar -czf ../abletools-deployment.tar.gz *
cd ..

echo "✅ Deployment package created successfully!"
echo "📁 Files are in the 'dist' directory"
echo "📦 Deployment archive: abletools-deployment.tar.gz"
echo ""
echo "Next steps:"
echo "1. Upload the deployment archive to your shared hosting server"
echo "2. Extract the files in your web directory"
echo "3. Update the .env file with your database credentials"
echo "4. Run 'npm install' to install dependencies"
echo "5. Start the application with 'npm start' or use your hosting provider's Node.js manager"
echo ""
echo "🎉 Deployment preparation complete!"