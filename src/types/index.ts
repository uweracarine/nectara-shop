// Core domain types for Nectara Jewels

export type UserRole = 'buyer' | 'seller' | 'admin'
export type UserStatus = 'active' | 'suspended' | 'pending_verification'
export type ProductStatus = 'pending' | 'approved' | 'rejected'
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded'
export type SellerStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export interface User {
  id: string
  email: string
  fullName: string | null
  role: UserRole
  profilePictureUrl: string | null
  phoneNumber: string | null
  status: UserStatus
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface SellerProfile {
  id: string
  userId: string
  storeName: string
  storeSlug: string
  description: string | null
  logoUrl: string | null
  bannerUrl: string | null
  businessRegistration: string
  taxId: string | null
  contactEmail: string
  phoneNumber: string
  address: string
  city: string
  country: string
  postalCode: string
  website: string | null
  commissionRate: number
  status: SellerStatus
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  parentId: string | null
  active: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  sellerId: string
  categoryId: string
  name: string
  slug: string
  description: string
  price: number
  comparisonPrice: number | null
  material: string | null
  color: string | null
  size: string | null
  weight: number | null
  availableQuantity: number
  featured: boolean
  approvalStatus: ProductStatus
  published: boolean
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  productId: string
  imageUrl: string
  altText: string | null
  displayOrder: number
  createdAt: string
}

export interface Order {
  id: string
  buyerId: string
  orderNumber: string
  totalAmount: number
  status: OrderStatus
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  userId: string
  fullName: string
  phone: string
  streetAddress: string
  city: string
  province: string | null
  postalCode: string
  country: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  orderId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: string
  provider: string
  providerReference: string | null
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  data: Record<string, any> | null
  read: boolean
  createdAt: string
}
