#!/usr/bin/env node

/**
 * AbleTools Production Server Startup
 * Node.js + Express + PostgreSQL
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import dotenv from 'dotenv';

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

try {
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