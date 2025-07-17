const bcrypt = require('bcryptjs');

// Admin authentication middleware
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const storage = req.app.locals.storage;
    const user = await storage.getUser(req.session.userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

function registerAdminRoutes(app) {
  const storage = app.locals.storage;

  // Admin login
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.role !== 'admin' || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid admin credentials' });
      }

      req.session.userId = user.id;
      res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Admin logout
  app.post('/api/admin/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  });

  // Dashboard stats
  app.get('/api/admin/stats', requireAdmin, async (req, res) => {
    try {
      const [users, products, seminars, enquiries] = await Promise.all([
        storage.getUsers?.() || [],
        storage.getProducts(),
        storage.getSeminars(),
        storage.getEnquiries()
      ]);

      res.json({
        users: users.length,
        products: products.length,
        seminars: seminars.length,
        enquiries: enquiries.length
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // Recent activities
  app.get('/api/admin/recent-activities', requireAdmin, async (req, res) => {
    try {
      const enquiries = await storage.getEnquiries();
      const activities = enquiries.slice(0, 10).map(e => ({
        type: 'enquiry',
        message: `New enquiry: ${e.subject}`,
        timestamp: e.created_at
      }));

      res.json(activities);
    } catch (error) {
      console.error('Activities error:', error);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  // Users management
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const users = await storage.getUsers?.() || [];
      res.json(users);
    } catch (error) {
      console.error('Users error:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // Products management
  app.get('/api/admin/products', requireAdmin, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Products error:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.post('/api/admin/products', requireAdmin, async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.json(product);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  // Categories management
  app.get('/api/admin/categories', requireAdmin, async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Categories error:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  app.post('/api/admin/categories', requireAdmin, async (req, res) => {
    try {
      const category = await storage.createCategory(req.body);
      res.json(category);
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  });

  // Seminars management
  app.get('/api/admin/seminars', requireAdmin, async (req, res) => {
    try {
      const seminars = await storage.getSeminars();
      res.json(seminars);
    } catch (error) {
      console.error('Seminars error:', error);
      res.status(500).json({ error: 'Failed to fetch seminars' });
    }
  });

  app.post('/api/admin/seminars', requireAdmin, async (req, res) => {
    try {
      const seminar = await storage.createSeminar(req.body);
      res.json(seminar);
    } catch (error) {
      console.error('Create seminar error:', error);
      res.status(500).json({ error: 'Failed to create seminar' });
    }
  });

  // Events management
  app.get('/api/admin/events', requireAdmin, async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error('Events error:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

  app.post('/api/admin/events', requireAdmin, async (req, res) => {
    try {
      const event = await storage.createEvent(req.body);
      res.json(event);
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

  // Achievements management
  app.get('/api/admin/achievements', requireAdmin, async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Achievements error:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  app.post('/api/admin/achievements', requireAdmin, async (req, res) => {
    try {
      const achievement = await storage.createAchievement(req.body);
      res.json(achievement);
    } catch (error) {
      console.error('Create achievement error:', error);
      res.status(500).json({ error: 'Failed to create achievement' });
    }
  });

  // Banners management
  app.get('/api/admin/banners', requireAdmin, async (req, res) => {
    try {
      const banners = await storage.getActiveBanners();
      res.json(banners);
    } catch (error) {
      console.error('Banners error:', error);
      res.status(500).json({ error: 'Failed to fetch banners' });
    }
  });

  app.post('/api/admin/banners', requireAdmin, async (req, res) => {
    try {
      const banner = await storage.createBanner(req.body);
      res.json(banner);
    } catch (error) {
      console.error('Create banner error:', error);
      res.status(500).json({ error: 'Failed to create banner' });
    }
  });

  // Catalogue categories management
  app.get('/api/admin/catalogue-categories', requireAdmin, async (req, res) => {
    try {
      const categories = await storage.getCatalogueCategories();
      res.json(categories);
    } catch (error) {
      console.error('Catalogue categories error:', error);
      res.status(500).json({ error: 'Failed to fetch catalogue categories' });
    }
  });

  app.post('/api/admin/catalogue-categories', requireAdmin, async (req, res) => {
    try {
      const category = await storage.createCatalogueCategory(req.body);
      res.json(category);
    } catch (error) {
      console.error('Create catalogue category error:', error);
      res.status(500).json({ error: 'Failed to create catalogue category' });
    }
  });

  // Brochures management
  app.get('/api/admin/brochures', requireAdmin, async (req, res) => {
    try {
      const brochures = await storage.getBrochures();
      res.json(brochures);
    } catch (error) {
      console.error('Brochures error:', error);
      res.status(500).json({ error: 'Failed to fetch brochures' });
    }
  });

  app.post('/api/admin/brochures', requireAdmin, async (req, res) => {
    try {
      const brochure = await storage.createBrochure(req.body);
      res.json(brochure);
    } catch (error) {
      console.error('Create brochure error:', error);
      res.status(500).json({ error: 'Failed to create brochure' });
    }
  });

  // Enquiries management
  app.get('/api/admin/enquiries', requireAdmin, async (req, res) => {
    try {
      const enquiries = await storage.getEnquiries();
      res.json(enquiries);
    } catch (error) {
      console.error('Enquiries error:', error);
      res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
  });

  app.patch('/api/admin/enquiries/:id', requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      await storage.updateEnquiryStatus(parseInt(req.params.id), status);
      res.json({ success: true });
    } catch (error) {
      console.error('Update enquiry error:', error);
      res.status(500).json({ error: 'Failed to update enquiry' });
    }
  });
}

module.exports = { registerAdminRoutes };