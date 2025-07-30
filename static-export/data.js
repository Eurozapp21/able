// Static data for AbleTools website - Complete dataset
window.ABLETOOLS_DATA = {
  // Helper function to use static data in static environments
  useStaticData: () => typeof window !== 'undefined' && window.location.protocol === 'file:',
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