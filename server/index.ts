import express from "express";
import session from "express-session";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Add CORS headers for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Serve attached assets
app.use('/attached_assets', express.static('attached_assets'));

// API routes
app.use('/api', routes);

// Serve static files
const publicPath = path.join(__dirname, '../dist/public');
app.use(express.static(publicPath));

// Handle React routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});