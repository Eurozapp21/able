import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertEnquirySchema, insertEnquiryMessageSchema 
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
      const parentId = req.query.parentId ? parseInt(req.query.parentId as string) : null;
      const categories = await storage.getCategoriesByParent(parentId);
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
      const { upcoming } = req.query;
      
      let seminars;
      if (upcoming === 'true') {
        seminars = await storage.getUpcomingSeminars();
      } else {
        seminars = await storage.getSeminars();
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

  const httpServer = createServer(app);
  return httpServer;
}
