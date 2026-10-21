import { z } from 'zod'

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  role: z.enum(['buyer', 'seller']),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})

export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const updatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Seller validation schemas
export const sellerApplicationSchema = z.object({
  storeName: z.string().min(3, 'Store name must be at least 3 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000),
  businessRegistration: z.string().min(3, 'Business registration is required'),
  taxId: z.string().optional(),
  contactEmail: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().default('Rwanda'),
  postalCode: z.string().min(3, 'Postal code is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
})

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000),
  price: z.number().int().positive('Price must be a positive integer (in RWF)'),
  comparisonPrice: z.number().int().positive().optional().nullable(),
  categoryId: z.string().uuid('Invalid category'),
  material: z.string().max(100).optional(),
  color: z.string().max(100).optional(),
  size: z.string().max(100).optional(),
  weight: z.number().positive().optional().nullable(),
  availableQuantity: z.number().int().nonnegative('Quantity cannot be negative'),
  featured: z.boolean().default(false),
})

export const productFilterSchema = z.object({
  categoryId: z.string().optional(),
  searchQuery: z.string().optional(),
  minPrice: z.number().int().nonnegative().optional(),
  maxPrice: z.number().int().nonnegative().optional(),
  sortBy: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).optional(),
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().max(100).default(20),
})

// Address validation
export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().optional(),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().default('Rwanda'),
  isDefault: z.boolean().default(false),
})

// Cart validation
export const cartItemSchema = z.object({
  productId: z.string().uuid('Invalid product'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
})

// Order validation
export const checkoutSchema = z.object({
  addressId: z.string().uuid('Invalid address'),
  paymentMethod: z.enum(['mtn_momo', 'airtel_money', 'card']),
})

// Review validation
export const reviewSchema = z.object({
  productId: z.string().uuid('Invalid product'),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(100).optional(),
  comment: z.string().min(10).max(2000),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type SellerApplicationInput = z.infer<typeof sellerApplicationSchema>
export type ProductInput = z.infer<typeof productSchema>
export type ProductFilterInput = z.infer<typeof productFilterSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
