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
- July 09, 2025. Completely redesigned Products page with modern interface: enhanced header with statistics, professional category cards with icons, improved search controls, sorting options, and responsive design
- July 09, 2025. Fixed all Products page functionality: working real-time search with server-side filtering, functional grid/list view mode switching, working sort dropdown, and proper product display logic with authentic product data
- July 09, 2025. Refined Products page to focus on category-based filtering: removed "All Products" display, filter controls only show when searching or in a category, clean category navigation interface
- July 09, 2025. Removed the "YOUR ABILITY TO DREAM!" newsletter section from the footer as requested by user
- July 09, 2025. Removed filter options from subcategories - filters only appear when viewing actual products within a specific category
- July 09, 2025. Added category statistics badges to each category card showing subcategory count (blue badges) and product count (green badges) for better navigation
- July 09, 2025. Moved category counts to package icon area and removed arrow for cleaner design
- July 09, 2025. Changed category count badge colors to yellow (#ffeb3b) for consistent AbleTools branding
- July 09, 2025. Completely redesigned Product Detail page with comprehensive functionality matching the original AbleTools website: enhanced image gallery with navigation, detailed tabs (Overview, Specifications, Technical Data, Videos, Enquiry), product highlights, and professional contact information section
- July 09, 2025. Redesigned Product Detail page for better user experience: simplified 3-column layout, visual spec cards, streamlined navigation with 3 main tabs, enhanced contact section, and improved visual hierarchy with gradient backgrounds and rounded corners
- July 09, 2025. Enhanced Product Detail page with thumbnail image gallery featuring navigation arrows, image counter, and 4-thumbnail grid. Added detailed descriptions to product features with professional card layouts and comprehensive explanations
- July 09, 2025. Added comprehensive seminar and training content with 8 detailed courses covering rehabilitation techniques, equipment certification, accessibility assessment, and specialized pediatric training. Enhanced events with 6 professional activities including equipment expo, community initiatives, and technology showcases
- July 09, 2025. Created separate sections for Seminars and Training with distinct 3-column layout: Educational Seminars (yellow), Professional Training (blue), and Latest Events (green). Updated database schema with type field and API filtering to distinguish between seminar and training content
- July 09, 2025. Removed "Upcoming Seminars" and "Recent Events" sections from homepage as requested by user to simplify the layout
- July 09, 2025. Created comprehensive Education page with two distinct sections: Educational Seminars (yellow branding) and Professional Training (blue branding) with proper filtering, enhanced cards, and professional layout
- July 09, 2025. Completely redesigned Education page with modern hero section, enhanced visual hierarchy, gradient backgrounds, animated cards, statistics display, and premium user experience design
- July 09, 2025. Updated Professional Training section to use site's primary yellow color (#ffeb3b) instead of blue, maintaining consistent AbleTools branding throughout the Education page
- July 09, 2025. Created comprehensive Seminar Detail page matching original AbleTools design with tabbed navigation (Overview, Course Details, Speakers, Resources), professional registration sidebar, breadcrumb navigation, and complete seminar information display with authentic content structure
- July 09, 2025. Enhanced Seminar Detail page with additional Travel/Accommodation and Terms & Conditions tabs containing venue information, hotel partnerships, airport transfers, parking details, cancellation policies, certification requirements, and professional recognition guidelines matching original AbleTools functionality
- July 09, 2025. Added authentic seminar header image to Seminar Detail page providing professional visual branding and context for educational content
- July 09, 2025. Created comprehensive Newsroom page with professional layout, search functionality, category filtering, featured articles, news statistics, and newsletter subscription. Added news detail page with full article content, social sharing, related articles sidebar, and proper navigation structure
- July 09, 2025. Completely redesigned Contact page with modern 3-column layout, enhanced header with service statistics, professional contact form, departmental contact cards, emergency support section, showroom information, and consistent AbleTools yellow branding throughout
- July 09, 2025. Added interactive Google Maps integration to Contact page showing AbleTools location in Strovolos, Cyprus with embedded map view and direct link to Google Maps for navigation


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