# ENEM Turbo 2025 - Landing Page & Digital Study Materials Store

## Overview

ENEM Turbo 2025 é uma landing page de produtos digitais e plataforma e-commerce especializada em sinopses, guias e materiais de estudo para o ENEM (Exame Nacional do Ensino Médio). A aplicação apresenta uma landing page otimizada para conversão com processamento automatizado de pagamentos e entrega de conteúdo digital.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR support
- Wouter for lightweight client-side routing (3 main routes: Home, Checkout, Download)

**UI Component Strategy:**
- Shadcn UI component library (New York style) with Radix UI primitives for accessibility
- Tailwind CSS for utility-first styling with custom design system
- Custom theming with CSS variables for light/dark mode support
- Design follows educational, modern aesthetic with blue, green, orange gradient themes

**State Management:**
- TanStack Query (React Query) for server state management
- Local component state with React hooks for UI interactions
- Toast notifications for user feedback

**Key Design Patterns:**
- Component composition with reusable UI primitives
- Custom hooks for mobile detection and toast management
- Path aliases (@/, @shared/, @assets/) for clean imports

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript in ESM mode
- Development mode uses Vite middleware for SSR-like experience
- Production serves static built assets

**API Structure:**
- RESTful endpoints under /api prefix
- Payment creation endpoint with Invictus Pay integration
- Webhook endpoint for Invictus Pay payment notifications
- PDF generation endpoint for digital content delivery (synopses)

**Storage Layer:**
- In-memory storage implementation (MemStorage class) for development
- Designed to be swappable with persistent database implementation
- Schema defined with Drizzle ORM for future PostgreSQL integration
- Two main entities: Users and Payments

**Payment Flow Architecture:**
- Invictus Pay integration for payment processing
- Token-based download system for secure content delivery
- Payment statuses: pending → approved
- Multiple plan options: básico, completo, premium, redação (with combos)

**PDF Generation:**
- PDFKit library for dynamic PDF creation
- Content sourced from shared study material data structure
- Serves as downloadable digital product after purchase

### External Dependencies

**UI & Styling:**
- Radix UI primitives (accordion, dialog, dropdown, popover, etc.) for accessible components
- Tailwind CSS with PostCSS for processing
- Google Fonts (Poppins, Inter, Montserrat) for typography
- Lucide React for iconography
- React Icons for social media icons

**Database & ORM:**
- Drizzle ORM configured for PostgreSQL dialect
- Neon Database serverless driver (@neondatabase/serverless)
- Schema validation with Drizzle-Zod
- Migration system ready (drizzle-kit)

**Payment Processing:**
- Invictus Pay integration (webhook structure in place)
- Token-based download authorization system
- Environment variables for payment links configuration

**Form & Validation:**
- React Hook Form with Zod resolvers for type-safe form validation
- Zod schemas for runtime validation of payment data

**Development Tools:**
- Replit-specific plugins (runtime error overlay, cartographer, dev banner)
- ESBuild for production server bundling
- TSX for TypeScript execution in development

**Content Management:**
- Structured content data in TypeScript (study materials by subject/area)
- 6+ subjects covered: Matemática, Linguagens, Ciências Humanas, Ciências da Natureza, Redação
- Asset management through Vite alias system

**Session & Storage:**
- connect-pg-simple for PostgreSQL session storage (configured but not active)
- Structured for future authentication implementation

## Content Structure

### Study Materials (shared/content.ts)

**Subjects:**
- **Matemática**: Álgebra, Funções, Geometria, Estatística
- **Linguagens**: Português, Literatura, Interpretação de Textos
- **Ciências Humanas**: História, Geografia, Filosofia, Sociologia
- **Ciências da Natureza**: Física, Química, Biologia
- **Redação**: 5 Competências, Estrutura, Repertório

Each subject contains:
- Topics with detailed content
- Examples and practical applications
- Formulas and key concepts
- Tips and study strategies
- Video links (optional)

## Payment Plans (Invictus Pay)

**Available Plans:**
- básico: Basic study package
- completo: Complete study package
- premium: Premium package with all content
- redação: Specific essay/writing package
- Combos: básico+redação, completo+redação, premium+redação

All plans configured via environment variables (INVICTUS_LINK_*).

## Recent Changes

- 2025-10-24: Restored ENEM Turbo theme from previous "Amor & Conexão" project
  - Updated all content from relationship guides to ENEM study materials
  - Changed color scheme from romantic pink/purple to educational blue/green/orange
  - Updated all components (Hero, Problem, Learning, Testimonials, CTA, Footer, Navbar)
  - Maintained existing architecture and payment integration structure
