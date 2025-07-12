import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { 
  type User, type InsertUser, type Category, type InsertCategory, 
  type Product, type InsertProduct, type Seminar, type InsertSeminar,
  type Event, type InsertEvent, type Enquiry, type InsertEnquiry,
  type EnquiryMessage, type InsertEnquiryMessage, type Achievement, type InsertAchievement,
  type Banner, type InsertBanner, type CatalogueCategory, type InsertCatalogueCategory,
  type Brochure, type InsertBrochure
} from "../shared/schema";
import type { IStorage } from "./storage";

export class MySQLStorage implements IStorage {
  private connection: mysql.Connection | null = null;

  constructor(private connectionString: string) {
    // For development, use a simple localhost connection if DATABASE_URL is PostgreSQL
    if (connectionString.includes('postgresql://') || connectionString.includes('postgres://')) {
      this.connectionString = 'mysql://root:@localhost:3306/abletools';
    }
  }

  async connect() {
    if (!this.connection) {
      // Parse the connection string and create proper MySQL config
      const url = new URL(this.connectionString);
      const config = {
        host: url.hostname,
        port: parseInt(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1), // Remove leading slash
        ssl: false, // Disable SSL for local development
        connectTimeout: 60000,
        acquireTimeout: 60000,
      };
      
      this.connection = await mysql.createConnection(config);
      await this.initializeTables();
      await this.seedInitialData();
    }
    return this.connection;
  }

  private async initializeTables() {
    const conn = await this.connect();
    
    // Create tables with MySQL syntax
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(191) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        city VARCHAR(100),
        postcode VARCHAR(20),
        occupation VARCHAR(100),
        role VARCHAR(20) DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(255),
        image VARCHAR(500),
        parent_id INT,
        is_active BOOLEAN DEFAULT TRUE,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT NOT NULL,
        images TEXT,
        is_featured BOOLEAN DEFAULT FALSE,
        specifications TEXT,
        price VARCHAR(50),
        sku VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS seminars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        location VARCHAR(255),
        speaker VARCHAR(255),
        image VARCHAR(500),
        fee VARCHAR(100),
        max_participants INT,
        type VARCHAR(20) NOT NULL DEFAULT 'seminar',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        date TIMESTAMP NOT NULL,
        image VARCHAR(500),
        excerpt TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        date TIMESTAMP NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(500),
        image VARCHAR(500) NOT NULL,
        link VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        \`order\` INT DEFAULT 0
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        type VARCHAR(100) NOT NULL,
        about VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS enquiry_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        enquiry_id INT NOT NULL,
        sender_id INT,
        sender_type VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS catalogue_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT TRUE,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS brochures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT,
        filename VARCHAR(255) NOT NULL,
        file_url VARCHAR(500) NOT NULL,
        file_size VARCHAR(50),
        download_count INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES catalogue_categories(id)
      )
    `);
  }

  private async seedInitialData() {
    const conn = await this.connect();
    
    // Check if admin user exists
    const [adminUsers] = await conn.execute(
      'SELECT id FROM users WHERE role = ?',
      ['admin']
    );
    
    if ((adminUsers as any[]).length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await conn.execute(`
        INSERT INTO users (username, email, password, first_name, last_name, role)
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['admin', 'admin@abletools.com.cy', hashedPassword, 'Admin', 'User', 'admin']);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as User[])[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
    return (rows as User[])[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as User[])[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const conn = await this.connect();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    const [result] = await conn.execute(`
      INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, postcode, occupation, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      user.username, user.email, hashedPassword, user.firstName, user.lastName,
      user.phone || null, user.address || null, user.city || null, user.postcode || null,
      user.occupation || null, (user as any).role || 'user'
    ]);
    
    return this.getUser((result as any).insertId)!;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM categories WHERE is_active = TRUE ORDER BY display_order');
    return rows as Category[];
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return (rows as Category[])[0];
  }

  async getCategoriesByParent(parentId: number | null): Promise<Category[]> {
    const conn = await this.connect();
    if (parentId === null) {
      const [rows] = await conn.execute('SELECT * FROM categories WHERE parent_id IS NULL AND is_active = TRUE ORDER BY display_order');
      return rows as Category[];
    } else {
      const [rows] = await conn.execute('SELECT * FROM categories WHERE parent_id = ? AND is_active = TRUE ORDER BY display_order', [parentId]);
      return rows as Category[];
    }
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO categories (name, description, icon, image, parent_id, display_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      category.name, category.description || null, category.icon || null,
      category.image || null, category.parentId || null, (category as any).displayOrder || 0
    ]);
    
    return this.getCategory((result as any).insertId)!;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC');
    return (rows as any[]).map(row => ({
      ...row,
      images: row.images ? JSON.parse(row.images) : []
    }));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE id = ?', [id]);
    const product = (rows as any[])[0];
    if (product) {
      product.images = product.images ? JSON.parse(product.images) : [];
    }
    return product;
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE category_id = ? AND is_active = TRUE', [categoryId]);
    return (rows as any[]).map(row => ({
      ...row,
      images: row.images ? JSON.parse(row.images) : []
    }));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE is_featured = TRUE AND is_active = TRUE LIMIT 6');
    return (rows as any[]).map(row => ({
      ...row,
      images: row.images ? JSON.parse(row.images) : []
    }));
  }

  async searchProducts(query: string): Promise<Product[]> {
    const conn = await this.connect();
    const searchTerm = `%${query}%`;
    const [rows] = await conn.execute(
      'SELECT * FROM products WHERE (name LIKE ? OR description LIKE ?) AND is_active = TRUE',
      [searchTerm, searchTerm]
    );
    return (rows as any[]).map(row => ({
      ...row,
      images: row.images ? JSON.parse(row.images) : []
    }));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO products (name, description, category_id, images, is_featured, specifications, price, sku)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      product.name, product.description || null, product.categoryId,
      JSON.stringify((product as any).images || []), product.isFeatured || false,
      product.specifications || null, (product as any).price || null, (product as any).sku || null
    ]);
    
    return this.getProduct((result as any).insertId)!;
  }

  // Seminar methods
  async getSeminars(): Promise<Seminar[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM seminars WHERE is_active = TRUE ORDER BY date DESC');
    return rows as Seminar[];
  }

  async getSeminar(id: number): Promise<Seminar | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM seminars WHERE id = ?', [id]);
    return (rows as Seminar[])[0];
  }

  async getUpcomingSeminars(): Promise<Seminar[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM seminars WHERE date >= NOW() AND is_active = TRUE ORDER BY date ASC');
    return rows as Seminar[];
  }

  async createSeminar(seminar: InsertSeminar): Promise<Seminar> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO seminars (title, description, date, location, speaker, image, fee, max_participants, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      seminar.title, seminar.description || null, seminar.date,
      seminar.location || null, seminar.speaker || null, seminar.image || null,
      seminar.fee || null, seminar.maxParticipants || null, seminar.type || 'seminar'
    ]);
    
    return this.getSeminar((result as any).insertId)!;
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM events WHERE is_active = TRUE ORDER BY date DESC');
    return rows as Event[];
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM events WHERE id = ?', [id]);
    return (rows as Event[])[0];
  }

  async getRecentEvents(): Promise<Event[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM events WHERE is_active = TRUE ORDER BY date DESC LIMIT 6');
    return rows as Event[];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO events (title, content, date, image, excerpt)
      VALUES (?, ?, ?, ?, ?)
    `, [
      event.title, event.content || null, event.date,
      event.image || null, event.excerpt || null
    ]);
    
    return this.getEvent((result as any).insertId)!;
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM achievements WHERE is_active = TRUE ORDER BY date DESC');
    return rows as Achievement[];
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO achievements (title, description, image, date)
      VALUES (?, ?, ?, ?)
    `, [
      achievement.title, achievement.description || null,
      achievement.image || null, (achievement as any).date
    ]);
    
    const [created] = await conn.execute('SELECT * FROM achievements WHERE id = ?', [(result as any).insertId]);
    return (created as Achievement[])[0];
  }

  // Banner methods
  async getActiveBanners(): Promise<Banner[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM banners WHERE is_active = TRUE ORDER BY `order`');
    return rows as Banner[];
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO banners (title, subtitle, image, link, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `, [
      banner.title, banner.subtitle || null, banner.image,
      banner.link || null, (banner as any).order || 0
    ]);
    
    const [created] = await conn.execute('SELECT * FROM banners WHERE id = ?', [(result as any).insertId]);
    return (created as Banner[])[0];
  }

  // Catalogue Category methods
  async getCatalogueCategories(): Promise<CatalogueCategory[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM catalogue_categories WHERE is_active = TRUE ORDER BY display_order');
    return rows as CatalogueCategory[];
  }

  async getCatalogueCategory(id: number): Promise<CatalogueCategory | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM catalogue_categories WHERE id = ?', [id]);
    return (rows as CatalogueCategory[])[0];
  }

  async getCatalogueCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM catalogue_categories WHERE slug = ?', [slug]);
    return (rows as CatalogueCategory[])[0];
  }

  async createCatalogueCategory(category: InsertCatalogueCategory): Promise<CatalogueCategory> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO catalogue_categories (title, description, image, slug, display_order)
      VALUES (?, ?, ?, ?, ?)
    `, [
      category.title, category.description || null, category.image,
      category.slug, (category as any).displayOrder || 0
    ]);
    
    return this.getCatalogueCategory((result as any).insertId)!;
  }

  // Brochure methods
  async getBrochures(): Promise<Brochure[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM brochures WHERE is_active = TRUE ORDER BY created_at DESC');
    return rows as Brochure[];
  }

  async getBrochure(id: number): Promise<Brochure | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM brochures WHERE id = ?', [id]);
    return (rows as Brochure[])[0];
  }

  async getBrochuresByCategory(categoryId: number): Promise<Brochure[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM brochures WHERE category_id = ? AND is_active = TRUE', [categoryId]);
    return rows as Brochure[];
  }

  async createBrochure(brochure: InsertBrochure): Promise<Brochure> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO brochures (title, description, category_id, filename, file_url, file_size)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      brochure.title, brochure.description || null, brochure.categoryId,
      brochure.filename, brochure.fileUrl, brochure.fileSize || null
    ]);
    
    return this.getBrochure((result as any).insertId)!;
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const conn = await this.connect();
    await conn.execute('UPDATE brochures SET download_count = download_count + 1 WHERE id = ?', [id]);
  }

  // Enquiry methods (stub implementations for now)
  async getEnquiries(): Promise<Enquiry[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
    return rows as Enquiry[];
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiries WHERE id = ?', [id]);
    return (rows as Enquiry[])[0];
  }

  async getEnquiriesByUser(userId: number): Promise<Enquiry[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiries WHERE user_id = ?', [userId]);
    return rows as Enquiry[];
  }

  async createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO enquiries (user_id, type, about, message)
      VALUES (?, ?, ?, ?)
    `, [enquiry.userId, enquiry.type, enquiry.about || null, enquiry.message]);
    
    return this.getEnquiry((result as any).insertId)!;
  }

  async updateEnquiryStatus(id: number, status: string): Promise<void> {
    const conn = await this.connect();
    await conn.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
  }

  async getEnquiryMessages(enquiryId: number): Promise<EnquiryMessage[]> {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiry_messages WHERE enquiry_id = ? ORDER BY created_at', [enquiryId]);
    return rows as EnquiryMessage[];
  }

  async createEnquiryMessage(message: InsertEnquiryMessage): Promise<EnquiryMessage> {
    const conn = await this.connect();
    const [result] = await conn.execute(`
      INSERT INTO enquiry_messages (enquiry_id, sender_id, sender_type, message)
      VALUES (?, ?, ?, ?)
    `, [message.enquiryId, message.senderId || null, message.senderType, message.message]);
    
    const [created] = await conn.execute('SELECT * FROM enquiry_messages WHERE id = ?', [(result as any).insertId]);
    return (created as EnquiryMessage[])[0];
  }
}