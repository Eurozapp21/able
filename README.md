# AbleTools - Rehabilitation Equipment Management System

## Overview

AbleTools is a comprehensive web application for managing rehabilitation equipment, educational services, and customer support for AbleTools Ltd, a leading provider of rehabilitation equipment and technology solutions based in Cyprus.

## Features

### 🏠 Homepage
- Dynamic banner carousel with company highlights
- Featured products showcase
- Educational seminars and training programs
- Recent events and achievements
- Company statistics and overview

### 🛒 Product Management
- Hierarchical product categorization system
- Advanced search and filtering capabilities
- Detailed product pages with specifications
- Image galleries with navigation
- Product enquiry system

### 🎓 Educational Services
- Educational seminars with detailed course information
- Professional training programs
- Event management and scheduling
- Registration and booking system
- Speaker profiles and resources

### 📰 News & Events
- News article management
- Event announcements
- Category-based content organization
- Search functionality
- Social media integration

### 📋 Solutions & Services
- Sensory integration rooms
- Multi-sensory therapy environments
- Immersive reality solutions
- Custom consultation services
- Design and installation support

### 📚 Catalogue System
- Downloadable brochures and documentation
- Category-based organization
- Download tracking and analytics
- PDF file management

### 💬 Customer Support
- Enquiry management system
- Real-time messaging
- Support ticket tracking
- User authentication and profiles

### 🔧 Admin Panel
- Content management system
- User management
- Product administration
- Analytics and reporting
- Banner and media management

## Technology Stack

### Frontend
- **React.js** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **shadcn/ui** component library for consistent UI
- **TanStack Query** for efficient data fetching
- **Wouter** for client-side routing
- **React Hook Form** with Zod validation

### Backend
- **Express.js** server with TypeScript
- **PostgreSQL** database with Drizzle ORM
- **Session-based authentication**
- **RESTful API architecture**
- **bcrypt** for password hashing

### Development Tools
- **Vite** for fast development and building
- **ESBuild** for production bundling
- **Drizzle Kit** for database migrations
- **TypeScript** for full-stack type safety

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   DATABASE_URL=your_postgresql_connection_string
   ```

4. Run database migrations:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend application
│   ├── routes.ts          # API route definitions
│   ├── admin-routes.ts    # Admin panel routes
│   ├── storage.ts         # Database interface
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema definitions
├── attached_assets/       # Static media files
└── README.md             # This file
```

## Key Features Explained

### Hierarchical Product Categories
Products are organized in a multi-level category system:
- Main categories (e.g., Wheelchairs, Lifting Systems)
- Sub-categories (e.g., Manual Wheelchairs, Electric Wheelchairs)
- Product-specific categories (e.g., Wolturnus Series)

### Educational System
- **Seminars**: Educational courses for healthcare professionals
- **Training**: Certification programs and workshops
- **Events**: Company announcements and industry events

### Customer Management
- User registration and authentication
- Enquiry submission and tracking
- Support ticket system with messaging
- User dashboard and profile management

### Admin Dashboard
Comprehensive content management including:
- Product and category management
- User administration
- Content publishing (news, events, seminars)
- Analytics and reporting
- Media file management

## Database Schema

The application uses the following main entities:
- **Users**: Customer accounts and admin users
- **Categories**: Hierarchical product organization
- **Products**: Equipment inventory and specifications
- **Seminars**: Educational content and scheduling
- **Events**: News and announcements
- **Enquiries**: Customer support tickets
- **Achievements**: Company milestones
- **Banners**: Homepage carousel content
- **Catalogue**: Downloadable resources

## Authentication & Security

- Session-based authentication with secure cookies
- Password hashing with bcrypt
- Role-based access control (admin/user)
- CSRF protection
- Input validation and sanitization

## Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- All modern browsers

## Company Information

**AbleTools Ltd**
- Location: Strovolos, Cyprus
- Specialization: Rehabilitation equipment and technology solutions
- Services: Equipment supply, consultation, design, installation
- Focus: Multi-sensory therapy environments and accessibility solutions

## Contributing

This is a proprietary application for AbleTools Ltd. For development inquiries, please contact the development team.

## License

Copyright © 2025 AbleTools Ltd. All rights reserved.

## Support

For technical support or questions about the application, please contact:
- Email: info@abletools.com.cy
- Phone: +357 22 123456
- Address: Strovolos, Cyprus

---

*"Your ability to dream!"* - AbleTools Ltd