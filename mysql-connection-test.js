#!/usr/bin/env node

/**
 * MySQL Connection Test for AbleTools
 * Tests MySQL connection with production credentials
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.mysql' });

const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'abletools_user',
  password: process.env.MYSQL_PASSWORD || 'abletools_password_2025',
  database: process.env.MYSQL_DATABASE || 'abletools_db'
};

console.log('🔍 Testing AbleTools MySQL Connection...');
console.log('🗄️ MySQL Configuration:', {
  host: config.host,
  port: config.port,
  user: config.user,
  database: config.database
});

async function testConnection() {
  let connection;
  
  try {
    console.log('📡 Attempting to connect to MySQL...');
    
    // Test basic connection
    connection = await mysql.createConnection(config);
    console.log('✅ MySQL connection successful!');
    
    // Test MySQL version
    const [versionResult] = await connection.execute('SELECT VERSION() as version');
    console.log('📋 MySQL Version:', versionResult[0].version);
    
    // Test if database exists and is accessible
    const [dbResult] = await connection.execute('SELECT DATABASE() as current_db');
    console.log('🗄️ Current Database:', dbResult[0].current_db);
    
    // Test user permissions
    const [userResult] = await connection.execute('SELECT USER() as current_user');
    console.log('👤 Current User:', userResult[0].current_user);
    
    // Check if tables exist (they might not on first run)
    const [tableResult] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ? 
      ORDER BY table_name
    `, [config.database]);
    
    if (tableResult.length > 0) {
      console.log('📋 Existing Tables:', tableResult.map(row => row.table_name).join(', '));
    } else {
      console.log('📋 No tables found (normal on first run - will be created automatically)');
    }
    
    console.log('🎉 MySQL connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MySQL connection failed!');
    console.error('🔍 Error details:', error.message);
    
    // Provide specific troubleshooting advice
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Troubleshooting: MySQL server is not running or not accessible');
      console.log('   - Check if MySQL is installed and running');
      console.log('   - Verify the host and port are correct');
      console.log('   - sudo systemctl start mysql (on Linux)');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Troubleshooting: Authentication failed');
      console.log('   - Check username and password in .env.mysql');
      console.log('   - Verify user exists and has proper permissions');
      console.log('   - GRANT ALL PRIVILEGES ON abletools_db.* TO \'abletools_user\'@\'localhost\';');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Troubleshooting: Database does not exist');
      console.log('   - Create the database: CREATE DATABASE abletools_db;');
      console.log('   - Grant permissions to user');
    } else if (error.code === 'ENOTFOUND') {
      console.log('💡 Troubleshooting: Host not found');
      console.log('   - Check if MySQL host is correct');
      console.log('   - For remote MySQL, ensure firewall allows connections');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the test
testConnection();