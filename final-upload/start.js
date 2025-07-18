#!/usr/bin/env node

/**
 * AbleTools Production Server Startup
 * Node.js + Express + PostgreSQL
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import dotenv from 'dotenv';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.production') });

console.log('🚀 Starting AbleTools Production Server...');
console.log('📊 Database: PostgreSQL');
console.log('🌐 Framework: Node.js + Express');
console.log('🎨 Frontend: React');
console.log('🔐 Admin: admin/admin123');
console.log(`📍 Port: ${process.env.PORT || 5000}`);
console.log('');

// Set production environment
process.env.NODE_ENV = 'production';

// Test database connection first
async function testDatabaseConnection() {
  const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb';
  
  console.log('📡 Testing database connection...');
  console.log('🔗 Database URL:', DATABASE_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
  
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });
  
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version()');
    console.log('✅ Database connection successful!');
    console.log('📋 PostgreSQL Version:', result.rows[0].version.split(' ')[0] + ' ' + result.rows[0].version.split(' ')[1]);
    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('🔍 Error:', error.message);
    
    // Provide specific troubleshooting advice
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Troubleshooting: PostgreSQL server is not running or not accessible');
      console.log('   - Check if PostgreSQL is installed and running');
      console.log('   - Verify the host and port are correct');
    } else if (error.code === '28P01') {
      console.log('💡 Troubleshooting: Authentication failed');
      console.log('   - Check username and password in .env.production');
      console.log('   - Verify user exists and has proper permissions');
    } else if (error.code === '3D000') {
      console.log('💡 Troubleshooting: Database does not exist');
      console.log('   - Create the database: CREATE DATABASE abletoolscom_dbengrweb;');
      console.log('   - Grant permissions to user');
    }
    
    console.log('❌ Please fix database connection before starting server');
    console.log('📋 See DATABASE_SETUP.md for detailed instructions');
    process.exit(1);
  }
}

try {
  // Test database connection first
  await testDatabaseConnection();
  
  // Import and start the server
  const { default: app } = await import('./index.js');
  
  const port = process.env.PORT || 5000;
  const host = process.env.HOST || '0.0.0.0';
  
  app.listen(port, host, () => {
    console.log(`✅ AbleTools server running on http://${host}:${port}`);
    console.log(`🔧 Admin panel: http://${host}:${port}/admin`);
    console.log('🎉 Deployment successful!');
  });
  
} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}