# Week 2: Shopping Cart Implementation Plan

**Status**: Ready to Start  
**Dependencies**: Week 1 Cleanup ✅ Complete  
**Estimated Duration**: 5 days  
**Build Status**: ✅ Starting with 0 errors

---

## 🎯 Objective

Implement a fully functional shopping cart system that allows customers to:
- Add products to cart
- View cart contents
- Update quantities
- Remove items
- Calculate totals
- Persist cart state

---

## 📋 Tasks Breakdown

### Day 1-2: Cart State Management

#### Task 1.1: Create Cart Context
**File**: `src/context/CartContext.tsx`

```typescript
interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}
```

**Requirements**:
- Use Context API with useReducer
- Store cart in localStorage
- Persist across page refreshes
- Provide clean API for components

**Acceptance Criteria**:
- [ ] Context compiles without errors
- [ ] Can add items
- [ ] Can remove items
- [ ] Can update quantities
- [ ] Cart persists on page reload

---

#### Task 1.2: Create useCart Hook
**File**: `src/hooks/useCart.ts`

```typescript
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

**Requirements**:
- Simple hook to access cart context
- Error handling for usage outside provider
- Well-documented usage

**Acceptance Criteria**:
- [ ] Hook works in components
- [ ] Clear error messages
- [ ] TypeScript support

---

#### Task 1.3: Wrap App with CartProvider
**File**: `app/layout.tsx`

```typescript
import { CartProvider } from '@/context/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
```

**Acceptance Criteria**:
- [ ] App wraps successfully
- [ ] No errors on startup
- [ ] Context available throughout app

---

### Day 3: Product Page Integration

#### Task 2.1: Add "Add to Cart" Button
**File**: `app/(storefront)/product/[slug]/page.tsx`

**Changes**:
- Import useCart hook
- Add quantity selector (1-10)
- Create "Add to Cart" button
- Show success message

**Component Code**:
```typescript
const [quantity, setQuantity] = useState(1)
const { addItem } = useCart()

const handleAddToCart = () => {
  addItem({
    productId: product.id,
    quantity,
    price: product.price,
    name: product.name,
    image: product.images[0],
  })
  // Show toast notification
}
```

**Acceptance Criteria**:
- [ ] Button appears on product page
- [ ] Quantity selector works (1-10)
- [ ] Item added to cart
- [ ] Success feedback shown
- [ ] Cart count updates in header

---

#### Task 2.2: Add "Add to Cart" to Shop Page
**File**: `app/(storefront)/shop/page.tsx`

**Changes**:
- Add "Add to Cart" button to product cards
- Show quick add with quantity input
- Show success message

**Acceptance Criteria**:
- [ ] Button appears on each product card
- [ ] Works from shop listing
- [ ] Cart updates correctly

---

#### Task 2.3: Update Header Cart Count
**File**: `app/page.tsx` or Navigation Component

**Changes**:
- Import useCart hook
- Display cart item count
- Update dynamically as items added

```typescript
const { itemCount } = useCart()

return (
  <span className="...">
    {itemCount}
  </span>
)
```

**Acceptance Criteria**:
- [ ] Shows correct count
- [ ] Updates when items added
- [ ] Shows 0 when empty
- [ ] Visible on all pages

---

### Day 4-5: Cart Page Implementation

#### Task 3.1: Create Cart Page UI
**File**: `app/(storefront)/cart/page.tsx`

**Sections**:
1. **Cart Items List**
   - Product image
   - Product name
   - Price
   - Quantity selector (with +/- buttons)
   - Remove button
   - Line total

2. **Cart Summary**
   - Subtotal
   - Tax estimate
   - Shipping estimate
   - Total
   - "Proceed to Checkout" button

3. **Empty Cart State**
   - Message: "Your cart is empty"
   - "Continue Shopping" button

**Layout Example**:
```
┌─────────────────────────────────┐
│ Shopping Cart (3 items)         │
├─────────────────────────────────┤
│ Item 1 │ Qty: [1] ↑↓ │ $200   │
│ Item 2 │ Qty: [2] ↑↓ │ $400   │
│ Item 3 │ Qty: [1] ↑↓ │ $150   │
├─────────────────────────────────┤
│ Subtotal:        $750           │
│ Tax (18%):       $135           │
│ Shipping:        $20            │
│ ─────────────────────────        │
│ TOTAL:           $905           │
│ [Continue Shopping] [Checkout]  │
└─────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] All items display correctly
- [ ] Responsive layout (mobile/desktop)
- [ ] Clean, professional design
- [ ] Matches Nectara branding

---

#### Task 3.2: Implement Cart Item Management
**File**: `app/(storefront)/cart/page.tsx`

**Functionality**:
- **Update Quantity**: ↑ / ↓ buttons or input field
- **Remove Item**: Delete button
- **Clear Cart**: Clear all button (optional)
- **Continue Shopping**: Return to shop

**Code Example**:
```typescript
const handleUpdateQuantity = (productId: string, qty: number) => {
  if (qty < 1) return
  if (qty > 99) return
  updateQuantity(productId, qty)
}

const handleRemove = (productId: string) => {
  removeItem(productId)
}
```

**Acceptance Criteria**:
- [ ] Quantity updates
- [ ] Items removable
- [ ] Totals recalculate
- [ ] Cart persists on reload
- [ ] Mobile responsive

---

#### Task 3.3: Calculate Totals Dynamically
**File**: `src/context/CartContext.tsx` and `app/(storefront)/cart/page.tsx`

**Calculations**:
```typescript
const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
const tax = subtotal * 0.18  // 18% tax rate
const shipping = subtotal > 0 ? 20 : 0  // $20 flat rate
const total = subtotal + tax + shipping
```

**Acceptance Criteria**:
- [ ] Correct calculations
- [ ] Updates when items change
- [ ] Formatted currency display
- [ ] Tax rate configurable

---

### Bonus Features (if time permits)

#### Bonus 1: Cart Notifications
- Toast/notification when item added
- "Item added to cart" message
- Animation feedback

#### Bonus 2: Coupon Code Support
- Input field for coupon codes
- Discount calculation
- Display discount on cart

#### Bonus 3: Cart Persistence to Database
- Save cart to Supabase
- Sync across devices (for logged-in users)

#### Bonus 4: Related Products
- Show related products on cart page
- "You might also like..." section
- Quick add from suggestions

---

## 📊 Testing Checklist

### Unit Tests (if implementing)
- [ ] addItem adds to cart
- [ ] removeItem removes from cart
- [ ] updateQuantity changes quantity
- [ ] Total calculation is correct
- [ ] Cart persists to localStorage
- [ ] Cart loads from localStorage

### Integration Tests
- [ ] Add to cart from product page works
- [ ] Add to cart from shop page works
- [ ] Cart updates header count
- [ ] Quantity selector works
- [ ] Remove item works
- [ ] Cart persists on page reload
- [ ] Empty cart shows placeholder

### Manual Testing
- [ ] Add item → Cart count increases
- [ ] Add same item twice → Quantity increases
- [ ] Update quantity → Total updates
- [ ] Remove item → Cart updates
- [ ] Refresh page → Cart persists
- [ ] Mobile view → Responsive layout
- [ ] Multiple products → All display

---

## 📦 Components to Create

### 1. CartProvider
**Location**: `src/context/CartContext.tsx`  
**Size**: ~150 lines

### 2. useCart Hook
**Location**: `src/hooks/useCart.ts`  
**Size**: ~10 lines

### 3. Cart Page
**Location**: `app/(storefront)/cart/page.tsx`  
**Size**: ~200 lines

### 4. CartItem Component (optional)
**Location**: `src/components/CartItem.tsx`  
**Size**: ~80 lines

### 5. CartSummary Component (optional)
**Location**: `src/components/CartSummary.tsx`  
**Size**: ~100 lines

---

## 🎨 Design Specifications

### Colors (from Nectara brand)
- Primary Gold: `#d4af8f`
- Dark Brown: `#3d2817`
- Tan: `#a0824d`
- Light Background: `#faf8f3`

### Fonts
- Headings: Semibold, 24-32px
- Body: Regular, 14-16px
- Numbers: Monospace or semibold

### Spacing
- Container padding: 16-32px
- Item spacing: 12-16px
- Section gaps: 24-32px

---

## 🚀 Implementation Guidelines

### 1. Use TypeScript
- Define all types clearly
- No `any` types
- Use interfaces for data structures

### 2. Follow Code Style
- Match existing patterns
- Use Tailwind classes from project
- Keep components modular

### 3. Error Handling
- Graceful fallbacks
- Clear error messages
- Validation on inputs

### 4. Performance
- Memoize context consumers
- Avoid unnecessary re-renders
- Optimize localStorage operations

### 5. Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader friendly

---

## 📝 Commit Strategy

**Day 1 Commits**:
```
git commit -m "feat: create CartContext and useCart hook"
```

**Day 2 Commits**:
```
git commit -m "feat: integrate cart with product pages"
git commit -m "feat: update header cart count display"
```

**Day 3-5 Commits**:
```
git commit -m "feat: implement cart page with item management"
git commit -m "feat: add cart total calculations"
git commit -m "feat: persist cart to localStorage"
```

---

## 🔍 Success Criteria (End of Week 2)

✅ **Must Have**:
- [ ] Cart state management working
- [ ] Add to cart functionality
- [ ] Cart page displays items
- [ ] Update quantity/remove items
- [ ] Cart persists on reload
- [ ] Header shows cart count
- [ ] Mobile responsive
- [ ] Build compiles (0 errors)

⚠️ **Nice to Have**:
- [ ] Toast notifications
- [ ] Animations
- [ ] Empty cart message
- [ ] Continue shopping button

❌ **Don't Do Yet**:
- [ ] Checkout flow (Week 3)
- [ ] Payment processing (Week 3)
- [ ] Admin features (Week 4)

---

## 🎓 References

### Similar Implementations
- Shopify cart pattern
- WooCommerce cart logic
- Next.js commerce example

### Libraries to Consider
- Zustand (if Context too simple)
- Redux Toolkit (if state complex)
- SWR (for server state)

---

## 📞 Questions to Answer Before Starting

1. **Tax Rate**: Should it be 18% or configurable?
2. **Shipping**: Flat $20 or dynamic based on location?
3. **Stock Validation**: Check stock on add or on checkout?
4. **Quantity Limit**: Max 99 or configurable per product?
5. **Persistence**: localStorage only or sync to database?

---

## 🎯 Quick Start (Day 1 Morning)

```bash
# 1. Create context file
touch src/context/CartContext.tsx

# 2. Create hook file
touch src/hooks/useCart.ts

# 3. Implement CartContext with useState/useReducer

# 4. Test by adding to app/layout.tsx

# 5. Verify build
npm run build
```

---

## ⏱️ Time Allocation

- **Day 1**: Cart Context & Hook (6 hours)
- **Day 2**: Product page integration (4 hours)
- **Day 3**: Header updates & small bugs (2 hours)
- **Day 4-5**: Cart page UI & functionality (8 hours)
- **Flex**: Testing, polish, bonus features (2 hours)

**Total**: 22 hours (realistic for 1 developer in 5 days)

---

## 📚 Files to Reference

- `app/(storefront)/product/[slug]/page.tsx` - Product detail page
- `app/(storefront)/shop/page.tsx` - Shop listing
- `app/page.tsx` - Homepage (header)
- `src/lib/catalog-data.ts` - Product data structure
- `src/components/ui/Button.tsx` - Button component

---

**Ready to start? Begin with Task 1.1 on Monday morning!**

*Next Session: Week 2 Implementation & Week 3 Planning*

