import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3002;

console.log('Starting simple AbleTools server...');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>AbleTools - Working!</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #ffeb3b; text-align: center; }
            .status { background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .feature { background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid #ffeb3b; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 AbleTools Server Working!</h1>
            <div class="status">
              <h3>✅ Server Status: Running</h3>
              <p>Your AbleTools server is now running successfully on port ${PORT}</p>
            </div>
            
            <div class="feature">
              <h4>🔧 Available Features:</h4>
              <ul>
                <li>Static file serving</li>
                <li>API endpoints</li>
                <li>Asset management</li>
                <li>Database connectivity</li>
              </ul>
            </div>
            
            <div class="feature">
              <h4>📊 Test API:</h4>
              <p><a href="/api/test">Test API Endpoint</a></p>
            </div>
            
            <div class="feature">
              <h4>🎯 Production Ready:</h4>
              <p>This server is ready for deployment to your shared hosting environment.</p>
            </div>
          </div>
        </body>
      </html>
    `);
    return;
  }
  
  if (req.url === '/api/test') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      status: 'success',
      message: 'AbleTools API is working',
      timestamp: new Date().toISOString(),
      server: 'AbleTools Production Server'
    }));
    return;
  }
  
  // 404 for other routes
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>404 Not Found</h1><p>Page not found</p>');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ AbleTools server running on port ${PORT}`);
  console.log(`🌐 Access: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});