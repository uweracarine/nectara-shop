# Nectara Jewels - Business Model Clarification

**Date**: October 19, 2026  
**Project Type**: Direct Business Website (not a marketplace)

---

## 🎯 Business Model

**Nectara Jewels** is a **jewelry business** that sells products directly to customers online.

### Key Characteristics:

✅ **Single Business Owner**: Nectara (not a marketplace with multiple sellers)  
✅ **Direct Sales**: Customers buy directly from Nectara  
✅ **Online Store**: Website for product browsing and purchasing  
✅ **Inventory Management**: Nectara manages all products  
✅ **Order Fulfillment**: Nectara handles all orders and shipping  

---

## 🏪 What This Means

### Current (Incorrect) Architecture:
- ❌ Multiple sellers
- ❌ Seller profiles
- ❌ Commission system
- ❌ Seller dashboards
- ❌ Seller product uploads

### Correct Architecture:
- ✅ Single product catalog (managed by Nectara)
- ✅ Customer accounts
- ✅ Shopping cart
- ✅ Checkout/Payment
- ✅ Order history
- ✅ Admin dashboard (for Nectara management only)

---

## 📊 Website Structure Needed

### Public Pages:
1. **Homepage** - Brand story, featured products, CTAs
2. **Shop/Products** - Browse all jewelry products
3. **Product Detail** - View product info, add to cart
4. **About** - About Nectara business
5. **Contact** - Contact Nectara
6. **FAQ** - Frequently asked questions

### Customer Pages (Logged In):
1. **Account Profile** - Customer info
2. **Shopping Cart** - Add/remove items
3. **Checkout** - Shipping & payment
4. **Order History** - View past orders
5. **Wishlist** - Save favorite items

### Admin Pages (Nectara Only):
1. **Admin Dashboard** - Business overview
2. **Product Management** - Add/edit products
3. **Orders Management** - View and fulfill orders
4. **Customer Management** - View customer info
5. **Reports/Analytics** - Sales data
6. **Settings** - Business configuration

---

## 🗑️ What Needs to Be Removed

From current implementation:

1. ❌ **Sellers functionality**
   - Remove seller profiles page
   - Remove "Meet Sellers" section
   - Remove seller dashboard

2. ❌ **Multi-vendor features**
   - Remove seller commission system
   - Remove seller product uploads
   - Remove seller fulfillment system

3. ❌ **Seller-related database tables**
   - seller_profiles
   - seller_fulfillments
   - commissions
   - payouts

---

## 🏗️ What Needs to Be Added

### 1. Customer Cart System
```
/cart
- View items
- Edit quantities
- Remove items
- Calculate total
- Proceed to checkout
```

### 2. Checkout Flow
```
/checkout
- Shipping address
- Shipping method selection
- Payment method
- Order review
- Order confirmation
```

### 3. Order Management
```
/orders
- View order history
- Track order status
- Cancel/return items
- View order details
```

### 4. Admin Dashboard
```
/admin
- Dashboard overview
- Product management
- Order management
- Customer management
- Settings
```

---

## 💾 Database Structure Changes

### Tables to Keep:
- ✅ products
- ✅ categories
- ✅ users/customers
- ✅ orders
- ✅ order_items
- ✅ cart
- ✅ cart_items
- ✅ wishlist
- ✅ payments
- ✅ reviews/ratings

### Tables to Remove:
- ❌ seller_profiles
- ❌ seller_fulfillments
- ❌ commissions
- ❌ payouts
- ❌ seller_applications

### New Tables Needed:
- ✅ shipping_methods
- ✅ payment_methods
- ✅ order_status_history
- ✅ product_inventory

---

## 🎨 Website Pages to Create

### Public Pages (No Login Required):
1. Homepage
2. Shop (all products)
3. Product detail
4. About Us
5. Contact Us
6. FAQ
7. Shipping Info
8. Returns Policy
9. Privacy Policy

### Customer Pages (Login Required):
1. Account/Profile
2. Shopping Cart
3. Checkout
4. Order History
5. Wishlist
6. Account Settings

### Admin Pages (Admin Only):
1. Admin Dashboard
2. Product Management
3. Order Management
4. Customer Management
5. Analytics/Reports
6. Settings

---

## 🔄 User Flows

### Customer Purchase Flow:
```
Homepage
   ↓
Browse Products (Shop)
   ↓
View Product Details
   ↓
Add to Cart
   ↓
View Cart
   ↓
Checkout
   ↓
Enter Shipping Address
   ↓
Select Shipping Method
   ↓
Select Payment Method
   ↓
Review Order
   ↓
Process Payment
   ↓
Order Confirmation
```

### Customer Account Flow:
```
Login/Register
   ↓
View Profile
   ↓
View Order History
   ↓
View Wishlist
   ↓
Update Account Settings
```

### Admin Flow:
```
Admin Dashboard
   ├─ View Sales Overview
   ├─ Manage Products
   │  ├─ Add Product
   │  ├─ Edit Product
   │  ├─ Delete Product
   │  └─ Manage Inventory
   ├─ Manage Orders
   │  ├─ View Orders
   │  ├─ Update Status
   │  └─ Generate Invoices
   ├─ Manage Customers
   │  └─ View Customer Info
   └─ Settings
```

---

## 📦 Product Management

### Simple Product Structure:
- Name
- Description
- Price
- Images
- Category
- Stock/Inventory
- Specifications (material, color, size, etc.)
- Ratings/Reviews

### No Need For:
- ❌ Seller info
- ❌ Commission rates
- ❌ Seller approval status

---

## 💳 Payment & Shipping

### Payment Methods:
- Credit/Debit Card (Stripe/Paypal)
- Mobile Money (MTN, Airtel)
- Bank Transfer
- Cash on Delivery (Optional)

### Shipping:
- Calculate based on order total
- Multiple shipping options
- Tracking information
- Delivery confirmation

---

## 📊 Business Analytics

Needed for Nectara admin:
- Total sales
- Orders count
- Revenue
- Top products
- Customer statistics
- Inventory levels
- Return rate

---

## ✅ Corrected Implementation Plan

### Phase 1: Core Setup ✅ (Already Done)
- Next.js, React, TypeScript, Tailwind
- Database schema (modify for single business)
- Authentication

### Phase 2: Product Catalog ✅ (Done - remove seller features)
- Product pages
- Category browsing
- Product search

### Phase 3: Shopping Cart & Checkout ⏳
- Add to cart functionality
- Cart management
- Checkout flow
- Payment integration

### Phase 4: Customer Accounts ⏳
- User profiles
- Order history
- Wishlist
- Account management

### Phase 5: Admin Dashboard ⏳
- Product management
- Order management
- Customer management
- Analytics

### Phase 6: Payments & Fulfillment ⏳
- Payment processing
- Order status tracking
- Shipping integration

### Phase 7: Testing & Launch ⏳
- Testing
- Security audit
- Performance optimization
- Deployment

---

## 🚀 Next Immediate Steps

1. **Remove Seller Features**
   - Delete sellers page
   - Remove seller-related code
   - Update database schema

2. **Add Cart Functionality**
   - Create cart context/state
   - Build cart page
   - Add to cart buttons

3. **Build Checkout Flow**
   - Checkout page
   - Shipping address form
   - Payment form
   - Order confirmation

4. **Create Admin Dashboard**
   - Basic admin layout
   - Product management
   - Order management

---

## 📝 Summary

**Nectara is a direct-to-consumer jewelry business website.**

Instead of:
- Multiple sellers
- Commission system
- Seller approvals

We need:
- Customer shopping cart
- Checkout process
- Order management
- Admin dashboard
- Inventory management
- Payment processing

This is much simpler architecture focused on **buying and selling jewelry directly to customers**.

---

**Document created**: October 19, 2026  
**Status**: Business model clarified  
**Next action**: Refactor website for direct sales model
