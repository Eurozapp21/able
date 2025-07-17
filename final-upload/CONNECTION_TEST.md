# Database Connection Testing

## Your Connection Details
- **Username:** abletoolscom_newtools
- **Database:** abletoolscom_newtools  
- **Password:** #qMmmOu;Rw{p@8lF
- **Host:** localhost
- **Port:** 3306

## URL-Encoded Connection String
The password contains special characters that need URL encoding:
- `#` becomes `%23`
- `;` becomes `%3B`  
- `{` becomes `%7B`
- `}` becomes `%7D`
- `@` becomes `%40`

## Test Connection Manually
Try connecting with mysql command line:
```bash
mysql -u abletoolscom_newtools -p -h localhost abletoolscom_newtools
```

## Alternative Connection String Formats
If the encoded version doesn't work, try:

1. **Standard format:**
   ```
   DATABASE_URL=mysql://abletoolscom_newtools:PASSWORD@localhost:3306/abletoolscom_newtools
   ```

2. **With explicit host:**
   ```
   DATABASE_URL=mysql://abletoolscom_newtools:PASSWORD@127.0.0.1:3306/abletoolscom_newtools
   ```

3. **Check your hosting provider's format** - some use different hostnames like:
   - `mysql.yourdomain.com`
   - `localhost.yourdomain.com`
   - Your server's IP address

## Troubleshooting
1. Verify the database exists in your hosting control panel
2. Check if MySQL service is running
3. Confirm user has proper permissions
4. Test with a simple password without special characters (temporarily)