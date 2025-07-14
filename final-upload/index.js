// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/production.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  postcode: text("postcode"),
  occupation: text("occupation"),
  role: text("role").notNull().default("user"),
  // "user" or "admin"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEl: text("name_el"),
  description: text("description"),
  descriptionEl: text("description_el"),
  icon: text("icon"),
  image: text("image"),
  parentId: integer("parent_id"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEl: text("name_el"),
  description: text("description"),
  descriptionEl: text("description_el"),
  categoryId: integer("category_id").notNull(),
  images: text("images").array(),
  isFeatured: boolean("is_featured").default(false),
  specifications: text("specifications"),
  specificationsEl: text("specifications_el"),
  price: text("price"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var seminars = pgTable("seminars", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEl: text("title_el"),
  description: text("description"),
  descriptionEl: text("description_el"),
  date: timestamp("date").notNull(),
  location: text("location"),
  locationEl: text("location_el"),
  speaker: text("speaker"),
  speakerEl: text("speaker_el"),
  image: text("image"),
  fee: text("fee"),
  maxParticipants: integer("max_participants"),
  type: text("type").notNull().default("seminar"),
  // "seminar" or "training"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  date: timestamp("date").notNull(),
  image: text("image"),
  excerpt: text("excerpt"),
  createdAt: timestamp("created_at").defaultNow()
});
var enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  about: text("about"),
  message: text("message").notNull(),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow()
});
var enquiryMessages = pgTable("enquiry_messages", {
  id: serial("id").primaryKey(),
  enquiryId: integer("enquiry_id").notNull(),
  senderId: integer("sender_id"),
  senderType: text("sender_type").notNull(),
  // 'user' or 'admin'
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow()
});
var banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  image: text("image").notNull(),
  link: text("link"),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0)
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});
var insertSeminarSchema = createInsertSchema(seminars).omit({
  id: true,
  createdAt: true
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true
});
var insertEnquirySchema = createInsertSchema(enquiries).omit({
  id: true,
  createdAt: true,
  status: true
});
var insertEnquiryMessageSchema = createInsertSchema(enquiryMessages).omit({
  id: true,
  createdAt: true
});
var insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true
});
var insertBannerSchema = createInsertSchema(banners).omit({
  id: true
});
var catalogueCategories = pgTable("catalogue_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var brochures = pgTable("brochures", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: integer("category_id").references(() => catalogueCategories.id),
  filename: text("filename").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  downloadCount: integer("download_count").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var insertCatalogueCategorySchema = createInsertSchema(catalogueCategories).omit({
  id: true,
  createdAt: true
});
var insertBrochureSchema = createInsertSchema(brochures).omit({
  id: true,
  createdAt: true
});

// server/production.ts
import { eq, like, desc } from "drizzle-orm";
var PostgresStorage = class {
  db;
  constructor(databaseUrl) {
    const client = postgres(databaseUrl);
    this.db = drizzle(client);
  }
  // Users
  async getUser(id) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  async getUserByEmail(email) {
    const result = await this.db.select().from(users).where(eq(users.email, email));
    return result[0];
  }
  async createUser(insertUser) {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  async getAllUsers() {
    return await this.db.select().from(users);
  }
  async updateUser(id, insertUser) {
    const result = await this.db.update(users).set(insertUser).where(eq(users.id, id)).returning();
    return result[0];
  }
  async deleteUser(id) {
    await this.db.delete(users).where(eq(users.id, id));
  }
  // Categories
  async getCategories() {
    return await this.db.select().from(categories);
  }
  async getCategory(id) {
    const result = await this.db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }
  async getCategoriesByParent(parentId) {
    return await this.db.select().from(categories).where(eq(categories.parentId, parentId));
  }
  async createCategory(insertCategory) {
    const result = await this.db.insert(categories).values(insertCategory).returning();
    return result[0];
  }
  async updateCategory(id, insertCategory) {
    const result = await this.db.update(categories).set(insertCategory).where(eq(categories.id, id)).returning();
    return result[0];
  }
  async deleteCategory(id) {
    await this.db.delete(categories).where(eq(categories.id, id));
  }
  // Products
  async getProducts() {
    return await this.db.select().from(products);
  }
  async getProduct(id) {
    const result = await this.db.select().from(products).where(eq(products.id, id));
    return result[0];
  }
  async getProductsByCategory(categoryId) {
    return await this.db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  async getFeaturedProducts() {
    return await this.db.select().from(products).where(eq(products.featured, true));
  }
  async searchProducts(query) {
    return await this.db.select().from(products).where(like(products.name, `%${query}%`));
  }
  async createProduct(insertProduct) {
    const result = await this.db.insert(products).values(insertProduct).returning();
    return result[0];
  }
  async updateProduct(id, insertProduct) {
    const result = await this.db.update(products).set(insertProduct).where(eq(products.id, id)).returning();
    return result[0];
  }
  async deleteProduct(id) {
    await this.db.delete(products).where(eq(products.id, id));
  }
  // Seminars
  async getSeminars() {
    return await this.db.select().from(seminars);
  }
  async getSeminar(id) {
    const result = await this.db.select().from(seminars).where(eq(seminars.id, id));
    return result[0];
  }
  async getUpcomingSeminars() {
    const now = /* @__PURE__ */ new Date();
    return await this.db.select().from(seminars).where(eq(seminars.date, now));
  }
  async createSeminar(insertSeminar) {
    const result = await this.db.insert(seminars).values(insertSeminar).returning();
    return result[0];
  }
  async updateSeminar(id, insertSeminar) {
    const result = await this.db.update(seminars).set(insertSeminar).where(eq(seminars.id, id)).returning();
    return result[0];
  }
  async deleteSeminar(id) {
    await this.db.delete(seminars).where(eq(seminars.id, id));
  }
  // Events
  async getEvents() {
    return await this.db.select().from(events);
  }
  async getEvent(id) {
    const result = await this.db.select().from(events).where(eq(events.id, id));
    return result[0];
  }
  async getRecentEvents() {
    return await this.db.select().from(events).orderBy(desc(events.date)).limit(3);
  }
  async createEvent(insertEvent) {
    const result = await this.db.insert(events).values(insertEvent).returning();
    return result[0];
  }
  async updateEvent(id, insertEvent) {
    const result = await this.db.update(events).set(insertEvent).where(eq(events.id, id)).returning();
    return result[0];
  }
  async deleteEvent(id) {
    await this.db.delete(events).where(eq(events.id, id));
  }
  // Enquiries
  async getEnquiries() {
    return await this.db.select().from(enquiries);
  }
  async getEnquiry(id) {
    const result = await this.db.select().from(enquiries).where(eq(enquiries.id, id));
    return result[0];
  }
  async getEnquiriesByUser(userId) {
    return await this.db.select().from(enquiries).where(eq(enquiries.userId, userId));
  }
  async createEnquiry(insertEnquiry) {
    const result = await this.db.insert(enquiries).values(insertEnquiry).returning();
    return result[0];
  }
  async updateEnquiryStatus(id, status) {
    await this.db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
  }
  // Enquiry Messages
  async getEnquiryMessages(enquiryId) {
    return await this.db.select().from(enquiryMessages).where(eq(enquiryMessages.enquiryId, enquiryId));
  }
  async createEnquiryMessage(insertMessage) {
    const result = await this.db.insert(enquiryMessages).values(insertMessage).returning();
    return result[0];
  }
  // Achievements
  async getAchievements() {
    return await this.db.select().from(achievements);
  }
  async createAchievement(insertAchievement) {
    const result = await this.db.insert(achievements).values(insertAchievement).returning();
    return result[0];
  }
  // Banners
  async getActiveBanners() {
    return await this.db.select().from(banners).where(eq(banners.isActive, true));
  }
  async createBanner(insertBanner) {
    const result = await this.db.insert(banners).values(insertBanner).returning();
    return result[0];
  }
  // Catalogue Categories
  async getCatalogueCategories() {
    return await this.db.select().from(catalogueCategories);
  }
  async getCatalogueCategory(id) {
    const result = await this.db.select().from(catalogueCategories).where(eq(catalogueCategories.id, id));
    return result[0];
  }
  async getCatalogueCategoryBySlug(slug) {
    const result = await this.db.select().from(catalogueCategories).where(eq(catalogueCategories.slug, slug));
    return result[0];
  }
  async createCatalogueCategory(insertCategory) {
    const result = await this.db.insert(catalogueCategories).values(insertCategory).returning();
    return result[0];
  }
  // Brochures
  async getBrochures() {
    return await this.db.select().from(brochures);
  }
  async getBrochure(id) {
    const result = await this.db.select().from(brochures).where(eq(brochures.id, id));
    return result[0];
  }
  async getBrochuresByCategory(categoryId) {
    return await this.db.select().from(brochures).where(eq(brochures.categoryId, categoryId));
  }
  async createBrochure(insertBrochure) {
    const result = await this.db.insert(brochures).values(insertBrochure).returning();
    return result[0];
  }
  async incrementDownloadCount(id) {
    const brochure = await this.getBrochure(id);
    if (brochure) {
      await this.db.update(brochures).set({
        downloadCount: brochure.downloadCount + 1
      }).where(eq(brochures.id, id));
    }
  }
};

// server/storage.ts
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  categories = /* @__PURE__ */ new Map();
  products = /* @__PURE__ */ new Map();
  seminars = /* @__PURE__ */ new Map();
  events = /* @__PURE__ */ new Map();
  enquiries = /* @__PURE__ */ new Map();
  enquiryMessages = /* @__PURE__ */ new Map();
  achievements = /* @__PURE__ */ new Map();
  banners = /* @__PURE__ */ new Map();
  catalogueCategories = /* @__PURE__ */ new Map();
  brochures = /* @__PURE__ */ new Map();
  currentId = 1;
  constructor() {
    this.seedData();
    this.seedCatalogueCategories();
    this.seedBrochures();
  }
  seedData() {
    const adminUser = {
      id: 1,
      username: "admin",
      email: "admin@abletools.com.cy",
      password: "admin123",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      address: null,
      phone: null,
      city: null,
      postcode: null,
      occupation: null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(1, adminUser);
    const categoryData = [
      // Main Categories
      { id: 1, name: "Lifting Systems", description: "Professional lifting and transfer systems for safe patient handling", icon: "wheelchair", parentId: null, image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg" },
      { id: 2, name: "Wheelchairs", description: "Manual and electric wheelchairs for enhanced mobility", icon: "battery-full", parentId: null, image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg" },
      { id: 3, name: "Mobility Aids", description: "Walking aids and mobility equipment for independence", icon: "walking", parentId: null, image: "/attached_assets/1601935107aboutus_1752007024526.jpg" },
      { id: 4, name: "Sensory Integration Rooms", description: "Multi-sensory therapy equipment and environments", icon: "brain", parentId: null, image: "/attached_assets/maxresdefault_1752003228921.jpg" },
      { id: 5, name: "Stair Lifts", description: "Staircase accessibility solutions", icon: "stairs", parentId: null, image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg" },
      { id: 6, name: "Seating Systems", description: "Specialized seating and positioning solutions", icon: "user-check", parentId: null, image: "/attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg" },
      { id: 7, name: "Exercise Equipment", description: "Rehabilitation and therapeutic exercise machines", icon: "bicycle", parentId: null, image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg" },
      { id: 8, name: "Daily Living Aids", description: "Assistive tools for everyday tasks and independence", icon: "hands-helping", parentId: null, image: "/attached_assets/1601936002aboutus_small2_1752007885488.jpg" },
      { id: 9, name: "Medical Equipment", description: "Clinical and therapeutic medical devices", icon: "car", parentId: null, image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg" },
      { id: 10, name: "Bath and Toilet Aids", description: "Bathroom safety and assistance equipment", icon: "bath", parentId: null, image: "/attached_assets/1601936002aboutus_small2_1752009993907.jpg" },
      { id: 11, name: "Pediatric Equipment", description: "Specialized equipment for children with disabilities", icon: "baby-carriage", parentId: null, image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg" },
      { id: 12, name: "Rehab Pushchairs", description: "Specialized pushchairs for rehabilitation", icon: "baby-carriage", parentId: null, image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg" },
      // Sub Categories for Wheelchairs (parentId: 2) - Example: Products/Wheelchairs/Rigid Wheelchairs/Wolturnus W5
      { id: 21, name: "Manual Wheelchairs", description: "Self-propelled wheelchairs for active users", icon: "wheelchair", parentId: 2, image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg" },
      { id: 22, name: "Electric Wheelchairs", description: "Powered wheelchairs for enhanced mobility", icon: "battery-full", parentId: 2, image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg" },
      { id: 23, name: "Rigid Wheelchairs", description: "Ultra-lightweight rigid frame wheelchairs for performance", icon: "bicycle", parentId: 2, image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg" },
      // Third-level Categories for Rigid Wheelchairs (parentId: 23) - Example: Products/Wheelchairs/Rigid Wheelchairs/[Product]
      { id: 231, name: "Wolturnus Series", description: "Premium Danish wheelchair engineering", icon: "wheelchair", parentId: 23, image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg" },
      // Sub Categories for Lifting Systems (parentId: 1)
      { id: 31, name: "Ceiling Hoists", description: "Track-mounted lifting systems for patient transfer", icon: "stairs", parentId: 1, image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg" },
      { id: 32, name: "Mobile Hoists", description: "Portable lifting equipment for flexible use", icon: "car", parentId: 1, image: "/attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg" },
      { id: 33, name: "Transfer Boards", description: "Sliding boards for safe patient transfer", icon: "hands-helping", parentId: 1, image: "/attached_assets/1601935107aboutus_1752007024526.jpg" },
      // Sub Categories for Medical Equipment (parentId: 9)
      { id: 41, name: "Therapy Equipment", description: "Physical therapy and rehabilitation devices", icon: "user-check", parentId: 9, image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg" },
      { id: 42, name: "Positioning Aids", description: "Medical positioning and support equipment", icon: "hands-helping", parentId: 9, image: "/attached_assets/maxresdefault_1752003228921.jpg" }
    ];
    categoryData.forEach((cat) => {
      this.categories.set(cat.id, { ...cat, image: cat.image || null });
    });
    const productData = [
      // Level 4: Products/Wheelchairs/Rigid Wheelchairs/Wolturnus Series/Wolturnus W5
      {
        id: 1,
        name: "Wolturnus W5",
        description: "Premium ultra-lightweight rigid wheelchair with advanced engineering for superior performance and comfort",
        categoryId: 231,
        // Wolturnus Series (4th level)
        images: [
          "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
          "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
          "/attached_assets/maxresdefault_1752003228921.jpg",
          "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
          "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg"
        ],
        isFeatured: true,
        specifications: "Carbon fiber frame, adjustable geometry, premium components, weight: 6.8kg"
      },
      // Level 3: Products/Stair Lifts/Homeglide (direct products under main category)
      {
        id: 2,
        name: "Homeglide",
        description: "Straight stair lift for indoor use with smooth operation and safety features",
        categoryId: 5,
        // Stair Lifts (main category)
        images: ["/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg"],
        isFeatured: true,
        specifications: "Weight capacity: 140kg, battery backup, safety sensors, soft start/stop"
      },
      // Level 2: Products/Sensory Rooms (direct products under main category)
      {
        id: 3,
        name: "Multi-Sensory Environment Package",
        description: "Complete sensory room setup with interactive lighting, sounds, and tactile elements for therapeutic use",
        categoryId: 4,
        // Sensory Integration Rooms (main category)
        images: ["/attached_assets/maxresdefault_1752003228921.jpg"],
        isFeatured: true,
        specifications: "LED lighting system, fiber optics, bubble tubes, interactive projection, sound system"
      },
      // Additional products for testing hierarchy
      {
        id: 4,
        name: "Bingo Evolution",
        description: "Advanced rehabilitation pushchair with superior comfort and functionality",
        categoryId: 12,
        images: ["/attached_assets/bingo_evolution_twins-1_1752003228920.jpg"],
        isFeatured: true,
        specifications: "Adjustable seating, weather protection, safety harness"
      },
      // Product under Manual Wheelchairs subcategory
      {
        id: 5,
        name: "Active Sport Wheelchair",
        description: "High-performance manual wheelchair for daily use and recreational activities",
        categoryId: 21,
        // Manual Wheelchairs
        images: ["/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg"],
        isFeatured: false,
        specifications: "Aluminum frame, quick-release wheels, adjustable backrest, anti-tip wheels"
      },
      // Product under Ceiling Hoists subcategory
      {
        id: 6,
        name: "Ceiling Track Hoist System",
        description: "Professional ceiling-mounted patient transfer system for healthcare facilities",
        categoryId: 31,
        // Ceiling Hoists
        images: ["/attached_assets/maxresdefault_1752003228921.jpg"],
        isFeatured: false,
        specifications: "300kg capacity, electric motor, emergency lowering, H-frame track system"
      }
    ];
    productData.forEach((prod) => {
      this.products.set(prod.id, { ...prod, createdAt: /* @__PURE__ */ new Date() });
    });
    const seminarData = [
      // Educational Seminars
      {
        id: 1,
        title: "Advanced Rehabilitation Techniques",
        description: "Comprehensive seminar on modern rehabilitation approaches for spinal cord injuries, neurological conditions, and mobility impairments. Learn evidence-based techniques used by leading rehabilitation centers worldwide.",
        date: /* @__PURE__ */ new Date("2025-08-15"),
        location: "AbleTools Training Center, Nicosia",
        speaker: "Dr. Maria Constantinou, PT, PhD",
        image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg",
        fee: "\u20AC185",
        maxParticipants: 20,
        type: "seminar"
      },
      {
        id: 2,
        title: "Multi-Sensory Room Design & Implementation",
        description: "Educational seminar on designing effective multi-sensory environments for therapeutic use. Covers lighting, sound, tactile elements, and therapeutic protocols for various conditions.",
        date: /* @__PURE__ */ new Date("2025-11-05"),
        location: "Sensory Innovation Lab, Paphos",
        speaker: "Elena Pavlou, MSc Occupational Therapy",
        image: "/attached_assets/maxresdefault_1752003228921.jpg",
        fee: "\u20AC195",
        maxParticipants: 12,
        type: "seminar"
      },
      {
        id: 3,
        title: "Pediatric Rehabilitation Approaches",
        description: "Comprehensive seminar on modern approaches to pediatric rehabilitation. Focus on evidence-based practices, family-centered care, and developmental considerations in treatment planning.",
        date: /* @__PURE__ */ new Date("2025-12-03"),
        location: "Children's Rehabilitation Center, Nicosia",
        speaker: "Dr. Sophia Michaelidou, Pediatric PT",
        image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
        fee: "\u20AC175",
        maxParticipants: 16,
        type: "seminar"
      },
      {
        id: 4,
        title: "Innovation in Accessibility Design",
        description: "Seminar exploring cutting-edge approaches to accessibility design and universal design principles. Learn about the latest research and best practices in creating inclusive environments.",
        date: /* @__PURE__ */ new Date("2025-10-22"),
        location: "Design Innovation Center, Larnaca",
        speaker: "Universal Design Consortium",
        image: "/attached_assets/1601935107aboutus_1752007024526.jpg",
        fee: "\u20AC155",
        maxParticipants: 22,
        type: "seminar"
      },
      // Professional Training Courses
      {
        id: 5,
        title: "HUR Equipment Training Certification",
        description: "Professional certification course for HUR pneumatic exercise equipment. Master safe operation, assessment protocols, and therapeutic applications for neurological rehabilitation.",
        date: /* @__PURE__ */ new Date("2025-09-12"),
        location: "HUR Training Facility, Limassol",
        speaker: "International HUR Trainer Team",
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        fee: "\u20AC245",
        maxParticipants: 15,
        type: "training"
      },
      {
        id: 6,
        title: "Wheelchair Assessment & Fitting Training",
        description: "Intensive hands-on training covering comprehensive wheelchair assessment, proper fitting techniques, and customization for individual needs. Includes manual and power wheelchair systems.",
        date: /* @__PURE__ */ new Date("2025-10-08"),
        location: "AbleTools Showroom, Nicosia",
        speaker: "Andreas Georgiou, OTR/L, ATP",
        image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
        fee: "\u20AC165",
        maxParticipants: 18,
        type: "training"
      },
      {
        id: 7,
        title: "Safe Patient Transfer Techniques Training",
        description: "Essential hands-on training for healthcare professionals on safe patient handling and transfer methods. Includes manual techniques, mechanical lifts, and injury prevention strategies.",
        date: /* @__PURE__ */ new Date("2025-09-25"),
        location: "Cyprus University of Technology, Limassol",
        speaker: "Nursing Education Consortium",
        image: "/attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg",
        fee: "\u20AC125",
        maxParticipants: 30,
        type: "training"
      },
      {
        id: 8,
        title: "Home Accessibility Assessment Training",
        description: "Complete hands-on training on conducting thorough home assessments for accessibility modifications. Includes stair lifts, ramps, bathroom modifications, and technology integration.",
        date: /* @__PURE__ */ new Date("2025-10-15"),
        location: "Home Modification Demonstration House, Larnaca",
        speaker: "Home Access Specialists Team",
        image: "/attached_assets/Achievement_1752003982449.jpg",
        fee: "\u20AC155",
        maxParticipants: 22,
        type: "training"
      },
      {
        id: 9,
        title: "Advanced Seating & Positioning Training",
        description: "In-depth hands-on training on complex seating and positioning solutions for individuals with severe physical disabilities. Covers pressure management, postural support, and custom solutions.",
        date: /* @__PURE__ */ new Date("2025-11-19"),
        location: "Seating Clinic, Famagusta",
        speaker: "International Seating Consortium",
        image: "/attached_assets/what-is-true-sense-of-accomplishment-and-how-to-achive-it_1752003982450.jpg",
        fee: "\u20AC205",
        maxParticipants: 14,
        type: "training"
      }
    ];
    seminarData.forEach((sem) => {
      this.seminars.set(sem.id, { ...sem, createdAt: /* @__PURE__ */ new Date() });
    });
    const eventData = [
      {
        id: 1,
        title: "HUR - Spinal Cord and Neurological Rehabilitation",
        content: "HUR (HUR Oy) is a Finnish company that develops and manufactures pneumatic exercise equipment specifically designed for medical rehabilitation, wellness, and fitness applications. The company has been a pioneer in pneumatic resistance technology since 1989.\n\nOur partnership with HUR brings cutting-edge rehabilitation technology to Cyprus, offering healthcare professionals and patients access to the most advanced pneumatic exercise systems available today. These systems are specifically designed for individuals with spinal cord injuries, neurological conditions, and those requiring gentle, controlled resistance training.\n\nThe HUR pneumatic technology offers several key advantages in rehabilitation settings:\n\n\u2022 Zero Starting Weight: Patients can begin exercises with virtually no resistance, making it ideal for early-stage rehabilitation\n\u2022 Precise Control: Air pressure systems allow for exact resistance adjustments in small increments\n\u2022 Safety Features: Built-in safety mechanisms prevent injury during use\n\u2022 Accessibility: Equipment designed for wheelchair users and individuals with limited mobility\n\u2022 Clinical Integration: Seamless integration with existing rehabilitation protocols\n\nHUR equipment is widely used in hospitals, rehabilitation centers, and specialized clinics across Europe and North America. The technology has been clinically proven to improve functional outcomes in patients with various neurological conditions, including spinal cord injuries, stroke recovery, and neuromuscular disorders.\n\nAbleTools is proud to be the exclusive distributor of HUR equipment in Cyprus, providing comprehensive training, installation, and ongoing technical support to healthcare facilities throughout the region.",
        date: /* @__PURE__ */ new Date("2025-07-15"),
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        excerpt: "Discover HUR's innovative approach to neurological rehabilitation equipment and its impact on patient outcomes."
      },
      {
        id: 2,
        title: "International Rehabilitation Equipment Expo Cyprus 2025",
        content: "Join us for the largest rehabilitation equipment exhibition in Cyprus. Featuring the latest innovations in mobility aids, therapeutic equipment, and assistive technology. Meet with leading manufacturers, attend live demonstrations, and network with healthcare professionals from across the region.",
        date: /* @__PURE__ */ new Date("2025-09-18"),
        image: "/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg",
        excerpt: "Cyprus's premier rehabilitation equipment showcase featuring cutting-edge technology and innovations."
      },
      {
        id: 3,
        title: "Breakthrough in Pediatric Mobility Solutions",
        content: "AbleTools announces the launch of our new pediatric mobility program, featuring specialized equipment designed specifically for children with disabilities. This comprehensive program includes adaptive wheelchairs, positioning devices, and educational support for families and caregivers.",
        date: /* @__PURE__ */ new Date("2025-08-28"),
        image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
        excerpt: "Revolutionary pediatric mobility solutions designed to support children's development and independence."
      },
      {
        id: 4,
        title: "Multi-Sensory Therapy Room Grand Opening",
        content: "Experience our state-of-the-art multi-sensory therapy room, now open for demonstrations and training sessions. This immersive environment features interactive lighting systems, therapeutic sound technology, and tactile elements designed to enhance sensory integration therapy outcomes.",
        date: /* @__PURE__ */ new Date("2025-10-12"),
        image: "/attached_assets/maxresdefault_1752003228921.jpg",
        excerpt: "Cutting-edge multi-sensory therapy environment now available for professional training and demonstrations."
      },
      {
        id: 5,
        title: "Community Accessibility Initiative Launch",
        content: "AbleTools partners with local municipalities to improve community accessibility. Our comprehensive assessment program will evaluate public spaces, recommend modifications, and provide training to local officials on disability awareness and universal design principles.",
        date: /* @__PURE__ */ new Date("2025-11-08"),
        image: "/attached_assets/Achievement_1752003982449.jpg",
        excerpt: "Collaborative community program aimed at improving accessibility across Cyprus public spaces."
      },
      {
        id: 6,
        title: "Advanced Stair Lift Technology Showcase",
        content: "Discover the latest innovations in stair lift technology featuring curved rail systems, outdoor installations, and smart home integration. Our expert team will demonstrate installation processes and maintenance procedures for residential and commercial applications.",
        date: /* @__PURE__ */ new Date("2025-12-15"),
        image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
        excerpt: "Latest stair lift innovations featuring smart technology and enhanced safety features for residential and commercial applications."
      }
    ];
    eventData.forEach((event) => {
      this.events.set(event.id, { ...event, createdAt: /* @__PURE__ */ new Date() });
    });
    const achievementData = [
      {
        id: 1,
        title: "Excellence in Service",
        description: "We began our operations in 2006, with a focus on people in need of rehabilitation",
        image: "/attached_assets/able_1752003982447.jpg"
      },
      {
        id: 2,
        title: "Team Achievement",
        description: "Collaborative success in advancing rehabilitation technology and patient care",
        image: "/attached_assets/Achievement_1752003982449.jpg"
      },
      {
        id: 3,
        title: "Community Impact",
        description: "Supporting individuals with disabilities to achieve their full potential",
        image: "/attached_assets/what-is-true-sense-of-accomplishment-and-how-to-achive-it_1752003982450.jpg"
      },
      {
        id: 4,
        title: "Industry Recognition",
        description: "Recognized excellence in rehabilitation equipment and innovative solutions",
        image: "/attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg"
      }
    ];
    achievementData.forEach((ach) => {
      this.achievements.set(ach.id, { ...ach, createdAt: /* @__PURE__ */ new Date() });
    });
    const bannerData = [
      {
        id: 1,
        title: "Rehabilitation Equipment & Solutions for All",
        subtitle: "Your ability to dream!",
        image: "/attached_assets/Modern Investment Mobile App Promotion_1751991371433.png",
        link: "/contact",
        isActive: true,
        order: 1
      },
      {
        id: 2,
        title: "Summer 2025 Collection",
        subtitle: "Advanced Mobility Solutions",
        image: "/attached_assets/Blue Modern Investment Mobile App Promotion_1751991371437.png",
        link: "/products",
        isActive: true,
        order: 2
      },
      {
        id: 3,
        title: "Professional Healthcare Equipment",
        subtitle: "Either we know the way or we find a way.",
        image: "/attached_assets/Modern Investment Mobile App Promotion_1751991371433.png",
        link: "/about",
        isActive: true,
        order: 3
      }
    ];
    bannerData.forEach((banner) => {
      this.banners.set(banner.id, banner);
    });
    this.currentId = 1e3;
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      address: insertUser.address ?? null,
      phone: insertUser.phone ?? null,
      city: insertUser.city ?? null,
      postcode: insertUser.postcode ?? null,
      occupation: insertUser.occupation ?? null
    };
    this.users.set(id, user);
    return user;
  }
  async getAllUsers() {
    return Array.from(this.users.values());
  }
  async updateUser(id, insertUser) {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error("User not found");
    }
    const user = {
      ...insertUser,
      id: existing.id,
      createdAt: existing.createdAt,
      address: insertUser.address ?? null,
      phone: insertUser.phone ?? null,
      city: insertUser.city ?? null,
      postcode: insertUser.postcode ?? null,
      occupation: insertUser.occupation ?? null
    };
    this.users.set(id, user);
    return user;
  }
  async deleteUser(id) {
    this.users.delete(id);
  }
  // Categories
  async getCategories() {
    return Array.from(this.categories.values());
  }
  async getCategory(id) {
    return this.categories.get(id);
  }
  async getCategoriesByParent(parentId) {
    return Array.from(this.categories.values()).filter((cat) => cat.parentId === parentId);
  }
  async createCategory(insertCategory) {
    const id = this.currentId++;
    const category = {
      ...insertCategory,
      id,
      image: insertCategory.image ?? null,
      description: insertCategory.description ?? null,
      parentId: insertCategory.parentId ?? null,
      icon: insertCategory.icon ?? null,
      nameEl: insertCategory.nameEl ?? null,
      descriptionEl: insertCategory.descriptionEl ?? null,
      isActive: insertCategory.isActive ?? true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.categories.set(id, category);
    return category;
  }
  async updateCategory(id, insertCategory) {
    const existing = this.categories.get(id);
    if (!existing) {
      throw new Error("Category not found");
    }
    const category = {
      ...insertCategory,
      id,
      image: insertCategory.image ?? null,
      description: insertCategory.description ?? null,
      parentId: insertCategory.parentId ?? null,
      icon: insertCategory.icon ?? null,
      nameEl: insertCategory.nameEl ?? null,
      descriptionEl: insertCategory.descriptionEl ?? null,
      isActive: insertCategory.isActive ?? true,
      createdAt: existing.createdAt
    };
    this.categories.set(id, category);
    return category;
  }
  async deleteCategory(id) {
    this.categories.delete(id);
  }
  // Products
  async getProducts() {
    return Array.from(this.products.values());
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async getProductsByCategory(categoryId) {
    return Array.from(this.products.values()).filter((prod) => prod.categoryId === categoryId);
  }
  async getFeaturedProducts() {
    return Array.from(this.products.values()).filter((prod) => prod.isFeatured);
  }
  async searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (prod) => prod.name.toLowerCase().includes(lowercaseQuery) || prod.description?.toLowerCase().includes(lowercaseQuery)
    );
  }
  async createProduct(insertProduct) {
    const id = this.currentId++;
    const product = {
      ...insertProduct,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertProduct.description ?? null,
      descriptionEl: insertProduct.descriptionEl ?? null,
      nameEl: insertProduct.nameEl ?? null,
      images: insertProduct.images ?? null,
      isFeatured: insertProduct.isFeatured ?? false,
      specifications: insertProduct.specifications ?? null,
      specificationsEl: insertProduct.specificationsEl ?? null,
      price: insertProduct.price ?? null,
      isActive: insertProduct.isActive ?? true
    };
    this.products.set(id, product);
    return product;
  }
  async updateProduct(id, insertProduct) {
    const existing = this.products.get(id);
    if (!existing) {
      throw new Error("Product not found");
    }
    const product = {
      ...insertProduct,
      id,
      createdAt: existing.createdAt,
      description: insertProduct.description ?? null,
      descriptionEl: insertProduct.descriptionEl ?? null,
      nameEl: insertProduct.nameEl ?? null,
      images: insertProduct.images ?? null,
      isFeatured: insertProduct.isFeatured ?? false,
      specifications: insertProduct.specifications ?? null,
      specificationsEl: insertProduct.specificationsEl ?? null,
      price: insertProduct.price ?? null,
      isActive: insertProduct.isActive ?? true
    };
    this.products.set(id, product);
    return product;
  }
  async deleteProduct(id) {
    this.products.delete(id);
  }
  // Seminars
  async getSeminars() {
    return Array.from(this.seminars.values());
  }
  async getSeminar(id) {
    return this.seminars.get(id);
  }
  async getUpcomingSeminars() {
    const now = /* @__PURE__ */ new Date();
    return Array.from(this.seminars.values()).filter((sem) => sem.date > now).sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  async createSeminar(insertSeminar) {
    const id = this.currentId++;
    const seminar = {
      ...insertSeminar,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertSeminar.description ?? null,
      descriptionEl: insertSeminar.descriptionEl ?? null,
      titleEl: insertSeminar.titleEl ?? null,
      image: insertSeminar.image ?? null,
      location: insertSeminar.location ?? null,
      locationEl: insertSeminar.locationEl ?? null,
      speaker: insertSeminar.speaker ?? null,
      speakerEl: insertSeminar.speakerEl ?? null,
      fee: insertSeminar.fee ?? null,
      maxParticipants: insertSeminar.maxParticipants ?? null,
      isActive: insertSeminar.isActive ?? true
    };
    this.seminars.set(id, seminar);
    return seminar;
  }
  async updateSeminar(id, insertSeminar) {
    const existing = this.seminars.get(id);
    if (!existing) {
      throw new Error("Seminar not found");
    }
    const seminar = {
      ...insertSeminar,
      id,
      createdAt: existing.createdAt,
      description: insertSeminar.description ?? null,
      descriptionEl: insertSeminar.descriptionEl ?? null,
      titleEl: insertSeminar.titleEl ?? null,
      image: insertSeminar.image ?? null,
      location: insertSeminar.location ?? null,
      locationEl: insertSeminar.locationEl ?? null,
      speaker: insertSeminar.speaker ?? null,
      speakerEl: insertSeminar.speakerEl ?? null,
      fee: insertSeminar.fee ?? null,
      maxParticipants: insertSeminar.maxParticipants ?? null,
      isActive: insertSeminar.isActive ?? true
    };
    this.seminars.set(id, seminar);
    return seminar;
  }
  async deleteSeminar(id) {
    this.seminars.delete(id);
  }
  // Events
  async getEvents() {
    return Array.from(this.events.values());
  }
  async getEvent(id) {
    return this.events.get(id);
  }
  async getRecentEvents() {
    return Array.from(this.events.values()).sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }
  async createEvent(insertEvent) {
    const id = this.currentId++;
    const event = {
      ...insertEvent,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      image: insertEvent.image ?? null,
      content: insertEvent.content ?? null,
      excerpt: insertEvent.excerpt ?? null
    };
    this.events.set(id, event);
    return event;
  }
  async updateEvent(id, insertEvent) {
    const existing = this.events.get(id);
    if (!existing) {
      throw new Error("Event not found");
    }
    const event = {
      ...insertEvent,
      id,
      createdAt: existing.createdAt,
      image: insertEvent.image ?? null,
      content: insertEvent.content ?? null,
      excerpt: insertEvent.excerpt ?? null
    };
    this.events.set(id, event);
    return event;
  }
  async deleteEvent(id) {
    this.events.delete(id);
  }
  // Enquiries
  async getEnquiries() {
    return Array.from(this.enquiries.values());
  }
  async getEnquiry(id) {
    return this.enquiries.get(id);
  }
  async getEnquiriesByUser(userId) {
    return Array.from(this.enquiries.values()).filter((enq) => enq.userId === userId);
  }
  async createEnquiry(insertEnquiry) {
    const id = this.currentId++;
    const enquiry = {
      ...insertEnquiry,
      id,
      status: "new",
      createdAt: /* @__PURE__ */ new Date(),
      about: insertEnquiry.about ?? null
    };
    this.enquiries.set(id, enquiry);
    return enquiry;
  }
  async updateEnquiryStatus(id, status) {
    const enquiry = this.enquiries.get(id);
    if (enquiry) {
      this.enquiries.set(id, { ...enquiry, status });
    }
  }
  // Enquiry Messages
  async getEnquiryMessages(enquiryId) {
    return Array.from(this.enquiryMessages.values()).filter((msg) => msg.enquiryId === enquiryId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  async createEnquiryMessage(insertMessage) {
    const id = this.currentId++;
    const message = {
      ...insertMessage,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      senderId: insertMessage.senderId ?? null
    };
    this.enquiryMessages.set(id, message);
    return message;
  }
  // Achievements
  async getAchievements() {
    return Array.from(this.achievements.values());
  }
  async createAchievement(insertAchievement) {
    const id = this.currentId++;
    const achievement = {
      ...insertAchievement,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertAchievement.description ?? null,
      image: insertAchievement.image ?? null
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
  // Banners
  async getActiveBanners() {
    return Array.from(this.banners.values()).filter((banner) => banner.isActive).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  async createBanner(insertBanner) {
    const id = this.currentId++;
    const banner = {
      ...insertBanner,
      id,
      link: insertBanner.link ?? null,
      subtitle: insertBanner.subtitle ?? null,
      isActive: insertBanner.isActive ?? null,
      order: insertBanner.order ?? null
    };
    this.banners.set(id, banner);
    return banner;
  }
  seedCatalogueCategories() {
    const categoryData = [
      {
        id: 1,
        title: "Wheelchairs & Mobility",
        description: "Manual and electric wheelchairs, mobility scooters, and walking aids for enhanced independence",
        image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
        slug: "wheelchairs-mobility",
        isActive: true,
        displayOrder: 1,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 2,
        title: "Lifting & Transfer Systems",
        description: "Professional lifting equipment, ceiling hoists, and transfer solutions for safe patient handling",
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        slug: "lifting-transfer-systems",
        isActive: true,
        displayOrder: 2,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 3,
        title: "Sensory Integration",
        description: "Multi-sensory rooms, therapy equipment, and specialized environments for sensory development",
        image: "/attached_assets/maxresdefault_1752003228921.jpg",
        slug: "sensory-integration",
        isActive: true,
        displayOrder: 3,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 4,
        title: "Stair Lifts & Access",
        description: "Residential and commercial stair lifts, platform lifts, and accessibility solutions",
        image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
        slug: "stair-lifts-access",
        isActive: true,
        displayOrder: 4,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 5,
        title: "Rehabilitation Equipment",
        description: "Therapeutic exercise machines, physiotherapy equipment, and rehabilitation technology",
        image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg",
        slug: "rehabilitation-equipment",
        isActive: true,
        displayOrder: 5,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 6,
        title: "Daily Living Aids",
        description: "Assistive tools, bathroom safety equipment, and devices for independent daily living",
        image: "/attached_assets/1601936002aboutus_small2_1752007885488.jpg",
        slug: "daily-living-aids",
        isActive: true,
        displayOrder: 6,
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    categoryData.forEach((cat) => {
      this.catalogueCategories.set(cat.id, cat);
    });
  }
  seedBrochures() {
    const brochureData = [
      // Wheelchairs & Mobility
      {
        id: 1,
        title: "Premium Wheelchair Collection 2024",
        description: "Complete range of manual and electric wheelchairs with detailed specifications and features",
        categoryId: 1,
        filename: "wheelchair-collection-2024.pdf",
        fileUrl: "/brochures/wheelchair-collection-2024.pdf",
        fileSize: "2.4 MB",
        downloadCount: 145,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 2,
        title: "Mobility Scooter Guide",
        description: "Comprehensive guide to mobility scooters for indoor and outdoor use",
        categoryId: 1,
        filename: "mobility-scooter-guide.pdf",
        fileUrl: "/brochures/mobility-scooter-guide.pdf",
        fileSize: "1.8 MB",
        downloadCount: 98,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 3,
        title: "Walking Aids & Support Equipment",
        description: "Walking frames, rollators, and mobility support devices for enhanced stability",
        categoryId: 1,
        filename: "walking-aids-catalog.pdf",
        fileUrl: "/brochures/walking-aids-catalog.pdf",
        fileSize: "1.2 MB",
        downloadCount: 67,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      // Lifting & Transfer Systems
      {
        id: 4,
        title: "Ceiling Hoist Systems",
        description: "Professional ceiling-mounted lifting solutions for healthcare facilities",
        categoryId: 2,
        filename: "ceiling-hoist-systems.pdf",
        fileUrl: "/brochures/ceiling-hoist-systems.pdf",
        fileSize: "3.1 MB",
        downloadCount: 234,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 5,
        title: "Mobile Lifting Equipment",
        description: "Portable hoists and transfer aids for flexible patient handling",
        categoryId: 2,
        filename: "mobile-lifting-equipment.pdf",
        fileUrl: "/brochures/mobile-lifting-equipment.pdf",
        fileSize: "2.6 MB",
        downloadCount: 156,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      // Sensory Integration
      {
        id: 6,
        title: "Multi-Sensory Room Design Guide",
        description: "Complete guide to designing and equipping multi-sensory therapy environments",
        categoryId: 3,
        filename: "multi-sensory-room-guide.pdf",
        fileUrl: "/brochures/multi-sensory-room-guide.pdf",
        fileSize: "4.2 MB",
        downloadCount: 189,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 7,
        title: "Sensory Equipment Catalog",
        description: "Interactive equipment for sensory stimulation and therapeutic activities",
        categoryId: 3,
        filename: "sensory-equipment-catalog.pdf",
        fileUrl: "/brochures/sensory-equipment-catalog.pdf",
        fileSize: "2.9 MB",
        downloadCount: 123,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      // Stair Lifts & Access
      {
        id: 8,
        title: "Residential Stair Lift Solutions",
        description: "Home stair lifts for straight and curved staircases with installation guide",
        categoryId: 4,
        filename: "residential-stair-lifts.pdf",
        fileUrl: "/brochures/residential-stair-lifts.pdf",
        fileSize: "2.1 MB",
        downloadCount: 87,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 9,
        title: "Platform Lifts & Accessibility",
        description: "Vertical platform lifts and accessibility solutions for commercial buildings",
        categoryId: 4,
        filename: "platform-lifts-accessibility.pdf",
        fileUrl: "/brochures/platform-lifts-accessibility.pdf",
        fileSize: "1.9 MB",
        downloadCount: 76,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      // Rehabilitation Equipment
      {
        id: 10,
        title: "HUR Rehabilitation Technology",
        description: "Pneumatic exercise equipment for neurological and spinal cord rehabilitation",
        categoryId: 5,
        filename: "hur-rehabilitation-technology.pdf",
        fileUrl: "/brochures/hur-rehabilitation-technology.pdf",
        fileSize: "3.5 MB",
        downloadCount: 267,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 11,
        title: "Physiotherapy Equipment Range",
        description: "Professional physiotherapy tools and therapeutic exercise machines",
        categoryId: 5,
        filename: "physiotherapy-equipment-range.pdf",
        fileUrl: "/brochures/physiotherapy-equipment-range.pdf",
        fileSize: "2.7 MB",
        downloadCount: 178,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      // Daily Living Aids
      {
        id: 12,
        title: "Bathroom Safety Solutions",
        description: "Complete range of bathroom aids, shower seats, and safety equipment",
        categoryId: 6,
        filename: "bathroom-safety-solutions.pdf",
        fileUrl: "/brochures/bathroom-safety-solutions.pdf",
        fileSize: "1.6 MB",
        downloadCount: 94,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: 13,
        title: "Kitchen & Dining Aids",
        description: "Adaptive tools and equipment for independent meal preparation and dining",
        categoryId: 6,
        filename: "kitchen-dining-aids.pdf",
        fileUrl: "/brochures/kitchen-dining-aids.pdf",
        fileSize: "1.4 MB",
        downloadCount: 55,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    brochureData.forEach((brochure) => {
      this.brochures.set(brochure.id, brochure);
    });
  }
  // Catalogue Categories
  async getCatalogueCategories() {
    return Array.from(this.catalogueCategories.values()).filter((cat) => cat.isActive).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }
  async getCatalogueCategory(id) {
    return this.catalogueCategories.get(id);
  }
  async getCatalogueCategoryBySlug(slug) {
    return Array.from(this.catalogueCategories.values()).find((cat) => cat.slug === slug);
  }
  async createCatalogueCategory(insertCategory) {
    const id = this.currentId++;
    const category = {
      ...insertCategory,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertCategory.description ?? null,
      isActive: insertCategory.isActive ?? true,
      displayOrder: insertCategory.displayOrder ?? 0
    };
    this.catalogueCategories.set(id, category);
    return category;
  }
  // Brochures
  async getBrochures() {
    return Array.from(this.brochures.values()).filter((brochure) => brochure.isActive);
  }
  async getBrochure(id) {
    return this.brochures.get(id);
  }
  async getBrochuresByCategory(categoryId) {
    return Array.from(this.brochures.values()).filter((brochure) => brochure.categoryId === categoryId && brochure.isActive).sort((a, b) => b.downloadCount - a.downloadCount);
  }
  async createBrochure(insertBrochure) {
    const id = this.currentId++;
    const brochure = {
      ...insertBrochure,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertBrochure.description ?? null,
      categoryId: insertBrochure.categoryId ?? null,
      fileSize: insertBrochure.fileSize ?? null,
      downloadCount: insertBrochure.downloadCount ?? 0,
      isActive: insertBrochure.isActive ?? true
    };
    this.brochures.set(id, brochure);
    return brochure;
  }
  async incrementDownloadCount(id) {
    const brochure = this.brochures.get(id);
    if (brochure) {
      this.brochures.set(id, { ...brochure, downloadCount: (brochure.downloadCount ?? 0) + 1 });
    }
  }
};
var storage = process.env.NODE_ENV === "production" && process.env.DATABASE_URL ? new PostgresStorage(process.env.DATABASE_URL) : new MemStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  const requireAuth = (req, res, next) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };
  const requireAdmin = async (req, res, next) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    req.user = user;
    next();
  };
  app2.post("/api/auth/login", async (req, res) => {
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
  app2.post("/api/auth/register", async (req, res) => {
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
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });
  app2.get("/api/auth/me", async (req, res) => {
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
  app2.get("/api/banners", async (req, res) => {
    try {
      const banners2 = await storage.getActiveBanners();
      res.json(banners2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const { parentId } = req.query;
      let categories2;
      if (parentId !== void 0) {
        const pid = parentId === "null" ? null : parseInt(parentId);
        categories2 = await storage.getCategoriesByParent(pid);
      } else {
        categories2 = await storage.getCategories();
      }
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  app2.get("/api/categories/:id", async (req, res) => {
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
  app2.get("/api/products", async (req, res) => {
    try {
      const { categoryId, featured, search } = req.query;
      let products2;
      if (search) {
        products2 = await storage.searchProducts(search);
      } else if (categoryId) {
        products2 = await storage.getProductsByCategory(parseInt(categoryId));
      } else if (featured === "true") {
        products2 = await storage.getFeaturedProducts();
      } else {
        products2 = await storage.getProducts();
      }
      res.json(products2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
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
  app2.get("/api/seminars", async (req, res) => {
    try {
      const { upcoming, type } = req.query;
      let seminars2;
      if (upcoming === "true") {
        seminars2 = await storage.getUpcomingSeminars();
      } else {
        seminars2 = await storage.getSeminars();
      }
      if (type) {
        seminars2 = seminars2.filter((seminar) => seminar.type === type);
      }
      res.json(seminars2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seminars" });
    }
  });
  app2.get("/api/seminars/:id", async (req, res) => {
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
  app2.get("/api/events", async (req, res) => {
    try {
      const { recent } = req.query;
      let events2;
      if (recent === "true") {
        events2 = await storage.getRecentEvents();
      } else {
        events2 = await storage.getEvents();
      }
      res.json(events2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
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
  app2.get("/api/achievements", async (req, res) => {
    try {
      const achievements2 = await storage.getAchievements();
      res.json(achievements2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });
  app2.get("/api/enquiries", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      const enquiries2 = await storage.getEnquiriesByUser(userId);
      res.json(enquiries2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enquiries" });
    }
  });
  app2.get("/api/enquiries/:id", requireAuth, async (req, res) => {
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
  app2.post("/api/enquiries", requireAuth, async (req, res) => {
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
  app2.post("/api/enquiries/:id/messages", requireAuth, async (req, res) => {
    try {
      const enquiryId = parseInt(req.params.id);
      const userId = req.session.userId;
      const enquiry = await storage.getEnquiry(enquiryId);
      if (!enquiry || enquiry.userId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      const messageData = insertEnquiryMessageSchema.parse({
        enquiryId,
        senderId: userId,
        senderType: "user",
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
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, subject } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }
      console.log("Contact form submission:", { name, email, phone, message, subject });
      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const { email, consent } = req.body;
      if (!email || !consent) {
        return res.status(400).json({ error: "Email and consent are required" });
      }
      console.log("Newsletter subscription:", { email, consent });
      res.json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });
  app2.get("/api/catalogue/categories", async (req, res) => {
    try {
      const categories2 = await storage.getCatalogueCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch catalogue categories" });
    }
  });
  app2.get("/api/catalogue/categories/:slug", async (req, res) => {
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
  app2.get("/api/catalogue/categories/:categoryId/brochures", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const brochures2 = await storage.getBrochuresByCategory(categoryId);
      res.json(brochures2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brochures" });
    }
  });
  app2.post("/api/catalogue/brochures/:id/download", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const brochure = await storage.getBrochure(id);
      if (!brochure) {
        return res.status(404).json({ error: "Brochure not found" });
      }
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
  app2.post("/api/admin/products", requireAdmin, async (req, res) => {
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
  app2.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
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
  app2.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
  app2.post("/api/admin/categories", requireAdmin, async (req, res) => {
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
  app2.put("/api/admin/categories/:id", requireAdmin, async (req, res) => {
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
  app2.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCategory(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });
  app2.post("/api/admin/seminars", requireAdmin, async (req, res) => {
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
  app2.put("/api/admin/seminars/:id", requireAdmin, async (req, res) => {
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
  app2.delete("/api/admin/seminars/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSeminar(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete seminar" });
    }
  });
  app2.post("/api/admin/events", requireAdmin, async (req, res) => {
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
  app2.put("/api/admin/events/:id", requireAdmin, async (req, res) => {
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
  app2.delete("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEvent(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  });
  app2.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const products2 = await storage.getProducts();
      const categories2 = await storage.getCategories();
      const seminars2 = await storage.getSeminars();
      const events2 = await storage.getEvents();
      const enquiries2 = await storage.getEnquiries();
      res.json({
        totalProducts: products2.length,
        totalCategories: categories2.length,
        totalSeminars: seminars2.length,
        totalEvents: events2.length,
        pendingEnquiries: enquiries2.filter((e) => e.status === "new").length
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin stats" });
    }
  });
  app2.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.post("/api/admin/users", requireAdmin, async (req, res) => {
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
  app2.put("/api/admin/users/:id", requireAdmin, async (req, res) => {
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
  app2.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUser(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static("attached_assets"));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
