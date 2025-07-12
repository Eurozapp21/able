import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertEnquirySchema, insertEnquiryMessageSchema 
} from "../shared/schema";
import { z } from "zod";

export async function registerDebugRoutes(app: Express): Promise<Server> {
  console.log("Starting route registration...");
  
  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // Add routes one by one to identify the problematic one
  try {
    console.log("Adding auth routes...");
    
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
    console.log("✓ Auth login route added");

    app.post("/api/auth/register", async (req, res) => {
      try {
        const userData = insertUserSchema.parse(req.body);
        
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
    console.log("✓ Auth register route added");

    app.post("/api/auth/logout", (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ success: true });
      });
    });
    console.log("✓ Auth logout route added");

    // Basic data routes
    app.get("/api/categories", async (req, res) => {
      try {
        const { parent } = req.query;
        let categories;
        
        if (parent !== undefined) {
          const parentId = parent === 'null' ? null : parseInt(parent as string);
          categories = await storage.getCategoriesByParent(parentId);
        } else {
          categories = await storage.getCategories();
        }
        
        res.json(categories);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
      }
    });
    console.log("✓ Categories route added");

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
    console.log("✓ Category by ID route added");

    console.log("All basic routes added successfully!");
    
  } catch (error) {
    console.error("Error adding routes:", error);
    throw error;
  }

  const httpServer = createServer(app);
  return httpServer;
}