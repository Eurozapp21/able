# Database Setup Guide for AbleTools on Replit

## Overview
AbleTools uses PostgreSQL database with Drizzle ORM for type-safe database operations. Replit provides integrated PostgreSQL support.

## Step 1: Enable PostgreSQL on Replit

### Automatic Setup (Recommended)
1. **Open Your Replit Project**
2. **Navigate to Database Tab**:
   - Click "Database" in the left sidebar
   - Click "Enable PostgreSQL"
   - Replit automatically creates `DATABASE_URL` environment variable

### Manual Environment Setup
If you need to set up manually, add these environment variables in Replit:
```
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
SESSION_SECRET=your_random_session_secret_key_here
NODE_ENV=development
```

## Step 2: Database Schema

### Schema Definition
The database schema is defined in `shared/schema.ts` using Drizzle ORM:

```typescript
// Key tables for AbleTools business operations
- users          // Customer accounts and authentication
- categories     // Product category hierarchy
- products       // Equipment and product catalog
- seminars       // Educational seminars and training
- events         // News and company events
- enquiries      // Customer support tickets
- enquiry_messages // Support conversation threads
- achievements   // Company milestones and awards
- banners        // Homepage carousel content
- catalogue_categories // Brochure categories
- brochures      // Downloadable product brochures
```

### Database Types
All database operations are fully typed using:
- `InsertUser`, `User` - User management types
- `InsertProduct`, `Product` - Product catalog types
- `InsertSeminar`, `Seminar` - Educational content types
- And more for complete type safety

## Step 3: Initialize Database

### Push Schema to Database
```bash
# Install dependencies
npm install

# Push database schema (creates all tables)
npm run db:push
```

### Verify Database Connection
The application will automatically:
1. Connect to PostgreSQL using `DATABASE_URL`
2. Create all required tables
3. Set up proper relationships and constraints
4. Initialize with sample data if needed

## Step 4: Database Features

### Automatic Migrations
- Uses Drizzle Kit for schema management
- No manual SQL migrations needed
- Type-safe schema changes

### Sample Data Structure

#### Categories
```sql
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Wheelchairs & Mobility', 'wheelchairs-mobility', 'Mobility solutions', null),
('Rehabilitation Equipment', 'rehabilitation-equipment', 'Therapy equipment', null),
('Sensory Integration', 'sensory-integration', 'Sensory tools', null);
```

#### Products
```sql
INSERT INTO products (name, description, price, category_id, featured) VALUES
('Premium Wheelchair', 'High-quality mobility solution', 1500.00, 1, true),
('Therapy Equipment Set', 'Complete rehabilitation kit', 800.00, 2, true),
('Sensory Integration Kit', 'Multi-sensory development tools', 600.00, 3, false);
```

#### Seminars
```sql
INSERT INTO seminars (title, description, date, type, status) VALUES
('Advanced Rehabilitation Techniques', 'Professional development course', '2025-08-15', 'seminar', 'active'),
('Wheelchair Assessment Training', 'Certification program', '2025-09-10', 'training', 'active');
```

## Step 5: Database Access

### Development Access
- Replit provides database browser in the Database tab
- Run SQL queries directly in the interface
- View table data and relationships

### Programmatic Access
```typescript
// Example database queries using Drizzle ORM
import { db } from './server/database-config';
import { categories, products } from './shared/schema';

// Get all categories
const allCategories = await db.select().from(categories);

// Get featured products
const featuredProducts = await db.select()
  .from(products)
  .where(eq(products.featured, true));
```

## Step 6: Connection Testing

### Test Database Connection
```bash
# Start the development server
npm run dev

# The server will log database connection status:
# ✅ Database connected successfully
# 📊 All tables initialized
```

### API Endpoints for Testing
Once running, test these endpoints:
- `GET /api/categories` - List all product categories
- `GET /api/products` - List all products
- `GET /api/seminars` - List all seminars
- `GET /api/events` - List all events

## Step 7: Production Considerations

### Environment Variables
For production deployment:
```
DATABASE_URL=your_production_postgresql_url
SESSION_SECRET=secure_random_string_for_sessions
NODE_ENV=production
```

### Database Backup
- Replit automatically handles database backups
- For additional backup, export data via Database tab
- Consider setting up automated backups for production

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check if PostgreSQL is enabled
   # Verify DATABASE_URL environment variable
   # Restart the Replit if needed
   ```

2. **Schema Push Errors**
   ```bash
   # Clear and reinitialize
   npm run db:push
   ```

3. **Type Errors**
   ```bash
   # Regenerate types
   npm run check
   ```

### Database Browser
Use Replit's built-in database browser to:
- View table structure
- Query data directly
- Monitor database performance
- Check relationships and constraints

Your AbleTools database is now properly configured for full business operations on Replit!