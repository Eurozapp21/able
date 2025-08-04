#!/bin/bash

# AbleTools - Quick Setup Script
# This script automates the installation process for AbleTools

set -e  # Exit on any error

echo "=================================="
echo "AbleTools Installation Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
else
    print_error "Unsupported operating system: $OSTYPE"
    exit 1
fi

print_status "Detected OS: $OS"

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js found: $NODE_VERSION"
    
    # Check if version is 18 or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        print_warning "Node.js version 18+ required. Current: $NODE_VERSION"
        INSTALL_NODE=true
    else
        INSTALL_NODE=false
    fi
else
    print_warning "Node.js not found"
    INSTALL_NODE=true
fi

# Install Node.js if needed
if [ "$INSTALL_NODE" = true ]; then
    print_status "Installing Node.js 18..."
    
    if [ "$OS" = "linux" ]; then
        # Ubuntu/Debian
        if command -v apt &> /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt install -y nodejs
        # CentOS/RHEL
        elif command -v yum &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo yum install -y nodejs
        else
            print_error "Unsupported Linux distribution"
            exit 1
        fi
    elif [ "$OS" = "macos" ]; then
        if command -v brew &> /dev/null; then
            brew install node@18
        else
            print_error "Homebrew not found. Please install from: https://nodejs.org/"
            exit 1
        fi
    fi
    
    print_status "Node.js installed successfully"
fi

# Verify Node.js installation
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_status "Node.js: $NODE_VERSION"
print_status "npm: $NPM_VERSION"

# Install global dependencies
print_status "Installing global dependencies..."
npm install -g typescript tsx drizzle-kit pm2

# Check if project dependencies are already installed
if [ ! -d "node_modules" ]; then
    print_status "Installing project dependencies..."
    npm install
else
    print_status "Project dependencies already installed"
fi

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating environment file..."
    cat > .env << EOF
# AbleTools Environment Configuration
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/abletools_dev

# Server Configuration
NODE_ENV=development
PORT=5000

# Session Configuration
SESSION_SECRET=your_very_long_random_secret_key_change_this_in_production

# Optional: External Services
# PAYPAL_CLIENT_ID=your_paypal_client_id
# PAYPAL_CLIENT_SECRET=your_paypal_client_secret
EOF

    print_warning "Environment file created. Please update DATABASE_URL and other settings in .env"
else
    print_status "Environment file already exists"
fi

# Check database connection
print_status "Checking database configuration..."
if grep -q "postgresql://username:password@localhost" .env; then
    print_warning "Please update DATABASE_URL in .env file with your actual database credentials"
    print_warning "For Neon serverless PostgreSQL, get your connection string from: https://neon.tech"
fi

# Database setup
read -p "Do you want to push the database schema now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Pushing database schema..."
    if npm run db:push; then
        print_status "Database schema created successfully"
    else
        print_error "Failed to create database schema. Please check your DATABASE_URL"
    fi
fi

# Production setup option
read -p "Is this a production installation? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Setting up production environment..."
    
    # Install Nginx (Linux only)
    if [ "$OS" = "linux" ]; then
        if command -v apt &> /dev/null; then
            sudo apt update
            sudo apt install -y nginx
        elif command -v yum &> /dev/null; then
            sudo yum install -y nginx
        fi
        
        print_status "Nginx installed. Please configure it manually using the guide in INSTALLATION.md"
    fi
    
    # Create production environment template
    if [ ! -f ".env.production" ]; then
        cat > .env.production << EOF
# AbleTools Production Environment
# Database Configuration (Use Neon for production)
DATABASE_URL=postgresql://prod_user:secure_password@your-neon-endpoint/abletools_prod

# Production Server Configuration
NODE_ENV=production
PORT=3000

# Security (Generate a secure random string)
SESSION_SECRET=generate_a_very_long_random_production_secret_minimum_64_characters

# Domain Configuration
REPLIT_DOMAINS=your-domain.com

# External Services
PAYPAL_CLIENT_ID=live_paypal_client_id
PAYPAL_CLIENT_SECRET=live_paypal_client_secret
EOF
        print_status "Production environment template created (.env.production)"
        print_warning "Please update all production settings in .env.production"
    fi
    
    # Create PM2 ecosystem file
    if [ ! -f "ecosystem.config.js" ]; then
        cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'abletools-production',
    script: 'server/index.ts',
    interpreter: 'node',
    interpreter_args: '--loader tsx',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF
        print_status "PM2 ecosystem file created"
    fi
    
    # Build application
    print_status "Building application for production..."
    if npm run build; then
        print_status "Application built successfully"
    else
        print_warning "Build failed. Please check for errors and try again"
    fi
    
    print_status "Production setup completed"
    echo ""
    echo "Next steps for production:"
    echo "1. Update .env.production with your actual database and domain settings"
    echo "2. Configure Nginx reverse proxy (see INSTALLATION.md)"
    echo "3. Set up SSL certificate with Let's Encrypt"
    echo "4. Start application with: pm2 start ecosystem.config.js"
    echo "5. Save PM2 configuration: pm2 save && pm2 startup"
fi

echo ""
echo "=================================="
print_status "Installation completed successfully!"
echo "=================================="
echo ""
echo "Quick start commands:"
echo "  Development: npm run dev"
echo "  Production:  pm2 start ecosystem.config.js"
echo ""
echo "Application will be available at:"
echo "  Development: http://localhost:5000"
echo "  Production:  http://your-domain.com"
echo ""
echo "For detailed configuration, see INSTALLATION.md"
echo ""

# Final check
if [ -f ".env" ] && [ -d "node_modules" ]; then
    print_status "All requirements satisfied. Ready to start!"
    
    read -p "Start development server now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Starting development server..."
        npm run dev
    fi
else
    print_warning "Some requirements missing. Please check the installation"
fi