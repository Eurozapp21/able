import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { MySQLStorage } from "./mysql-storage";
import { 
  insertUserSchema, insertEnquirySchema, insertEnquiryMessageSchema 
} from "@shared/schema";
import { z } from "zod";

// Initialize MySQL storage
const mysqlStorage = new MySQLStorage(process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/abletools');

// Session type extensions handled inline with type assertions

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      await mysqlStorage.connect();
      const user = await mysqlStorage.getUserByUsername(username);
      
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
      await mysqlStorage.connect();
      const existingUser = await mysqlStorage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const existingUsername = await mysqlStorage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      const user = await mysqlStorage.createUser(userData);
      
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
      await mysqlStorage.connect();
      const user = await mysqlStorage.getUser(req.session.userId);
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
      await mysqlStorage.connect();
      const banners = await mysqlStorage.getActiveBanners();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const { parentId } = req.query;
      
      await mysqlStorage.connect();
      let categories;
      if (parentId !== undefined) {
        const pid = parentId === 'null' ? null : parseInt(parentId as string);
        categories = await mysqlStorage.getCategoriesByParent(pid);
      } else {
        // Return all categories when no parentId is specified
        categories = await mysqlStorage.getCategories();
      }
      
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      await mysqlStorage.connect();
      const id = parseInt(req.params.id);
      const category = await mysqlStorage.getCategory(id);
      
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

      
      await mysqlStorage.connect();
      let products;
      
      if (search) {
        products = await mysqlStorage.searchProducts(search as string);
      } else if (categoryId) {
        products = await mysqlStorage.getProductsByCategory(parseInt(categoryId as string));
      } else if (featured === 'true') {
        products = await mysqlStorage.getFeaturedProducts();
      } else {
        products = await mysqlStorage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      await mysqlStorage.connect();
      const id = parseInt(req.params.id);
      const product = await mysqlStorage.getProduct(id);
      
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
      
      await mysqlStorage.connect();
      let seminars;
      if (upcoming === 'true') {
        seminars = await mysqlStorage.getUpcomingSeminars();
      } else {
        seminars = await mysqlStorage.getSeminars();
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
      await mysqlStorage.connect();
      const id = parseInt(req.params.id);
      const seminar = await mysqlStorage.getSeminar(id);
      
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
      
      await mysqlStorage.connect();
      let events;
      if (recent === 'true') {
        events = await mysqlStorage.getRecentEvents();
      } else {
        events = await mysqlStorage.getEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      await mysqlStorage.connect();
      const id = parseInt(req.params.id);
      const event = await mysqlStorage.getEvent(id);
      
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
      await mysqlStorage.connect();
      const achievements = await mysqlStorage.getAchievements();
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

  const httpServer = createServer(app);
  return httpServer;
}
