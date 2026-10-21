# Phase 3: Frontend Foundation - Development Plan

## Overview

Phase 3 focuses on building the core UI components, authentication pages, and protected route structure for the Nectara Jewels marketplace.

**Timeline**: ~2-3 weeks  
**Status**: Ready to start (after Phase 2 Supabase setup)

---

## Objectives

- ✅ Build reusable UI component library
- ✅ Implement authentication pages (register, login, password reset)
- ✅ Set up protected routes and middleware
- ✅ Create public storefront pages
- ✅ Build responsive layouts
- ✅ Establish design system with Tailwind CSS

---

## Architecture

### Component Organization

```
src/components/
├── ui/                          # Core UI Components
│   ├── Button.tsx               # Reusable button with variants
│   ├── Input.tsx                # Form input with validation
│   ├── Card.tsx                 # Card container
│   ├── Badge.tsx                # Status badges
│   ├── Modal.tsx                # Modal dialog
│   ├── Spinner.tsx              # Loading spinner
│   ├── Toast.tsx                # Notifications
│   └── Avatar.tsx               # User avatar
│
├── layout/                      # Layout Components
│   ├── Header.tsx               # Top navigation
│   ├── Footer.tsx               # Footer
│   ├── Sidebar.tsx              # Sidebar navigation
│   └── Container.tsx            # Page container
│
├── products/                    # Product-Related Components
│   ├── ProductCard.tsx          # Product listing card
│   ├── ProductGrid.tsx          # Product grid layout
│   ├── ProductImage.tsx         # Product image gallery
│   ├── ProductDetails.tsx       # Product details view
│   └── ProductFilter.tsx        # Search/filter sidebar
│
├── auth/                        # Authentication Components
│   ├── LoginForm.tsx            # Login form
│   ├── RegisterForm.tsx         # Registration form
│   ├── PasswordResetForm.tsx    # Password reset form
│   └── AuthGuard.tsx            # Protected route wrapper
│
├── cart/                        # Cart Components
│   ├── CartSummary.tsx          # Cart total summary
│   ├── CartItem.tsx             # Individual cart item
│   └── CartDropdown.tsx         # Mini cart dropdown
│
└── common/                      # Common Components
    ├── Breadcrumb.tsx           # Navigation breadcrumb
    └── ErrorBoundary.tsx        # Error handling
```

---

## UI Component Specifications

### Core Components to Build

#### 1. Button Component
```typescript
// src/components/ui/Button.tsx
- Variants: primary, secondary, outline, ghost
- Sizes: sm, md, lg
- Loading state with spinner
- Disabled state
- Full width option
- Icon support
```

#### 2. Input Component
```typescript
// src/components/ui/Input.tsx
- Text, email, password, number types
- Label and error message
- Placeholder support
- Icon left/right
- Disabled state
- Clearable option
- Required indicator
```

#### 3. Card Component
```typescript
// src/components/ui/Card.tsx
- Header, body, footer sections
- Hover effects
- Shadow levels
- Responsive padding
```

#### 4. Modal Component
```typescript
// src/components/ui/Modal.tsx
- Header, body, footer
- Close button
- Overlay click to close
- Keyboard escape to close
- Animation
- Size variants
```

---

## Authentication Pages

### Registration Page (`app/(auth)/register/page.tsx`)

**Features:**
- Email input with validation
- Password with strength meter
- Full name input
- Role selection (Buyer/Seller)
- Terms & conditions checkbox
- Submit button with loading state
- Link to login page
- Success confirmation

**Validations:**
- Email format
- Password minimum 8 characters
- Password strength check (uppercase, lowercase, numbers)
- Full name required
- Terms acceptance required

### Login Page (`app/(auth)/login/page.tsx`)

**Features:**
- Email input
- Password input with show/hide toggle
- Remember me checkbox
- Submit button
- Error message display
- Link to register page
- Link to password reset page
- Social login placeholders (future)

**Validations:**
- Email required
- Password required
- API error handling

### Password Reset Pages

#### Request Reset (`app/(auth)/forgot-password/page.tsx`)
- Email input
- Submit button
- Success/error messages
- Link to login

#### Reset Password (`app/(auth)/reset-password/page.tsx`)
- Token verification
- New password input
- Confirm password input
- Strength meter
- Submit button

---

## Public Pages

### Homepage (`app/page.tsx`)
**Already implemented** - Beautiful hero section, categories, featured products

### Product Listing Page (`app/(storefront)/products/page.tsx`)
```
Components:
- ProductFilter (sidebar)
  - Categories
  - Price range
  - Sort options
- ProductGrid
  - Product cards
  - Pagination/infinite scroll
- Responsive layout
```

### Product Detail Page (`app/(storefront)/products/[slug]/page.tsx`)
```
Components:
- Product image gallery
- Product info
  - Name, price, rating
  - Material, color, size
  - Stock status
- Description
- Add to cart button
- Wishlist button
- Related products
- Reviews section
```

### Seller Profile Page (`app/(storefront)/sellers/[slug]/page.tsx`)
```
Components:
- Seller info (logo, name, rating)
- Seller statistics
- Product grid from seller
- About section
- Contact section
```

---

## Protected Routes Architecture

### Middleware Setup (`src/app/middleware.ts`)

```typescript
- Check authentication status
- Redirect unauthenticated users to login
- Verify user role (buyer, seller, admin)
- Refresh session if needed
```

### Protected Route Wrapper

```typescript
// src/components/auth/ProtectedRoute.tsx
- Render children if authenticated
- Show loading spinner while checking auth
- Redirect to login if not authenticated
- Optional role-based access check
```

### Layout Structure

```
app/
├── (auth)/                      # Authentication routes
│   ├── register/
│   ├── login/
│   ├── forgot-password/
│   └── reset-password/
│
├── (storefront)/                # Public pages
│   ├── products/
│   ├── sellers/
│   ├── about/
│   └── contact/
│
├── buyer/                       # Protected buyer routes
│   ├── account/
│   ├── orders/
│   ├── wishlist/
│   └── checkout/
│
├── seller/                      # Protected seller routes
│   ├── dashboard/
│   ├── products/
│   ├── orders/
│   └── settings/
│
├── admin/                       # Protected admin routes
│   ├── dashboard/
│   ├── users/
│   ├── products/
│   └── settings/
│
└── layout.tsx                   # Root layout with Header/Footer
```

---

## Development Workflow

### Step 1: Build UI Components (Days 1-3)

```bash
# Create component files
src/components/ui/Button.tsx
src/components/ui/Input.tsx
src/components/ui/Card.tsx
src/components/ui/Modal.tsx
src/components/ui/Badge.tsx
src/components/ui/Spinner.tsx
src/components/ui/Avatar.tsx
```

**What to include:**
- TypeScript interfaces for props
- Tailwind CSS styling
- Accessibility attributes (ARIA)
- JSDoc documentation
- Default exports

### Step 2: Build Layout Components (Days 4-5)

```bash
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/layout/Container.tsx
```

**Features:**
- Responsive navigation
- Mobile hamburger menu
- Search bar
- User menu dropdown
- Cart icon with count

### Step 3: Create Auth Pages (Days 6-8)

```bash
app/(auth)/register/page.tsx
app/(auth)/login/page.tsx
app/(auth)/forgot-password/page.tsx
app/(auth)/reset-password/page.tsx
```

**Integration:**
- Use `react-hook-form` for form handling
- Use `Zod` for validation
- Call auth service functions
- Handle loading/error states

### Step 4: Build Product Pages (Days 9-12)

```bash
src/components/products/ProductCard.tsx
src/components/products/ProductGrid.tsx
src/components/products/ProductFilter.tsx
app/(storefront)/products/page.tsx
app/(storefront)/products/[slug]/page.tsx
```

**Features:**
- Fetch products from API
- Search and filtering
- Image galleries
- Responsive layout

### Step 5: Implement Protected Routes (Days 13-15)

```bash
src/middleware.ts
src/components/auth/ProtectedRoute.tsx
app/buyer/account/page.tsx
app/seller/dashboard/page.tsx
```

**Features:**
- Session validation
- Role-based access
- Error handling

---

## Component Development Checklist

### For Each Component:

- [ ] TypeScript types defined
- [ ] Props interface documented with JSDoc
- [ ] Default props set
- [ ] Tailwind CSS styling applied
- [ ] Responsive design tested
- [ ] Dark mode support (optional)
- [ ] Accessibility (ARIA labels, semantic HTML)
- [ ] Error states handled
- [ ] Loading states shown
- [ ] Mobile optimized

### Testing

- [ ] Component renders without errors
- [ ] Props work as expected
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Error states display correctly

---

## Styling Standards

### Design System

**Colors:**
```css
/* Nectara Brand */
--primary: #C9A961 (Champagne Gold)
--primary-dark: #8B6F47 (Bronze)
--accent: #2C2C2C (Deep Purple/Black)

/* Semantic */
--success: #10B981
--error: #EF4444
--warning: #F59E0B
--info: #3B82F6

/* Neutrals */
--white: #FFFFFF
--gray-50: #F9FAFB
--gray-900: #111827
```

**Typography:**
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
--font-serif: 'Georgia', serif (for headings)

Sizes:
xs: 12px
sm: 14px
base: 16px
lg: 18px
xl: 20px
2xl: 24px
3xl: 30px
```

**Spacing:**
```css
Uses Tailwind defaults: 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px...
```

**Border Radius:**
```css
xs: 2px
sm: 4px
md: 8px
lg: 12px
full: 9999px
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npx prettier --write src/

# Run tests
npm test
```

---

## API Integration Points

### Authentication Endpoints (Phase 2)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Current user

### Product Endpoints (Phase 3)
- `GET /api/products` - List products
- `GET /api/products/[id]` - Get product details
- `GET /api/categories` - List categories
- `GET /api/products/search` - Search products

### Cart Endpoints (Phase 4)
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart
- `DELETE /api/cart/[itemId]` - Remove from cart

---

## Success Criteria

✅ All UI components built and documented  
✅ Authentication pages functional  
✅ Product listing page works  
✅ Product detail page loads  
✅ Protected routes prevent unauthorized access  
✅ Responsive design on mobile/tablet/desktop  
✅ No TypeScript errors  
✅ Accessibility compliance (basic WCAG)  
✅ Zero ESLint warnings  

---

## Timeline

| Week | Task | Days |
|------|------|------|
| 1 | UI Components + Layout | 5 |
| 2 | Auth Pages + Middleware | 5 |
| 3 | Product Pages + Integration | 5 |

**Estimated Total**: 15 days (3 weeks)

---

## Next Phase

**Phase 4**: Buyer Functionality
- Shopping cart management
- Wishlist feature
- Checkout workflow
- User account area

---

**Created**: October 19, 2026  
**Status**: Ready for Phase 2 completion  
**Dependencies**: Phase 2 Supabase setup
