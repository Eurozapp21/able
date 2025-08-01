# Rehabilitation Equipment Management System

## Overview
This project is a full-stack web application for AbleTools Ltd, designed to be a comprehensive platform for managing products, services, educational content, and customer inquiries within the rehabilitation equipment industry. Its main purpose is to streamline operations and enhance customer engagement for AbleTools Ltd, contributing to their business vision of delivering innovative rehabilitation solutions globally. The system aims to be a leading online presence in the rehabilitation technology market.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application is structured as a monorepo, separating concerns into `client/` (React frontend), `server/` (Express.js backend), and `shared/` (TypeScript schemas and types).

### Frontend Architecture
- **Technology**: React with TypeScript, utilizing shadcn/ui components and Tailwind CSS for styling.
- **UI/UX**: Employs a custom design system with CSS variables for theming, adhering to AbleTools' yellow/green branding. Components are built with shadcn/ui and Radix UI primitives for accessibility and customization.
- **State Management**: TanStack Query for server state management and caching.
- **Routing**: Wouter for lightweight client-side routing.
- **Forms**: React Hook Form with Zod for type-safe form handling and validation.
- **Responsive Design**: Optimized for mobile, tablet, and desktop using a mobile-first approach with Tailwind CSS grid layouts and improved breakpoints.

### Backend Architecture
- **Technology**: Express.js server with TypeScript.
- **API Structure**: RESTful endpoints organized by feature domains.
- **Database Layer**: Drizzle ORM for type-safe database operations.
- **Middleware**: Express middleware handles authentication, logging, and error handling.
- **Session Management**: Session-based authentication using Express sessions with PostgreSQL storage.

### Core System Features & Design
- **Product Management**: Hierarchical categorization, featured product displays, search/filtering, and detailed product pages with images, specifications, and inquiry options.
- **Enquiry System**: Customer support ticket system with messaging, status tracking, and resolution workflow.
- **Educational Content**: Management of seminars and training, including detailed course information, speaker details, and registration.
- **Newsroom**: Features news articles with search, categorization, and detailed views.
- **Catalogue Management**: Digital catalogue with downloadable brochures and category-based browsing.
- **Solutions**: Detailed pages for various rehabilitation solutions like sensory integration rooms, accessible houses, and custom furniture, outlining processes and categories.
- **Multilingual Support**: Comprehensive admin system supporting CRUD operations for content in English and Greek.
- **UI/UX Decisions**:
    - Consistent AbleTools yellow (#ffeb3b) and green branding throughout the application, including icons, buttons, headers, and specific section highlights.
    - Professional card layouts, gradient backgrounds, hover animations, and improved typography.
    - Enhanced image galleries and interactive elements (e.g., Google Maps integration).
    - Footer elements consistently styled with yellow icons and organized information sections.

## External Dependencies

### Core Libraries
- **Drizzle ORM**: For type-safe database operations.
- **TanStack Query**: For server state management and caching in the frontend.
- **React Hook Form**: For form state management and validation.
- **Zod**: For runtime type validation and schema definition.
- **shadcn/ui**: For pre-built, accessible UI components.

### Development Tools
- **Vite**: Fast development server and build tool.
- **TypeScript**: For type safety across the entire application.
- **Tailwind CSS**: Utility-first CSS framework.
- **ESBuild**: Fast JavaScript bundler for production.

### External Services
- **PayPal SDK**: For payment processing integration.
- **Neon Database**: For serverless PostgreSQL hosting.
- **Replit**: Used as the development environment and deployment platform.