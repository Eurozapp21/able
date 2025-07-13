import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { 
  users, categories, products, seminars, events, enquiries, enquiryMessages, 
  achievements, banners, catalogueCategories, brochures,
  type User, type InsertUser, type Category, type InsertCategory, 
  type Product, type InsertProduct, type Seminar, type InsertSeminar,
  type Event, type InsertEvent, type Enquiry, type InsertEnquiry,
  type EnquiryMessage, type InsertEnquiryMessage, type Achievement, type InsertAchievement,
  type Banner, type InsertBanner, type CatalogueCategory, type InsertCatalogueCategory,
  type Brochure, type InsertBrochure
} from "@shared/schema";
import { IStorage } from "./storage";
import { eq, like, desc, asc } from 'drizzle-orm';

export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor(databaseUrl: string) {
    const client = postgres(databaseUrl);
    this.db = drizzle(client);
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await this.db.select().from(users);
  }

  async updateUser(id: number, insertUser: InsertUser): Promise<User> {
    const result = await this.db.update(users).set(insertUser).where(eq(users.id, id)).returning();
    return result[0];
  }

  async deleteUser(id: number): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await this.db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async getCategoriesByParent(parentId: number | null): Promise<Category[]> {
    return await this.db.select().from(categories).where(eq(categories.parentId, parentId));
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(insertCategory).returning();
    return result[0];
  }

  async updateCategory(id: number, insertCategory: InsertCategory): Promise<Category> {
    const result = await this.db.update(categories).set(insertCategory).where(eq(categories.id, id)).returning();
    return result[0];
  }

  async deleteCategory(id: number): Promise<void> {
    await this.db.delete(categories).where(eq(categories.id, id));
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await this.db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await this.db.select().from(products).where(eq(products.featured, true));
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await this.db.select().from(products).where(like(products.name, `%${query}%`));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await this.db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async updateProduct(id: number, insertProduct: InsertProduct): Promise<Product> {
    const result = await this.db.update(products).set(insertProduct).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: number): Promise<void> {
    await this.db.delete(products).where(eq(products.id, id));
  }

  // Seminars
  async getSeminars(): Promise<Seminar[]> {
    return await this.db.select().from(seminars);
  }

  async getSeminar(id: number): Promise<Seminar | undefined> {
    const result = await this.db.select().from(seminars).where(eq(seminars.id, id));
    return result[0];
  }

  async getUpcomingSeminars(): Promise<Seminar[]> {
    const now = new Date();
    return await this.db.select().from(seminars).where(eq(seminars.date, now));
  }

  async createSeminar(insertSeminar: InsertSeminar): Promise<Seminar> {
    const result = await this.db.insert(seminars).values(insertSeminar).returning();
    return result[0];
  }

  async updateSeminar(id: number, insertSeminar: InsertSeminar): Promise<Seminar> {
    const result = await this.db.update(seminars).set(insertSeminar).where(eq(seminars.id, id)).returning();
    return result[0];
  }

  async deleteSeminar(id: number): Promise<void> {
    await this.db.delete(seminars).where(eq(seminars.id, id));
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return await this.db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const result = await this.db.select().from(events).where(eq(events.id, id));
    return result[0];
  }

  async getRecentEvents(): Promise<Event[]> {
    return await this.db.select().from(events).orderBy(desc(events.date)).limit(3);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const result = await this.db.insert(events).values(insertEvent).returning();
    return result[0];
  }

  async updateEvent(id: number, insertEvent: InsertEvent): Promise<Event> {
    const result = await this.db.update(events).set(insertEvent).where(eq(events.id, id)).returning();
    return result[0];
  }

  async deleteEvent(id: number): Promise<void> {
    await this.db.delete(events).where(eq(events.id, id));
  }

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    return await this.db.select().from(enquiries);
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    const result = await this.db.select().from(enquiries).where(eq(enquiries.id, id));
    return result[0];
  }

  async getEnquiriesByUser(userId: number): Promise<Enquiry[]> {
    return await this.db.select().from(enquiries).where(eq(enquiries.userId, userId));
  }

  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    const result = await this.db.insert(enquiries).values(insertEnquiry).returning();
    return result[0];
  }

  async updateEnquiryStatus(id: number, status: string): Promise<void> {
    await this.db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
  }

  // Enquiry Messages
  async getEnquiryMessages(enquiryId: number): Promise<EnquiryMessage[]> {
    return await this.db.select().from(enquiryMessages).where(eq(enquiryMessages.enquiryId, enquiryId));
  }

  async createEnquiryMessage(insertMessage: InsertEnquiryMessage): Promise<EnquiryMessage> {
    const result = await this.db.insert(enquiryMessages).values(insertMessage).returning();
    return result[0];
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    return await this.db.select().from(achievements);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const result = await this.db.insert(achievements).values(insertAchievement).returning();
    return result[0];
  }

  // Banners
  async getActiveBanners(): Promise<Banner[]> {
    return await this.db.select().from(banners).where(eq(banners.isActive, true));
  }

  async createBanner(insertBanner: InsertBanner): Promise<Banner> {
    const result = await this.db.insert(banners).values(insertBanner).returning();
    return result[0];
  }

  // Catalogue Categories
  async getCatalogueCategories(): Promise<CatalogueCategory[]> {
    return await this.db.select().from(catalogueCategories);
  }

  async getCatalogueCategory(id: number): Promise<CatalogueCategory | undefined> {
    const result = await this.db.select().from(catalogueCategories).where(eq(catalogueCategories.id, id));
    return result[0];
  }

  async getCatalogueCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined> {
    const result = await this.db.select().from(catalogueCategories).where(eq(catalogueCategories.slug, slug));
    return result[0];
  }

  async createCatalogueCategory(insertCategory: InsertCatalogueCategory): Promise<CatalogueCategory> {
    const result = await this.db.insert(catalogueCategories).values(insertCategory).returning();
    return result[0];
  }

  // Brochures
  async getBrochures(): Promise<Brochure[]> {
    return await this.db.select().from(brochures);
  }

  async getBrochure(id: number): Promise<Brochure | undefined> {
    const result = await this.db.select().from(brochures).where(eq(brochures.id, id));
    return result[0];
  }

  async getBrochuresByCategory(categoryId: number): Promise<Brochure[]> {
    return await this.db.select().from(brochures).where(eq(brochures.categoryId, categoryId));
  }

  async createBrochure(insertBrochure: InsertBrochure): Promise<Brochure> {
    const result = await this.db.insert(brochures).values(insertBrochure).returning();
    return result[0];
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const brochure = await this.getBrochure(id);
    if (brochure) {
      await this.db.update(brochures).set({ 
        downloadCount: brochure.downloadCount + 1 
      }).where(eq(brochures.id, id));
    }
  }
}