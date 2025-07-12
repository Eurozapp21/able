import express, { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { storage } from "./database";
import { 
  insertUserSchema, insertEnquirySchema, insertEnquiryMessageSchema 
} from "../shared/types";
import { z } from "zod";

const router = express.Router();

// Authentication middleware
const requireAuth = (req: any, res: Response, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};

// Auth routes
router.post("/auth/register", async (req: Request, res: Response) => {
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

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword
    });

    // Set session
    (req as any).session.userId = user.id;
    (req as any).session.username = user.username;

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid user data", details: error.errors });
    }
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Set session
    (req as any).session.userId = user.id;
    (req as any).session.username = user.username;

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/auth/logout", (req: Request, res: Response) => {
  (req as any).session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ success: true });
  });
});

router.get("/auth/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await storage.getUser((req as any).session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Categories routes
router.get("/categories", async (req: Request, res: Response) => {
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

router.get("/categories/:id", async (req: Request, res: Response) => {
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

// Products routes
router.get("/products", async (req: Request, res: Response) => {
  try {
    const { category, search, featured } = req.query;
    let products;
    
    if (featured === 'true') {
      products = await storage.getFeaturedProducts();
    } else if (search) {
      products = await storage.searchProducts(search as string);
    } else if (category) {
      products = await storage.getProductsByCategory(parseInt(category as string));
    } else {
      products = await storage.getProducts();
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
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

// Seminars routes
router.get("/seminars", async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    let seminars;
    
    if (type) {
      seminars = await storage.getSeminarsByType(type as string);
    } else {
      seminars = await storage.getSeminars();
    }
    
    res.json(seminars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seminars" });
  }
});

router.get("/seminars/:id", async (req: Request, res: Response) => {
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

// Enquiries routes
router.get("/enquiries", requireAuth, async (req: Request, res: Response) => {
  try {
    const enquiries = await storage.getEnquiriesByUser((req as any).session.userId);
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

router.post("/enquiries", async (req: Request, res: Response) => {
  try {
    const enquiryData = insertEnquirySchema.parse(req.body);
    
    // If user is logged in, set userId
    if ((req as any).session?.userId) {
      enquiryData.userId = (req as any).session.userId;
    }
    
    const enquiry = await storage.createEnquiry(enquiryData);
    res.json(enquiry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid enquiry data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create enquiry" });
  }
});

router.get("/enquiries/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const enquiry = await storage.getEnquiry(id);
    
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    
    // Check if user owns this enquiry
    if (enquiry.userId !== (req as any).session.userId) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enquiry" });
  }
});

router.get("/enquiries/:id/messages", requireAuth, async (req: Request, res: Response) => {
  try {
    const enquiryId = parseInt(req.params.id);
    
    // Verify user owns this enquiry
    const enquiry = await storage.getEnquiry(enquiryId);
    if (!enquiry || enquiry.userId !== (req as any).session.userId) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    const messages = await storage.getEnquiryMessages(enquiryId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/enquiries/:id/messages", requireAuth, async (req: Request, res: Response) => {
  try {
    const enquiryId = parseInt(req.params.id);
    const messageData = insertEnquiryMessageSchema.parse({
      ...req.body,
      enquiryId,
      userId: (req as any).session.userId
    });
    
    // Verify user owns this enquiry
    const enquiry = await storage.getEnquiry(enquiryId);
    if (!enquiry || enquiry.userId !== (req as any).session.userId) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    const message = await storage.createEnquiryMessage(messageData);
    res.json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid message data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create message" });
  }
});

// Catalogue routes
router.get("/catalogue-categories", async (req: Request, res: Response) => {
  try {
    const categories = await storage.getCatalogueCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch catalogue categories" });
  }
});

router.get("/catalogue-categories/:slug", async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const category = await storage.getCatalogueCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

router.get("/brochures", async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Failed to fetch brochures" });
  }
});

router.post("/brochures/:id/download", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const brochure = await storage.getBrochure(id);
    
    if (!brochure) {
      return res.status(404).json({ error: "Brochure not found" });
    }
    
    await storage.incrementDownloadCount(id);
    
    res.json({ 
      message: "Download tracked", 
      fileUrl: brochure.filePath,
      filename: brochure.fileName 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to track download" });
  }
});

export default router;