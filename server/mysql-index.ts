import express from 'express';
import session from 'express-session';
import { MySQLStorage } from './mysql-storage';
import { seedMySQLData } from './mysql-seeder';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.mysql' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

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

// Initialize MySQL storage
const storage = new MySQLStorage(mysqlConfig);

// Session configuration for MySQL
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(mysqlConfig);

app.use(session({
  key: 'abletools_session',
  secret: process.env.SESSION_SECRET || 'abletools_mysql_session_secret_key_2025',
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
const requireAuth = (req: any, res: any, next: any) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

const requireAdmin = (req: any, res: any, next: any) => {
  if (req.session?.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// API Routes
app.get('/api/auth/me', (req: any, res) => {
  if (req.session?.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.post('/api/auth/login', async (req: any, res) => {
  try {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.json({ success: true, user: req.session.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (req: any, res) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Users routes
app.get('/api/users', requireAdmin, async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', requireAdmin, async (req, res) => {
  try {
    const user = await storage.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', requireAdmin, async (req, res) => {
  try {
    const user = await storage.updateUser(parseInt(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  try {
    await storage.deleteUser(parseInt(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Categories routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await storage.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await storage.getCategory(parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

app.post('/api/categories', requireAdmin, async (req, res) => {
  try {
    const category = await storage.createCategory(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.put('/api/categories/:id', requireAdmin, async (req, res) => {
  try {
    const category = await storage.updateCategory(parseInt(req.params.id), req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', requireAdmin, async (req, res) => {
  try {
    await storage.deleteCategory(parseInt(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Products routes
app.get('/api/products', async (req, res) => {
  try {
    const { search, category } = req.query;
    let products;
    
    if (search) {
      products = await storage.searchProducts(search as string);
    } else if (category) {
      products = await storage.getProductsByCategory(parseInt(category as string));
    } else {
      products = await storage.getProducts();
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await storage.getFeaturedProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await storage.getProduct(parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', requireAdmin, async (req, res) => {
  try {
    const product = await storage.createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const product = await storage.updateProduct(parseInt(req.params.id), req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    await storage.deleteProduct(parseInt(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Seminars routes
app.get('/api/seminars', async (req, res) => {
  try {
    const seminars = await storage.getSeminars();
    res.json(seminars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seminars' });
  }
});

app.get('/api/seminars/:id', async (req, res) => {
  try {
    const seminar = await storage.getSeminar(parseInt(req.params.id));
    if (!seminar) {
      return res.status(404).json({ error: 'Seminar not found' });
    }
    res.json(seminar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seminar' });
  }
});

app.post('/api/seminars', requireAdmin, async (req, res) => {
  try {
    const seminar = await storage.createSeminar(req.body);
    res.json(seminar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create seminar' });
  }
});

// Events routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await storage.getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await storage.getEvent(parseInt(req.params.id));
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Enquiries routes
app.get('/api/enquiries', requireAdmin, async (req, res) => {
  try {
    const enquiries = await storage.getEnquiries();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

app.post('/api/enquiries', async (req, res) => {
  try {
    const enquiry = await storage.createEnquiry(req.body);
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create enquiry' });
  }
});

// Achievements routes
app.get('/api/achievements', async (req, res) => {
  try {
    const achievements = await storage.getAchievements();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Banners routes
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await storage.getActiveBanners();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

// Catalogue routes
app.get('/api/catalogue/categories', async (req, res) => {
  try {
    const categories = await storage.getCatalogueCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch catalogue categories' });
  }
});

app.get('/api/brochures', async (req, res) => {
  try {
    const { category } = req.query;
    let brochures;
    
    if (category) {
      brochures = await storage.getBrochuresByCategory(parseInt(category as string));
    } else {
      brochures = await storage.getBrochures();
    }
    
    res.json(brochures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brochures' });
  }
});

// Serve static files
app.use('/attached_assets', express.static(path.join(__dirname, '../attached_assets')));

// Serve React app for all other routes
app.use(express.static(path.join(__dirname, '../dist/public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Initialize server
async function startServer() {
  try {
    // Seed database with initial data
    await seedMySQLData(storage);
    
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '0.0.0.0';
    
    app.listen(PORT, HOST, () => {
      console.log(`✅ AbleTools MySQL server running on http://${HOST}:${PORT}`);
      console.log(`🔧 Admin panel: http://${HOST}:${PORT}/admin`);
      console.log(`🗄️ Database: MySQL at ${mysqlConfig.host}:${mysqlConfig.port}`);
      console.log('🎉 Server started successfully!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;