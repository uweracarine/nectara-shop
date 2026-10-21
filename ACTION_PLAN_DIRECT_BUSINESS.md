# Action Plan: Convert to Direct Business E-Commerce

**Current Status**: Multi-vendor marketplace (incorrect)  
**Target Status**: Single business jewelry store (correct)  
**Priority**: HIGH - Core architecture change needed

---

## ✅ What We Have

- ✅ Homepage with product showcase
- ✅ Product catalog (11 products in 6 categories)
- ✅ Shop page with category filtering
- ✅ Product detail pages
- ✅ User profile page
- ✅ Responsive design
- ✅ Modern tech stack (Next.js, React, TypeScript, Tailwind)

---

## ❌ What We Need to Remove

### Pages:
```bash
# Delete these routes:
/sellers                          # Sellers browse page
/seller/[slug]                    # Individual seller pages
/seller                           # Seller portal
```

### Database Tables (Conceptual):
- seller_profiles
- seller_fulfillments
- commissions
- payouts
- seller_applications

### UI Elements:
- "Meet Sellers" homepage section
- "Become a Seller" buttons/links
- Seller names/ratings on products
- Commission displays

---

## ✅ What We Need to Add

### New Pages:

#### **Customer Pages**:
```
/cart                             # Shopping cart
/checkout                         # Checkout flow
/orders                          # Customer order history
/order/[id]                      # Order detail
/wishlist                        # Saved items
```

#### **Admin Pages** (Nectara Only):
```
/admin                           # Dashboard
/admin/products                  # Product management
/admin/orders                    # Order management
/admin/customers                 # Customer list
/admin/reports                   # Analytics
/admin/settings                  # Business settings
```

#### **Public Pages**:
```
/about                           # About Nectara
/contact                         # Contact form
/faq                             # FAQ
/shipping                        # Shipping info
/returns                         # Return policy
/privacy                         # Privacy policy
/terms                           # Terms of service
```

### New Features:
- Shopping cart functionality
- Checkout process
- Payment processing
- Order tracking
- Customer accounts
- Admin dashboard
- Inventory management
- Order fulfillment tracking

---

## 📋 Step-by-Step Action Plan

### **WEEK 1: Cleanup & Restructure**

#### Day 1-2: Remove Marketplace Features
```
[ ] Delete /sellers page
[ ] Delete /seller/[slug] pages
[ ] Remove seller links from homepage
[ ] Remove "Become a Seller" CTA
[ ] Remove seller-related imports/components
[ ] Update homepage banner text
```

**Files to delete**:
- `app/(storefront)/sellers/page.tsx`
- `app/seller/page.tsx`
- `app/seller/[slug]/page.tsx`

**Files to update**:
- `app/page.tsx` - Remove seller links and sections

#### Day 3-4: Update Database Schema
```
[ ] Update product type (remove seller_id references)
[ ] Remove seller-related database interface
[ ] Keep: products, categories, users, orders, carts, wishlist, payments
[ ] Document new schema
```

**Update**:
- `src/types/database.ts` - Simplify product type

#### Day 5: Update Navigation
```
[ ] Update mobile menu
[ ] Update header navigation
[ ] Remove all seller links
[ ] Add cart/checkout links
[ ] Add admin link (hidden for non-admins)
```

---

### **WEEK 2: Shopping Cart**

#### Day 1-2: Cart State Management
```
[ ] Create cart context (Context API)
OR
[ ] Setup cart with Zustand/Redux
[ ] Cart items interface
[ ] Add to cart function
[ ] Remove from cart function
[ ] Update quantity function
```

**Create**:
- `src/context/CartContext.tsx`
- `src/hooks/useCart.ts`

#### Day 3-4: Cart Page
```
[ ] Create cart page (/cart)
[ ] Display cart items
[ ] Update quantities
[ ] Remove items
[ ] Calculate totals
[ ] Checkout button
```

**Create**:
- `app/(storefront)/cart/page.tsx`

#### Day 5: Add to Cart Integration
```
[ ] Connect "Add to Cart" buttons on shop
[ ] Connect "Add to Cart" on product detail
[ ] Add visual feedback
[ ] Update cart count in header
```

---

### **WEEK 3: Checkout & Payments**

#### Day 1-2: Checkout Page
```
[ ] Create checkout page (/checkout)
[ ] Cart review section
[ ] Shipping address form
[ ] Shipping method selection
[ ] Calculate shipping cost
```

**Create**:
- `app/(storefront)/checkout/page.tsx`

#### Day 3: Payment Integration
```
[ ] Choose payment provider (Stripe/PayPal/etc.)
[ ] Add payment form
[ ] Payment processing
[ ] Error handling
[ ] Success confirmation
```

#### Day 4-5: Order Confirmation
```
[ ] Create order in database
[ ] Generate order number
[ ] Send confirmation email
[ ] Order confirmation page
[ ] Save order to customer account
```

**Create**:
- `app/(storefront)/order-confirmation/page.tsx`
- `src/services/payment-service.ts`

---

### **WEEK 4: Customer Account & Admin**

#### Day 1-2: Customer Orders
```
[ ] Create /orders page
[ ] Display order history
[ ] Create order detail page (/order/[id])
[ ] Order status tracking
[ ] Order cancellation option
```

**Create**:
- `app/(storefront)/orders/page.tsx`
- `app/(storefront)/order/[id]/page.tsx`

#### Day 3-4: Admin Dashboard
```
[ ] Create basic admin layout
[ ] Dashboard overview (sales, orders, customers)
[ ] Product management page
[ ] Order management page
[ ] Customer list page
```

**Create**:
- `app/admin/page.tsx`
- `app/admin/products/page.tsx`
- `app/admin/orders/page.tsx`
- `app/admin/customers/page.tsx`

#### Day 5: Public Pages
```
[ ] About Nectara page
[ ] Contact page
[ ] FAQ page
[ ] Shipping info
[ ] Returns policy
[ ] Privacy & Terms
```

---

### **WEEK 5: Testing & Polish**

```
[ ] Test checkout flow end-to-end
[ ] Test payment processing
[ ] Test order creation
[ ] Mobile responsive testing
[ ] Security audit
[ ] Performance optimization
[ ] Bug fixes
```

---

## 🎯 Quick Wins (Do First)

These can be done immediately:

### 1. Remove Sellers (1-2 hours)
```bash
# Delete files
rm app/(storefront)/sellers/page.tsx
rm app/seller -rf

# Update app/page.tsx:
# - Remove "Meet Sellers" section
# - Remove seller-related links
# - Update banner text
```

### 2. Update Homepage CTA (30 min)
```
# Change:
- "Meet Sellers" → Remove or replace with "About Us"
- "Become a Seller" → Remove entirely
- Seller showcase section → Remove
```

### 3. Add Cart Link (15 min)
```
# Update navigation:
- Add /cart link in header
- Add visual cart count indicator
```

---

## 📁 File Structure Target

```
app/
├── (storefront)/
│   ├── page.tsx                    # Homepage (updated)
│   ├── shop/page.tsx               # Shop (keep)
│   ├── product/[slug]/page.tsx     # Product detail (keep)
│   ├── cart/page.tsx               # Shopping cart (NEW)
│   ├── checkout/page.tsx           # Checkout (NEW)
│   ├── order-confirmation/page.tsx # Confirmation (NEW)
│   ├── orders/page.tsx             # Customer orders (NEW)
│   ├── order/[id]/page.tsx         # Order detail (NEW)
│   ├── profile/page.tsx            # User profile (keep)
│   ├── about/page.tsx              # About (NEW)
│   ├── contact/page.tsx            # Contact (NEW)
│   ├── faq/page.tsx                # FAQ (NEW)
│   └── layout.tsx
├── admin/
│   ├── page.tsx                    # Admin dashboard (NEW)
│   ├── products/page.tsx           # Product management (NEW)
│   ├── orders/page.tsx             # Order management (NEW)
│   ├── customers/page.tsx          # Customer list (NEW)
│   └── layout.tsx
└── layout.tsx
```

---

## 🔗 Key Features to Implement

### Cart System:
- [ ] Add to cart
- [ ] Remove from cart
- [ ] Update quantity
- [ ] Calculate subtotal
- [ ] Persist cart (localStorage/database)

### Checkout:
- [ ] Shipping address form
- [ ] Shipping method selection
- [ ] Payment form
- [ ] Order total calculation
- [ ] Create order in database

### Customer Account:
- [ ] View profile
- [ ] Edit profile
- [ ] View order history
- [ ] Track order status
- [ ] View wishlist

### Admin:
- [ ] View dashboard stats
- [ ] Manage products (CRUD)
- [ ] View orders
- [ ] Update order status
- [ ] View customers

---

## 📊 Database Operations Needed

### New Operations:

```typescript
// Cart operations
createCart(customerId)
addToCart(cartId, productId, quantity)
removeFromCart(cartId, itemId)
updateCartItem(cartId, itemId, quantity)
getCart(cartId)

// Order operations
createOrder(customerId, items, shippingAddress)
getOrder(orderId)
getCustomerOrders(customerId)
updateOrderStatus(orderId, status)

// Product operations (admin)
updateProduct(productId, data)
updateInventory(productId, quantity)

// Payment operations
processPayment(amount, method, orderId)
```

---

## 🧪 Testing Checklist

```
[ ] Can add product to cart
[ ] Can view cart
[ ] Can update cart quantity
[ ] Can proceed to checkout
[ ] Can enter shipping address
[ ] Can process payment
[ ] Order is created
[ ] Order appears in order history
[ ] Email confirmation sent
[ ] Admin can view order
[ ] Admin can update order status
```

---

## 🚀 Deployment Readiness

Before deploying:
```
[ ] No broken links
[ ] No marketplace references
[ ] All new features tested
[ ] Mobile responsive
[ ] Payments working
[ ] Database migrations run
[ ] Environment variables set
[ ] Security audit passed
```

---

## 📞 Questions to Answer

1. **Payment Provider**: Which payment gateway? (Stripe, PayPal, Flutterwave, etc.)
2. **Shipping**: How to calculate shipping? (Flat rate, by weight, by location?)
3. **Inventory**: How to manage stock?
4. **Email**: Who sends order confirmation emails?
5. **Admin**: Who has admin access? (Just you or team?)

---

## 🎉 Success Criteria

Website is complete when:
1. ✅ Marketplace features completely removed
2. ✅ Customers can shop and checkout
3. ✅ Payments process successfully
4. ✅ Orders are created and tracked
5. ✅ Admin can manage business
6. ✅ Mobile responsive and fast
7. ✅ Secure and reliable

---

## 📅 Timeline

- **Week 1**: Remove marketplace, restructure
- **Week 2**: Shopping cart
- **Week 3**: Checkout & payments
- **Week 4**: Customer accounts & admin
- **Week 5**: Testing & polish
- **Total**: 5 weeks to production-ready

---

**Ready to start? Begin with Week 1, Day 1!**

**Contact needed**: Clarify payment provider and shipping method to implement correctly.

---

**Created**: October 19, 2026  
**Status**: Ready for implementation  
**Next**: Begin Week 1 cleanup
