const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envVars = {};
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
  
  return envVars;
}

const envVars = loadEnvFile();
const PORT = envVars.PORT || 3002;

// MIME types for static files
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Sample API responses
const sampleData = {
  categories: [
    { id: 1, name: 'Wheelchairs & Mobility', slug: 'wheelchairs-mobility', description: 'Mobility solutions and wheelchairs' },
    { id: 2, name: 'Rehabilitation Equipment', slug: 'rehabilitation-equipment', description: 'Professional rehabilitation equipment' },
    { id: 3, name: 'Sensory Integration', slug: 'sensory-integration', description: 'Sensory integration tools and equipment' }
  ],
  products: [
    { id: 1, name: 'Premium Wheelchair', category_id: 1, price: 1500, description: 'High-quality mobility wheelchair' },
    { id: 2, name: 'Therapy Ball', category_id: 2, price: 50, description: 'Professional therapy ball for rehabilitation' },
    { id: 3, name: 'Sensory Kit', category_id: 3, price: 200, description: 'Complete sensory integration kit' }
  ],
  seminars: [
    { id: 1, title: 'Advanced Rehabilitation Techniques', date: '2025-08-15', description: 'Learn advanced rehabilitation methods' },
    { id: 2, title: 'Wheelchair Assessment', date: '2025-09-10', description: 'Professional wheelchair assessment training' }
  ]
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`${req.method} ${pathname}`);

  // API Routes
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');
    
    if (pathname === '/api/categories') {
      res.writeHead(200);
      res.end(JSON.stringify(sampleData.categories));
      return;
    }
    
    if (pathname === '/api/products') {
      res.writeHead(200);
      res.end(JSON.stringify(sampleData.products));
      return;
    }
    
    if (pathname === '/api/seminars') {
      res.writeHead(200);
      res.end(JSON.stringify(sampleData.seminars));
      return;
    }
    
    // API endpoint not found
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // Static file serving
  let filePath;
  if (pathname === '/') {
    filePath = path.join(__dirname, 'client', 'index.html');
  } else if (pathname.startsWith('/assets/')) {
    filePath = path.join(__dirname, 'attached_assets', pathname.slice(8));
  } else {
    filePath = path.join(__dirname, 'client', pathname);
  }

  // Check if file exists
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // File not found - serve index.html for client-side routing
      if (pathname !== '/' && !pathname.startsWith('/api/')) {
        const indexPath = path.join(__dirname, 'client', 'index.html');
        fs.readFile(indexPath, (err, indexData) => {
          if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
          }
          res.setHeader('Content-Type', 'text/html');
          res.writeHead(200);
          res.end(indexData);
        });
        return;
      }
      
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    res.writeHead(200);
    res.end(data);
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Starting AbleTools server...');
  console.log(`✅ AbleTools server running on port ${PORT}`);
  console.log(`🌐 Access your application at: http://localhost:${PORT}`);
  console.log('📊 Database: Standalone mode (no external dependencies)');
  console.log('🎯 Ready for production deployment!');
});

// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${PORT} is busy, trying port ${PORT + 1}`);
    server.listen(PORT + 1, '0.0.0.0');
  } else {
    console.error('❌ Server error:', err);
  }
});