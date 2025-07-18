# Database Setup Instructions

## PostgreSQL Connection Configuration

### Current Database Credentials
```
Host: localhost
Database: abletoolscom_dbengrweb
Username: abletoolscom_dbengruser
Password: dbengrpwd140725
Port: 5432
```

### Database URL Format
```
postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
```

## Database Connection Test

### Method 1: Using psql command line
```bash
psql -h localhost -U abletoolscom_dbengruser -d abletoolscom_dbengrweb
# Enter password when prompted: dbengrpwd140725
```

### Method 2: Test connection from Node.js
```javascript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb',
  ssl: false // Set to true if your host requires SSL
});

// Test connection
pool.query('SELECT version()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0]);
  }
  pool.end();
});
```

## Database Schema Creation

The application will automatically create all necessary tables on first run. The tables include:

- `users` - User accounts and authentication
- `categories` - Product categories (hierarchical)
- `products` - Product catalog
- `seminars` - Educational seminars
- `events` - News and events
- `enquiries` - Customer support tickets
- `enquiry_messages` - Support conversation messages
- `achievements` - Company achievements
- `banners` - Homepage carousel banners
- `catalogue_categories` - Downloadable brochure categories
- `brochures` - Downloadable brochures
- `sessions` - User session storage

## Common Database Issues

### Issue 1: Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Verify PostgreSQL is running: `systemctl status postgresql`
- Check if database exists: `psql -l | grep abletoolscom_dbengrweb`
- Ensure user has proper permissions

### Issue 2: Authentication Failed
```
Error: password authentication failed for user "abletoolscom_dbengruser"
```
**Solution:**
- Verify username and password are correct
- Check pg_hba.conf for authentication settings
- Ensure user exists: `psql -c "\du" postgres`

### Issue 3: Database Does Not Exist
```
Error: database "abletoolscom_dbengrweb" does not exist
```
**Solution:**
```sql
-- Connect as superuser
psql -U postgres

-- Create database
CREATE DATABASE abletoolscom_dbengrweb;

-- Create user
CREATE USER abletoolscom_dbengruser WITH PASSWORD 'dbengrpwd140725';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE abletoolscom_dbengrweb TO abletoolscom_dbengruser;
```

### Issue 4: SSL Connection Required
```
Error: no pg_hba.conf entry for host, SSL off
```
**Solution:**
Update DATABASE_URL to include SSL:
```
postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb?sslmode=require
```

## Environment Variables

Ensure these environment variables are set in your hosting environment:

```bash
# Required
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
NODE_ENV=production

# Optional (with defaults)
PORT=5000
HOST=0.0.0.0
SESSION_SECRET=abletools_session_secret_key_2025
```

## Troubleshooting Commands

### Check Database Status
```bash
# PostgreSQL service status
systemctl status postgresql

# List databases
psql -U postgres -l

# Check user permissions
psql -U postgres -c "\du"
```

### Test Application Connection
```bash
# From application directory
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.query('SELECT NOW()', (err, res) => {
  console.log(err ? 'Error: ' + err : 'Success: ' + res.rows[0].now);
  pool.end();
});
"
```

Your database should now be properly configured for the AbleTools application.