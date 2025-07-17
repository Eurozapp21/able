const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

class MySQLStorage {
  constructor(connectionString) {
    this.connection = null;
    
    // Handle undefined or empty connection string
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    
    this.connectionString = connectionString;
    
    // For development, use a simple localhost connection if DATABASE_URL is PostgreSQL
    if (connectionString.includes('postgresql://') || connectionString.includes('postgres://')) {
      this.connectionString = 'mysql://root:@localhost:3306/abletools';
    }
  }

  async connect() {
    if (!this.connection) {
      let config;
      
      try {
        // Parse the connection string and create proper MySQL config
        const url = new URL(this.connectionString);
        config = {
          host: url.hostname,
          port: parseInt(url.port) || 3306,
          user: url.username,
          password: decodeURIComponent(url.password),
          database: url.pathname.slice(1), // Remove leading slash
          ssl: false,
          connectTimeout: 60000,
        };
      } catch (error) {
        // If URL parsing fails, try manual parsing for special characters
        const match = this.connectionString.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):?(\d+)?\/(.+)/);
        if (match) {
          config = {
            host: match[3],
            port: parseInt(match[4]) || 3306,
            user: match[1],
            password: match[2],
            database: match[5],
            ssl: false,
            connectTimeout: 60000,
          };
        } else {
          throw new Error('Invalid DATABASE_URL format');
        }
      }
      
      console.log(`Connecting to MySQL database: ${config.database} on ${config.host}:${config.port}`);
      
      this.connection = await mysql.createConnection(config);
      await this.initializeTables();
      await this.seedInitialData();
    }
    return this.connection;
  }

  async initializeTables() {
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
        type VARCHAR(50) DEFAULT 'seminar',
        date DATE,
        time TIME,
        duration VARCHAR(50),
        location VARCHAR(255),
        instructor VARCHAR(255),
        price VARCHAR(50),
        capacity INT,
        image VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        time TIME,
        location VARCHAR(255),
        image VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        category VARCHAR(100),
        image VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        link VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS catalogue_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        slug VARCHAR(255) UNIQUE,
        icon VARCHAR(255),
        image VARCHAR(500),
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
        category_id INT NOT NULL,
        file_url VARCHAR(500),
        download_count INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS enquiry_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        enquiry_id INT NOT NULL,
        sender_type VARCHAR(50) NOT NULL,
        sender_name VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async seedInitialData() {
    const conn = await this.connect();
    
    // Check if data already exists
    const [userRows] = await conn.execute('SELECT COUNT(*) as count FROM users');
    if (userRows[0].count > 0) return;

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await conn.execute(
      'INSERT INTO users (username, email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)',
      ['admin', 'admin@abletools.com', hashedPassword, 'Admin', 'User', 'admin']
    );

    // Insert categories
    const categories = [
      { name: 'Wheelchairs & Mobility', description: 'Manual and electric wheelchairs, mobility scooters', icon: 'wheelchair', parent_id: null },
      { name: 'Lifting & Transfer', description: 'Patient lifting equipment and transfer aids', icon: 'lift', parent_id: null },
      { name: 'Sensory Integration', description: 'Sensory therapy and integration equipment', icon: 'sensory', parent_id: null },
      { name: 'Rehabilitation Equipment', description: 'Physical therapy and rehabilitation devices', icon: 'therapy', parent_id: null },
      { name: 'Daily Living Aids', description: 'Assistive devices for daily activities', icon: 'daily', parent_id: null },
      { name: 'Stair Lifts & Access', description: 'Accessibility solutions for homes and buildings', icon: 'stairs', parent_id: null }
    ];

    for (const category of categories) {
      await conn.execute(
        'INSERT INTO categories (name, description, icon, parent_id) VALUES (?, ?, ?, ?)',
        [category.name, category.description, category.icon, category.parent_id]
      );
    }

    // Insert sample products
    const products = [
      {
        name: 'Bingo Evolution Twin',
        description: 'Advanced rehabilitation gaming system for cognitive therapy',
        category_id: 4,
        images: JSON.stringify(['/assets/bingo_evolution_twins-1_1752003228920.jpg']),
        is_featured: true,
        specifications: JSON.stringify({
          'Display': 'Dual 24" touchscreens',
          'Connectivity': 'WiFi, Bluetooth',
          'Power': '12V DC adapter',
          'Dimensions': '60x40x120cm'
        }),
        price: 'Contact for pricing'
      },
      {
        name: 'Zip Pushchair',
        description: 'Lightweight pediatric mobility solution',
        category_id: 1,
        images: JSON.stringify(['/assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg']),
        is_featured: true,
        specifications: JSON.stringify({
          'Weight': '8.5kg',
          'Max Load': '25kg',
          'Folded Size': '75x45x25cm',
          'Seat Width': '32cm'
        }),
        price: 'Contact for pricing'
      },
      {
        name: 'Mimos Pillow',
        description: 'Therapeutic pillow for infant head shape correction',
        category_id: 5,
        images: JSON.stringify(['/assets/maxresdefault_1752003228921.jpg']),
        is_featured: true,
        specifications: JSON.stringify({
          'Material': 'Memory foam',
          'Size': 'Multiple sizes available',
          'Age Range': '0-12 months',
          'Certifications': 'CE, FDA approved'
        }),
        price: 'Contact for pricing'
      }
    ];

    for (const product of products) {
      await conn.execute(
        'INSERT INTO products (name, description, category_id, images, is_featured, specifications, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [product.name, product.description, product.category_id, product.images, product.is_featured, product.specifications, product.price]
      );
    }
  }

  // User methods
  async getUser(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async getUserByUsername(username) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  async getUserByEmail(email) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  async createUser(user) {
    const conn = await this.connect();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await conn.execute(
      'INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, postcode, occupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user.username, user.email, hashedPassword, user.first_name, user.last_name, user.phone, user.address, user.city, user.postcode, user.occupation]
    );
    return this.getUser(result.insertId);
  }

  // Category methods
  async getCategories() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM categories WHERE is_active = TRUE ORDER BY display_order, name');
    return rows;
  }

  async getCategory(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  async getCategoriesByParent(parentId) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM categories WHERE parent_id = ? AND is_active = TRUE ORDER BY display_order, name', [parentId]);
    return rows;
  }

  async createCategory(category) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO categories (name, description, icon, image, parent_id, display_order) VALUES (?, ?, ?, ?, ?, ?)',
      [category.name, category.description, category.icon, category.image, category.parent_id, category.display_order || 0]
    );
    return this.getCategory(result.insertId);
  }

  // Product methods
  async getProducts() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE is_active = TRUE ORDER BY name');
    return rows;
  }

  async getProduct(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  async getProductsByCategory(categoryId) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE category_id = ? AND is_active = TRUE ORDER BY name', [categoryId]);
    return rows;
  }

  async getFeaturedProducts() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM products WHERE is_featured = TRUE AND is_active = TRUE ORDER BY name');
    return rows;
  }

  async searchProducts(query) {
    const conn = await this.connect();
    const [rows] = await conn.execute(
      'SELECT * FROM products WHERE (name LIKE ? OR description LIKE ?) AND is_active = TRUE ORDER BY name',
      [`%${query}%`, `%${query}%`]
    );
    return rows;
  }

  async createProduct(product) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO products (name, description, category_id, images, is_featured, specifications, price, sku) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [product.name, product.description, product.category_id, product.images, product.is_featured, product.specifications, product.price, product.sku]
    );
    return this.getProduct(result.insertId);
  }

  // Seminar methods
  async getSeminars() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM seminars WHERE is_active = TRUE ORDER BY date DESC');
    return rows;
  }

  async getSeminar(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM seminars WHERE id = ?', [id]);
    return rows[0];
  }

  async getUpcomingSeminars() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM seminars WHERE date >= CURDATE() AND is_active = TRUE ORDER BY date ASC');
    return rows;
  }

  async createSeminar(seminar) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO seminars (title, description, type, date, time, duration, location, instructor, price, capacity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [seminar.title, seminar.description, seminar.type, seminar.date, seminar.time, seminar.duration, seminar.location, seminar.instructor, seminar.price, seminar.capacity, seminar.image]
    );
    return this.getSeminar(result.insertId);
  }

  // Event methods
  async getEvents() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM events WHERE is_active = TRUE ORDER BY date DESC');
    return rows;
  }

  async getEvent(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM events WHERE id = ?', [id]);
    return rows[0];
  }

  async getRecentEvents() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM events WHERE is_active = TRUE ORDER BY date DESC LIMIT 6');
    return rows;
  }

  async createEvent(event) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO events (title, description, date, time, location, image) VALUES (?, ?, ?, ?, ?, ?)',
      [event.title, event.description, event.date, event.time, event.location, event.image]
    );
    return this.getEvent(result.insertId);
  }

  // Achievement methods
  async getAchievements() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM achievements WHERE is_active = TRUE ORDER BY date DESC');
    return rows;
  }

  async createAchievement(achievement) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO achievements (title, description, date, category, image) VALUES (?, ?, ?, ?, ?)',
      [achievement.title, achievement.description, achievement.date, achievement.category, achievement.image]
    );
    const [rows] = await conn.execute('SELECT * FROM achievements WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  // Banner methods
  async getActiveBanners() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM banners WHERE is_active = TRUE ORDER BY display_order');
    return rows;
  }

  async createBanner(banner) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO banners (title, description, image, link, display_order) VALUES (?, ?, ?, ?, ?)',
      [banner.title, banner.description, banner.image, banner.link, banner.display_order || 0]
    );
    const [rows] = await conn.execute('SELECT * FROM banners WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  // Catalogue methods
  async getCatalogueCategories() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM catalogue_categories WHERE is_active = TRUE ORDER BY display_order, name');
    return rows;
  }

  async getCatalogueCategory(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM catalogue_categories WHERE id = ?', [id]);
    return rows[0];
  }

  async getCatalogueCategoryBySlug(slug) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM catalogue_categories WHERE slug = ?', [slug]);
    return rows[0];
  }

  async createCatalogueCategory(category) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO catalogue_categories (name, description, slug, icon, image, display_order) VALUES (?, ?, ?, ?, ?, ?)',
      [category.name, category.description, category.slug, category.icon, category.image, category.display_order || 0]
    );
    return this.getCatalogueCategory(result.insertId);
  }

  // Brochure methods
  async getBrochures() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM brochures WHERE is_active = TRUE ORDER BY title');
    return rows;
  }

  async getBrochure(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM brochures WHERE id = ?', [id]);
    return rows[0];
  }

  async getBrochuresByCategory(categoryId) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM brochures WHERE category_id = ? AND is_active = TRUE ORDER BY title', [categoryId]);
    return rows;
  }

  async createBrochure(brochure) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO brochures (title, description, category_id, file_url) VALUES (?, ?, ?, ?)',
      [brochure.title, brochure.description, brochure.category_id, brochure.file_url]
    );
    return this.getBrochure(result.insertId);
  }

  async incrementDownloadCount(id) {
    const conn = await this.connect();
    await conn.execute('UPDATE brochures SET download_count = download_count + 1 WHERE id = ?', [id]);
  }

  // Enquiry methods
  async getEnquiries() {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
    return rows;
  }

  async getEnquiry(id) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiries WHERE id = ?', [id]);
    return rows[0];
  }

  async getEnquiriesByUser(userId) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiries WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  }

  async createEnquiry(enquiry) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO enquiries (user_id, product_id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [enquiry.user_id, enquiry.product_id, enquiry.name, enquiry.email, enquiry.phone, enquiry.subject, enquiry.message]
    );
    return this.getEnquiry(result.insertId);
  }

  async updateEnquiryStatus(id, status) {
    const conn = await this.connect();
    await conn.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
  }

  // Enquiry message methods
  async getEnquiryMessages(enquiryId) {
    const conn = await this.connect();
    const [rows] = await conn.execute('SELECT * FROM enquiry_messages WHERE enquiry_id = ? ORDER BY created_at ASC', [enquiryId]);
    return rows;
  }

  async createEnquiryMessage(message) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO enquiry_messages (enquiry_id, sender_type, sender_name, message) VALUES (?, ?, ?, ?)',
      [message.enquiry_id, message.sender_type, message.sender_name, message.message]
    );
    const [rows] = await conn.execute('SELECT * FROM enquiry_messages WHERE id = ?', [result.insertId]);
    return rows[0];
  }
}

module.exports = { MySQLStorage };