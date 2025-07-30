// Static data for AbleTools website - Complete dataset
window.ABLETOOLS_DATA = {
  // Helper function to use static data in static environments
  useStaticData: () => typeof window !== 'undefined' && window.location.protocol === 'file:',
  // Product Categories with hierarchical structure
  productCategories: [
    {
      id: 1,
      name: "Wheelchairs & Mobility",
      description: "Complete range of wheelchairs and mobility solutions",
      image: "attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
      slug: "wheelchairs-mobility",
      productCount: 8,
      subcategories: [
        { id: 1, name: "Manual Wheelchairs", slug: "manual-wheelchairs", productCount: 4 },
        { id: 2, name: "Electric Wheelchairs", slug: "electric-wheelchairs", productCount: 4 }
      ]
    },
    {
      id: 2,
      name: "Lifting Systems",
      description: "Professional patient lifting and transfer equipment", 
      image: "attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
      slug: "lifting-systems",
      productCount: 6,
      subcategories: [
        { id: 3, name: "Ceiling Hoists", slug: "ceiling-hoists", productCount: 3 },
        { id: 4, name: "Mobile Hoists", slug: "mobile-hoists", productCount: 3 }
      ]
    },
    {
      id: 3,
      name: "Stairlifts & Access",
      description: "Stairlifts and accessibility solutions",
      image: "attached_assets/1599058641products_home_1751993768399.jpg",
      slug: "stairlifts-access",
      productCount: 4,
      subcategories: [
        { id: 5, name: "Straight Stairlifts", slug: "straight-stairlifts", productCount: 2 },
        { id: 6, name: "Curved Stairlifts", slug: "curved-stairlifts", productCount: 2 }
      ]
    },
    {
      id: 4,
      name: "Exercise & Rehabilitation",
      description: "Advanced exercise and rehabilitation equipment",
      image: "attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
      slug: "exercise-rehabilitation",
      productCount: 5,
      subcategories: [
        { id: 7, name: "HUR Equipment", slug: "hur-equipment", productCount: 3 },
        { id: 8, name: "Therapy Equipment", slug: "therapy-equipment", productCount: 2 }
      ]
    },
    {
      id: 5,
      name: "Sensory Integration",
      description: "Multi-sensory room equipment and therapy tools",
      image: "attached_assets/maxresdefault_1752003228921.jpg",
      slug: "sensory-integration",
      productCount: 4,
      subcategories: [
        { id: 9, name: "Interactive Equipment", slug: "interactive-equipment", productCount: 2 },
        { id: 10, name: "Sensory Tools", slug: "sensory-tools", productCount: 2 }
      ]
    },
    {
      id: 6,
      name: "Daily Living Aids",
      description: "Essential daily living aids and assistive devices",
      image: "attached_assets/1601936002aboutus_small2_1752007885488.jpg",
      slug: "daily-living-aids",
      productCount: 6,
      subcategories: [
        { id: 11, name: "Bathroom Aids", slug: "bathroom-aids", productCount: 3 },
        { id: 12, name: "Kitchen Aids", slug: "kitchen-aids", productCount: 3 }
      ]
    }
  ],

  catalogueCategories: [
    {
      id: 1,
      title: "Wheelchairs & Mobility",
      description: "Complete range of wheelchairs and mobility solutions",
      image: "attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
      brochureCount: 3,
      slug: "wheelchairs-mobility"
    },
    {
      id: 2,
      title: "Lifting & Transfer Systems", 
      description: "Professional patient lifting and transfer equipment",
      image: "attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg",
      brochureCount: 2,
      slug: "lifting-systems"
    },
    {
      id: 3,
      title: "Sensory Integration",
      description: "Multi-sensory room equipment and therapy tools",
      image: "attached_assets/maxresdefault_1752003228921.jpg",
      brochureCount: 2,
      slug: "sensory-integration"
    }
  ],

  // Education/Training Programs
  educationPrograms: [
    {
      id: 1,
      title: "Advanced Rehabilitation Techniques",
      type: "seminar",
      description: "Comprehensive training on advanced rehabilitation techniques and evidence-based practices",
      duration: "2 days",
      date: "2025-09-15",
      image: "attached_assets/seminar_1752044011822.jpeg",
      instructor: "Dr. Maria Constantinou",
      price: 450
    },
    {
      id: 2,
      title: "HUR Equipment Certification",
      type: "training",
      description: "Professional certification training for HUR pneumatic rehabilitation equipment",
      duration: "1 day", 
      date: "2025-10-20",
      image: "attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
      instructor: "HUR Certified Trainer",
      price: 350
    },
    {
      id: 3,
      title: "Accessibility Assessment Training",
      type: "training",
      description: "Comprehensive training on home and workplace accessibility assessment",
      duration: "1 day",
      date: "2025-11-10",
      image: "attached_assets/1601935107aboutus_1752007024526.jpg",
      instructor: "Prof. Andreas Dimitriou",
      price: 300
    },
    {
      id: 4,
      title: "Pediatric Rehabilitation Training",
      type: "seminar",
      description: "Specialized pediatric rehabilitation training program for therapists",
      duration: "3 days",
      date: "2025-12-05",
      image: "attached_assets/1602069478aboutus_temp_1752007885489.jpg",
      instructor: "Dr. Elena Nicolaou",
      price: 650
    },
    {
      id: 5,
      title: "Multi-Sensory Room Design",
      type: "training",
      description: "Comprehensive training on designing effective multi-sensory therapeutic environments",
      duration: "2 days",
      date: "2026-01-15",
      image: "attached_assets/maxresdefault_1752003228921.jpg",
      instructor: "Sensory Design Specialist",
      price: 500
    },
    {
      id: 6,
      title: "Wheelchair Assessment & Prescription",
      type: "training",
      description: "Professional training in wheelchair assessment and prescription",
      duration: "1 day",
      date: "2026-02-20",
      image: "attached_assets/bingo_evolution_twins-1_1752003228920.jpg",
      instructor: "Mobility Specialist",
      price: 400
    }
  ],

  // News Articles
  newsArticles: [
    {
      id: 1,
      title: "New HUR Equipment Range",
      category: "Product Launch",
      date: "2025-07-25",
      excerpt: "AbleTools introduces the latest HUR pneumatic equipment range for advanced rehabilitation.",
      image: "attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
      author: "Marketing Team"
    },
    {
      id: 2,
      title: "Annual Equipment Expo 2025",
      category: "Events",
      date: "2025-07-20",
      excerpt: "Join us at the Annual Equipment Expo featuring the latest rehabilitation technology.",
      image: "attached_assets/Achievement_1752003982449.jpg",
      author: "Events Team"
    },
    {
      id: 3,
      title: "Community Outreach Program",
      category: "Community",
      date: "2025-07-15",
      excerpt: "New community outreach program provides equipment support for underserved populations.",
      image: "attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg",
      author: "Community Relations"
    },
    {
      id: 4,
      title: "Partnership with European Rehabilitation Center",
      category: "Partnership",
      date: "2025-07-10",
      excerpt: "Strategic partnership with leading European centers for advanced training programs.",
      image: "attached_assets/1601935107aboutus_1752007024526.jpg",
      author: "Business Development"
    },
    {
      id: 5,
      title: "Award for Excellence in Healthcare Innovation",
      category: "Awards",
      date: "2025-07-05",
      excerpt: "AbleTools receives prestigious award for excellence in healthcare innovation.",
      image: "attached_assets/what-is-true-sense-of-accomplishment-and-how-to-achive-it_1752003982450.jpg",
      author: "PR Team"
    },
    {
      id: 6,
      title: "New Showroom Opening in Limassol",
      category: "Expansion",
      date: "2025-06-30",
      excerpt: "New state-of-the-art showroom opens in Limassol with latest equipment demonstrations.",
      image: "attached_assets/1599038152about_us_home_1751993313592.jpg",
      author: "Operations Team"
    }
  ],
  
  solutions: [
    {
      id: 1,
      title: "Sensory Integration Rooms",
      description: "Specialized environments for sensory processing therapy",
      image: "attached_assets/1602069478aboutus_temp_1752007885489.jpg",
      features: ["Controlled lighting", "Tactile equipment", "Sound systems"],
      applications: ["Autism therapy", "ADHD treatment", "Developmental delays"]
    },
    {
      id: 2,
      title: "Multi-Sensory Rooms",
      description: "Interactive environments for therapeutic intervention", 
      image: "attached_assets/1601936002aboutus_small2_1752007885488.jpg",
      features: ["Interactive panels", "Fiber optics", "Bubble tubes"],
      applications: ["Learning disabilities", "Dementia care", "Relaxation therapy"]
    }
  ],
  
  newsArticles: [
    {
      id: 1,
      title: "New HUR Equipment Range Now Available",
      content: "We are excited to announce the arrival of the latest HUR pneumatic exercise equipment range, featuring advanced rehabilitation technology for spinal cord and neurological rehabilitation.",
      date: "2025-07-20",
      image: "attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
      category: "Product Launch",
      featured: true
    },
    {
      id: 2,
      title: "AbleTools Expands Training Programs",
      content: "Our comprehensive training programs now include specialized courses for healthcare professionals, covering the latest rehabilitation techniques and equipment usage.",
      date: "2025-07-15", 
      image: "attached_assets/seminar_1752044011822.jpeg",
      category: "Education",
      featured: false
    }
  ],
  
  banners: [
    {
      id: 1,
      title: "Rehabilitation Equipment & Solutions",
      subtitle: "Your Ability to Dream!",
      description: "Leading provider of rehabilitation equipment and assistive technology solutions in Cyprus",
      image: "attached_assets/1599038152about_us_home_1751993313592.jpg",
      buttonText: "Explore Products",
      buttonLink: "/products"
    }
  ],
  
  products: [
    {
      id: 1,
      name: "Wolturnus W5",
      description: "Premium lightweight wheelchair with advanced customization options",
      category: "Wheelchairs",
      images: ["attached_assets/bingo_evolution_twins-1_1752003228920.jpg"],
      isFeatured: true,
      price: "Contact for pricing",
      specifications: "Lightweight aluminum frame, adjustable seating, premium wheels"
    },
    {
      id: 2,
      name: "Ceiling Track Hoist System",
      description: "Professional ceiling-mounted patient lifting system",
      category: "Lifting Systems",
      images: ["attached_assets/cc1b09e90722c7d00b3f0cb8757c6d79_1752003228919.jpg"],
      isFeatured: true,
      price: "Contact for pricing",
      specifications: "300kg capacity, smooth operation, safety certified"
    },
    {
      id: 3,
      name: "Mimos Pillow",
      description: "Therapeutic pillow for head shape correction in infants",
      category: "Therapeutic Equipment",
      images: ["attached_assets/maxresdefault_1752003228921.jpg"],
      isFeatured: true,
      price: "Contact for pricing",
      specifications: "Medical grade materials, breathable design, washable"
    }
  ],
  
  categories: [
    {
      id: 1,
      name: "Lifting Systems",
      description: "Professional patient lifting and transfer equipment",
      icon: "Package",
      image: "attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg",
      subcategoryCount: 3,
      productCount: 15
    },
    {
      id: 2,
      name: "Wheelchairs & Mobility",
      description: "Advanced mobility solutions and wheelchairs",
      icon: "Package",
      image: "attached_assets/1599058641products_home_1751993768399.jpg",
      subcategoryCount: 4,
      productCount: 22
    },
    {
      id: 3,
      name: "Sensory Integration",
      description: "Multi-sensory room equipment and therapy tools",
      icon: "Package",
      image: "attached_assets/1602069478aboutus_temp_1752007885489.jpg",
      subcategoryCount: 2,
      productCount: 8
    }
  ],
  
  seminars: [
    {
      id: 1,
      title: "Advanced Rehabilitation Techniques",
      description: "Comprehensive training on modern rehabilitation methods and equipment usage",
      date: "2025-08-15",
      location: "AbleTools Training Center, Cyprus",
      speaker: "Dr. Maria Konstantinou, PT, PhD",
      image: "attached_assets/HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
      fee: "€150",
      maxParticipants: 20,
      type: "seminar"
    },
    {
      id: 2,
      title: "HUR Equipment Certification",
      description: "Professional certification course for HUR pneumatic exercise equipment",
      date: "2025-09-10",
      location: "Cyprus Rehabilitation Institute",
      speaker: "HUR Certified Instructor",
      image: "attached_assets/seminar_1752044011822.jpeg",
      fee: "€200",
      maxParticipants: 15,
      type: "training"
    }
  ],
  
  events: [
    {
      id: 1,
      title: "HUR - Spinal Cord and Neurological Rehabilitation",
      content: "Join us for an informative session about HUR equipment benefits for spinal cord and neurological rehabilitation",
      date: "2025-08-20",
      image: "attached_assets/Spinal-Cord-Rehabilitation_1752000796341.jpg"
    },
    {
      id: 2,
      title: "Accessibility Equipment Expo 2025",
      content: "Annual exhibition showcasing the latest in accessibility and rehabilitation technology",
      date: "2025-09-05",
      image: "attached_assets/Achievement_1752003982449.jpg"
    }
  ],
  
  achievements: [
    {
      id: 1,
      title: "Excellence in Service",
      description: "Recognized for outstanding customer service and support in the rehabilitation equipment industry",
      image: "attached_assets/able_1752003982447.jpg",
      year: "2024"
    },
    {
      id: 2,
      title: "Innovation Award",
      description: "Awarded for innovative solutions in assistive technology and rehabilitation equipment",
      image: "attached_assets/send-award-virtual-celebration-employee-milestones_1752004100582.jpg",
      year: "2023"
    },
    {
      id: 3,
      title: "Community Impact",
      description: "Making a difference in the lives of people with disabilities through quality equipment and services",
      image: "attached_assets/what-is-true-sense-of-accomplishment-and-how-to-achive-it_1752003982450.jpg",
      year: "2024"
    }
  ],
  
  // Brochures for catalogue
  brochures: [
    {
      id: 1,
      title: "Premium Wheelchairs Collection 2025",
      description: "Complete guide to our latest wheelchair technology",
      categoryId: 1,
      fileUrl: "#",
      downloadCount: 156,
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Advanced Lifting Systems",
      description: "Professional patient lifting and transfer solutions",
      categoryId: 2,
      fileUrl: "#",
      downloadCount: 89,
      fileSize: "1.8 MB"
    },
    {
      id: 3,
      title: "Sensory Integration Equipment Guide",
      description: "Multi-sensory room equipment and therapy tools",
      categoryId: 3,
      fileUrl: "#",
      downloadCount: 112,
      fileSize: "3.1 MB"
    }
  ]
};