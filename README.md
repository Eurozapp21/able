# AbleTools - Rehabilitation Equipment Management System

A comprehensive web application for rehabilitation equipment and educational resources, providing seamless access to medical solutions and professional development opportunities.

## Features

- **Product Catalog**: Browse wheelchairs, lifting systems, sensory integration tools
- **Educational Resources**: Professional seminars and training programs
- **News & Updates**: Latest industry news and company achievements
- **User Management**: Admin panel with role-based access control
- **Multi-language Support**: English and Greek language options
- **Responsive Design**: Mobile-friendly interface with modern UI components

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with role management
- **State Management**: TanStack Query (React Query)
- **Deployment**: PM2, Nginx, SSL/TLS support

## Quick Installation

### Automated Setup (Recommended)

```bash
# Clone the project
git clone <repository-url>
cd abletools

# Run automated setup script
./setup.sh
```

### Manual Installation

1. **Install Node.js 18+**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and settings
   ```
4. **Setup database**:
   ```bash
   npm run db:push
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## Environment Configuration

Create a `.env` file with the following settings:

```env
# Database (Neon PostgreSQL recommended)
DATABASE_URL=postgresql://username:password@host:5432/database

# Server Configuration
NODE_ENV=development
PORT=5000

# Security
SESSION_SECRET=your_long_random_secret_key

# Optional: Payment Integration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

## Development

```bash
# Start development server with hot reload
npm run dev

# Type checking
npm run check

# Database schema updates
npm run db:push

# Build for production
npm run build
```

## Production Deployment

### Option 1: Replit Reserved VM

1. Click "Deploy" in Replit workspace
2. Select "Reserved VM Deployments"
3. Configure machine and domain settings
4. Set build command: `npm install`
5. Set run command: `npm run dev`
6. Deploy and monitor

### Option 2: VPS Hosting

1. **Server Setup**:
   ```bash
   # Install Node.js, PM2, Nginx
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs nginx
   npm install -g pm2
   ```

2. **Deploy Application**:
   ```bash
   # Upload files to /var/www/abletools
   cd /var/www/abletools
   npm ci --production
   npm run build
   ```

3. **Configure PM2**:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx & SSL**:
   ```bash
   # Configure reverse proxy
   sudo nano /etc/nginx/sites-available/abletools
   
   # Install SSL certificate
   sudo certbot --nginx -d your-domain.com
   ```

## File Structure

```
abletools/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configurations
│   │   └── App.tsx         # Main application component
├── server/                 # Express.js backend
│   ├── routes.ts           # API routes
│   ├── index.ts            # Server entry point
│   └── storage.ts          # Database layer
├── shared/                 # Shared TypeScript schemas
│   └── schema.ts           # Database and validation schemas
├── attached_assets/        # Static images and files
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # TailwindCSS configuration
├── drizzle.config.ts      # Database ORM configuration
└── ecosystem.config.js    # PM2 process management
```

## API Endpoints

- `GET /api/products` - Product catalog
- `GET /api/categories` - Product categories
- `GET /api/seminars` - Training seminars
- `GET /api/events` - News and events
- `GET /api/achievements` - Company achievements
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Current user info

## Database Schema

- **users** - Authentication and user profiles
- **categories** - Hierarchical product categorization
- **products** - Product catalog with specifications
- **seminars** - Educational content and training
- **events** - News articles and announcements
- **achievements** - Company milestones and awards

## Support and Documentation

- **Installation Guide**: See `INSTALLATION.md` for detailed setup instructions
- **Development**: Built with modern web technologies and best practices
- **Security**: Session-based authentication with role-based access control
- **Performance**: Optimized with caching, lazy loading, and production builds

## License

MIT License - See LICENSE file for details

---

**AbleTools** - Empowering rehabilitation professionals with comprehensive equipment management and educational resources.