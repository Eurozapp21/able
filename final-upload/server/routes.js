const express = require('express');
const bcrypt = require('bcryptjs');

async function registerRoutes(app) {
  const storage = app.locals.storage;

  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, email, password, first_name, last_name, phone, address, city, postcode, occupation } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const user = await storage.createUser({
        username,
        email,
        password,
        first_name,
        last_name,
        phone,
        address,
        city,
        postcode,
        occupation
      });

      req.session.userId = user.id;
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.userId = user.id;
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  });

  app.get('/api/auth/me', async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
    } catch (error) {
      console.error('Auth check error:', error);
      res.status(500).json({ error: 'Authentication check failed' });
    }
  });

  // Categories routes
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
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
      console.error('Error fetching category:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  });

  app.get('/api/categories/:id/subcategories', async (req, res) => {
    try {
      const subcategories = await storage.getCategoriesByParent(parseInt(req.params.id));
      res.json(subcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
  });

  // Products routes
  app.get('/api/products', async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let products;
      if (search) {
        products = await storage.searchProducts(search);
      } else if (category) {
        products = await storage.getProductsByCategory(parseInt(category));
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
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
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  app.get('/api/products/featured', async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      res.status(500).json({ error: 'Failed to fetch featured products' });
    }
  });

  // Seminars routes
  app.get('/api/seminars', async (req, res) => {
    try {
      const { type = 'seminar' } = req.query;
      const seminars = await storage.getSeminars();
      const filtered = seminars.filter(s => s.type === type);
      res.json(filtered);
    } catch (error) {
      console.error('Error fetching seminars:', error);
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
      console.error('Error fetching seminar:', error);
      res.status(500).json({ error: 'Failed to fetch seminar' });
    }
  });

  // Events routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
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
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  });

  // Achievements routes
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  // Banners routes
  app.get('/api/banners', async (req, res) => {
    try {
      const banners = await storage.getActiveBanners();
      res.json(banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
      res.status(500).json({ error: 'Failed to fetch banners' });
    }
  });

  // Catalogue routes
  app.get('/api/catalogue-categories', async (req, res) => {
    try {
      const categories = await storage.getCatalogueCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching catalogue categories:', error);
      res.status(500).json({ error: 'Failed to fetch catalogue categories' });
    }
  });

  app.get('/api/catalogue-categories/:slug', async (req, res) => {
    try {
      const category = await storage.getCatalogueCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error('Error fetching catalogue category:', error);
      res.status(500).json({ error: 'Failed to fetch catalogue category' });
    }
  });

  app.get('/api/catalogue-categories/:id/brochures', async (req, res) => {
    try {
      const brochures = await storage.getBrochuresByCategory(parseInt(req.params.id));
      res.json(brochures);
    } catch (error) {
      console.error('Error fetching brochures:', error);
      res.status(500).json({ error: 'Failed to fetch brochures' });
    }
  });

  app.post('/api/brochures/:id/download', async (req, res) => {
    try {
      await storage.incrementDownloadCount(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error incrementing download count:', error);
      res.status(500).json({ error: 'Failed to update download count' });
    }
  });

  // Enquiries routes
  app.post('/api/enquiries', async (req, res) => {
    try {
      const { name, email, phone, subject, message, product_id } = req.body;
      
      const enquiry = await storage.createEnquiry({
        user_id: req.session.userId || null,
        product_id: product_id || null,
        name,
        email,
        phone,
        subject,
        message
      });

      res.json(enquiry);
    } catch (error) {
      console.error('Error creating enquiry:', error);
      res.status(500).json({ error: 'Failed to create enquiry' });
    }
  });

  app.get('/api/enquiries', async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const enquiries = await storage.getEnquiriesByUser(req.session.userId);
      res.json(enquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
  });

  app.get('/api/enquiries/:id', async (req, res) => {
    try {
      const enquiry = await storage.getEnquiry(parseInt(req.params.id));
      if (!enquiry) {
        return res.status(404).json({ error: 'Enquiry not found' });
      }
      res.json(enquiry);
    } catch (error) {
      console.error('Error fetching enquiry:', error);
      res.status(500).json({ error: 'Failed to fetch enquiry' });
    }
  });

  app.get('/api/enquiries/:id/messages', async (req, res) => {
    try {
      const messages = await storage.getEnquiryMessages(parseInt(req.params.id));
      res.json(messages);
    } catch (error) {
      console.error('Error fetching enquiry messages:', error);
      res.status(500).json({ error: 'Failed to fetch enquiry messages' });
    }
  });

  app.post('/api/enquiries/:id/messages', async (req, res) => {
    try {
      const { message, sender_type, sender_name } = req.body;
      
      const enquiryMessage = await storage.createEnquiryMessage({
        enquiry_id: parseInt(req.params.id),
        sender_type,
        sender_name,
        message
      });

      res.json(enquiryMessage);
    } catch (error) {
      console.error('Error creating enquiry message:', error);
      res.status(500).json({ error: 'Failed to create enquiry message' });
    }
  });
}

module.exports = { registerRoutes };