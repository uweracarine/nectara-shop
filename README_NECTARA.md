# Nectara Jewels - Multi-Vendor Jewelry E-Commerce Marketplace

**Tagline**: Your Style. Your Sparkle. Your Nectara.

## 🎯 Project Status

**Current Phase**: Phase 1 & 2 (Project Setup & Database Foundation)
**Status**: In Active Development

## 📋 Overview

Nectara Jewels is a complete, production-ready, multi-vendor e-commerce marketplace for jewelry. It connects independent sellers, designers, and businesses with buyers across Rwanda and globally.

### Key Capabilities
- ✅ Buyer registration and account management
- ✅ Seller registration and store management  
- ✅ Product catalog with search and filtering
- ✅ Shopping cart and checkout
- ✅ Payment processing integration
- ✅ Order management and fulfillment
- ✅ Seller commission and payouts
- ✅ Customer reviews and ratings
- ✅ Admin dashboard and controls
- ✅ Secure authentication and authorization

## 🏗️ Architecture

### Technology Stack

**Frontend**
- Next.js 16 with App Router
- React 19 with TypeScript
- Tailwind CSS for styling
- React Hook Form + Zod for validation
- Lucide React for icons

**Backend**
- Next.js Route Handlers
- Supabase (PostgreSQL + Auth)
- Row Level Security for authorization

**Testing & Deployment**
- Vitest + React Testing Library
- Playwright E2E
- Vercel deployment

## 📁 Project Structure

```
nectara-jewels/
├── app/                    # Next.js App Router
├── src/
│   ├── app/               # API routes & middleware
│   ├── components/        # React components
│   ├── features/          # Business logic
│   ├── lib/              # Utilities & services
│   ├── services/         # API integrations
│   ├── types/            # TypeScript types
│   └── hooks/            # Custom React hooks
├── supabase/
│   ├── migrations/       # Database migrations
│   └── seed.sql          # Development seed data
├── tests/                # Test files
└── public/               # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- npm/yarn
- Supabase account

### Installation

```bash
# Clone and install
git clone <repository>
cd nectara-jewels
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Set up database
supabase link --project-ref your-project-ref
supabase db push

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Security Features

- ✅ Supabase Row Level Security (RLS)
- ✅ Server-side validation with Zod
- ✅ Role-based access control
- ✅ Input sanitization
- ✅ Rate limiting ready
- ✅ Audit logging capability
- ✅ Secure payment handling
- ✅ Environment secret protection

## 📱 User Roles

### Buyer
- Browse and search products
- Manage shopping cart
- Checkout and pay
- Track orders
- Review products
- Manage addresses
- Contact support

### Seller
- Register and manage store
- Add and manage products
- Manage inventory
- Fulfill orders
- View sales analytics
- Receive payouts
- Handle customer support

### Administrator
- Moderate products
- Manage users
- Approve sellers
- Configure commissions
- Process refunds
- View financial reports
- Manage system settings

## 📊 Implementation Phases

### ✅ Phase 1: Project Setup (Complete)
- Next.js initialized with TypeScript & Tailwind
- Core dependencies installed
- Project structure created
- Development environment configured
- Homepage with elegant design

### 🟡 Phase 2: Database & Authentication (In Progress)
- Database migrations created (001, 002)
- RLS policies implemented
- Seed data prepared
- Awaiting Supabase configuration

### ⏳ Phases 3-10: Remaining Implementation
See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed phase breakdown

## 📚 Documentation

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Complete development guide
- [supabase/migrations/](./supabase/migrations/) - Database schema
- Database types: [src/types/database.ts](./src/types/database.ts)
- Validation schemas: [src/lib/validation.ts](./src/lib/validation.ts)

## 🎨 Design System

**Color Palette**
- Ivory (#faf8f3) - Primary background
- Cream (#f5f1eb) - Secondary background
- Champagne Gold (#d4af8f) - Primary accent
- Muted Bronze (#a0824d) - Secondary accent
- Deep Brown (#3d2817) - Text/dark accent

## 🚀 Running the Application

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # TypeScript type checking
npm run lint         # Run ESLint
npm test            # Run unit tests
npm run e2e         # Run Playwright E2E tests
```

## 🌍 Target Market

**Primary**: Rwanda  
**Currency**: Rwandan Francs (RWF)  
**Primary Language**: English

---

**Project Start Date**: October 19, 2026  
**Current Status**: Active Development (Phase 2)  
**Last Updated**: October 19, 2026
