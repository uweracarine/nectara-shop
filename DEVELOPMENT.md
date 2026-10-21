# Nectara Jewels - Development Guide

## Project Overview

Nectara Jewels is a full-stack e-commerce marketplace for jewelry connecting independent sellers with buyers in Rwanda and beyond.

**Tagline**: Your Style. Your Sparkle. Your Nectara.

### Key Features
- Multi-vendor jewelry marketplace
- Buyer, Seller, and Admin roles
- Product management and inventory
- Secure shopping cart and checkout
- Payment processing for Rwanda
- Seller fulfillment and tracking
- Order management and returns
- Seller commission and payouts
- Notifications and support tickets

## Technology Stack

### Frontend
- **Framework**: Next.js 16.4.2 with App Router
- **UI Library**: React 19.3.0
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Date Handling**: date-fns

### Backend
- **Runtime**: Node.js (via Next.js Route Handlers)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Authorization**: Row Level Security (RLS)

### Testing
- **Unit**: Vitest
- **Component**: React Testing Library
- **E2E**: Playwright

### Development Tools
- **Language**: TypeScript (strict)
- **Linting**: ESLint
- **CLI**: Supabase CLI

## Project Structure

```
nectara-jewels/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication routes
│   ├── (storefront)/             # Public pages
│   ├── admin/                    # Admin dashboard
│   ├── seller/                   # Seller dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── src/
│   ├── app/                      # Route handlers and API
│   │   ├── api/                  # API endpoints
│   │   │   ├── auth/             # Auth endpoints
│   │   │   ├── products/         # Product endpoints
│   │   │   ├── orders/           # Order endpoints
│   │   │   ├── payments/         # Payment endpoints
│   │   │   └── webhooks/         # Provider webhooks
│   │   └── middleware.ts         # Auth middleware
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   ├── layout/               # Layout components
│   │   ├── products/             # Product components
│   │   ├── cart/                 # Cart components
│   │   ├── checkout/             # Checkout components
│   │   └── dashboards/           # Dashboard components
│   ├── features/
│   │   ├── auth/                 # Authentication logic
│   │   ├── catalog/              # Product catalog logic
│   │   ├── inventory/            # Inventory management
│   │   ├── orders/               # Order management
│   │   ├── payments/             # Payment processing
│   │   ├── sellers/              # Seller management
│   │   └── administration/       # Admin functions
│   ├── lib/
│   │   ├── supabase-client.ts    # Client-side Supabase
│   │   ├── supabase-server.ts    # Server-side Supabase
│   │   ├── validation.ts         # Zod schemas
│   │   ├── constants.ts          # Application constants
│   │   └── utils.ts              # Utility functions
│   ├── services/
│   │   ├── auth.ts               # Auth service
│   │   ├── products.ts           # Product service
│   │   ├── orders.ts             # Order service
│   │   ├── payments.ts           # Payment service
│   │   └── sellers.ts            # Seller service
│   ├── types/
│   │   ├── index.ts              # Domain types
│   │   └── database.ts           # Database schema types
│   └── hooks/
│       ├── useAuth.ts            # Auth hook
│       ├── useCart.ts            # Cart hook
│       └── useUser.ts            # User hook
├── supabase/
│   ├── migrations/               # Database migrations
│   │   ├── 001_init_schema.sql   # Initial schema
│   │   └── 002_rls_policies.sql  # Security policies
│   └── seed.sql                  # Development seed data
├── tests/
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # End-to-end tests
├── public/                       # Static assets
├── .env.example                  # Environment template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Development Phases

### Phase 1: Project Setup ✅
- Initialize Next.js with TypeScript and Tailwind
- Install core dependencies
- Configure development environment
- Create project structure

### Phase 2: Database & Authentication (In Progress)
- [ ] Configure Supabase project
- [ ] Create database migrations
- [ ] Implement RLS policies
- [ ] Set up authentication with Supabase Auth
- [ ] Create user roles and permissions

### Phase 3: Frontend Foundation
- [ ] Build core UI components
- [ ] Implement public pages (shop, products, sellers)
- [ ] Create auth pages (register, login, password reset)
- [ ] Set up protected routes

### Phase 4: Buyer Functionality
- [ ] Product browsing and search
- [ ] Shopping cart management
- [ ] Wishlist feature
- [ ] User account area
- [ ] Address management

### Phase 5: Seller Features
- [ ] Seller registration and approval
- [ ] Product management interface
- [ ] Image upload
- [ ] Inventory tracking
- [ ] Seller dashboard

### Phase 6: Checkout & Orders
- [ ] Checkout workflow
- [ ] Order creation
- [ ] Order management
- [ ] Order tracking

### Phase 7: Payments
- [ ] Payment provider integration
- [ ] Sandbox testing
- [ ] Webhook handling
- [ ] Refund processing

### Phase 8: Fulfillment
- [ ] Seller fulfillment interface
- [ ] Shipment tracking
- [ ] Delivery notifications
- [ ] Returns processing

### Phase 9: Admin Features
- [ ] Admin dashboard
- [ ] User management
- [ ] Product moderation
- [ ] Commission settings
- [ ] Payout management

### Phase 10: Testing & Deployment
- [ ] Automated tests
- [ ] Security testing
- [ ] Performance optimization
- [ ] Deployment configuration

## Environment Setup

### Prerequisites
- Node.js v20+ 
- npm or yarn
- Supabase account
- Git

### Installation

```bash
# Navigate to project
cd nectara-jewels

# Install dependencies
npm install --legacy-peer-deps

# Create .env.local from template
cp .env.example .env.local

# Configure Supabase URLs and keys in .env.local
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payment Configuration (configured per phase)
PAYMENT_PROVIDER=sandbox

# Email Configuration (optional for development)
EMAIL_PROVIDER=console
```

## Database Setup

### Using Supabase CLI

```bash
# Link to Supabase project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push

# Seed development data
supabase db seed
```

### Manual Setup

1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Run migrations from `supabase/migrations/` in order
4. Run seed data from `supabase/seed.sql`

## Running the Application

### Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
npm start
```

## Testing

### Run All Tests

```bash
npm test
```

### Unit Tests

```bash
npm run test -- tests/unit
```

### Test Coverage

```bash
npm run test:coverage
```

### E2E Tests

```bash
npm run e2e
```

### UI Test Runner

```bash
npm run test:ui
```

## Key Implementation Details

### Authentication Flow

1. User registers with email and password
2. Supabase Auth handles verification
3. Profile created with assigned role
4. Sellers can apply for seller status
5. Admins approve seller applications

### Product Workflow

1. Seller adds product with images
2. Product submitted for approval
3. Admin reviews and approves/rejects
4. Approved products appear in catalog
5. Products visible to buyers

### Order Process

1. Buyer adds products to cart
2. Checkout validates cart and stock
3. Order created with items
4. Payment processed
5. Seller fulfillment created
6. Seller ships items
7. Buyer receives and can review

### Payment Flow

1. Buyer selects payment method
2. Payment initiated with provider
3. Webhook received on completion
4. Order confirmed or failed
5. Seller notified
6. Funds reconciled

## Security Best Practices

- ✅ Server-side validation always
- ✅ RLS policies for data access
- ✅ Environment secrets never exposed
- ✅ HTTPS only in production
- ✅ Rate limiting on APIs
- ✅ Input sanitization
- ✅ Audit logging for admin actions

## Common Development Tasks

### Add New Database Table

1. Create migration file: `supabase/migrations/003_add_feature.sql`
2. Define table with constraints and indexes
3. Add RLS policies if needed
4. Update `src/types/database.ts`
5. Run: `supabase db push`

### Add New API Route

1. Create file: `src/app/api/feature/route.ts`
2. Implement handler function
3. Add validation and auth checks
4. Update types in `src/types/`
5. Test with curl or Postman

### Add New Component

1. Create file: `src/components/feature/ComponentName.tsx`
2. Use TypeScript and export default
3. Document props with JSDoc
4. Add to Storybook if applicable
5. Create tests if needed

### Create Service

1. Create file: `src/services/featureName.ts`
2. Handle API calls and data transformation
3. Use Supabase client
4. Add error handling
5. Export functions for use in components

## Deployment

### Vercel Deployment

```bash
# Connect repository
vercel link

# Deploy
vercel deploy --prod
```

### Manual Deployment

1. Build: `npm run build`
2. Set environment variables
3. Start: `npm start`
4. Configure reverse proxy (nginx/Apache)
5. Set up SSL/TLS

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti :3000 | xargs kill -9
```

### Database Connection Issues
- Verify Supabase URL and keys
- Check firewall and IP whitelist
- Ensure network connectivity
- Review RLS policies

### Build Errors
- Delete `node_modules` and `.next`
- Reinstall: `npm install --legacy-peer-deps`
- Check TypeScript: `npm run type-check`
- Review error details carefully

## Contributing Guidelines

- Use TypeScript for all code
- Follow existing code style
- Write tests for new features
- Update documentation
- Create descriptive commits
- Request reviews before merging

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

## Contact & Support

For questions or issues, contact the development team or create an issue in the repository.

---

**Last Updated**: October 19, 2026
**Status**: In Development (Phase 2)
