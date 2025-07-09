import { 
  users, categories, products, seminars, events, enquiries, enquiryMessages, achievements, banners,
  type User, type InsertUser, type Category, type InsertCategory, 
  type Product, type InsertProduct, type Seminar, type InsertSeminar,
  type Event, type InsertEvent, type Enquiry, type InsertEnquiry,
  type EnquiryMessage, type InsertEnquiryMessage, type Achievement, type InsertAchievement,
  type Banner, type InsertBanner
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoriesByParent(parentId: number | null): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Seminars
  getSeminars(): Promise<Seminar[]>;
  getSeminar(id: number): Promise<Seminar | undefined>;
  getUpcomingSeminars(): Promise<Seminar[]>;
  createSeminar(seminar: InsertSeminar): Promise<Seminar>;
  
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getRecentEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Enquiries
  getEnquiries(): Promise<Enquiry[]>;
  getEnquiry(id: number): Promise<Enquiry | undefined>;
  getEnquiriesByUser(userId: number): Promise<Enquiry[]>;
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  updateEnquiryStatus(id: number, status: string): Promise<void>;
  
  // Enquiry Messages
  getEnquiryMessages(enquiryId: number): Promise<EnquiryMessage[]>;
  createEnquiryMessage(message: InsertEnquiryMessage): Promise<EnquiryMessage>;
  
  // Achievements
  getAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Banners
  getActiveBanners(): Promise<Banner[]>;
  createBanner(banner: InsertBanner): Promise<Banner>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private products: Map<number, Product> = new Map();
  private seminars: Map<number, Seminar> = new Map();
  private events: Map<number, Event> = new Map();
  private enquiries: Map<number, Enquiry> = new Map();
  private enquiryMessages: Map<number, EnquiryMessage> = new Map();
  private achievements: Map<number, Achievement> = new Map();
  private banners: Map<number, Banner> = new Map();
  
  private currentId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
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
      { id: 42, name: "Positioning Aids", description: "Medical positioning and support equipment", icon: "hands-helping", parentId: 9, image: "/attached_assets/maxresdefault_1752003228921.jpg" },
    ];

    categoryData.forEach(cat => {
      this.categories.set(cat.id, { ...cat, image: cat.image || null });
    });

    // Seed products with variable hierarchy depth
    const productData = [
      // Level 4: Products/Wheelchairs/Rigid Wheelchairs/Wolturnus Series/Wolturnus W5
      {
        id: 1,
        name: "Wolturnus W5",
        description: "Premium ultra-lightweight rigid wheelchair with advanced engineering for superior performance and comfort",
        categoryId: 231, // Wolturnus Series (4th level)
        images: ["/attached_assets/bingo_evolution_twins-1_1752003228920.jpg"],
        isFeatured: true,
        specifications: "Carbon fiber frame, adjustable geometry, premium components, weight: 6.8kg"
      },
      
      // Level 3: Products/Stair Lifts/Homeglide (direct products under main category)
      {
        id: 2,
        name: "Homeglide",
        description: "Straight stair lift for indoor use with smooth operation and safety features",
        categoryId: 5, // Stair Lifts (main category)
        images: ["/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg"],
        isFeatured: true,
        specifications: "Weight capacity: 140kg, battery backup, safety sensors, soft start/stop"
      },
      
      // Level 2: Products/Sensory Rooms (direct products under main category)
      {
        id: 3,
        name: "Multi-Sensory Environment Package",
        description: "Complete sensory room setup with interactive lighting, sounds, and tactile elements for therapeutic use",
        categoryId: 4, // Sensory Integration Rooms (main category)
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
        categoryId: 21, // Manual Wheelchairs
        images: ["/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg"],
        isFeatured: false,
        specifications: "Aluminum frame, quick-release wheels, adjustable backrest, anti-tip wheels"
      },
      
      // Product under Ceiling Hoists subcategory
      {
        id: 6,
        name: "Ceiling Track Hoist System",
        description: "Professional ceiling-mounted patient transfer system for healthcare facilities",
        categoryId: 31, // Ceiling Hoists
        images: ["/attached_assets/maxresdefault_1752003228921.jpg"],
        isFeatured: false,
        specifications: "300kg capacity, electric motor, emergency lowering, H-frame track system"
      },
    ];

    productData.forEach(prod => {
      this.products.set(prod.id, { ...prod, createdAt: new Date() });
    });

    // Seed seminars
    const seminarData = [
      {
        id: 1,
        title: "Advanced Rehabilitation Techniques",
        description: "Learn the latest techniques in patient rehabilitation and therapy",
        date: new Date("2024-03-15"),
        location: "Nicosia Training Center",
        speaker: "Dr. Maria Constantinou",
        image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg",
        fee: "€150",
        maxParticipants: 25
      },
    ];

    seminarData.forEach(sem => {
      this.seminars.set(sem.id, { ...sem, createdAt: new Date() });
    });

    // Seed events
    const eventData = [
      {
        id: 1,
        title: "HUR - Spinal Cord and Neurological Rehabilitation",
        content: "In an inclusive wellness facility, it is easy to get on and off machines. The machines can be used safely and independently by as many different users as possible, regardless of ability, while in between machines there is ample room to manoeuvre with various mobility aids.",
        date: new Date("2024-02-20"),
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        excerpt: "Discover HUR's innovative approach to neurological rehabilitation equipment."
      },
    ];

    eventData.forEach(event => {
      this.events.set(event.id, { ...event, createdAt: new Date() });
    });

    // Seed achievements
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
      },
    ];

    achievementData.forEach(ach => {
      this.achievements.set(ach.id, { ...ach, createdAt: new Date() });
    });

    // Seed banners
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
      },
    ];

    bannerData.forEach(banner => {
      this.banners.set(banner.id, banner);
    });

    this.currentId = 100;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      address: insertUser.address ?? null,
      phone: insertUser.phone ?? null,
      city: insertUser.city ?? null,
      postcode: insertUser.postcode ?? null,
      occupation: insertUser.occupation ?? null
    };
    this.users.set(id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoriesByParent(parentId: number | null): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(cat => cat.parentId === parentId);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId++;
    const category: Category = { 
      ...insertCategory, 
      id,
      image: insertCategory.image ?? null,
      description: insertCategory.description ?? null,
      parentId: insertCategory.parentId ?? null,
      icon: insertCategory.icon ?? null
    };
    this.categories.set(id, category);
    return category;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.categoryId === categoryId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.isFeatured);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(prod =>
      prod.name.toLowerCase().includes(lowercaseQuery) ||
      prod.description?.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      description: insertProduct.description ?? null,
      images: insertProduct.images ?? null,
      isFeatured: insertProduct.isFeatured ?? null,
      specifications: insertProduct.specifications ?? null
    };
    this.products.set(id, product);
    return product;
  }

  // Seminars
  async getSeminars(): Promise<Seminar[]> {
    return Array.from(this.seminars.values());
  }

  async getSeminar(id: number): Promise<Seminar | undefined> {
    return this.seminars.get(id);
  }

  async getUpcomingSeminars(): Promise<Seminar[]> {
    const now = new Date();
    return Array.from(this.seminars.values())
      .filter(sem => sem.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createSeminar(insertSeminar: InsertSeminar): Promise<Seminar> {
    const id = this.currentId++;
    const seminar: Seminar = { 
      ...insertSeminar, 
      id, 
      createdAt: new Date(),
      description: insertSeminar.description ?? null,
      image: insertSeminar.image ?? null,
      location: insertSeminar.location ?? null,
      speaker: insertSeminar.speaker ?? null,
      fee: insertSeminar.fee ?? null,
      maxParticipants: insertSeminar.maxParticipants ?? null
    };
    this.seminars.set(id, seminar);
    return seminar;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getRecentEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      createdAt: new Date(),
      image: insertEvent.image ?? null,
      content: insertEvent.content ?? null,
      excerpt: insertEvent.excerpt ?? null
    };
    this.events.set(id, event);
    return event;
  }

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values());
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    return this.enquiries.get(id);
  }

  async getEnquiriesByUser(userId: number): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values()).filter(enq => enq.userId === userId);
  }

  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    const id = this.currentId++;
    const enquiry: Enquiry = { 
      ...insertEnquiry, 
      id, 
      status: "new", 
      createdAt: new Date(),
      about: insertEnquiry.about ?? null
    };
    this.enquiries.set(id, enquiry);
    return enquiry;
  }

  async updateEnquiryStatus(id: number, status: string): Promise<void> {
    const enquiry = this.enquiries.get(id);
    if (enquiry) {
      this.enquiries.set(id, { ...enquiry, status });
    }
  }

  // Enquiry Messages
  async getEnquiryMessages(enquiryId: number): Promise<EnquiryMessage[]> {
    return Array.from(this.enquiryMessages.values())
      .filter(msg => msg.enquiryId === enquiryId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  }

  async createEnquiryMessage(insertMessage: InsertEnquiryMessage): Promise<EnquiryMessage> {
    const id = this.currentId++;
    const message: EnquiryMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      senderId: insertMessage.senderId ?? null
    };
    this.enquiryMessages.set(id, message);
    return message;
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id, 
      createdAt: new Date(),
      description: insertAchievement.description ?? null,
      image: insertAchievement.image ?? null
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  // Banners
  async getActiveBanners(): Promise<Banner[]> {
    return Array.from(this.banners.values())
      .filter(banner => banner.isActive)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async createBanner(insertBanner: InsertBanner): Promise<Banner> {
    const id = this.currentId++;
    const banner: Banner = { 
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
}

export const storage = new MemStorage();
