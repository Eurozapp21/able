# MySQL Connection String Examples for AbleTools

## Basic Format
```
DATABASE_URL=mysql://username:password@hostname:port/database_name
```

## Common Hosting Scenarios

### 1. Shared Hosting (cPanel/Plesk)
```
DATABASE_URL=mysql://your_cpanel_user:your_password@localhost:3306/your_database_name
```

### 2. VPS/Dedicated Server
```
DATABASE_URL=mysql://abletools_user:secure_password@localhost:3306/abletools_db
```

### 3. Cloud Database (AWS RDS, Google Cloud SQL)
```
DATABASE_URL=mysql://admin:password@database-endpoint.region.rds.amazonaws.com:3306/abletools
```

### 4. Remote MySQL Server
```
DATABASE_URL=mysql://username:password@192.168.1.100:3306/abletools_production
```

## Real-World Examples

### HostGator/Bluehost Style
```
DATABASE_URL=mysql://username_abletools:MyPass123@localhost:3306/username_abletools_db
```

### GoDaddy Style
```
DATABASE_URL=mysql://username:password@hostname.secureserver.net:3306/database_name
```

### Namecheap Style
```
DATABASE_URL=mysql://username:password@server123.web-hosting.com:3306/username_database
```

## Security Best Practices

1. **Use Strong Passwords**: Mix of letters, numbers, and symbols
2. **Limit Database Permissions**: Only grant necessary privileges
3. **Use SSL**: Add `?ssl=true` to connection string if supported
4. **Regular Backups**: Set up automated database backups

## Connection String with SSL
```
DATABASE_URL=mysql://username:password@hostname:3306/database_name?ssl=true
```

## Troubleshooting Connection Issues

1. **Check Database Exists**: Verify database name in hosting control panel
2. **Verify User Permissions**: Ensure user has access to the database
3. **Test Connection**: Use phpMyAdmin or similar tool to test
4. **Check Firewall**: Ensure MySQL port (3306) is accessible
5. **Verify Hostname**: Some hosts use specific hostnames instead of localhost

## Setting Up Your Database

1. Log into your hosting control panel
2. Create a new MySQL database
3. Create a database user with password
4. Grant the user full permissions to the database
5. Note down the connection details
6. Update your .env file with the correct connection string

The AbleTools application will automatically create all required tables when it starts.