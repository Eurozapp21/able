import { pgTable, serial, text, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  company: text("company"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow()
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  parentId: integer("parent_id"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true)
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  image: text("image"),
  images: text("images").array(),
  price: decimal("price", { precision: 10, scale: 2 }),
  categoryId: integer("category_id").notNull(),
  specifications: text("specifications"),
  features: text("features").array(),
  isFeatured: boolean("is_featured").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// Seminars table
export const seminars = pgTable("seminars", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  content: text("content"),
  image: text("image"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  location: text("location"),
  price: decimal("price", { precision: 10, scale: 2 }),
  maxParticipants: integer("max_participants"),
  type: text("type").default("seminar"), // seminar, training, event
  status: text("status").default("upcoming"), // upcoming, ongoing, completed, cancelled
  createdAt: timestamp("created_at").defaultNow()
});

// Enquiries table
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  productId: integer("product_id"),
  status: text("status").default("open"), // open, in_progress, resolved, closed
  priority: text("priority").default("medium"), // low, medium, high, urgent
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Enquiry messages table
export const enquiryMessages = pgTable("enquiry_messages", {
  id: serial("id").primaryKey(),
  enquiryId: integer("enquiry_id").notNull(),
  userId: integer("user_id"),
  message: text("message").notNull(),
  isFromAdmin: boolean("is_from_admin").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

// Catalogue categories table
export const catalogueCategories = pgTable("catalogue_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true)
});

// Brochures table
export const brochures = pgTable("brochures", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size"),
  categoryId: integer("category_id").notNull(),
  downloadCount: integer("download_count").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// Create schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const selectUserSchema = createSelectSchema(users);

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const selectCategorySchema = createSelectSchema(categories);

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const selectProductSchema = createSelectSchema(products);

export const insertSeminarSchema = createInsertSchema(seminars).omit({ id: true, createdAt: true });
export const selectSeminarSchema = createSelectSchema(seminars);

export const insertEnquirySchema = createInsertSchema(enquiries).omit({ id: true, createdAt: true, updatedAt: true });
export const selectEnquirySchema = createSelectSchema(enquiries);

export const insertEnquiryMessageSchema = createInsertSchema(enquiryMessages).omit({ id: true, createdAt: true });
export const selectEnquiryMessageSchema = createSelectSchema(enquiryMessages);

export const insertCatalogueCategorySchema = createInsertSchema(catalogueCategories).omit({ id: true });
export const selectCatalogueCategorySchema = createSelectSchema(catalogueCategories);

export const insertBrochureSchema = createInsertSchema(brochures).omit({ id: true, createdAt: true });
export const selectBrochureSchema = createSelectSchema(brochures);

// Type definitions
export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = z.infer<typeof selectCategorySchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = z.infer<typeof selectProductSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Seminar = z.infer<typeof selectSeminarSchema>;
export type InsertSeminar = z.infer<typeof insertSeminarSchema>;

export type Enquiry = z.infer<typeof selectEnquirySchema>;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;

export type EnquiryMessage = z.infer<typeof selectEnquiryMessageSchema>;
export type InsertEnquiryMessage = z.infer<typeof insertEnquiryMessageSchema>;

export type CatalogueCategory = z.infer<typeof selectCatalogueCategorySchema>;
export type InsertCatalogueCategory = z.infer<typeof insertCatalogueCategorySchema>;

export type Brochure = z.infer<typeof selectBrochureSchema>;
export type InsertBrochure = z.infer<typeof insertBrochureSchema>;