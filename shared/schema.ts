import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
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
  role: text("role").notNull().default("user"), // "user" or "admin"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEl: text("name_el"),
  description: text("description"),
  descriptionEl: text("description_el"),
  icon: text("icon"),
  image: text("image"),
  parentId: integer("parent_id"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const seminars = pgTable("seminars", {
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
  type: text("type").notNull().default("seminar"), // "seminar" or "training"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  date: timestamp("date").notNull(),
  image: text("image"),
  excerpt: text("excerpt"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  about: text("about"),
  message: text("message").notNull(),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enquiryMessages = pgTable("enquiry_messages", {
  id: serial("id").primaryKey(),
  enquiryId: integer("enquiry_id").notNull(),
  senderId: integer("sender_id"),
  senderType: text("sender_type").notNull(), // 'user' or 'admin'
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  image: text("image").notNull(),
  link: text("link"),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertSeminarSchema = createInsertSchema(seminars).omit({
  id: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export const insertEnquirySchema = createInsertSchema(enquiries).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertEnquiryMessageSchema = createInsertSchema(enquiryMessages).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertBannerSchema = createInsertSchema(banners).omit({
  id: true,
});

export const catalogueCategories = pgTable("catalogue_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brochures = pgTable("brochures", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: integer("category_id").references(() => catalogueCategories.id),
  filename: text("filename").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  downloadCount: integer("download_count").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCatalogueCategorySchema = createInsertSchema(catalogueCategories).omit({
  id: true,
  createdAt: true,
});

export const insertBrochureSchema = createInsertSchema(brochures).omit({
  id: true,
  createdAt: true,
});

// User Preferences Schema for Dynamic Customization
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"), // For anonymous users
  preferences: json("preferences").notNull(), // JSON object containing all preferences
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Preference settings schema
export const preferenceSchema = z.object({
  theme: z.enum(["light", "dark", "auto"]).default("light"),
  language: z.enum(["en", "el"]).default("en"),
  currency: z.enum(["EUR", "USD", "GBP"]).default("EUR"),
  productView: z.enum(["grid", "list"]).default("grid"),
  productsPerPage: z.enum(["12", "24", "48"]).default("12"),
  sortBy: z.enum(["name", "price", "featured", "newest"]).default("name"),
  showPrices: z.boolean().default(true),
  showAvailability: z.boolean().default(true),
  favoriteCategories: z.array(z.number()).default([]),
  notifications: z.object({
    newProducts: z.boolean().default(true),
    priceUpdates: z.boolean().default(false),
    seminars: z.boolean().default(true),
    newsletters: z.boolean().default(true),
  }).default({}),
  accessibility: z.object({
    highContrast: z.boolean().default(false),
    largeFonts: z.boolean().default(false),
    reducedMotion: z.boolean().default(false),
    screenReader: z.boolean().default(false),
  }).default({}),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Seminar = typeof seminars.$inferSelect;
export type InsertSeminar = z.infer<typeof insertSeminarSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Enquiry = typeof enquiries.$inferSelect;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type EnquiryMessage = typeof enquiryMessages.$inferSelect;
export type InsertEnquiryMessage = z.infer<typeof insertEnquiryMessageSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Banner = typeof banners.$inferSelect;
export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type CatalogueCategory = typeof catalogueCategories.$inferSelect;
export type InsertCatalogueCategory = z.infer<typeof insertCatalogueCategorySchema>;
export type Brochure = typeof brochures.$inferSelect;
export type InsertBrochure = z.infer<typeof insertBrochureSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type PreferenceSettings = z.infer<typeof preferenceSchema>;
