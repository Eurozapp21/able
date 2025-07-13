import { 
  users, categories, products, seminars, events, enquiries, enquiryMessages, achievements, banners, catalogueCategories, brochures,
  type User, type InsertUser, type Category, type InsertCategory, 
  type Product, type InsertProduct, type Seminar, type InsertSeminar,
  type Event, type InsertEvent, type Enquiry, type InsertEnquiry,
  type EnquiryMessage, type InsertEnquiryMessage, type Achievement, type InsertAchievement,
  type Banner, type InsertBanner, type CatalogueCategory, type InsertCatalogueCategory,
  type Brochure, type InsertBrochure
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, user: InsertUser): Promise<User>;
  deleteUser(id: number): Promise<void>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoriesByParent(parentId: number | null): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: InsertCategory): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  
  // Seminars
  getSeminars(): Promise<Seminar[]>;
  getSeminar(id: number): Promise<Seminar | undefined>;
  getUpcomingSeminars(): Promise<Seminar[]>;
  createSeminar(seminar: InsertSeminar): Promise<Seminar>;
  updateSeminar(id: number, seminar: InsertSeminar): Promise<Seminar>;
  deleteSeminar(id: number): Promise<void>;
  
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getRecentEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: InsertEvent): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
  
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
  
  // Catalogue Categories
  getCatalogueCategories(): Promise<CatalogueCategory[]>;
  getCatalogueCategory(id: number): Promise<CatalogueCategory | undefined>;
  getCatalogueCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined>;
  createCatalogueCategory(category: InsertCatalogueCategory): Promise<CatalogueCategory>;
  
  // Brochures
  getBrochures(): Promise<Brochure[]>;
  getBrochure(id: number): Promise<Brochure | undefined>;
  getBrochuresByCategory(categoryId: number): Promise<Brochure[]>;
  createBrochure(brochure: InsertBrochure): Promise<Brochure>;
  incrementDownloadCount(id: number): Promise<void>;
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
  private catalogueCategories: Map<number, CatalogueCategory> = new Map();
  private brochures: Map<number, Brochure> = new Map();
  
  private currentId = 1;

  constructor() {
    this.seedData();
    this.seedCatalogueCategories();
    this.seedBrochures();
  }

  private seedData() {
    // Seed admin user
    const adminUser = {
      id: 1,
      username: "admin",
      email: "admin@abletools.com.cy", 
      password: "admin123",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      address: null,
      phone: null,
      city: null,
      postcode: null,
      occupation: null,
      createdAt: new Date()
    };
    this.users.set(1, adminUser);
    
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
        images: [
          "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
          "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg", 
          "/attached_assets/maxresdefault_1752003228921.jpg",
          "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
          "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg"
        ],
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

    // Seed seminars and training
    const seminarData = [
      // Educational Seminars
      {
        id: 1,
        title: "Advanced Rehabilitation Techniques",
        description: "Comprehensive seminar on modern rehabilitation approaches for spinal cord injuries, neurological conditions, and mobility impairments. Learn evidence-based techniques used by leading rehabilitation centers worldwide.",
        date: new Date("2025-08-15"),
        location: "AbleTools Training Center, Nicosia",
        speaker: "Dr. Maria Constantinou, PT, PhD",
        image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg",
        fee: "€185",
        maxParticipants: 20,
        type: "seminar"
      },
      {
        id: 2,
        title: "Multi-Sensory Room Design & Implementation",
        description: "Educational seminar on designing effective multi-sensory environments for therapeutic use. Covers lighting, sound, tactile elements, and therapeutic protocols for various conditions.",
        date: new Date("2025-11-05"),
        location: "Sensory Innovation Lab, Paphos",
        speaker: "Elena Pavlou, MSc Occupational Therapy",
        image: "/attached_assets/maxresdefault_1752003228921.jpg",
        fee: "€195",
        maxParticipants: 12,
        type: "seminar"
      },
      {
        id: 3,
        title: "Pediatric Rehabilitation Approaches",
        description: "Comprehensive seminar on modern approaches to pediatric rehabilitation. Focus on evidence-based practices, family-centered care, and developmental considerations in treatment planning.",
        date: new Date("2025-12-03"),
        location: "Children's Rehabilitation Center, Nicosia",
        speaker: "Dr. Sophia Michaelidou, Pediatric PT",
        image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
        fee: "€175",
        maxParticipants: 16,
        type: "seminar"
      },
      {
        id: 4,
        title: "Innovation in Accessibility Design",
        description: "Seminar exploring cutting-edge approaches to accessibility design and universal design principles. Learn about the latest research and best practices in creating inclusive environments.",
        date: new Date("2025-10-22"),
        location: "Design Innovation Center, Larnaca",
        speaker: "Universal Design Consortium",
        image: "/attached_assets/1601935107aboutus_1752007024526.jpg",
        fee: "€155",
        maxParticipants: 22,
        type: "seminar"
      },
      
      // Professional Training Courses
      {
        id: 5,
        title: "HUR Equipment Training Certification",
        description: "Professional certification course for HUR pneumatic exercise equipment. Master safe operation, assessment protocols, and therapeutic applications for neurological rehabilitation.",
        date: new Date("2025-09-12"),
        location: "HUR Training Facility, Limassol",
        speaker: "International HUR Trainer Team",
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        fee: "€245",
        maxParticipants: 15,
        type: "training"
      },
      {
        id: 6,
        title: "Wheelchair Assessment & Fitting Training",
        description: "Intensive hands-on training covering comprehensive wheelchair assessment, proper fitting techniques, and customization for individual needs. Includes manual and power wheelchair systems.",
        date: new Date("2025-10-08"),
        location: "AbleTools Showroom, Nicosia",
        speaker: "Andreas Georgiou, OTR/L, ATP",
        image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
        fee: "€165",
        maxParticipants: 18,
        type: "training"
      },
      {
        id: 7,
        title: "Safe Patient Transfer Techniques Training",
        description: "Essential hands-on training for healthcare professionals on safe patient handling and transfer methods. Includes manual techniques, mechanical lifts, and injury prevention strategies.",
        date: new Date("2025-09-25"),
        location: "Cyprus University of Technology, Limassol",
        speaker: "Nursing Education Consortium",
        image: "/attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg",
        fee: "€125",
        maxParticipants: 30,
        type: "training"
      },
      {
        id: 8,
        title: "Home Accessibility Assessment Training",
        description: "Complete hands-on training on conducting thorough home assessments for accessibility modifications. Includes stair lifts, ramps, bathroom modifications, and technology integration.",
        date: new Date("2025-10-15"),
        location: "Home Modification Demonstration House, Larnaca",
        speaker: "Home Access Specialists Team",
        image: "/attached_assets/Achievement_1752003982449.jpg",
        fee: "€155",
        maxParticipants: 22,
        type: "training"
      },
      {
        id: 9,
        title: "Advanced Seating & Positioning Training",
        description: "In-depth hands-on training on complex seating and positioning solutions for individuals with severe physical disabilities. Covers pressure management, postural support, and custom solutions.",
        date: new Date("2025-11-19"),
        location: "Seating Clinic, Famagusta",
        speaker: "International Seating Consortium",
        image: "/attached_assets/what-is-true-sense-of-accomplishment-and-how-to-achive-it_1752003982450.jpg",
        fee: "€205",
        maxParticipants: 14,
        type: "training"
      }
    ];

    seminarData.forEach(sem => {
      this.seminars.set(sem.id, { ...sem, createdAt: new Date() });
    });

    // Seed events
    const eventData = [
      {
        id: 1,
        title: "HUR - Spinal Cord and Neurological Rehabilitation",
        content: "HUR (HUR Oy) is a Finnish company that develops and manufactures pneumatic exercise equipment specifically designed for medical rehabilitation, wellness, and fitness applications. The company has been a pioneer in pneumatic resistance technology since 1989.\n\nOur partnership with HUR brings cutting-edge rehabilitation technology to Cyprus, offering healthcare professionals and patients access to the most advanced pneumatic exercise systems available today. These systems are specifically designed for individuals with spinal cord injuries, neurological conditions, and those requiring gentle, controlled resistance training.\n\nThe HUR pneumatic technology offers several key advantages in rehabilitation settings:\n\n• Zero Starting Weight: Patients can begin exercises with virtually no resistance, making it ideal for early-stage rehabilitation\n• Precise Control: Air pressure systems allow for exact resistance adjustments in small increments\n• Safety Features: Built-in safety mechanisms prevent injury during use\n• Accessibility: Equipment designed for wheelchair users and individuals with limited mobility\n• Clinical Integration: Seamless integration with existing rehabilitation protocols\n\nHUR equipment is widely used in hospitals, rehabilitation centers, and specialized clinics across Europe and North America. The technology has been clinically proven to improve functional outcomes in patients with various neurological conditions, including spinal cord injuries, stroke recovery, and neuromuscular disorders.\n\nAbleTools is proud to be the exclusive distributor of HUR equipment in Cyprus, providing comprehensive training, installation, and ongoing technical support to healthcare facilities throughout the region.",
        date: new Date("2025-07-15"),
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        excerpt: "Discover HUR's innovative approach to neurological rehabilitation equipment and its impact on patient outcomes."
      },
      {
        id: 2,
        title: "International Rehabilitation Equipment Expo Cyprus 2025",
        content: "Join us for the largest rehabilitation equipment exhibition in Cyprus. Featuring the latest innovations in mobility aids, therapeutic equipment, and assistive technology. Meet with leading manufacturers, attend live demonstrations, and network with healthcare professionals from across the region.",
        date: new Date("2025-09-18"),
        image: "/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg",
        excerpt: "Cyprus's premier rehabilitation equipment showcase featuring cutting-edge technology and innovations."
      },
      {
        id: 3,
        title: "Breakthrough in Pediatric Mobility Solutions",
        content: "AbleTools announces the launch of our new pediatric mobility program, featuring specialized equipment designed specifically for children with disabilities. This comprehensive program includes adaptive wheelchairs, positioning devices, and educational support for families and caregivers.",
        date: new Date("2025-08-28"),
        image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
        excerpt: "Revolutionary pediatric mobility solutions designed to support children's development and independence."
      },
      {
        id: 4,
        title: "Multi-Sensory Therapy Room Grand Opening",
        content: "Experience our state-of-the-art multi-sensory therapy room, now open for demonstrations and training sessions. This immersive environment features interactive lighting systems, therapeutic sound technology, and tactile elements designed to enhance sensory integration therapy outcomes.",
        date: new Date("2025-10-12"),
        image: "/attached_assets/maxresdefault_1752003228921.jpg",
        excerpt: "Cutting-edge multi-sensory therapy environment now available for professional training and demonstrations."
      },
      {
        id: 5,
        title: "Community Accessibility Initiative Launch",
        content: "AbleTools partners with local municipalities to improve community accessibility. Our comprehensive assessment program will evaluate public spaces, recommend modifications, and provide training to local officials on disability awareness and universal design principles.",
        date: new Date("2025-11-08"),
        image: "/attached_assets/Achievement_1752003982449.jpg",
        excerpt: "Collaborative community program aimed at improving accessibility across Cyprus public spaces."
      },
      {
        id: 6,
        title: "Advanced Stair Lift Technology Showcase",
        content: "Discover the latest innovations in stair lift technology featuring curved rail systems, outdoor installations, and smart home integration. Our expert team will demonstrate installation processes and maintenance procedures for residential and commercial applications.",
        date: new Date("2025-12-15"),
        image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
        excerpt: "Latest stair lift innovations featuring smart technology and enhanced safety features for residential and commercial applications."
      }
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

    this.currentId = 1000;
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

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, insertUser: InsertUser): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error('User not found');
    }
    
    const user: User = { 
      ...insertUser,
      id: existing.id,
      createdAt: existing.createdAt,
      address: insertUser.address ?? null,
      phone: insertUser.phone ?? null,
      city: insertUser.city ?? null,
      postcode: insertUser.postcode ?? null,
      occupation: insertUser.occupation ?? null
    };
    this.users.set(id, user);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    this.users.delete(id);
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
      icon: insertCategory.icon ?? null,
      nameEl: insertCategory.nameEl ?? null,
      descriptionEl: insertCategory.descriptionEl ?? null,
      isActive: insertCategory.isActive ?? true,
      createdAt: new Date()
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, insertCategory: InsertCategory): Promise<Category> {
    const existing = this.categories.get(id);
    if (!existing) {
      throw new Error('Category not found');
    }
    
    const category: Category = { 
      ...insertCategory, 
      id,
      image: insertCategory.image ?? null,
      description: insertCategory.description ?? null,
      parentId: insertCategory.parentId ?? null,
      icon: insertCategory.icon ?? null,
      nameEl: insertCategory.nameEl ?? null,
      descriptionEl: insertCategory.descriptionEl ?? null,
      isActive: insertCategory.isActive ?? true,
      createdAt: existing.createdAt
    };
    this.categories.set(id, category);
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    this.categories.delete(id);
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
      descriptionEl: insertProduct.descriptionEl ?? null,
      nameEl: insertProduct.nameEl ?? null,
      images: insertProduct.images ?? null,
      isFeatured: insertProduct.isFeatured ?? false,
      specifications: insertProduct.specifications ?? null,
      specificationsEl: insertProduct.specificationsEl ?? null,
      price: insertProduct.price ?? null,
      isActive: insertProduct.isActive ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, insertProduct: InsertProduct): Promise<Product> {
    const existing = this.products.get(id);
    if (!existing) {
      throw new Error('Product not found');
    }
    
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: existing.createdAt,
      description: insertProduct.description ?? null,
      descriptionEl: insertProduct.descriptionEl ?? null,
      nameEl: insertProduct.nameEl ?? null,
      images: insertProduct.images ?? null,
      isFeatured: insertProduct.isFeatured ?? false,
      specifications: insertProduct.specifications ?? null,
      specificationsEl: insertProduct.specificationsEl ?? null,
      price: insertProduct.price ?? null,
      isActive: insertProduct.isActive ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    this.products.delete(id);
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
      descriptionEl: insertSeminar.descriptionEl ?? null,
      titleEl: insertSeminar.titleEl ?? null,
      image: insertSeminar.image ?? null,
      location: insertSeminar.location ?? null,
      locationEl: insertSeminar.locationEl ?? null,
      speaker: insertSeminar.speaker ?? null,
      speakerEl: insertSeminar.speakerEl ?? null,
      fee: insertSeminar.fee ?? null,
      maxParticipants: insertSeminar.maxParticipants ?? null,
      isActive: insertSeminar.isActive ?? true
    };
    this.seminars.set(id, seminar);
    return seminar;
  }

  async updateSeminar(id: number, insertSeminar: InsertSeminar): Promise<Seminar> {
    const existing = this.seminars.get(id);
    if (!existing) {
      throw new Error('Seminar not found');
    }
    
    const seminar: Seminar = { 
      ...insertSeminar, 
      id, 
      createdAt: existing.createdAt,
      description: insertSeminar.description ?? null,
      descriptionEl: insertSeminar.descriptionEl ?? null,
      titleEl: insertSeminar.titleEl ?? null,
      image: insertSeminar.image ?? null,
      location: insertSeminar.location ?? null,
      locationEl: insertSeminar.locationEl ?? null,
      speaker: insertSeminar.speaker ?? null,
      speakerEl: insertSeminar.speakerEl ?? null,
      fee: insertSeminar.fee ?? null,
      maxParticipants: insertSeminar.maxParticipants ?? null,
      isActive: insertSeminar.isActive ?? true
    };
    this.seminars.set(id, seminar);
    return seminar;
  }

  async deleteSeminar(id: number): Promise<void> {
    this.seminars.delete(id);
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

  async updateEvent(id: number, insertEvent: InsertEvent): Promise<Event> {
    const existing = this.events.get(id);
    if (!existing) {
      throw new Error('Event not found');
    }
    
    const event: Event = { 
      ...insertEvent, 
      id, 
      createdAt: existing.createdAt,
      image: insertEvent.image ?? null,
      content: insertEvent.content ?? null,
      excerpt: insertEvent.excerpt ?? null
    };
    this.events.set(id, event);
    return event;
  }

  async deleteEvent(id: number): Promise<void> {
    this.events.delete(id);
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

  private seedCatalogueCategories() {
    const categoryData = [
      {
        id: 1,
        title: "Wheelchairs & Mobility",
        description: "Manual and electric wheelchairs, mobility scooters, and walking aids for enhanced independence",
        image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
        slug: "wheelchairs-mobility",
        isActive: true,
        displayOrder: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Lifting & Transfer Systems",
        description: "Professional lifting equipment, ceiling hoists, and transfer solutions for safe patient handling",
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        slug: "lifting-transfer-systems",
        isActive: true,
        displayOrder: 2,
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Sensory Integration",
        description: "Multi-sensory rooms, therapy equipment, and specialized environments for sensory development",
        image: "/attached_assets/maxresdefault_1752003228921.jpg",
        slug: "sensory-integration",
        isActive: true,
        displayOrder: 3,
        createdAt: new Date()
      },
      {
        id: 4,
        title: "Stair Lifts & Access",
        description: "Residential and commercial stair lifts, platform lifts, and accessibility solutions",
        image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
        slug: "stair-lifts-access",
        isActive: true,
        displayOrder: 4,
        createdAt: new Date()
      },
      {
        id: 5,
        title: "Rehabilitation Equipment",
        description: "Therapeutic exercise machines, physiotherapy equipment, and rehabilitation technology",
        image: "/attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg",
        slug: "rehabilitation-equipment",
        isActive: true,
        displayOrder: 5,
        createdAt: new Date()
      },
      {
        id: 6,
        title: "Daily Living Aids",
        description: "Assistive tools, bathroom safety equipment, and devices for independent daily living",
        image: "/attached_assets/1601936002aboutus_small2_1752007885488.jpg",
        slug: "daily-living-aids",
        isActive: true,
        displayOrder: 6,
        createdAt: new Date()
      }
    ];

    categoryData.forEach(cat => {
      this.catalogueCategories.set(cat.id, cat);
    });
  }

  private seedBrochures() {
    const brochureData = [
      // Wheelchairs & Mobility
      {
        id: 1,
        title: "Premium Wheelchair Collection 2024",
        description: "Complete range of manual and electric wheelchairs with detailed specifications and features",
        categoryId: 1,
        filename: "wheelchair-collection-2024.pdf",
        fileUrl: "/brochures/wheelchair-collection-2024.pdf",
        fileSize: "2.4 MB",
        downloadCount: 145,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Mobility Scooter Guide",
        description: "Comprehensive guide to mobility scooters for indoor and outdoor use",
        categoryId: 1,
        filename: "mobility-scooter-guide.pdf",
        fileUrl: "/brochures/mobility-scooter-guide.pdf",
        fileSize: "1.8 MB",
        downloadCount: 98,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Walking Aids & Support Equipment",
        description: "Walking frames, rollators, and mobility support devices for enhanced stability",
        categoryId: 1,
        filename: "walking-aids-catalog.pdf",
        fileUrl: "/brochures/walking-aids-catalog.pdf",
        fileSize: "1.2 MB",
        downloadCount: 67,
        isActive: true,
        createdAt: new Date()
      },

      // Lifting & Transfer Systems
      {
        id: 4,
        title: "Ceiling Hoist Systems",
        description: "Professional ceiling-mounted lifting solutions for healthcare facilities",
        categoryId: 2,
        filename: "ceiling-hoist-systems.pdf",
        fileUrl: "/brochures/ceiling-hoist-systems.pdf",
        fileSize: "3.1 MB",
        downloadCount: 234,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 5,
        title: "Mobile Lifting Equipment",
        description: "Portable hoists and transfer aids for flexible patient handling",
        categoryId: 2,
        filename: "mobile-lifting-equipment.pdf",
        fileUrl: "/brochures/mobile-lifting-equipment.pdf",
        fileSize: "2.6 MB",
        downloadCount: 156,
        isActive: true,
        createdAt: new Date()
      },

      // Sensory Integration
      {
        id: 6,
        title: "Multi-Sensory Room Design Guide",
        description: "Complete guide to designing and equipping multi-sensory therapy environments",
        categoryId: 3,
        filename: "multi-sensory-room-guide.pdf",
        fileUrl: "/brochures/multi-sensory-room-guide.pdf",
        fileSize: "4.2 MB",
        downloadCount: 189,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 7,
        title: "Sensory Equipment Catalog",
        description: "Interactive equipment for sensory stimulation and therapeutic activities",
        categoryId: 3,
        filename: "sensory-equipment-catalog.pdf",
        fileUrl: "/brochures/sensory-equipment-catalog.pdf",
        fileSize: "2.9 MB",
        downloadCount: 123,
        isActive: true,
        createdAt: new Date()
      },

      // Stair Lifts & Access
      {
        id: 8,
        title: "Residential Stair Lift Solutions",
        description: "Home stair lifts for straight and curved staircases with installation guide",
        categoryId: 4,
        filename: "residential-stair-lifts.pdf",
        fileUrl: "/brochures/residential-stair-lifts.pdf",
        fileSize: "2.1 MB",
        downloadCount: 87,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 9,
        title: "Platform Lifts & Accessibility",
        description: "Vertical platform lifts and accessibility solutions for commercial buildings",
        categoryId: 4,
        filename: "platform-lifts-accessibility.pdf",
        fileUrl: "/brochures/platform-lifts-accessibility.pdf",
        fileSize: "1.9 MB",
        downloadCount: 76,
        isActive: true,
        createdAt: new Date()
      },

      // Rehabilitation Equipment
      {
        id: 10,
        title: "HUR Rehabilitation Technology",
        description: "Pneumatic exercise equipment for neurological and spinal cord rehabilitation",
        categoryId: 5,
        filename: "hur-rehabilitation-technology.pdf",
        fileUrl: "/brochures/hur-rehabilitation-technology.pdf",
        fileSize: "3.5 MB",
        downloadCount: 267,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 11,
        title: "Physiotherapy Equipment Range",
        description: "Professional physiotherapy tools and therapeutic exercise machines",
        categoryId: 5,
        filename: "physiotherapy-equipment-range.pdf",
        fileUrl: "/brochures/physiotherapy-equipment-range.pdf",
        fileSize: "2.7 MB",
        downloadCount: 178,
        isActive: true,
        createdAt: new Date()
      },

      // Daily Living Aids
      {
        id: 12,
        title: "Bathroom Safety Solutions",
        description: "Complete range of bathroom aids, shower seats, and safety equipment",
        categoryId: 6,
        filename: "bathroom-safety-solutions.pdf",
        fileUrl: "/brochures/bathroom-safety-solutions.pdf",
        fileSize: "1.6 MB",
        downloadCount: 94,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 13,
        title: "Kitchen & Dining Aids",
        description: "Adaptive tools and equipment for independent meal preparation and dining",
        categoryId: 6,
        filename: "kitchen-dining-aids.pdf",
        fileUrl: "/brochures/kitchen-dining-aids.pdf",
        fileSize: "1.4 MB",
        downloadCount: 55,
        isActive: true,
        createdAt: new Date()
      }
    ];

    brochureData.forEach(brochure => {
      this.brochures.set(brochure.id, brochure);
    });
  }

  // Catalogue Categories
  async getCatalogueCategories(): Promise<CatalogueCategory[]> {
    return Array.from(this.catalogueCategories.values())
      .filter(cat => cat.isActive)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  async getCatalogueCategory(id: number): Promise<CatalogueCategory | undefined> {
    return this.catalogueCategories.get(id);
  }

  async getCatalogueCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined> {
    return Array.from(this.catalogueCategories.values()).find(cat => cat.slug === slug);
  }

  async createCatalogueCategory(insertCategory: InsertCatalogueCategory): Promise<CatalogueCategory> {
    const id = this.currentId++;
    const category: CatalogueCategory = { 
      ...insertCategory, 
      id, 
      createdAt: new Date(),
      description: insertCategory.description ?? null,
      isActive: insertCategory.isActive ?? true,
      displayOrder: insertCategory.displayOrder ?? 0
    };
    this.catalogueCategories.set(id, category);
    return category;
  }

  // Brochures
  async getBrochures(): Promise<Brochure[]> {
    return Array.from(this.brochures.values()).filter(brochure => brochure.isActive);
  }

  async getBrochure(id: number): Promise<Brochure | undefined> {
    return this.brochures.get(id);
  }

  async getBrochuresByCategory(categoryId: number): Promise<Brochure[]> {
    return Array.from(this.brochures.values())
      .filter(brochure => brochure.categoryId === categoryId && brochure.isActive)
      .sort((a, b) => b.downloadCount! - a.downloadCount!); // Sort by popularity
  }

  async createBrochure(insertBrochure: InsertBrochure): Promise<Brochure> {
    const id = this.currentId++;
    const brochure: Brochure = { 
      ...insertBrochure, 
      id, 
      createdAt: new Date(),
      description: insertBrochure.description ?? null,
      categoryId: insertBrochure.categoryId ?? null,
      fileSize: insertBrochure.fileSize ?? null,
      downloadCount: insertBrochure.downloadCount ?? 0,
      isActive: insertBrochure.isActive ?? true
    };
    this.brochures.set(id, brochure);
    return brochure;
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const brochure = this.brochures.get(id);
    if (brochure) {
      this.brochures.set(id, { ...brochure, downloadCount: (brochure.downloadCount ?? 0) + 1 });
    }
  }
}

import { PostgresStorage } from "./production";

// Use PostgreSQL in production, MemStorage in development
export const storage = process.env.NODE_ENV === 'production' && process.env.DATABASE_URL
  ? new PostgresStorage(process.env.DATABASE_URL)
  : new MemStorage();
