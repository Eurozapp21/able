const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const { MySQLStorage } = require('./mysql-storage');
const { registerRoutes } = require('./routes');
const { registerAdminRoutes } = require('./admin-routes');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || false 
    : true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

// Serve static assets
const assetsPath = path.join(__dirname, '../attached_assets');
console.log(`📁 Serving assets from: ${assetsPath}`);
app.use('/assets', express.static(assetsPath));

// Initialize storage and routes
async function startServer() {
  try {
    console.log('🚀 Starting AbleTools server...');
    console.log('📊 Connecting to database...');
    
    // Initialize MySQL storage
    const storage = new MySQLStorage(config.databaseUrl);
    await storage.connect();
    
    // Make storage available to routes
    app.locals.storage = storage;
    
    // Register routes
    await registerRoutes(app);
    registerAdminRoutes(app);
    
    // Serve frontend static files
    const clientPath = path.join(__dirname, '../client');
    console.log(`📁 Serving static files from: ${clientPath}`);
    
    // Serve static assets
    app.use(express.static(clientPath));
    
    // Handle React Router - send all non-API requests to index.html
    app.get('*', (req, res) => {
      // Skip API routes
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
      }
      
      const indexPath = path.join(clientPath, 'index.html');
      console.log(`📄 Serving index.html from: ${indexPath}`);
      res.sendFile(indexPath);
    });
    
    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
    
    // Find available port if current one is in use
    const findAvailablePort = (startPort) => {
      return new Promise((resolve) => {
        const server = app.listen(startPort, '0.0.0.0', () => {
          const port = server.address().port;
          server.close(() => resolve(port));
        });
        server.on('error', () => {
          findAvailablePort(startPort + 1).then(resolve);
        });
      });
    };

    const availablePort = await findAvailablePort(PORT);
    
    app.listen(availablePort, '0.0.0.0', () => {
      console.log(`✅ AbleTools server running on port ${availablePort}`);
      console.log(`🌐 Access your application at: http://localhost:${availablePort}`);
      console.log(`📊 Database: abletoolscom_ablenewcy connected successfully`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('📝 Please check:');
    console.error('   1. DATABASE_URL is set in .env file');
    console.error('   2. MySQL database is accessible');
    console.error('   3. Database credentials are correct');
    process.exit(1);
  }
}

startServer();