import { MySQLStorage } from "./mysql-storage";

export async function seedMySQLData(storage: MySQLStorage) {
  console.log('🌱 Seeding MySQL database with sample data...');

  try {
    // Seed admin user
    const adminUser = {
      username: "admin",
      email: "admin@abletools.com.cy",
      password: "admin123",
      firstName: "Admin",
      lastName: "User",
      role: "admin" as const,
      address: "123 Rehabilitation Center, Strovolos, Cyprus",
      phone: "+357 22 123 456",
      city: "Strovolos",
      postcode: "2042",
      occupation: "Administrator"
    };

    const existingAdmin = await storage.getUserByUsername("admin");
    if (!existingAdmin) {
      await storage.createUser(adminUser);
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // Seed main categories
    const categories = [
      { id: 1, name: "Wheelchairs", description: "Manual and electric wheelchairs for enhanced mobility", icon: "wheelchair", parentId: null, image: "/attached_assets/bingo_evolution_twins-1_1752003228920.jpg" },
      { id: 2, name: "Lifting Systems", description: "Professional lifting and transfer systems for safe patient handling", icon: "cog", parentId: null, image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg" },
      { id: 3, name: "Mobility Aids", description: "Walking aids and mobility equipment for independence", icon: "walking", parentId: null, image: "/attached_assets/1601935107aboutus_1752007024526.jpg" },
      { id: 4, name: "Sensory Integration", description: "Multi-sensory therapy equipment and environments", icon: "brain", parentId: null, image: "/attached_assets/maxresdefault_1752003228921.jpg" },
      { id: 5, name: "Stair Lifts", description: "Staircase accessibility solutions", icon: "stairs", parentId: null, image: "/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg" },
      { id: 6, name: "Daily Living Aids", description: "Assistive tools for everyday tasks", icon: "hands-helping", parentId: null, image: "/attached_assets/1601936002aboutus_small2_1752007885488.jpg" },
    ];

    for (const cat of categories) {
      const existing = await storage.getCategory(cat.id);
      if (!existing) {
        await storage.createCategory(cat);
      }
    }

    // Seed subcategories
    const subCategories = [
      { id: 21, name: "Manual Wheelchairs", description: "Self-propelled wheelchairs", icon: "wheelchair", parentId: 1, image: null },
      { id: 22, name: "Electric Wheelchairs", description: "Powered wheelchairs", icon: "battery", parentId: 1, image: null },
      { id: 31, name: "Ceiling Hoists", description: "Track-mounted lifting systems", icon: "cog", parentId: 2, image: null },
      { id: 32, name: "Mobile Hoists", description: "Portable lifting equipment", icon: "truck", parentId: 2, image: null },
    ];

    for (const cat of subCategories) {
      const existing = await storage.getCategory(cat.id);
      if (!existing) {
        await storage.createCategory(cat);
      }
    }

    // Seed products
    const products = [
      {
        id: 1,
        name: "Wolturnus W5 Wheelchair",
        description: "Premium ultra-lightweight rigid wheelchair with advanced engineering for superior performance and comfort",
        categoryId: 21,
        images: ["/attached_assets/bingo_evolution_twins-1_1752003228920.jpg"],
        isFeatured: true,
        specifications: "Weight: 6.8kg, Carbon fiber frame, Adjustable geometry"
      },
      {
        id: 2,
        name: "Homeglide Stair Lift",
        description: "Straight stair lift for indoor use with smooth operation and safety features",
        categoryId: 5,
        images: ["/attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg"],
        isFeatured: true,
        specifications: "Weight capacity: 140kg, Battery backup, Safety sensors"
      },
      {
        id: 3,
        name: "Multi-Sensory Environment Package",
        description: "Complete sensory room setup with interactive lighting, sounds, and tactile elements",
        categoryId: 4,
        images: ["/attached_assets/maxresdefault_1752003228921.jpg"],
        isFeatured: true,
        specifications: "LED lighting system, Fiber optics, Bubble tubes, Interactive projection"
      },
      {
        id: 4,
        name: "Bingo Evolution Pushchair",
        description: "Advanced rehabilitation pushchair with superior comfort and functionality",
        categoryId: 6,
        images: ["/attached_assets/bingo_evolution_twins-1_1752003228920.jpg"],
        isFeatured: true,
        specifications: "Adjustable seating, Weather protection, Safety harness"
      }
    ];

    for (const product of products) {
      const existing = await storage.getProduct(product.id);
      if (!existing) {
        await storage.createProduct(product);
      }
    }

    // Seed seminars
    const seminars = [
      {
        id: 1,
        title: "Advanced Rehabilitation Techniques",
        description: "Comprehensive training in modern rehabilitation methodologies",
        content: "This seminar covers the latest rehabilitation techniques including neuroplasticity principles, functional movement patterns, and evidence-based therapy approaches.",
        date: "2025-02-15",
        time: "09:00",
        duration: "8 hours",
        location: "AbleTools Training Center, Strovolos",
        instructor: "Dr. Maria Konstantinou",
        maxParticipants: 25,
        currentParticipants: 12,
        price: 150,
        image: "/attached_assets/seminar_1752044011822.jpeg",
        type: "seminar" as const,
        isActive: true
      },
      {
        id: 2,
        title: "HUR Equipment Certification",
        description: "Professional certification for HUR rehabilitation equipment",
        content: "Learn to operate and maintain HUR pneumatic exercise equipment used in spinal cord and neurological rehabilitation.",
        date: "2025-02-22",
        time: "10:00",
        duration: "6 hours",
        location: "HUR Cyprus Center",
        instructor: "Technical Specialist",
        maxParticipants: 15,
        currentParticipants: 8,
        price: 200,
        image: "/attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
        type: "training" as const,
        isActive: true
      }
    ];

    for (const seminar of seminars) {
      const existing = await storage.getSeminar(seminar.id);
      if (!existing) {
        await storage.createSeminar(seminar);
      }
    }

    // Seed events
    const events = [
      {
        id: 1,
        title: "Rehabilitation Equipment Expo 2025",
        description: "Annual showcase of the latest rehabilitation technology",
        content: "Join us for the biggest rehabilitation equipment exhibition in Cyprus, featuring live demonstrations, expert talks, and networking opportunities.",
        date: "2025-03-15",
        location: "Cyprus International Conference Centre",
        image: "/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg",
        isActive: true
      },
      {
        id: 2,
        title: "Community Accessibility Initiative",
        description: "Supporting community accessibility projects",
        content: "AbleTools is proud to support local accessibility initiatives, providing equipment and expertise to improve community spaces.",
        date: "2025-04-10",
        location: "Various Community Centers",
        image: "/attached_assets/Achievement_1752003982449.jpg",
        isActive: true
      }
    ];

    for (const event of events) {
      const existing = await storage.getEvent(event.id);
      if (!existing) {
        await storage.createEvent(event);
      }
    }

    // Seed achievements
    const achievements = [
      {
        id: 1,
        title: "Excellence in Service Award",
        description: "Recognized for outstanding customer service and support in the rehabilitation equipment industry",
        date: "2024-12-01",
        image: "/attached_assets/Achievement_1752003982449.jpg",
        isActive: true
      },
      {
        id: 2,
        title: "Cyprus Healthcare Innovation Award",
        description: "Awarded for innovative solutions in healthcare equipment and accessibility",
        date: "2024-11-15",
        image: "/attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg",
        isActive: true
      }
    ];

    for (const achievement of achievements) {
      const existing = await storage.getAchievements();
      const existingAchievement = existing.find(a => a.id === achievement.id);
      if (!existingAchievement) {
        await storage.createAchievement(achievement);
      }
    }

    // Seed banners
    const banners = [
      {
        id: 1,
        title: "Rehabilitation Equipment & Solutions",
        subtitle: "Professional healthcare equipment for enhanced quality of life",
        image: "/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg",
        link: "/products",
        isActive: true,
        sortOrder: 1
      },
      {
        id: 2,
        title: "About AbleTools Cyprus",
        subtitle: "Your trusted partner in rehabilitation technology",
        image: "/attached_assets/1601935107aboutus_1752007024526.jpg",
        link: "/about",
        isActive: true,
        sortOrder: 2
      }
    ];

    for (const banner of banners) {
      const existing = await storage.getActiveBanners();
      const existingBanner = existing.find(b => b.id === banner.id);
      if (!existingBanner) {
        await storage.createBanner(banner);
      }
    }

    // Seed catalogue categories
    const catalogueCategories = [
      {
        id: 1,
        name: "Wheelchairs & Mobility",
        description: "Product brochures for wheelchairs and mobility equipment",
        slug: "wheelchairs-mobility",
        icon: "wheelchair",
        sortOrder: 1,
        isActive: true
      },
      {
        id: 2,
        name: "Rehabilitation Equipment",
        description: "Technical specifications for rehabilitation equipment",
        slug: "rehabilitation-equipment",
        icon: "cog",
        sortOrder: 2,
        isActive: true
      }
    ];

    for (const category of catalogueCategories) {
      const existing = await storage.getCatalogueCategory(category.id);
      if (!existing) {
        await storage.createCatalogueCategory(category);
      }
    }

    // Seed brochures
    const brochures = [
      {
        id: 1,
        title: "Wolturnus Wheelchair Range",
        description: "Complete product range and specifications for Wolturnus wheelchairs",
        fileName: "wolturnus-range-2025.pdf",
        filePath: "/brochures/wolturnus-range-2025.pdf",
        fileSize: 2048000,
        categoryId: 1,
        downloadCount: 45,
        isActive: true
      },
      {
        id: 2,
        title: "HUR Rehabilitation Equipment",
        description: "Technical specifications and training materials for HUR equipment",
        fileName: "hur-equipment-guide.pdf",
        filePath: "/brochures/hur-equipment-guide.pdf",
        fileSize: 3072000,
        categoryId: 2,
        downloadCount: 32,
        isActive: true
      }
    ];

    for (const brochure of brochures) {
      const existing = await storage.getBrochure(brochure.id);
      if (!existing) {
        await storage.createBrochure(brochure);
      }
    }

    console.log('✅ MySQL database seeding completed successfully');

  } catch (error) {
    console.error('❌ Error seeding MySQL database:', error);
    throw error;
  }
}