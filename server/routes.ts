import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertEnquirySchema, insertEnquiryMessageSchema,
  insertProductSchema, insertCategorySchema, insertSeminarSchema, insertEventSchema,
  insertUserPreferencesSchema, preferenceSchema
} from "@shared/schema";
import { z } from "zod";

// Session type extensions handled inline with type assertions

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // Admin middleware
  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    req.user = user;
    next();
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      const user = await storage.createUser(userData);
      
      req.session.userId = user.id;
      req.session.username = user.username;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Public routes
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getActiveBanners();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const { parentId } = req.query;
      
      let categories;
      if (parentId !== undefined) {
        const pid = parentId === 'null' ? null : parseInt(parentId as string);
        categories = await storage.getCategoriesByParent(pid);
      } else {
        // Return all categories when no parentId is specified
        categories = await storage.getCategories();
      }
      
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getCategory(id);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, featured, search } = req.query;

      
      let products;
      
      if (search) {
        products = await storage.searchProducts(search as string);
      } else if (categoryId) {
        products = await storage.getProductsByCategory(parseInt(categoryId as string));
      } else if (featured === 'true') {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/seminars", async (req, res) => {
    try {
      const { upcoming, type } = req.query;
      
      let seminars;
      if (upcoming === 'true') {
        seminars = await storage.getUpcomingSeminars();
      } else {
        seminars = await storage.getSeminars();
      }
      
      // Filter by type if specified
      if (type) {
        seminars = seminars.filter(seminar => seminar.type === type);
      }
      
      res.json(seminars);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seminars" });
    }
  });

  app.get("/api/seminars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const seminar = await storage.getSeminar(id);
      
      if (!seminar) {
        return res.status(404).json({ error: "Seminar not found" });
      }
      
      res.json(seminar);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seminar" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const { recent } = req.query;
      
      let events;
      if (recent === 'true') {
        events = await storage.getRecentEvents();
      } else {
        events = await storage.getEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  // Protected routes
  app.get("/api/enquiries", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      const enquiries = await storage.getEnquiriesByUser(userId);
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enquiries" });
    }
  });

  app.get("/api/enquiries/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.session.userId;
      
      const enquiry = await storage.getEnquiry(id);
      
      if (!enquiry) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      
      if (enquiry.userId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const messages = await storage.getEnquiryMessages(id);
      
      res.json({ enquiry, messages });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enquiry" });
    }
  });

  app.post("/api/enquiries", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      const enquiryData = insertEnquirySchema.parse({
        ...req.body,
        userId
      });
      
      const enquiry = await storage.createEnquiry(enquiryData);
      res.json(enquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid enquiry data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create enquiry" });
    }
  });

  app.post("/api/enquiries/:id/messages", requireAuth, async (req, res) => {
    try {
      const enquiryId = parseInt(req.params.id);
      const userId = req.session.userId;
      
      // Verify enquiry belongs to user
      const enquiry = await storage.getEnquiry(enquiryId);
      if (!enquiry || enquiry.userId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const messageData = insertEnquiryMessageSchema.parse({
        enquiryId,
        senderId: userId,
        senderType: 'user',
        message: req.body.message
      });
      
      const message = await storage.createEnquiryMessage(messageData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid message data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, subject } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }
      
      // In a real application, you would send an email here
      console.log("Contact form submission:", { name, email, phone, message, subject });
      
      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email, consent } = req.body;
      
      if (!email || !consent) {
        return res.status(400).json({ error: "Email and consent are required" });
      }
      
      // In a real application, you would add to newsletter database
      console.log("Newsletter subscription:", { email, consent });
      
      res.json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  // Catalogue routes
  app.get("/api/catalogue/categories", async (req, res) => {
    try {
      const categories = await storage.getCatalogueCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch catalogue categories" });
    }
  });

  app.get("/api/catalogue/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCatalogueCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/catalogue/categories/:categoryId/brochures", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const brochures = await storage.getBrochuresByCategory(categoryId);
      res.json(brochures);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brochures" });
    }
  });

  app.post("/api/catalogue/brochures/:id/download", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const brochure = await storage.getBrochure(id);
      if (!brochure) {
        return res.status(404).json({ error: "Brochure not found" });
      }
      
      // Increment download count
      await storage.incrementDownloadCount(id);
      
      res.json({ 
        message: "Download tracked", 
        fileUrl: brochure.fileUrl,
        filename: brochure.filename 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process download" });
    }
  });

  // ===== ADMIN ROUTES =====
  
  // Product management
  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(id, productData);
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Category management
  app.post("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid category data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  app.put("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.updateCategory(id, categoryData);
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid category data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update category" });
    }
  });

  app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCategory(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // Seminar management
  app.post("/api/admin/seminars", requireAdmin, async (req, res) => {
    try {
      const seminarData = insertSeminarSchema.parse(req.body);
      const seminar = await storage.createSeminar(seminarData);
      res.json(seminar);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid seminar data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create seminar" });
    }
  });

  app.put("/api/admin/seminars/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const seminarData = insertSeminarSchema.parse(req.body);
      const seminar = await storage.updateSeminar(id, seminarData);
      res.json(seminar);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid seminar data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update seminar" });
    }
  });

  app.delete("/api/admin/seminars/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSeminar(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete seminar" });
    }
  });

  // Event management
  app.post("/api/admin/events", requireAdmin, async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid event data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  app.put("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.updateEvent(id, eventData);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid event data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update event" });
    }
  });

  app.delete("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEvent(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  });

  // Admin stats
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const products = await storage.getProducts();
      const categories = await storage.getCategories();
      const seminars = await storage.getSeminars();
      const events = await storage.getEvents();
      const enquiries = await storage.getEnquiries();

      res.json({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalSeminars: seminars.length,
        totalEvents: events.length,
        pendingEnquiries: enquiries.filter(e => e.status === 'new').length,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin stats" });
    }
  });

  // User management
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.updateUser(id, userData);
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUser(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // ===== USER PREFERENCES ROUTES =====
  
  // Get user preferences
  app.get("/api/preferences", async (req, res) => {
    try {
      const userId = req.session?.userId;
      const sessionId = req.sessionID;
      
      const preferences = await storage.getUserPreferences(userId, sessionId);
      
      if (preferences) {
        res.json(preferences);
      } else {
        // Return default preferences if none found
        const defaultPrefs = preferenceSchema.parse({});
        res.json({ preferences: defaultPrefs });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  // Save/Update user preferences
  app.post("/api/preferences", async (req, res) => {
    try {
      const userId = req.session?.userId;
      const sessionId = req.sessionID;
      
      // Validate preference data
      const validatedPrefs = preferenceSchema.parse(req.body);
      
      // Check if preferences already exist
      const existing = await storage.getUserPreferences(userId, sessionId);
      
      if (existing) {
        // Update existing preferences
        const updated = await storage.updateUserPreferences(existing.id, validatedPrefs);
        res.json(updated);
      } else {
        // Create new preferences
        const data = insertUserPreferencesSchema.parse({
          userId: userId || null,
          sessionId: userId ? null : sessionId,
          preferences: validatedPrefs
        });
        
        const created = await storage.saveUserPreferences(data);
        res.json(created);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid preference data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to save preferences" });
    }
  });

  // Apply preference changes (for specific preference updates)
  app.patch("/api/preferences/:key", async (req, res) => {
    try {
      const userId = req.session?.userId;
      const sessionId = req.sessionID;
      const prefKey = req.params.key;
      const { value } = req.body;
      
      const existing = await storage.getUserPreferences(userId, sessionId);
      
      if (!existing) {
        return res.status(404).json({ error: "User preferences not found" });
      }
      
      // Update specific preference key
      const currentPrefs = existing.preferences as any;
      const updatedPrefs = { ...currentPrefs, [prefKey]: value };
      
      // Validate the updated preferences
      const validatedPrefs = preferenceSchema.parse(updatedPrefs);
      
      const updated = await storage.updateUserPreferences(existing.id, validatedPrefs);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid preference value", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update preference" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
