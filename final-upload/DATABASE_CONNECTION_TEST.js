#!/usr/bin/env node

/**
 * Database Connection Test for AbleTools
 * Tests PostgreSQL connection with production credentials
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.production' });

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb';

console.log('🔍 Testing AbleTools Database Connection...');
console.log('📊 Database URL:', DATABASE_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: false, // Set to true if your host requires SSL
});

async function testConnection() {
  try {
    console.log('📡 Attempting to connect...');
    
    // Test basic connection
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    
    // Test PostgreSQL version
    const versionResult = await client.query('SELECT version()');
    console.log('📋 PostgreSQL Version:', versionResult.rows[0].version);
    
    // Test if database exists and is accessible
    const dbResult = await client.query('SELECT current_database()');
    console.log('🗄️ Current Database:', dbResult.rows[0].current_database);
    
    // Test user permissions
    const userResult = await client.query('SELECT current_user');
    console.log('👤 Current User:', userResult.rows[0].current_user);
    
    // Check if tables exist (they might not on first run)
    const tableResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tableResult.rows.length > 0) {
      console.log('📋 Existing Tables:', tableResult.rows.map(row => row.table_name).join(', '));
    } else {
      console.log('📋 No tables found (normal on first run - will be created automatically)');
    }
    
    client.release();
    console.log('🎉 Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('🔍 Error details:', error.message);
    
    // Provide specific troubleshooting advice
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Troubleshooting: PostgreSQL server is not running or not accessible');
      console.log('   - Check if PostgreSQL is installed and running');
      console.log('   - Verify the host and port are correct');
    } else if (error.code === '28P01') {
      console.log('💡 Troubleshooting: Authentication failed');
      console.log('   - Check username and password');
      console.log('   - Verify user exists and has proper permissions');
    } else if (error.code === '3D000') {
      console.log('💡 Troubleshooting: Database does not exist');
      console.log('   - Create the database: CREATE DATABASE abletoolscom_dbengrweb;');
      console.log('   - Grant permissions to user');
    } else if (error.message.includes('SSL')) {
      console.log('💡 Troubleshooting: SSL connection issue');
      console.log('   - Try adding ?sslmode=require to DATABASE_URL');
      console.log('   - Or set ssl: true in connection config');
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the test
testConnection();