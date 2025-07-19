#!/usr/bin/env node

/**
 * AbleTools MySQL Production Server
 * Compiled for Node.js production deployment
 */

import express from 'express';
import session from 'express-session';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting AbleTools MySQL Server...');
console.log('📂 Current directory:', __dirname);

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist/public')));

// MySQL Configuration
const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'abletools_user',
  password: process.env.MYSQL_PASSWORD || 'abletools_password_2025',
  database: process.env.MYSQL_DATABASE || 'abletools_db'
};

console.log('🔗 MySQL Configuration:', {
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  user: mysqlConfig.user,
  database: mysqlConfig.database
});

// Create MySQL connection pool
const pool = mysql.createPool({
  ...mysqlConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  try {
    console.log('📡 Testing MySQL connection...');
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT 1 as test');
    connection.release();
    console.log('✅ MySQL connection successful!');
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

// Session configuration with MySQL
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(mysqlConfig);

app.use(session({
  key: 'abletools_session',
  secret: process.env.SESSION_SECRET || 'abletools_mysql_production_secret_2025_secure_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: false,
    httpOnly: true
  }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// Initialize database tables
async function initializeTables() {
  console.log('🗂️ Initializing MySQL tables...');
  const connection = await pool.getConnection();
  
  try {
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        address VARCHAR(255) NULL,
        phone VARCHAR(20) NULL,
        city VARCHAR(50) NULL,
        postcode VARCHAR(10) NULL,
        occupation VARCHAR(100) NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(500),
        icon VARCHAR(50),
        parentId INT NULL,
        image VARCHAR(255) NULL,
        FOREIGN KEY (parentId) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);

    // Create products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        categoryId INT NOT NULL,
        images JSON,
        isFeatured BOOLEAN DEFAULT FALSE,
        specifications TEXT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);

    // Create seminars table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS seminars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        content TEXT,
        date VARCHAR(50),
        time VARCHAR(50),
        duration VARCHAR(50),
        location VARCHAR(200),
        instructor VARCHAR(100),
        maxParticipants INT DEFAULT 50,
        currentParticipants INT DEFAULT 0,
        price DECIMAL(10, 2) DEFAULT 0,
        image VARCHAR(255) NULL,
        type ENUM('seminar', 'training') DEFAULT 'seminar',
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create other essential tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        content TEXT,
        date VARCHAR(50),
        location VARCHAR(200) NULL,
        image VARCHAR(255) NULL,
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT,
        status ENUM('open', 'in-progress', 'closed') DEFAULT 'open',
        productId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        date VARCHAR(50),
        image VARCHAR(255) NULL,
        isActive BOOLEAN DEFAULT TRUE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        subtitle VARCHAR(300) NULL,
        image VARCHAR(255) NOT NULL,
        link VARCHAR(500) NULL,
        isActive BOOLEAN DEFAULT TRUE,
        sortOrder INT DEFAULT 0
      )
    `);

    console.log('✅ MySQL tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing tables:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Create sample admin user
async function createAdminUser() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      ['admin']
    );
    
    if (rows.length === 0) {
      await pool.execute(
        'INSERT INTO users (username, email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?, ?)',
        ['admin', 'admin@abletools.com.cy', 'admin123', 'Admin', 'User', 'admin']
      );
      console.log('✅ Admin user created: admin/admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

// Basic API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', database: 'MySQL', timestamp: new Date().toISOString() });
});

app.get('/api/auth/me', (req, res) => {
  if (req.session?.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    const user = rows[0];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.user = { 
      id: user.id, 
      username: user.username, 
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName 
    };
    
    res.json({ success: true, user: req.session.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Sample API endpoints for testing
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY createdAt DESC');
    const products = rows.map(product => ({
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images || '[]') : product.images || []
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/seminars', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM seminars WHERE isActive = TRUE ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seminars' });
  }
});

// Static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Catch all handler for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start server
async function startServer() {
  try {
    // Test connection
    const connected = await testConnection();
    if (!connected) {
      console.log('⚠️ Starting server anyway - database issues can be resolved later');
    }
    
    // Initialize database
    if (connected) {
      await initializeTables();
      await createAdminUser();
    }
    
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '0.0.0.0';
    
    app.listen(PORT, HOST, () => {
      console.log('🎉 AbleTools MySQL Server Started Successfully!');
      console.log(`🌐 Server running on http://${HOST}:${PORT}`);
      console.log(`🔧 Admin panel: http://${HOST}:${PORT}/admin`);
      console.log(`🗄️ Database: MySQL at ${mysqlConfig.host}:${mysqlConfig.port}`);
      console.log('');
      console.log('📊 Login Credentials:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('');
      console.log('✅ Deployment successful!');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();