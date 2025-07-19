import mysql from 'mysql2/promise';
import { 
  type User, type InsertUser, type Category, type InsertCategory, 
  type Product, type InsertProduct, type Seminar, type InsertSeminar,
  type Event, type InsertEvent, type Enquiry, type InsertEnquiry,
  type EnquiryMessage, type InsertEnquiryMessage, type Achievement, type InsertAchievement,
  type Banner, type InsertBanner, type CatalogueCategory, type InsertCatalogueCategory,
  type Brochure, type InsertBrochure
} from "../shared/mysql-schema";
import { IStorage } from "./storage";

export class MySQLStorage implements IStorage {
  private pool: mysql.Pool;

  constructor(config: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }) {
    this.pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    this.initializeTables();
  }

  private async initializeTables() {
    const connection = await this.pool.getConnection();
    try {
      // Create users table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          firstName VARCHAR(50) NOT NULL,
          lastName VARCHAR(50) NOT NULL,
          role ENUM('admin', 'user') DEFAULT 'user',
          address VARCHAR(255) NULL,
          phone VARCHAR(20) NULL,
          city VARCHAR(50) NULL,
          postcode VARCHAR(10) NULL,
          occupation VARCHAR(100) NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create categories table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description VARCHAR(500),
          icon VARCHAR(50),
          parentId INT NULL,
          image VARCHAR(255) NULL,
          FOREIGN KEY (parentId) REFERENCES categories(id) ON DELETE CASCADE
        )
      `);

      // Create products table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(200) NOT NULL,
          description TEXT,
          categoryId INT NOT NULL,
          images JSON,
          isFeatured BOOLEAN DEFAULT FALSE,
          specifications TEXT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
        )
      `);

      // Create seminars table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS seminars (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          content TEXT,
          date VARCHAR(50),
          time VARCHAR(50),
          duration VARCHAR(50),
          location VARCHAR(200),
          instructor VARCHAR(100),
          maxParticipants INT DEFAULT 50,
          currentParticipants INT DEFAULT 0,
          price DECIMAL(10, 2) DEFAULT 0,
          image VARCHAR(255) NULL,
          type ENUM('seminar', 'training') DEFAULT 'seminar',
          isActive BOOLEAN DEFAULT TRUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create events table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS events (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          content TEXT,
          date VARCHAR(50),
          location VARCHAR(200) NULL,
          image VARCHAR(255) NULL,
          isActive BOOLEAN DEFAULT TRUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create enquiries table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS enquiries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NULL,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NULL,
          subject VARCHAR(200) NOT NULL,
          message TEXT,
          status ENUM('open', 'in-progress', 'closed') DEFAULT 'open',
          productId INT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
          FOREIGN KEY (productId) REFERENCES products(id) ON DELETE SET NULL
        )
      `);

      // Create enquiry_messages table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS enquiry_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          enquiryId INT NOT NULL,
          senderId INT NULL,
          senderName VARCHAR(100),
          senderEmail VARCHAR(100),
          message TEXT,
          isFromAdmin BOOLEAN DEFAULT FALSE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (enquiryId) REFERENCES enquiries(id) ON DELETE CASCADE,
          FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE SET NULL
        )
      `);

      // Create achievements table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS achievements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          date VARCHAR(50),
          image VARCHAR(255) NULL,
          isActive BOOLEAN DEFAULT TRUE
        )
      `);

      // Create banners table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS banners (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          subtitle VARCHAR(300) NULL,
          image VARCHAR(255) NOT NULL,
          link VARCHAR(500) NULL,
          isActive BOOLEAN DEFAULT TRUE,
          sortOrder INT DEFAULT 0
        )
      `);

      // Create catalogue_categories table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS catalogue_categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description VARCHAR(500),
          slug VARCHAR(100) NOT NULL UNIQUE,
          icon VARCHAR(50),
          sortOrder INT DEFAULT 0,
          isActive BOOLEAN DEFAULT TRUE
        )
      `);

      // Create brochures table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS brochures (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description VARCHAR(1000) NULL,
          fileName VARCHAR(255) NOT NULL,
          filePath VARCHAR(500) NOT NULL,
          fileSize INT NULL,
          categoryId INT NULL,
          downloadCount INT DEFAULT 0,
          isActive BOOLEAN DEFAULT TRUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (categoryId) REFERENCES catalogue_categories(id) ON DELETE SET NULL
        )
      `);

      // Create sessions table for express-session
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS sessions (
          session_id VARCHAR(128) NOT NULL PRIMARY KEY,
          expires INT(11) UNSIGNED NOT NULL,
          data MEDIUMTEXT
        )
      `);

      console.log('✅ MySQL tables initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing MySQL tables:', error);
    } finally {
      connection.release();
    }
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return (rows as User[])[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return (rows as User[])[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return (rows as User[])[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const [result] = await this.pool.execute(
      'INSERT INTO users (username, email, password, firstName, lastName, role, address, phone, city, postcode, occupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user.username, user.email, user.password, user.firstName, user.lastName, user.role || 'user', user.address || null, user.phone || null, user.city || null, user.postcode || null, user.occupation || null]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getUser(insertId) as Promise<User>;
  }

  async getAllUsers(): Promise<User[]> {
    const [rows] = await this.pool.execute('SELECT * FROM users ORDER BY createdAt DESC');
    return rows as User[];
  }

  async updateUser(id: number, user: InsertUser): Promise<User> {
    await this.pool.execute(
      'UPDATE users SET username = ?, email = ?, firstName = ?, lastName = ?, role = ?, address = ?, phone = ?, city = ?, postcode = ?, occupation = ? WHERE id = ?',
      [user.username, user.email, user.firstName, user.lastName, user.role || 'user', user.address || null, user.phone || null, user.city || null, user.postcode || null, user.occupation || null, id]
    );
    return this.getUser(id) as Promise<User>;
  }

  async deleteUser(id: number): Promise<void> {
    await this.pool.execute('DELETE FROM users WHERE id = ?', [id]);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    const [rows] = await this.pool.execute('SELECT * FROM categories ORDER BY name');
    return rows as Category[];
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [rows] = await this.pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return (rows as Category[])[0];
  }

  async getCategoriesByParent(parentId: number | null): Promise<Category[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM categories WHERE parentId = ? ORDER BY name',
      [parentId]
    );
    return rows as Category[];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [result] = await this.pool.execute(
      'INSERT INTO categories (name, description, icon, parentId, image) VALUES (?, ?, ?, ?, ?)',
      [category.name, category.description, category.icon, category.parentId || null, category.image || null]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getCategory(insertId) as Promise<Category>;
  }

  async updateCategory(id: number, category: InsertCategory): Promise<Category> {
    await this.pool.execute(
      'UPDATE categories SET name = ?, description = ?, icon = ?, parentId = ?, image = ? WHERE id = ?',
      [category.name, category.description, category.icon, category.parentId || null, category.image || null, id]
    );
    return this.getCategory(id) as Promise<Category>;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.pool.execute('DELETE FROM categories WHERE id = ?', [id]);
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const [rows] = await this.pool.execute('SELECT * FROM products ORDER BY createdAt DESC');
    const products = rows as any[];
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [rows] = await this.pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    const products = rows as any[];
    if (products.length === 0) return undefined;
    return {
      ...products[0],
      images: JSON.parse(products[0].images || '[]')
    };
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM products WHERE categoryId = ? ORDER BY createdAt DESC',
      [categoryId]
    );
    const products = rows as any[];
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM products WHERE isFeatured = TRUE ORDER BY createdAt DESC'
    );
    const products = rows as any[];
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }));
  }

  async searchProducts(query: string): Promise<Product[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY createdAt DESC',
      [`%${query}%`, `%${query}%`]
    );
    const products = rows as any[];
    return products.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    }));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [result] = await this.pool.execute(
      'INSERT INTO products (name, description, categoryId, images, isFeatured, specifications) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.description, product.categoryId, JSON.stringify(product.images || []), product.isFeatured || false, product.specifications || null]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getProduct(insertId) as Promise<Product>;
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product> {
    await this.pool.execute(
      'UPDATE products SET name = ?, description = ?, categoryId = ?, images = ?, isFeatured = ?, specifications = ? WHERE id = ?',
      [product.name, product.description, product.categoryId, JSON.stringify(product.images || []), product.isFeatured || false, product.specifications || null, id]
    );
    return this.getProduct(id) as Promise<Product>;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.pool.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  // Seminars
  async getSeminars(): Promise<Seminar[]> {
    const [rows] = await this.pool.execute('SELECT * FROM seminars ORDER BY createdAt DESC');
    return rows as Seminar[];
  }

  async getSeminar(id: number): Promise<Seminar | undefined> {
    const [rows] = await this.pool.execute('SELECT * FROM seminars WHERE id = ?', [id]);
    return (rows as Seminar[])[0];
  }

  async getUpcomingSeminars(): Promise<Seminar[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM seminars WHERE isActive = TRUE ORDER BY date ASC LIMIT 5'
    );
    return rows as Seminar[];
  }

  async createSeminar(seminar: InsertSeminar): Promise<Seminar> {
    const [result] = await this.pool.execute(
      'INSERT INTO seminars (title, description, content, date, time, duration, location, instructor, maxParticipants, currentParticipants, price, image, type, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [seminar.title, seminar.description, seminar.content, seminar.date, seminar.time, seminar.duration, seminar.location, seminar.instructor, seminar.maxParticipants || 50, seminar.currentParticipants || 0, seminar.price || 0, seminar.image || null, seminar.type || 'seminar', seminar.isActive ?? true]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getSeminar(insertId) as Promise<Seminar>;
  }

  async updateSeminar(id: number, seminar: InsertSeminar): Promise<Seminar> {
    await this.pool.execute(
      'UPDATE seminars SET title = ?, description = ?, content = ?, date = ?, time = ?, duration = ?, location = ?, instructor = ?, maxParticipants = ?, currentParticipants = ?, price = ?, image = ?, type = ?, isActive = ? WHERE id = ?',
      [seminar.title, seminar.description, seminar.content, seminar.date, seminar.time, seminar.duration, seminar.location, seminar.instructor, seminar.maxParticipants || 50, seminar.currentParticipants || 0, seminar.price || 0, seminar.image || null, seminar.type || 'seminar', seminar.isActive ?? true, id]
    );
    return this.getSeminar(id) as Promise<Seminar>;
  }

  async deleteSeminar(id: number): Promise<void> {
    await this.pool.execute('DELETE FROM seminars WHERE id = ?', [id]);
  }

  // Events
  async getEvents(): Promise<Event[]> {
    const [rows] = await this.pool.execute('SELECT * FROM events ORDER BY createdAt DESC');
    return rows as Event[];
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [rows] = await this.pool.execute('SELECT * FROM events WHERE id = ?', [id]);
    return (rows as Event[])[0];
  }

  async getRecentEvents(): Promise<Event[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM events WHERE isActive = TRUE ORDER BY createdAt DESC LIMIT 5'
    );
    return rows as Event[];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [result] = await this.pool.execute(
      'INSERT INTO events (title, description, content, date, location, image, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [event.title, event.description, event.content, event.date, event.location || null, event.image || null, event.isActive ?? true]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getEvent(insertId) as Promise<Event>;
  }

  async updateEvent(id: number, event: InsertEvent): Promise<Event> {
    await this.pool.execute(
      'UPDATE events SET title = ?, description = ?, content = ?, date = ?, location = ?, image = ?, isActive = ? WHERE id = ?',
      [event.title, event.description, event.content, event.date, event.location || null, event.image || null, event.isActive ?? true, id]
    );
    return this.getEvent(id) as Promise<Event>;
  }

  async deleteEvent(id: number): Promise<void> {
    await this.pool.execute('DELETE FROM events WHERE id = ?', [id]);
  }

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    const [rows] = await this.pool.execute('SELECT * FROM enquiries ORDER BY createdAt DESC');
    return rows as Enquiry[];
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    const [rows] = await this.pool.execute('SELECT * FROM enquiries WHERE id = ?', [id]);
    return (rows as Enquiry[])[0];
  }

  async getEnquiriesByUser(userId: number): Promise<Enquiry[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM enquiries WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );
    return rows as Enquiry[];
  }

  async createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry> {
    const [result] = await this.pool.execute(
      'INSERT INTO enquiries (userId, name, email, phone, subject, message, status, productId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [enquiry.userId || null, enquiry.name, enquiry.email, enquiry.phone || null, enquiry.subject, enquiry.message, enquiry.status || 'open', enquiry.productId || null]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getEnquiry(insertId) as Promise<Enquiry>;
  }

  async updateEnquiryStatus(id: number, status: string): Promise<void> {
    await this.pool.execute(
      'UPDATE enquiries SET status = ? WHERE id = ?',
      [status, id]
    );
  }

  // Enquiry Messages
  async getEnquiryMessages(enquiryId: number): Promise<EnquiryMessage[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM enquiry_messages WHERE enquiryId = ? ORDER BY createdAt ASC',
      [enquiryId]
    );
    return rows as EnquiryMessage[];
  }

  async createEnquiryMessage(message: InsertEnquiryMessage): Promise<EnquiryMessage> {
    const [result] = await this.pool.execute(
      'INSERT INTO enquiry_messages (enquiryId, senderId, senderName, senderEmail, message, isFromAdmin) VALUES (?, ?, ?, ?, ?, ?)',
      [message.enquiryId, message.senderId || null, message.senderName, message.senderEmail, message.message, message.isFromAdmin || false]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    const [rows] = await this.pool.execute(
      'SELECT * FROM enquiry_messages WHERE id = ?',
      [insertId]
    );
    return (rows as EnquiryMessage[])[0];
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    const [rows] = await this.pool.execute('SELECT * FROM achievements WHERE isActive = TRUE');
    return rows as Achievement[];
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [result] = await this.pool.execute(
      'INSERT INTO achievements (title, description, date, image, isActive) VALUES (?, ?, ?, ?, ?)',
      [achievement.title, achievement.description, achievement.date, achievement.image || null, achievement.isActive ?? true]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    const [rows] = await this.pool.execute(
      'SELECT * FROM achievements WHERE id = ?',
      [insertId]
    );
    return (rows as Achievement[])[0];
  }

  // Banners
  async getActiveBanners(): Promise<Banner[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM banners WHERE isActive = TRUE ORDER BY sortOrder ASC'
    );
    return rows as Banner[];
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const [result] = await this.pool.execute(
      'INSERT INTO banners (title, subtitle, image, link, isActive, sortOrder) VALUES (?, ?, ?, ?, ?, ?)',
      [banner.title, banner.subtitle || null, banner.image, banner.link || null, banner.isActive ?? true, banner.sortOrder || 0]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    const [rows] = await this.pool.execute(
      'SELECT * FROM banners WHERE id = ?',
      [insertId]
    );
    return (rows as Banner[])[0];
  }

  // Catalogue Categories
  async getCatalogueCategories(): Promise<CatalogueCategory[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM catalogue_categories WHERE isActive = TRUE ORDER BY sortOrder ASC'
    );
    return rows as CatalogueCategory[];
  }

  async getCatalogueCategory(id: number): Promise<CatalogueCategory | undefined> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM catalogue_categories WHERE id = ?',
      [id]
    );
    return (rows as CatalogueCategory[])[0];
  }

  async getCatalogueCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM catalogue_categories WHERE slug = ?',
      [slug]
    );
    return (rows as CatalogueCategory[])[0];
  }

  async createCatalogueCategory(category: InsertCatalogueCategory): Promise<CatalogueCategory> {
    const [result] = await this.pool.execute(
      'INSERT INTO catalogue_categories (name, description, slug, icon, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?)',
      [category.name, category.description, category.slug, category.icon, category.sortOrder || 0, category.isActive ?? true]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getCatalogueCategory(insertId) as Promise<CatalogueCategory>;
  }

  // Brochures
  async getBrochures(): Promise<Brochure[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM brochures WHERE isActive = TRUE ORDER BY createdAt DESC'
    );
    return rows as Brochure[];
  }

  async getBrochure(id: number): Promise<Brochure | undefined> {
    const [rows] = await this.pool.execute('SELECT * FROM brochures WHERE id = ?', [id]);
    return (rows as Brochure[])[0];
  }

  async getBrochuresByCategory(categoryId: number): Promise<Brochure[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM brochures WHERE categoryId = ? AND isActive = TRUE ORDER BY createdAt DESC',
      [categoryId]
    );
    return rows as Brochure[];
  }

  async createBrochure(brochure: InsertBrochure): Promise<Brochure> {
    const [result] = await this.pool.execute(
      'INSERT INTO brochures (title, description, fileName, filePath, fileSize, categoryId, downloadCount, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [brochure.title, brochure.description || null, brochure.fileName, brochure.filePath, brochure.fileSize || null, brochure.categoryId || null, brochure.downloadCount || 0, brochure.isActive ?? true]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getBrochure(insertId) as Promise<Brochure>;
  }

  async incrementDownloadCount(id: number): Promise<void> {
    await this.pool.execute(
      'UPDATE brochures SET downloadCount = downloadCount + 1 WHERE id = ?',
      [id]
    );
  }
}