# Database Connection Troubleshooting

## Common Database Connection Issues

### Issue 1: Database Not Found
```
Error: database "abletoolscom_dbengrweb" does not exist
```

**Solution:**
1. **Create the database:**
   ```sql
   -- Connect as PostgreSQL superuser
   psql -U postgres
   
   -- Create the database
   CREATE DATABASE abletoolscom_dbengrweb;
   
   -- Create the user
   CREATE USER abletoolscom_dbengruser WITH PASSWORD 'dbengrpwd140725';
   
   -- Grant all privileges
   GRANT ALL PRIVILEGES ON DATABASE abletoolscom_dbengrweb TO abletoolscom_dbengruser;
   
   -- Grant schema permissions
   \c abletoolscom_dbengrweb
   GRANT ALL ON SCHEMA public TO abletoolscom_dbengruser;
   ```

### Issue 2: Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
1. **Check PostgreSQL service:**
   ```bash
   # Check if PostgreSQL is running
   systemctl status postgresql
   
   # Start PostgreSQL if not running
   systemctl start postgresql
   
   # Enable auto-start on boot
   systemctl enable postgresql
   ```

2. **Check PostgreSQL configuration:**
   ```bash
   # Check if PostgreSQL is listening on correct port
   netstat -nlp | grep :5432
   
   # Check PostgreSQL configuration
   sudo nano /etc/postgresql/*/main/postgresql.conf
   # Ensure: listen_addresses = '*'
   # Ensure: port = 5432
   ```

### Issue 3: Authentication Failed
```
Error: password authentication failed for user "abletoolscom_dbengruser"
```

**Solution:**
1. **Reset user password:**
   ```sql
   -- Connect as postgres superuser
   psql -U postgres
   
   -- Reset password
   ALTER USER abletoolscom_dbengruser WITH PASSWORD 'dbengrpwd140725';
   ```

2. **Check pg_hba.conf:**
   ```bash
   # Edit authentication config
   sudo nano /etc/postgresql/*/main/pg_hba.conf
   
   # Add or modify line:
   local   all             abletoolscom_dbengruser                md5
   host    all             abletoolscom_dbengruser   127.0.0.1/32   md5
   
   # Restart PostgreSQL
   systemctl restart postgresql
   ```

### Issue 4: SSL Connection Error
```
Error: no pg_hba.conf entry for host, SSL off
```

**Solution:**
1. **Update DATABASE_URL to include SSL:**
   ```bash
   # In .env.production
   DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb?sslmode=require
   ```

2. **Or disable SSL for local connections:**
   ```bash
   # In .env.production
   DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb?sslmode=disable
   ```

## Testing Database Connection

### Method 1: Using the built-in test script
```bash
# From your application directory
npm run test-db
```

### Method 2: Using psql directly
```bash
# Test connection with psql
psql -h localhost -U abletoolscom_dbengruser -d abletoolscom_dbengrweb

# If successful, you should see:
# psql (14.x)
# Type "help" for help.
# abletoolscom_dbengrweb=>
```

### Method 3: Using Node.js
```javascript
// Create test file: test-connection.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb'
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('Connection successful:', res.rows[0]);
  }
  pool.end();
});
```

## cPanel-Specific Issues

### Issue 1: cPanel Database Naming
In cPanel, databases are often prefixed with your username:
```
Database: yourusername_abletoolscom_dbengrweb
Username: yourusername_abletoolscom_dbengruser
```

**Solution:**
Update your DATABASE_URL in .env.production:
```
DATABASE_URL=postgresql://yourusername_abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/yourusername_abletoolscom_dbengrweb
```

### Issue 2: cPanel Remote PostgreSQL
Some cPanel hosts use remote PostgreSQL servers:
```
Host: your-postgres-server.com
Port: 5432 (or different port)
```

**Solution:**
Update DATABASE_URL with correct host:
```
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@your-postgres-server.com:5432/abletoolscom_dbengrweb
```

### Issue 3: cPanel SSL Requirements
Some hosts require SSL connections:

**Solution:**
```
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb?sslmode=require
```

## VPS/Dedicated Server Issues

### Issue 1: PostgreSQL Not Installed
```bash
# Install PostgreSQL on Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Install on CentOS/RHEL
sudo yum install postgresql postgresql-server
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Issue 2: Firewall Blocking Connection
```bash
# Ubuntu/Debian
sudo ufw allow 5432/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=5432/tcp
sudo firewall-cmd --reload
```

### Issue 3: PostgreSQL Configuration
```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/*/main/postgresql.conf

# Set:
listen_addresses = '*'
port = 5432

# Edit pg_hba.conf
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Add:
host    all             all             0.0.0.0/0               md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

## Quick Diagnostic Commands

### Check PostgreSQL Status
```bash
# Service status
systemctl status postgresql

# Check if running
ps aux | grep postgres

# Check port
netstat -nlp | grep :5432
```

### Check Database and User
```bash
# List databases
psql -U postgres -l

# List users
psql -U postgres -c "\du"

# Check permissions
psql -U postgres -c "\dp" abletoolscom_dbengrweb
```

### Check Application Logs
```bash
# Check Node.js application logs
tail -f /var/log/nodejs/abletools.log

# Check PostgreSQL logs
tail -f /var/log/postgresql/postgresql-*.log
```

## Environment Variables Checklist

Ensure these are set in your environment:
```bash
DATABASE_URL=postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
SESSION_SECRET=abletools_session_secret_key_2025
```

## Emergency Database Reset

If nothing works, create a fresh database:
```sql
-- Connect as postgres superuser
psql -U postgres

-- Drop existing database and user (if they exist)
DROP DATABASE IF EXISTS abletoolscom_dbengrweb;
DROP USER IF EXISTS abletoolscom_dbengruser;

-- Create fresh database and user
CREATE DATABASE abletoolscom_dbengrweb;
CREATE USER abletoolscom_dbengruser WITH PASSWORD 'dbengrpwd140725';
GRANT ALL PRIVILEGES ON DATABASE abletoolscom_dbengrweb TO abletoolscom_dbengruser;

-- Connect to database and grant schema permissions
\c abletoolscom_dbengrweb
GRANT ALL ON SCHEMA public TO abletoolscom_dbengruser;
GRANT ALL ON ALL TABLES IN SCHEMA public TO abletoolscom_dbengruser;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO abletoolscom_dbengruser;
```

After resolving database issues, your AbleTools application should start successfully!