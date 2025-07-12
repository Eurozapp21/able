# AbleTools Project Setup on Replit.com

## Project Overview
This is a comprehensive rehabilitation equipment management system built with Node.js, designed for AbleTools Ltd. The system includes product management, educational content, customer enquiries, and admin functionality.

## Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL (Neon Database on Replit)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and production builds

## Step 1: Project Configuration for Node.js

### 1.1 Verify Node.js Environment
The project is already configured for Node.js with these key files:
- `package.json` - Contains all dependencies and scripts
- `.replit` - Replit configuration file
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

### 1.2 Environment Variables Setup
Create or verify these environment variables in Replit:
```
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
NODE_ENV=development
```

## Step 2: File Structure Review and Cleanup

### 2.1 Current Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utilities and configurations
│   │   └── main.tsx       # Application entry point
│   └── index.html         # HTML template
├── server/                # Backend Express.js application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── admin-routes.ts   # Admin API routes
│   ├── storage.ts        # Database interface
│   └── database-config.ts # Database configuration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas and types
├── attached_assets/      # Company images and files
└── scripts/             # Deployment scripts
```

### 2.2 Files to Keep
All current files are relevant and properly structured for Node.js:
- All `.ts` and `.tsx` files are correctly configured
- Package.json contains proper Node.js dependencies
- Configuration files are properly set up

### 2.3 No Cleanup Required
The project structure follows Node.js best practices and requires no cleanup.

## Step 3: Project Restructuring (Already Optimized)

The project is already properly structured according to Node.js best practices:
- Clear separation between client and server code
- Shared types and schemas in dedicated folder
- Proper TypeScript configuration
- Modular component architecture
- RESTful API structure

## Step 4: Database Setup

### 4.1 PostgreSQL Database on Replit
Replit provides integrated PostgreSQL database support:

1. **Enable Database**:
   - Go to your Replit project
   - Click on "Database" in the left sidebar
   - Enable PostgreSQL database
   - Replit will automatically create `DATABASE_URL` environment variable

2. **Database Schema**:
   The project uses Drizzle ORM with automatic schema management:
   ```bash
   npm run db:push
   ```

3. **Database Tables**:
   The system will automatically create these tables:
   - users (customer accounts)
   - categories (product categories)
   - products (equipment inventory)
   - seminars (educational events)
   - events (news and updates)
   - enquiries (customer support)
   - achievements (company milestones)
   - banners (homepage content)

### 4.2 Database Configuration
The database is configured in `server/database-config.ts` and uses environment variables for connection.

## Step 5: Deployment Instructions

### 5.1 Initial Setup
1. **Fork or Import Project**:
   - Import this project to Replit.com
   - Ensure Node.js environment is selected

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Enable PostgreSQL database in Replit
   - Verify `DATABASE_URL` is automatically set
   - Add `SESSION_SECRET` environment variable

### 5.2 Database Initialization
```bash
# Push database schema to PostgreSQL
npm run db:push

# Verify database connection
npm run start
```

### 5.3 Development Server
```bash
# Start development server (auto-reloads)
npm run dev
```

The application will be available at your Replit URL (typically `https://your-repl-name.your-username.repl.co`)

### 5.4 Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### 5.5 Replit Configuration
The `.replit` file is configured to:
- Run `npm run dev` for development
- Serve on port 3000 (automatically handled by Replit)
- Support hot reloading for development

## Step 6: Accessing Your Live Site

### 6.1 Development URL
- Your site will be available at: `https://your-repl-name.your-username.repl.co`
- Replit automatically handles HTTPS and domain routing

### 6.2 Custom Domain (Optional)
- Upgrade to Replit Pro for custom domain support
- Configure domain in Replit project settings

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Issues**:
   - Verify PostgreSQL is enabled in Replit
   - Check `DATABASE_URL` environment variable
   - Run `npm run db:push` to initialize schema

2. **Build Errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript errors with `npm run check`

3. **Port Issues**:
   - Replit automatically handles port assignment
   - No manual port configuration needed

## Additional Features

### Admin Interface
- Access admin panel at: `/admin`
- Default admin credentials can be set in the database

### API Endpoints
- REST API available at: `/api/*`
- Documentation available in the code comments

### Asset Management
- Company images stored in `attached_assets/`
- Accessible via `/assets/*` endpoints

## Support

For issues specific to this AbleTools project:
- Check the project documentation in `/docs`
- Review the database schema in `shared/schema.ts`
- Examine API routes in `server/routes.ts`

Your AbleTools rehabilitation equipment management system is now ready for deployment on Replit.com!