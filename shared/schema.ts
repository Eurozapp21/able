import { mysqlTable, text, int, boolean, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  postcode: varchar("postcode", { length: 20 }),
  occupation: varchar("occupation", { length: 100 }),
  role: varchar("role", { length: 20 }).default("user"), // "admin" or "user"
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }),
  image: varchar("image", { length: 500 }),
  parentId: int("parent_id"),
  isActive: boolean("is_active").default(true),
  displayOrder: int("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: int("category_id").notNull(),
  images: text("images"), // JSON string array
  isFeatured: boolean("is_featured").default(false),
  specifications: text("specifications"),
  price: varchar("price", { length: 50 }),
  sku: varchar("sku", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const seminars = mysqlTable("seminars", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  location: varchar("location", { length: 255 }),
  speaker: varchar("speaker", { length: 255 }),
  image: varchar("image", { length: 500 }),
  fee: varchar("fee", { length: 100 }),
  maxParticipants: int("max_participants"),
  type: varchar("type", { length: 20 }).notNull().default("seminar"), // "seminar" or "training"
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = mysqlTable("events", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  date: timestamp("date").notNull(),
  image: varchar("image", { length: 500 }),
  excerpt: text("excerpt"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enquiries = mysqlTable("enquiries", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  about: varchar("about", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enquiryMessages = mysqlTable("enquiry_messages", {
  id: int("id").primaryKey().autoincrement(),
  enquiryId: int("enquiry_id").notNull(),
  senderId: int("sender_id"),
  senderType: varchar("sender_type", { length: 20 }).notNull(), // 'user' or 'admin'
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const achievements = mysqlTable("achievements", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  date: timestamp("date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const banners = mysqlTable("banners", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  image: varchar("image", { length: 500 }).notNull(),
  link: varchar("link", { length: 500 }),
  isActive: boolean("is_active").default(true),
  order: int("order").default(0),
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

export const catalogueCategories = mysqlTable("catalogue_categories", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true),
  displayOrder: int("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brochures = mysqlTable("brochures", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: int("category_id").references(() => catalogueCategories.id),
  filename: varchar("filename", { length: 255 }).notNull(),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileSize: varchar("file_size", { length: 50 }),
  downloadCount: int("download_count").default(0),
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
