# Rehabilitation Equipment Management System

## Overview

This is a full-stack web application for AbleTools Ltd, a rehabilitation equipment and technology solutions company. The system provides a comprehensive platform for managing products, services, educational content, and customer enquiries in the rehabilitation equipment industry.

## System Architecture

### Technology Stack
- **Frontend**: React with TypeScript, using shadcn/ui components and Tailwind CSS for styling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication
- **Payment**: PayPal integration for transactions
- **Build Tool**: Vite for frontend bundling and development
- **Deployment**: Production-ready with esbuild for server bundling

### Architecture Pattern
The application follows a monorepo structure with clear separation between client, server, and shared code:
- `/client/` - React frontend application
- `/server/` - Express.js backend API
- `/shared/` - Shared TypeScript schemas and types

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui with Radix UI primitives for accessible, customizable components
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming

### Backend Architecture
- **API Structure**: RESTful endpoints organized by feature domains
- **Database Layer**: Drizzle ORM providing type-safe database operations
- **Middleware**: Express middleware for authentication, logging, and error handling
- **Session Management**: Express sessions with PostgreSQL storage

### Database Schema
The system manages several core entities:
- **Users**: Customer accounts with profile information
- **Categories**: Hierarchical product categorization
- **Products**: Equipment inventory with images and specifications
- **Seminars**: Educational events with scheduling and participant management
- **Events**: News and company updates
- **Enquiries**: Customer support ticket system with messaging
- **Achievements**: Company milestones and certifications
- **Banners**: Homepage carousel content

## Data Flow

### Authentication Flow
1. Users register/login through form validation
2. Server validates credentials and creates sessions
3. Protected routes check session middleware
4. Client maintains auth state through React context

### Product Management Flow
1. Products are categorized hierarchically
2. Featured products displayed on homepage
3. Search and filtering capabilities across product catalog
4. Product details include images, specifications, and enquiry options

### Enquiry System Flow
1. Users submit enquiries through forms
2. Support ticket system tracks conversations
3. Real-time messaging between customers and support
4. Status tracking and resolution workflow

## External Dependencies

### Core Libraries
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema definition
- **shadcn/ui**: Pre-built accessible UI components

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

### External Services
- **PayPal SDK**: Payment processing integration
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit**: Development environment and deployment platform

## Deployment Strategy

### Development Environment
- Vite dev server for hot module replacement
- TypeScript compilation with incremental builds
- Database migrations through Drizzle Kit
- Environment-specific configuration

### Production Build
- Frontend: Vite builds optimized static assets
- Backend: ESBuild bundles server code for Node.js
- Database: Production migrations and connection pooling
- Session storage: PostgreSQL-based session management

### Environment Configuration
- Database URL configuration through environment variables
- Production/development mode switching
- Asset serving strategy differs between environments

## Changelog
- July 08, 2025. Initial setup
- July 08, 2025. Integrated authentic company logo and banner images from uploaded assets
- July 08, 2025. Fixed navigation structure and added smooth fade transitions to homepage carousel
- July 08, 2025. Applied original AbleTools styling with proper yellow/green branding throughout
- July 08, 2025. Added "Your ability to dream!" company logo to About Us section with proper styling
- July 08, 2025. Enhanced Product section with background image and comprehensive category listings with authentic product image
- July 08, 2025. Streamlined homepage layout by removing duplicate product sections and headers for cleaner user experience
- July 08, 2025. Enhanced Products section right side with professional card layout, overlay content, and feature highlights
- July 08, 2025. Significantly improved HUR video section with enhanced design, key features grid, and dual call-to-action buttons
- July 08, 2025. Embedded authentic YouTube video for HUR rehabilitation equipment demonstration
- July 08, 2025. Completely redesigned seminars and events section with professional card layouts, icons, and enhanced user experience
- July 08, 2025. Added authentic medical images for Advanced Rehabilitation Techniques and HUR Spinal Cord seminars/events
- July 08, 2025. Removed duplicate old seminars/events section to maintain clean layout with single enhanced version
- July 08, 2025. Completely redesigned seminars and events display with gradient headers, enhanced cards, animations, and detailed information
- July 08, 2025. Added Featured Products section with professional product cards, hover animations, and AbleTools yellow branding
- July 08, 2025. Updated Featured Products with authentic product images: Bingo Evolution (twins version), Zip (pink pushchair), and Mimos Pillow (medical demonstration)
- July 08, 2025. Enhanced Our Achievements section with authentic professional images: trophy ceremony, team achievement, community impact, and industry recognition
- July 08, 2025. Fixed achievements image display by removing yellow overlay that was covering the authentic images
- July 08, 2025. Updated footer to match authentic design with Address, Information, Newsletter, and Follow Us sections with proper gray styling
- July 08, 2025. Enhanced About Us page with authentic AbleTools exhibition header image, improved design with yellow branding, and professional card layouts
- July 08, 2025. Added comprehensive About Us content with detailed company description, product range, and multi-sensory room specialization. Integrated authentic therapy and logo images
- July 08, 2025. Redesigned About Us page with modern layout, enhanced hero section, improved typography, and restored all missing content sections including timeline, team expertise, and certifications
- July 08, 2025. Updated About Us page with authentic company content provided by user, including complete product range details and multi-sensory room specialization. Removed "Our Journey" timeline section and conditional newsletter rendering. Reduced header image height for better proportions and implemented cleaner, more focused design
- July 08, 2025. Added authentic company vision statement emphasizing customer experience, customized solutions, education for healthcare professionals, global collaborations, and "the Ability to Dream" philosophy
- July 08, 2025. Added additional professional therapy session image to About Us page showing hands-on rehabilitation work, creating a more comprehensive visual representation of company services
- July 08, 2025. Removed "Our Core Values" and "Our Expertise" sections from About Us page to streamline content and focus on essential company information
- July 09, 2025. Created comprehensive Products page with header image, hierarchical navigation (Categories > Sub Categories > Product List), search functionality, and yellow branding

## User Preferences

Preferred communication style: Simple, everyday language.

## Current Footer Requirements
- All icons must use yellow color (#ffeb3b) for consistent AbleTools branding
- Address icons (location, email, phone, fax) must be yellow
- Information section should have organized layout for long list
- Newsletter field CSS must display properly without errors
- Follow Us social media icons must be yellow

## Responsive Design Status
- Home page responsive design optimized for mobile, tablet, and desktop
- Grid layouts use mobile-first approach: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4
- Improved breakpoints for achievements section, featured products, and about section
- Button layouts center properly on mobile devices