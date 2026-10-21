// Application constants for Nectara Jewels

// Currency
export const CURRENCY = 'RWF'
export const CURRENCY_SYMBOL = 'Fr'

// Default values
export const DEFAULT_COMMISSION_RATE = 10 // 10%
export const DEFAULT_DELIVERY_FEE = 0 // Free delivery (configurable per seller)
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Product limits
export const MIN_PRODUCT_NAME_LENGTH = 3
export const MAX_PRODUCT_NAME_LENGTH = 200
export const MIN_PRODUCT_DESCRIPTION_LENGTH = 20
export const MAX_PRODUCT_DESCRIPTION_LENGTH = 5000
export const MAX_PRODUCT_IMAGES = 10

// Order limits
export const MAX_CART_ITEMS = 999
export const ORDER_NUMBER_PREFIX = 'NJ'

// User roles
export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin',
} as const

export const USER_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING_VERIFICATION: 'pending_verification',
} as const

export const SELLER_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const

export const PRODUCT_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const

export const PAYMENT_METHODS = {
  MTN_MOMO: 'mtn_momo',
  AIRTEL_MONEY: 'airtel_money',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
} as const

// Product categories
export const CATEGORIES = {
  NECKLACES: 'necklaces-pendants',
  EARRINGS: 'earrings',
  RINGS: 'rings',
  BRACELETS: 'bracelets-bangles',
  WATCHES: 'watches',
  JEWELRY_SETS: 'jewelry-sets',
  HANDMADE: 'handmade',
  BEADED: 'beaded',
  ENGAGEMENT_WEDDING: 'engagement-wedding',
  PERSONALIZED: 'personalized',
  ACCESSORIES: 'accessories',
} as const

// Sorting options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  POPULAR: 'popular',
  RATING: 'rating',
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
} as const

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'An internal error occurred',
  PRODUCT_NOT_AVAILABLE: 'Product is not available',
  INSUFFICIENT_STOCK: 'Insufficient stock available',
  PAYMENT_FAILED: 'Payment processing failed',
  ORDER_CREATION_FAILED: 'Failed to create order',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email',
  PASSWORD_CHANGED: 'Password changed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  ORDER_CREATED: 'Order created successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
} as const

// Validation rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_STORE_NAME_LENGTH: 3,
  MAX_STORE_NAME_LENGTH: 100,
  MIN_STORE_DESCRIPTION_LENGTH: 20,
  MAX_STORE_DESCRIPTION_LENGTH: 1000,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const

// API endpoints
export const API_ROUTES = {
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_VERIFY: '/api/auth/verify',
  USERS_PROFILE: '/api/users/profile',
  PRODUCTS_LIST: '/api/products',
  PRODUCTS_DETAIL: '/api/products/:id',
  ORDERS_LIST: '/api/orders',
  ORDERS_CREATE: '/api/orders',
  PAYMENTS_INITIATE: '/api/payments/initiate',
  PAYMENTS_VERIFY: '/api/payments/verify',
} as const

// Time limits (in milliseconds)
export const TIME_LIMITS = {
  PASSWORD_RESET_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  OTP_EXPIRY: 10 * 60 * 1000, // 10 minutes
} as const

// File upload limits
export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES_PER_PRODUCT: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const

// Feature flags (can be managed from database later)
export const FEATURES = {
  SELLER_REGISTRATION: true,
  PAYMENT_PROCESSING: true,
  ORDER_TRACKING: true,
  REVIEWS: true,
  WISHLIST: true,
  NOTIFICATIONS: true,
  SELLER_PAYOUTS: true,
} as const
