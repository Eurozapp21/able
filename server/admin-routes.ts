import type { Express, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { storage } from './storage';

// Middleware to check admin authentication
const requireAdmin = async (req: Request, res: Response, next: any) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

export function registerAdminRoutes(app: Express) {
  // Admin authentication
  app.post('/api/admin/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.role !== 'admin') {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.userId = user.id;
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Admin logout
  app.post('/api/admin/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  // Admin stats
  app.get('/api/admin/stats', requireAdmin, async (req: Request, res: Response) => {
    try {
      // Get counts for dashboard
      const [users, products, categories, seminars, events, achievements, banners, brochures] = await Promise.all([
        storage.getUser(1).then(() => 1), // Simple count placeholder
        storage.getProducts(),
        storage.getCategories(),
        storage.getSeminars(),
        storage.getEvents(),
        storage.getAchievements(),
        storage.getActiveBanners(),
        storage.getBrochures(),
      ]);

      res.json({
        users: 1,
        products: products.length,
        categories: categories.length,
        seminars: seminars.length,
        events: events.length,
        achievements: achievements.length,
        banners: banners.length,
        brochures: brochures.length,
        downloads: 245 // Placeholder
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ error: 'Failed to get stats' });
    }
  });

  // Recent activities
  app.get('/api/admin/recent-activities', requireAdmin, async (req: Request, res: Response) => {
    try {
      // Mock recent activities for now
      const activities = [
        { action: 'Product "Wolturnus W5" updated', time: '2 hours ago' },
        { action: 'New seminar "Advanced Techniques" created', time: '1 day ago' },
        { action: 'Homepage banner updated', time: '2 days ago' },
        { action: 'Category "Lifting Systems" modified', time: '3 days ago' },
      ];
      
      res.json(activities);
    } catch (error) {
      console.error('Recent activities error:', error);
      res.status(500).json({ error: 'Failed to get recent activities' });
    }
  });

  // Users management
  app.get('/api/admin/users', requireAdmin, async (req: Request, res: Response) => {
    try {
      // For now, return current admin user
      const user = (req as any).user;
      const { password: _, ...safeUser } = user;
      res.json([safeUser]);
    } catch (error) {
      console.error('Users error:', error);
      res.status(500).json({ error: 'Failed to get users' });
    }
  });

  // Products management
  app.get('/api/admin/products', requireAdmin, async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Products error:', error);
      res.status(500).json({ error: 'Failed to get products' });
    }
  });

  app.post('/api/admin/products', requireAdmin, async (req: Request, res: Response) => {
    try {
      const product = await storage.createProduct(req.body);
      res.json(product);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  // Categories management
  app.get('/api/admin/categories', requireAdmin, async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Categories error:', error);
      res.status(500).json({ error: 'Failed to get categories' });
    }
  });

  app.post('/api/admin/categories', requireAdmin, async (req: Request, res: Response) => {
    try {
      const category = await storage.createCategory(req.body);
      res.json(category);
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  });

  // Seminars management
  app.get('/api/admin/seminars', requireAdmin, async (req: Request, res: Response) => {
    try {
      const seminars = await storage.getSeminars();
      res.json(seminars);
    } catch (error) {
      console.error('Seminars error:', error);
      res.status(500).json({ error: 'Failed to get seminars' });
    }
  });

  app.post('/api/admin/seminars', requireAdmin, async (req: Request, res: Response) => {
    try {
      const seminar = await storage.createSeminar(req.body);
      res.json(seminar);
    } catch (error) {
      console.error('Create seminar error:', error);
      res.status(500).json({ error: 'Failed to create seminar' });
    }
  });

  // Events management
  app.get('/api/admin/events', requireAdmin, async (req: Request, res: Response) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error('Events error:', error);
      res.status(500).json({ error: 'Failed to get events' });
    }
  });

  app.post('/api/admin/events', requireAdmin, async (req: Request, res: Response) => {
    try {
      const event = await storage.createEvent(req.body);
      res.json(event);
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

  // Achievements management
  app.get('/api/admin/achievements', requireAdmin, async (req: Request, res: Response) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Achievements error:', error);
      res.status(500).json({ error: 'Failed to get achievements' });
    }
  });

  app.post('/api/admin/achievements', requireAdmin, async (req: Request, res: Response) => {
    try {
      const achievement = await storage.createAchievement(req.body);
      res.json(achievement);
    } catch (error) {
      console.error('Create achievement error:', error);
      res.status(500).json({ error: 'Failed to create achievement' });
    }
  });

  // Banners management
  app.get('/api/admin/banners', requireAdmin, async (req: Request, res: Response) => {
    try {
      const banners = await storage.getActiveBanners();
      res.json(banners);
    } catch (error) {
      console.error('Banners error:', error);
      res.status(500).json({ error: 'Failed to get banners' });
    }
  });

  app.post('/api/admin/banners', requireAdmin, async (req: Request, res: Response) => {
    try {
      const banner = await storage.createBanner(req.body);
      res.json(banner);
    } catch (error) {
      console.error('Create banner error:', error);
      res.status(500).json({ error: 'Failed to create banner' });
    }
  });

  // Catalogue categories management
  app.get('/api/admin/catalogue-categories', requireAdmin, async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCatalogueCategories();
      res.json(categories);
    } catch (error) {
      console.error('Catalogue categories error:', error);
      res.status(500).json({ error: 'Failed to get catalogue categories' });
    }
  });

  app.post('/api/admin/catalogue-categories', requireAdmin, async (req: Request, res: Response) => {
    try {
      const category = await storage.createCatalogueCategory(req.body);
      res.json(category);
    } catch (error) {
      console.error('Create catalogue category error:', error);
      res.status(500).json({ error: 'Failed to create catalogue category' });
    }
  });

  // Brochures management
  app.get('/api/admin/brochures', requireAdmin, async (req: Request, res: Response) => {
    try {
      const brochures = await storage.getBrochures();
      res.json(brochures);
    } catch (error) {
      console.error('Brochures error:', error);
      res.status(500).json({ error: 'Failed to get brochures' });
    }
  });

  app.post('/api/admin/brochures', requireAdmin, async (req: Request, res: Response) => {
    try {
      const brochure = await storage.createBrochure(req.body);
      res.json(brochure);
    } catch (error) {
      console.error('Create brochure error:', error);
      res.status(500).json({ error: 'Failed to create brochure' });
    }
  });
}