# Nectara Jewels - Getting Started Guide

Welcome to Nectara Jewels! This guide will help you set up and run the application.

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Database
```bash
# Link to Supabase project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push

# Load seed data (optional)
supabase db seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` - you should see the beautiful Nectara Jewels homepage!

---

## 📋 What's Included

### ✅ Ready Now
- Beautiful homepage with navigation
- Elegant brand design system
- TypeScript types and validation
- Database schema (ready to apply)
- Authentication service
- Product catalog service
- Order management service
- Comprehensive documentation

### 🔄 In Progress
- Supabase integration
- Database migrations
- Authentication pages

### ⏳ Coming Next
- Product pages
- Seller registration
- Shopping cart
- Checkout
- Payment processing
- Admin dashboard

---

## 🏗️ Project Structure

```
nectara-jewels/
├── app/                      # Homepage and layouts
├── src/
│   ├── features/            # Business logic (auth, products, orders)
│   ├── lib/                 # Utilities, validation, constants
│   ├── types/               # TypeScript type definitions
│   └── components/          # React components (to be added)
├── supabase/
│   ├── migrations/          # Database schema
│   └── seed.sql             # Demo data
└── tests/                   # Test files (ready)
```

---

## 📱 Main Features

### For Buyers
- 🔐 Create an account
- 🔍 Search and browse products
- ❤️ Save to wishlist
- 🛒 Shopping cart
- 💳 Secure checkout
- 📦 Track orders
- ⭐ Leave reviews

### For Sellers
- 🏪 Create a store
- 📸 Upload products
- 📊 View analytics
- 💰 Manage earnings
- 📦 Fulfill orders

### For Admins
- 👥 Manage users
- ✅ Approve products
- 💵 Set commissions
- 📊 View reports
- ⚙️ System settings

---

## 🔑 Available Scripts

```bash
npm run dev              # Start development server (port 3000)
npm run build           # Build for production
npm run start           # Start production server
npm run type-check      # Check TypeScript types
npm run lint            # Run ESLint
npm test               # Run unit tests
npm run test:ui        # Run tests with UI
npm run test:coverage  # Generate coverage report
npm run e2e            # Run end-to-end tests
```

---

## 🌐 Environment Variables

Create `.env.local` from `.env.example`:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payment Configuration (Optional - set up later)
PAYMENT_PROVIDER=sandbox
PAYMENT_API_KEY=sandbox-key

# Email Configuration (Optional - set up later)
EMAIL_PROVIDER=console
```

---

## 🗄️ Database Setup

### Creating a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for project to initialize
4. Go to Project Settings → API
5. Copy your URL and API keys

### Running Migrations
```bash
# First time only - link your project
supabase link --project-ref your-project-ref

# Apply all migrations
supabase db push

# Load demo data (optional)
supabase db seed
```

### Database Structure
The database includes 24 tables:
- User management (profiles)
- Products and categories
- Shopping (carts, orders)
- Payments and refunds
- Seller management
- Reviews and ratings
- Notifications
- Admin controls

See `supabase/migrations/001_init_schema.sql` for complete schema.

---

## 🔐 Authentication

The application uses Supabase Auth with three roles:

### Buyer Role
- Default role for new users
- Can browse, purchase, and review
- Personal cart and orders

### Seller Role
- Apply after registration
- Manage own store and products
- View earnings and analytics

### Admin Role
- Manually created by super-admin
- Full marketplace control
- User and product moderation

---

## 🎨 Design System

### Brand Colors
- **Ivory** (#faf8f3) - Main background
- **Cream** (#f5f1eb) - Secondary
- **Champagne Gold** (#d4af8f) - Primary accent
- **Bronze** (#a0824d) - Secondary accent
- **Deep Brown** (#3d2817) - Text

### Typography
- Sans-serif font (Geist)
- Bold headings
- Clear hierarchy

### Components
- Tailwind CSS for styling
- Lucide React for icons
- shadcn/ui integration ready

---

## 🧪 Testing

### Unit Tests
```bash
npm test
npm test -- src/features
```

### E2E Tests
```bash
npm run e2e
npm run e2e -- --ui
```

### Coverage
```bash
npm run test:coverage
```

---

## 📚 Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Comprehensive development guide
- **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)** - Current progress
- **[README_NECTARA.md](./README_NECTARA.md)** - Project overview
- **[.env.example](./.env.example)** - Environment template

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Issues
```bash
# Clean and reinstall
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

### Database Connection Failed
1. Check `.env.local` has correct URLs/keys
2. Verify Supabase project is active
3. Check firewall/network access
4. Verify database migrations were applied

### TypeScript Errors
```bash
npm run type-check  # See all errors
npm run lint        # Check code style
```

---

## 🚀 Next Steps

1. **Set up Supabase** - Link and run migrations
2. **Test the homepage** - Run dev server and visit localhost:3000
3. **Explore the code** - Check out `DEVELOPMENT.md`
4. **Read the schemas** - Review database design
5. **Start building** - Begin with Phase 3 features

---

## 📞 Support

- See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guides
- Check database schema in `supabase/migrations/`
- Review type definitions in `src/types/`
- Look at validation in `src/lib/validation.ts`

---

## 📊 Project Status

- **Phase 1** ✅ Complete - Project setup
- **Phase 2** 🟡 In Progress - Database & Auth
- **Phases 3-10** ⏳ Planned

See [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) for full breakdown.

---

## 🎯 Development Roadmap

### This Week
- [ ] Link Supabase project
- [ ] Apply database migrations
- [ ] Test authentication flows

### Next Week
- [ ] Build auth pages (login/register)
- [ ] Create protected routes
- [ ] Build product pages

### Following Weeks
- [ ] Seller features
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Payment integration
- [ ] Admin dashboard

---

## 📝 Notes

- Always use `--legacy-peer-deps` when installing
- Never commit `.env.local` or secrets
- Run `npm run build` before pushing code
- TypeScript strict mode is enabled
- All server operations must be in `src/app/` or `src/features/`

---

**Happy coding! 🎉**

For questions, check the comprehensive documentation or create an issue in the repository.
