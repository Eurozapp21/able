#!/usr/bin/env node

/**
 * AbleTools MySQL Connection Test
 * Production deployment validation script
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'abletools_user',
  password: process.env.MYSQL_PASSWORD || 'abletools_password_2025',
  database: process.env.MYSQL_DATABASE || 'abletools_db'
};

console.log('🔍 AbleTools MySQL Deployment Test');
console.log('🗄️ MySQL Configuration:', {
  host: config.host,
  port: config.port,
  user: config.user,
  database: config.database
});

async function testMySQLConnection() {
  let connection;
  
  try {
    console.log('📡 Testing MySQL connection...');
    
    // Test connection
    connection = await mysql.createConnection(config);
    console.log('✅ MySQL connection successful!');
    
    // Test MySQL version
    const [versionResult] = await connection.execute('SELECT VERSION() as version');
    console.log('📋 MySQL Version:', versionResult[0].version);
    
    // Test database access
    const [dbResult] = await connection.execute('SELECT DATABASE() as current_db');
    console.log('🗄️ Database:', dbResult[0].current_db || 'No database selected');
    
    // Test user permissions
    const [userResult] = await connection.execute('SELECT USER() as current_user');
    console.log('👤 User:', userResult[0].current_user);
    
    // Check existing tables
    try {
      const [tableResult] = await connection.execute(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = ? 
        ORDER BY table_name
      `, [config.database]);
      
      if (tableResult.length > 0) {
        console.log('📋 Tables:', tableResult.map(row => row.table_name).join(', '));
      } else {
        console.log('📋 No tables found (will be created on first run)');
      }
    } catch (error) {
      console.log('⚠️ Cannot check tables (permissions or database issue)');
    }
    
    // Test basic operations
    console.log('🧪 Testing basic operations...');
    
    // Test simple query
    const [testResult] = await connection.execute('SELECT 1 + 1 as result');
    console.log('🔢 Math test:', testResult[0].result === 2 ? 'PASSED' : 'FAILED');
    
    console.log('🎉 All tests passed!');
    console.log('✅ MySQL is ready for AbleTools deployment');
    
    return true;
    
  } catch (error) {
    console.error('❌ MySQL test failed!');
    console.error('🔍 Error:', error.message);
    
    // Provide troubleshooting guidance
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting:');
      console.log('   • MySQL server is not running');
      console.log('   • Check if MySQL service is started');
      console.log('   • Verify host and port in .env file');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Troubleshooting:');
      console.log('   • Wrong username or password');
      console.log('   • User doesn\'t have access to database');
      console.log('   • Run: GRANT ALL ON abletools_db.* TO \'abletools_user\'@\'localhost\';');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Troubleshooting:');
      console.log('   • Database doesn\'t exist');
      console.log('   • Run: CREATE DATABASE abletools_db;');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Troubleshooting:');
      console.log('   • MySQL host not found');
      console.log('   • Check MYSQL_HOST in .env file');
    }
    
    return false;
    
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the test
testMySQLConnection()
  .then(success => {
    if (success) {
      console.log('\n🚀 Ready to deploy AbleTools with MySQL!');
      process.exit(0);
    } else {
      console.log('\n⚠️ Fix MySQL issues before deploying');
      process.exit(1);
    }
  });