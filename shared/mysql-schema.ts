import { z } from "zod";

// MySQL Schema Definitions for AbleTools

// User schema
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email().max(100),
  password: z.string().min(6).max(255),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  role: z.enum(['admin', 'user']).default('user'),
  address: z.string().max(255).nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
  city: z.string().max(50).nullable().optional(),
  postcode: z.string().max(10).nullable().optional(),
  occupation: z.string().max(100).nullable().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & {
  id: number;
  createdAt: Date;
};

// Category schema
export const insertCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  icon: z.string().max(50),
  parentId: z.number().nullable().optional(),
  image: z.string().max(255).nullable().optional(),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = InsertCategory & {
  id: number;
};

// Product schema
export const insertProductSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string(),
  categoryId: z.number(),
  images: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  specifications: z.string().nullable().optional(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = InsertProduct & {
  id: number;
  createdAt: Date;
};

// Seminar schema
export const insertSeminarSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string(),
  content: z.string(),
  date: z.string(), // ISO date string
  time: z.string(),
  duration: z.string(),
  location: z.string(),
  instructor: z.string(),
  maxParticipants: z.number().default(50),
  currentParticipants: z.number().default(0),
  price: z.number().default(0),
  image: z.string().nullable().optional(),
  type: z.enum(['seminar', 'training']).default('seminar'),
  isActive: z.boolean().default(true),
});

export type InsertSeminar = z.infer<typeof insertSeminarSchema>;
export type Seminar = InsertSeminar & {
  id: number;
  createdAt: Date;
};

// Event schema
export const insertEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string(),
  content: z.string(),
  date: z.string(),
  location: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = InsertEvent & {
  id: number;
  createdAt: Date;
};

// Enquiry schema
export const insertEnquirySchema = z.object({
  userId: z.number().nullable().optional(),
  name: z.string().min(1).max(100),
  email: z.string().email().max(100),
  phone: z.string().max(20).nullable().optional(),
  subject: z.string().min(1).max(200),
  message: z.string(),
  status: z.enum(['open', 'in-progress', 'closed']).default('open'),
  productId: z.number().nullable().optional(),
});

export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = InsertEnquiry & {
  id: number;
  createdAt: Date;
};

// Enquiry Message schema
export const insertEnquiryMessageSchema = z.object({
  enquiryId: z.number(),
  senderId: z.number().nullable().optional(),
  senderName: z.string().max(100),
  senderEmail: z.string().email().max(100),
  message: z.string(),
  isFromAdmin: z.boolean().default(false),
});

export type InsertEnquiryMessage = z.infer<typeof insertEnquiryMessageSchema>;
export type EnquiryMessage = InsertEnquiryMessage & {
  id: number;
  createdAt: Date;
};

// Achievement schema
export const insertAchievementSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string(),
  date: z.string(),
  image: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
});

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = InsertAchievement & {
  id: number;
};

// Banner schema
export const insertBannerSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().nullable().optional(),
  image: z.string(),
  link: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Banner = InsertBanner & {
  id: number;
};

// Catalogue Category schema
export const insertCatalogueCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  slug: z.string().min(1).max(100),
  icon: z.string().max(50),
  sortOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

export type InsertCatalogueCategory = z.infer<typeof insertCatalogueCategorySchema>;
export type CatalogueCategory = InsertCatalogueCategory & {
  id: number;
};

// Brochure schema
export const insertBrochureSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().nullable().optional(),
  fileName: z.string().min(1).max(255),
  filePath: z.string().min(1).max(500),
  fileSize: z.number().nullable().optional(),
  categoryId: z.number().nullable().optional(),
  downloadCount: z.number().default(0),
  isActive: z.boolean().default(true),
});

export type InsertBrochure = z.infer<typeof insertBrochureSchema>;
export type Brochure = InsertBrochure & {
  id: number;
  createdAt: Date;
};