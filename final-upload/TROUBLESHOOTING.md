# AbleTools Deployment Troubleshooting Guide

## Common Errors and Solutions

### 1. "Cannot read properties of undefined (reading 'includes')"

**Problem:** DATABASE_URL environment variable is not set or .env file is missing.

**Solution:**
1. Ensure `.env` file exists in the root directory
2. Check that DATABASE_URL is properly set:
   ```
   DATABASE_URL=mysql://username:password@hostname:3306/database_name
   ```
3. Replace with your actual MySQL credentials

### 2. "DATABASE_URL environment variable is required"

**Problem:** Missing or empty DATABASE_URL.

**Solution:**
1. Create/edit `.env` file:
   ```bash
   nano .env
   ```
2. Add your MySQL connection string:
   ```
   DATABASE_URL=mysql://your_user:your_password@localhost:3306/your_database
   NODE_ENV=production
   SESSION_SECRET=your-secure-session-secret
   ```

### 3. MySQL Connection Errors

**Problem:** Can't connect to MySQL database.

**Solutions:**
- Verify MySQL service is running
- Check database credentials are correct
- Ensure database exists
- Test connection with mysql command line:
  ```bash
  mysql -u username -p -h hostname database_name
  ```

### 4. "Module not found" Errors

**Problem:** Missing Node.js dependencies.

**Solution:**
```bash
npm install
```

### 5. Permission Errors

**Problem:** File permission issues.

**Solution:**
```bash
chmod +x start.sh
chmod 755 server/
```

### 6. Port Already in Use

**Problem:** Port 3000 is already occupied.

**Solution:**
1. Change port in `.env`:
   ```
   PORT=3001
   ```
2. Or kill existing process:
   ```bash
   lsof -ti:3000 | xargs kill
   ```

## Quick Start Checklist

1. ✅ Extract deployment package
2. ✅ Create `.env` file with MySQL credentials  
3. ✅ Run `npm install`
4. ✅ Test database connection
5. ✅ Run `npm start`

## Getting Help

If you encounter other issues:
1. Check server logs for detailed error messages
2. Verify all environment variables are set
3. Test MySQL connection independently
4. Contact your hosting provider for server-specific issues