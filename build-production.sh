#!/bin/bash

echo "Building AbleTools for Production..."

# Clean previous builds
rm -rf dist/
rm -rf production-files/

# Create production directory
mkdir -p production-files

# Build frontend
echo "Building frontend..."
npm run build:client

# Build server
echo "Building server..."
npm run build:server

# Copy built files
echo "Copying files..."
cp -r dist/ production-files/
cp package-production.json production-files/package.json
cp -r attached_assets/ production-files/
cp -r drizzle/ production-files/ 2>/dev/null || echo "No drizzle folder found"

# Copy environment template
cat > production-files/.env.production << 'EOF'
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database_name
SESSION_SECRET=your_very_long_random_session_secret_here_at_least_32_characters
PORT=3000
EOF

echo "Production build complete!"
echo "Files ready in production-files/ directory"
echo ""
echo "Next steps:"
echo "1. Update .env.production with your database credentials"
echo "2. Upload production-files/ contents to your cPanel hosting"
echo "3. Follow deployment-guide.md for complete setup"