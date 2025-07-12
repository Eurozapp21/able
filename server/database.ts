import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { 
  users, categories, products, seminars, enquiries, enquiryMessages,
  catalogueCategories, brochures,
  type User, type InsertUser, type Category, type InsertCategory,
  type Product, type InsertProduct, type Seminar, type InsertSeminar,
  type Enquiry, type InsertEnquiry, type EnquiryMessage, type InsertEnquiryMessage,
  type CatalogueCategory, type InsertCatalogueCategory,
  type Brochure, type InsertBrochure
} from "../shared/types";
import { eq, like, and, desc, sql } from "drizzle-orm";

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(connectionString);
export const db = drizzle(sql);

// Storage interface
export class DatabaseStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(userData: InsertUser): Promise<User> {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).where(eq(categories.isActive, true)).orderBy(categories.sortOrder);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0];
  }

  async getCategoriesByParent(parentId: number | null): Promise<Category[]> {
    if (parentId === null) {
      return db.select().from(categories)
        .where(and(eq(categories.isActive, true), sql`${categories.parentId} IS NULL`))
        .orderBy(categories.sortOrder);
    }
    return db.select().from(categories)
      .where(and(eq(categories.isActive, true), eq(categories.parentId, parentId)))
      .orderBy(categories.sortOrder);
  }

  async createCategory(categoryData: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(categoryData).returning();
    return result[0];
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.isActive, true)).orderBy(desc(products.createdAt));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return db.select().from(products)
      .where(and(eq(products.isActive, true), eq(products.categoryId, categoryId)))
      .orderBy(desc(products.createdAt));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products)
      .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
      .orderBy(desc(products.createdAt))
      .limit(6);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return db.select().from(products)
      .where(and(
        eq(products.isActive, true),
        like(products.name, `%${query}%`)
      ))
      .orderBy(desc(products.createdAt));
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(productData).returning();
    return result[0];
  }

  // Seminars
  async getSeminars(): Promise<Seminar[]> {
    return db.select().from(seminars).orderBy(desc(seminars.startDate));
  }

  async getSeminar(id: number): Promise<Seminar | undefined> {
    const result = await db.select().from(seminars).where(eq(seminars.id, id)).limit(1);
    return result[0];
  }

  async getSeminarsByType(type: string): Promise<Seminar[]> {
    return db.select().from(seminars)
      .where(eq(seminars.type, type))
      .orderBy(desc(seminars.startDate));
  }

  async createSeminar(seminarData: InsertSeminar): Promise<Seminar> {
    const result = await db.insert(seminars).values(seminarData).returning();
    return result[0];
  }

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    return db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    const result = await db.select().from(enquiries).where(eq(enquiries.id, id)).limit(1);
    return result[0];
  }

  async getEnquiriesByUser(userId: number): Promise<Enquiry[]> {
    return db.select().from(enquiries)
      .where(eq(enquiries.userId, userId))
      .orderBy(desc(enquiries.createdAt));
  }

  async createEnquiry(enquiryData: InsertEnquiry): Promise<Enquiry> {
    const result = await db.insert(enquiries).values(enquiryData).returning();
    return result[0];
  }

  async updateEnquiryStatus(id: number, status: string): Promise<void> {
    await db.update(enquiries)
      .set({ status, updatedAt: new Date() })
      .where(eq(enquiries.id, id));
  }

  // Enquiry Messages
  async getEnquiryMessages(enquiryId: number): Promise<EnquiryMessage[]> {
    return db.select().from(enquiryMessages)
      .where(eq(enquiryMessages.enquiryId, enquiryId))
      .orderBy(enquiryMessages.createdAt);
  }

  async createEnquiryMessage(messageData: InsertEnquiryMessage): Promise<EnquiryMessage> {
    const result = await db.insert(enquiryMessages).values(messageData).returning();
    return result[0];
  }

  // Catalogue Categories
  async getCatalogueCategories(): Promise<CatalogueCategory[]> {
    return db.select().from(catalogueCategories)
      .where(eq(catalogueCategories.isActive, true))
      .orderBy(catalogueCategories.sortOrder);
  }

  async getCatalogueCategory(id: number): Promise<CatalogueCategory | undefined> {
    const result = await db.select().from(catalogueCategories).where(eq(catalogueCategories.id, id)).limit(1);
    return result[0];
  }

  async getCatalogueCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined> {
    const result = await db.select().from(catalogueCategories).where(eq(catalogueCategories.slug, slug)).limit(1);
    return result[0];
  }

  async createCatalogueCategory(categoryData: InsertCatalogueCategory): Promise<CatalogueCategory> {
    const result = await db.insert(catalogueCategories).values(categoryData).returning();
    return result[0];
  }

  // Brochures
  async getBrochures(): Promise<Brochure[]> {
    return db.select().from(brochures)
      .where(eq(brochures.isActive, true))
      .orderBy(desc(brochures.createdAt));
  }

  async getBrochure(id: number): Promise<Brochure | undefined> {
    const result = await db.select().from(brochures).where(eq(brochures.id, id)).limit(1);
    return result[0];
  }

  async getBrochuresByCategory(categoryId: number): Promise<Brochure[]> {
    return db.select().from(brochures)
      .where(and(eq(brochures.isActive, true), eq(brochures.categoryId, categoryId)))
      .orderBy(desc(brochures.createdAt));
  }

  async createBrochure(brochureData: InsertBrochure): Promise<Brochure> {
    const result = await db.insert(brochures).values(brochureData).returning();
    return result[0];
  }

  async incrementDownloadCount(id: number): Promise<void> {
    await db.update(brochures)
      .set({ downloadCount: sql`${brochures.downloadCount} + 1` })
      .where(eq(brochures.id, id));
  }
}

export const storage = new DatabaseStorage();