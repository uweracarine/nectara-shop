# Nectara Jewels - Website Architecture (Corrected)

**Date**: October 19, 2026  
**Type**: Direct Business Website (Single Vendor)  
**Status**: Architecture Update

---

## ✅ Correct Understanding

**Nectara Jewels** is a jewelry business that sells directly to customers online. This is **NOT** a marketplace platform.

### Business Model:
- ✅ Nectara owns the business
- ✅ Nectara sells jewelry directly to customers
- ✅ Customers order online
- ✅ Nectara fulfills orders

### Current Implementation Issues:
The website was initially built as a **multi-vendor marketplace** (with sellers), but it should be a **single business website**.

---

## 🏗️ Correct Website Architecture

### 📄 Pages Needed

#### **Public Pages (No Login)**:
1. **Homepage** - Brand story, featured products, CTAs
2. **Shop** - Browse all jewelry products by category
3. **Product Detail** - View product, add to cart
4. **About** - About Nectara business
5. **Contact** - Contact information
6. **FAQ** - Frequently asked questions
7. **Shipping Info** - Shipping & delivery information
8. **Returns Policy** - How to return items
9. **Privacy Policy** - Privacy information
10. **Terms of Service** - Website terms

#### **Customer Pages (Requires Login)**:
1. **Profile/Account** - Customer information, address
2. **Shopping Cart** - View and manage cart items
3. **Checkout** - Shipping address, payment
4. **Order History** - View past orders
5. **Order Detail** - View specific order details
6. **Wishlist** - Saved items
7. **Account Settings** - Update preferences, password

#### **Admin Pages (Nectara Only)**:
1. **Admin Dashboard** - Business overview, stats
2. **Product Management** - Add, edit, delete products
3. **Product Inventory** - Manage stock levels
4. **Orders Management** - View and fulfill orders
5. **Customer Management** - View customer information
6. **Reports** - Sales analytics and reports
7. **Settings** - Business configuration

---

## 🗑️ Remove (Multi-Vendor Features)

### Current Pages to Remove:
- ❌ `/sellers` - Sellers browse page
- ❌ `/seller/[slug]` - Individual seller profiles
- ❌ Seller-related components

### Database Tables to Remove:
- ❌ `seller_profiles`
- ❌ `seller_fulfillments`
- ❌ `commissions`
- ❌ `payouts`
- ❌ `seller_applications`

### References to Remove:
- ❌ "Meet Sellers" section on homepage
- ❌ "Become a Seller" CTA
- ❌ Seller ratings/reviews
- ❌ Commission calculations
- ❌ Seller approval workflows

---

## ✅ Keep/Enhance (Customer-Focused)

### Keep These:
- ✅ Product catalog
- ✅ Category browsing
- ✅ Product search
- ✅ Shopping cart
- ✅ User profiles
- ✅ Payment processing
- ✅ Order management

### Enhance These:
- ✅ Checkout flow (more detailed)
- ✅ Shipping integration
- ✅ Order tracking
- ✅ Customer account features
- ✅ Wishlist
- ✅ Product reviews (customers reviewing products)

---

## 🗺️ Updated User Flows

### **Customer Browse Flow**:
```
Homepage
    ↓
Click Category (Rings, Bracelets, etc.)
    ↓
Shop Page (filtered by category)
    ↓
View Product Details
    ↓
Add to Cart
```

### **Customer Purchase Flow**:
```
Shopping Cart
    ↓
Checkout
    ↓
Enter Shipping Address
    ↓
Choose Shipping Method
    ↓
Choose Payment Method
    ↓
Review Order
    ↓
Process Payment
    ↓
Order Confirmation
```

### **Customer Account Flow**:
```
Login
    ↓
View Profile
    ↓
View Order History
    ↓
View/Manage Wishlist
    ↓
Account Settings
```

### **Admin Flow**:
```
Admin Dashboard
    ├─ View Sales Overview
    ├─ Manage Products
    │   ├─ Add Product
    │   ├─ Edit Product
    │   ├─ Delete Product
    │   └─ Update Inventory
    ├─ Orders
    │   ├─ View Orders
    │   ├─ Update Order Status
    │   └─ Generate Shipping Labels
    ├─ Customers
    │   ├─ View Customer List
    │   └─ View Customer Orders
    ├─ Reports
    │   ├─ Sales Report
    │   ├─ Top Products
    │   └─ Customer Analytics
    └─ Settings
        ├─ Business Info
        ├─ Shipping Methods
        └─ Payment Methods
```

---

## 💾 Simplified Database Schema

### Products:
```
- id
- name
- description
- price
- category_id
- images
- material
- color
- size
- weight
- stock_quantity
- rating
- reviews_count
- created_at
- updated_at
```

### Customers/Users:
```
- id
- email
- password_hash
- full_name
- phone
- address
- city
- postal_code
- created_at
- updated_at
```

### Orders:
```
- id
- customer_id
- order_number
- total_amount
- status (pending, processing, shipped, delivered)
- shipping_address
- tracking_number
- created_at
- updated_at
```

### Order Items:
```
- id
- order_id
- product_id
- quantity
- price_at_purchase
```

### Cart:
```
- id
- customer_id
- created_at
- updated_at
```

### Cart Items:
```
- id
- cart_id
- product_id
- quantity
```

### Wishlist:
```
- id
- customer_id
- product_id
- created_at
```

### Payments:
```
- id
- order_id
- amount
- currency
- status (pending, success, failed)
- payment_method
- transaction_id
```

### Product Reviews:
```
- id
- product_id
- customer_id
- rating
- title
- comment
- created_at
```

---

## 🎯 Immediate Actions Needed

### Phase 1: Clean Up Current Code
1. **Remove sellers functionality**
   - Delete `/sellers` page
   - Delete `/seller/[slug]` page
   - Remove seller-related code

2. **Update homepage**
   - Remove "Meet Sellers" section
   - Remove "Become a Seller" button
   - Update banner text to reflect single business

3. **Update database schema**
   - Remove seller_profiles table
   - Remove commissions table
   - Update product records (remove seller_id references)

### Phase 2: Implement Shopping Cart
1. Create cart state management (Context/Redux)
2. Build cart page (`/cart`)
3. Add to cart functionality
4. Remove from cart
5. Update quantities

### Phase 3: Implement Checkout
1. Create checkout page (`/checkout`)
2. Shipping address form
3. Shipping method selection
4. Payment method selection
5. Order review
6. Order confirmation

### Phase 4: Implement Admin Dashboard
1. Admin dashboard (`/admin`)
2. Product management
3. Order management
4. Customer management
5. Analytics/reports

---

## 📊 Current State vs. Target

### Current (Marketplace):
- Multiple sellers
- Seller profiles
- Commission system
- Seller dashboards
- Seller product uploads
- Buyer-seller communication

### Target (Direct Business):
- Single Nectara business
- Customer shopping
- Customer accounts
- Order management
- Product reviews
- Admin dashboard

---

## 🎨 Homepage Updates Needed

### Remove:
- ❌ "Meet Sellers" section
- ❌ "Become a Seller" CTA
- ❌ Seller profiles links
- ❌ Marketplace language

### Keep/Update:
- ✅ Featured products
- ✅ Category browsing
- ✅ Shop CTA
- ✅ Brand messaging
- ✅ Trust indicators

### New:
- ✅ About Nectara section
- ✅ Customer testimonials
- ✅ Newsletter signup
- ✅ Contact info

---

## 🚀 Development Priority

### High Priority (Week 1-2):
1. Remove marketplace features
2. Update homepage
3. Clean up database schema
4. Fix navigation

### Medium Priority (Week 2-3):
1. Implement shopping cart
2. Build checkout flow
3. Payment integration

### Lower Priority (Week 3-4):
1. Admin dashboard
2. Order management
3. Analytics/reports

---

## ✨ Key Features for Direct Business

### For Customers:
- ✅ Browse jewelry by category
- ✅ View detailed product info
- ✅ Add to cart
- ✅ Checkout process
- ✅ Pay securely
- ✅ Track orders
- ✅ Save favorites
- ✅ View order history
- ✅ Review products

### For Nectara:
- ✅ Manage products
- ✅ Track inventory
- ✅ Process orders
- ✅ View customer info
- ✅ Generate reports
- ✅ Manage shipping
- ✅ Handle payments

---

## 📝 Content Needed

### Pages to Create:
1. About Nectara - Company story
2. Contact - Contact form + info
3. FAQ - Common questions
4. Shipping Info - Shipping details
5. Returns - Return policy
6. Privacy - Privacy policy
7. Terms - Terms of service

---

## 🎯 Success Criteria

When complete, the website should:
- ✅ Be a professional jewelry e-commerce site
- ✅ Allow customers to browse and buy jewelry
- ✅ Process orders and payments
- ✅ Track orders
- ✅ Allow customers to create accounts
- ✅ Have admin area for order/product management
- ✅ Be mobile responsive
- ✅ Be secure and reliable

---

## 📅 Timeline Estimate

| Phase | Tasks | Duration |
|-------|-------|----------|
| 1 | Cleanup & restructure | 3-4 days |
| 2 | Shopping cart | 5-7 days |
| 3 | Checkout & payments | 7-10 days |
| 4 | Admin dashboard | 7-10 days |
| 5 | Testing & polish | 3-5 days |
| **Total** | | **4-5 weeks** |

---

## 🎊 Summary

**Nectara Jewels** is a **direct-to-consumer jewelry business website**.

The current implementation as a **multi-vendor marketplace needs to be refactored** into a **single-business e-commerce store**.

**Key Changes**:
- Remove all seller functionality
- Focus on customer shopping experience
- Implement proper checkout and payment
- Add admin dashboard for business operations
- Update content and messaging

**Result**: A professional jewelry store where customers can browse, select, and purchase jewelry directly from Nectara.

---

**Document Created**: October 19, 2026  
**Status**: Architecture clarification  
**Next Step**: Begin Phase 1 cleanup
