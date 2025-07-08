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

## User Preferences

Preferred communication style: Simple, everyday language.