import { CATALOG_PRODUCTS, type CatalogProduct } from './catalog-data'

export type UserRole = 'buyer' | 'admin'

export type StoredUser = {
  id: string
  fullName: string
  email: string
  password: string
  phone: string
  role: UserRole
  createdAt: string
}

export type CartLine = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

export type OrderRecord = {
  id: string
  orderNumber: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  total: number
  paymentMethod: string
  createdAt: string
  status: string
}

export type SellerProfile = {
  id: string
  userId: string
  storeName: string
  storeSlug: string
  description: string
  logoUrl: string
  bannerUrl: string
  contactEmail: string
  phoneNumber: string
  address: string
  city: string
  country: string
  postalCode: string
  website: string
  commissionRate: number
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  updatedAt: string
}

export type AddressRecord = {
  id: string
  userId: string
  recipientName: string
  phone: string
  district: string
  sector: string
  cell: string
  village: string
  additionalDirections: string
  isDefault: boolean
  createdAt: string
}

export type WishlistItem = {
  id: string
  userId: string
  productId: string
  slug: string
  name: string
  image: string
  price: number
  category: string
  stockStatus: 'In Stock' | 'Low Stock' | 'Unavailable'
  addedAt: string
}

export type NotificationRecord = {
  id: string
  userId: string
  type: 'order' | 'payment' | 'shipping' | 'security' | 'return'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export type ReturnRequest = {
  id: string
  userId: string
  orderId: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  createdAt: string
}

export type SupportTicket = {
  id: string
  userId: string
  subject: string
  message: string
  status: 'open' | 'resolved'
  createdAt: string
}

const STORAGE_KEYS = {
  users: 'nectara_users',
  session: 'nectara_session',
  cart: 'nectara_cart',
  orders: 'nectara_orders',
  products: 'nectara_products',
  sellerProfiles: 'nectara_seller_profiles',
  addresses: 'nectara_addresses',
  wishlist: 'nectara_wishlist',
  notifications: 'nectara_notifications',
  returns: 'nectara_returns',
  support: 'nectara_support',
}

const DEFAULT_ADMIN: StoredUser = {
  id: 'admin-nectara',
  fullName: 'Nectara Admin',
  email: 'admin@nectara-jewels.com',
  password: 'Nectara@2026',
  phone: '+250788000000',
  role: 'admin',
  createdAt: new Date().toISOString(),
}

export function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') {
    return [DEFAULT_ADMIN]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.users)
    const users = raw ? (JSON.parse(raw) as StoredUser[]) : []
    return [DEFAULT_ADMIN, ...users]
  } catch {
    return [DEFAULT_ADMIN]
  }
}

export function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return
  const cleaned = users.filter((user) => user.email !== DEFAULT_ADMIN.email)
  window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(cleaned))
}

export function getSessionUser(): StoredUser | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.session)
    return raw ? (JSON.parse(raw) as StoredUser) : null
  } catch {
    return null
  }
}

export function setSessionUser(user: StoredUser | null) {
  if (typeof window === 'undefined') return
  if (!user) {
    window.localStorage.removeItem(STORAGE_KEYS.session)
    return
  }
  window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user))
}

export function updateSessionUser(updates: Partial<StoredUser>) {
  const current = getSessionUser()
  if (!current) return null

  const nextUser = { ...current, ...updates }
  setSessionUser(nextUser)

  const users = getStoredUsers().map((user) =>
    user.id === current.id ? { ...user, ...updates } : user
  )
  saveStoredUsers(users)

  return nextUser
}

export function updateUserPassword(email: string, nextPassword: string) {
  const users = getStoredUsers().map((user) =>
    user.email.toLowerCase() === email.toLowerCase() ? { ...user, password: nextPassword } : user
  )
  saveStoredUsers(users)

  const current = getSessionUser()
  if (current && current.email.toLowerCase() === email.toLowerCase()) {
    setSessionUser({ ...current, password: nextPassword })
  }

  return true
}

export function registerCustomer(payload: {
  fullName: string
  email: string
  phone: string
  password: string
}) {
  const users = getStoredUsers()

  if (users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error('This email is already registered.')
  }

  const user: StoredUser = {
    id: `customer-${Date.now()}`,
    fullName: payload.fullName,
    email: payload.email.toLowerCase(),
    password: payload.password,
    phone: payload.phone,
    role: 'buyer',
    createdAt: new Date().toISOString(),
  }

  saveStoredUsers([...users.filter((item) => item.email !== DEFAULT_ADMIN.email), user])
  setSessionUser(user)
  return user
}

export function loginUser(email: string, password: string) {
  const users = getStoredUsers()
  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
  )

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  setSessionUser(user)
  return user
}

export function logoutUser() {
  setSessionUser(null)
}

export function getCart(): CartLine[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.cart)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartLine[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
}

export function addToCart(product: {
  id: string
  slug: string
  name: string
  price: number
  image: string
  category: string
  quantity?: number
}) {
  const cart = getCart()
  const item = cart.find((entry) => entry.slug === product.slug)

  if (item) {
    item.quantity += product.quantity ?? 1
  } else {
    cart.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: product.quantity ?? 1,
    })
  }

  saveCart(cart)
  return cart
}

export function updateCartQuantity(slug: string, quantity: number) {
  const cart = getCart().map((item) =>
    item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item
  )
  saveCart(cart)
  return cart
}

export function removeFromCart(slug: string) {
  const cart = getCart().filter((item) => item.slug !== slug)
  saveCart(cart)
  return cart
}

export function clearCart() {
  saveCart([])
}

export function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getCatalogProducts(): CatalogProduct[] {
  if (typeof window === 'undefined') return CATALOG_PRODUCTS

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.products)
    return raw ? (JSON.parse(raw) as CatalogProduct[]) : CATALOG_PRODUCTS
  } catch {
    return CATALOG_PRODUCTS
  }
}

export function saveCatalogProducts(products: CatalogProduct[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
}

export function updateCatalogProduct(slug: string, updates: Partial<CatalogProduct>) {
  const products = getCatalogProducts().map((product) =>
    product.slug === slug ? { ...product, ...updates } : product
  )
  saveCatalogProducts(products)
  return products
}

export function archiveCatalogProduct(slug: string, deleted = true) {
  const products = getCatalogProducts().map((product) =>
    product.slug === slug ? { ...product, deleted } : product
  )
  saveCatalogProducts(products)
  return products
}

export function restoreCatalogProduct(slug: string) {
  return archiveCatalogProduct(slug, false)
}

export function createCatalogProduct(payload: Partial<CatalogProduct> & {
  name: string
  category: CatalogProduct['category']
  price: number
  image?: string
}) {
  const products = getCatalogProducts()
  const slugBase = payload.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'new-product'

  const slug = `${slugBase}-${Date.now().toString().slice(-6)}`
  const product: CatalogProduct = {
    id: `product-${Date.now()}`,
    slug,
    name: payload.name,
    category: payload.category,
    categoryLabel: payload.categoryLabel || payload.category.charAt(0).toUpperCase() + payload.category.slice(1),
    price: payload.price,
    comparisonPrice: payload.comparisonPrice,
    image: payload.image || '/images/jewery1.png',
    gallery: payload.gallery || [payload.image || '/images/jewery1.png'],
    description: payload.description || 'New artisan-crafted Nectara piece curated for your luxury collection.',
    material: payload.material || '18K Gold',
    color: payload.color || 'Signature Nectara',
    size: payload.size || 'One size',
    weight: payload.weight || 'Standard',
    availableQuantity: payload.availableQuantity ?? 1,
    featured: payload.featured ?? false,
    rating: payload.rating ?? 4.9,
    reviewCount: payload.reviewCount ?? 0,
    sellerId: payload.sellerId || 'seller-1',
    sellerName: payload.sellerName || 'Nectara Jewels',
    sellerSlug: payload.sellerSlug || 'nectara-jewels',
    badge: payload.badge || 'New',
    deleted: false,
  }

  const nextProducts = [product, ...products]
  saveCatalogProducts(nextProducts)
  return nextProducts
}

export function deleteCatalogProduct(slug: string) {
  const products = getCatalogProducts().filter((product) => product.slug !== slug)
  saveCatalogProducts(products)
  return products
}

export function getSellerProfiles(): SellerProfile[] {
  if (typeof window === 'undefined') {
    return [
      {
        id: 'seller-profile-default',
        userId: 'nectara-seller',
        storeName: 'Nectara Jewels',
        storeSlug: 'nectara-jewels',
        description: 'Luxury handcrafted jewelry and bridal essentials from Rwanda.',
        logoUrl: '/images/jewery3.png',
        bannerUrl: '/images/jewery2.png',
        contactEmail: 'atelier@nectara-jewels.com',
        phoneNumber: '+250788123456',
        address: 'Kigali Heights',
        city: 'Kigali',
        country: 'Rwanda',
        postalCode: 'KGL 101',
        website: 'https://nectara-jewels.com',
        commissionRate: 0.12,
        status: 'approved',
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.sellerProfiles)
    return raw ? (JSON.parse(raw) as SellerProfile[]) : [
      {
        id: 'seller-profile-default',
        userId: 'nectara-seller',
        storeName: 'Nectara Jewels',
        storeSlug: 'nectara-jewels',
        description: 'Luxury handcrafted jewelry and bridal essentials from Rwanda.',
        logoUrl: '/images/jewery3.png',
        bannerUrl: '/images/jewery2.png',
        contactEmail: 'atelier@nectara-jewels.com',
        phoneNumber: '+250788123456',
        address: 'Kigali Heights',
        city: 'Kigali',
        country: 'Rwanda',
        postalCode: 'KGL 101',
        website: 'https://nectara-jewels.com',
        commissionRate: 0.12,
        status: 'approved',
        updatedAt: new Date().toISOString(),
      },
    ]
  } catch {
    return []
  }
}

export function saveSellerProfiles(profiles: SellerProfile[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.sellerProfiles, JSON.stringify(profiles))
}

export function getSellerProfile(userId = 'nectara-seller') {
  return getSellerProfiles().find((profile) => profile.userId === userId) ?? getSellerProfiles()[0] ?? null
}

export function upsertSellerProfile(profile: Partial<SellerProfile> & { userId: string; storeName: string; contactEmail: string }) {
  const profiles = getSellerProfiles()
  const inferredStoreSlug = profile.storeSlug ?? (
    profile.storeName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'nectara-jewels'
  )

  const next: SellerProfile = {
    id: profile.id ?? `seller-${Date.now()}`,
    userId: profile.userId,
    storeName: profile.storeName,
    storeSlug: inferredStoreSlug,
    description: profile.description ?? 'Luxury handcrafted jewelry and bridal essentials from Rwanda.',
    logoUrl: profile.logoUrl ?? '/images/jewery3.png',
    bannerUrl: profile.bannerUrl ?? '/images/jewery2.png',
    contactEmail: profile.contactEmail,
    phoneNumber: profile.phoneNumber ?? '+250788123456',
    address: profile.address ?? 'Kigali Heights',
    city: profile.city ?? 'Kigali',
    country: profile.country ?? 'Rwanda',
    postalCode: profile.postalCode ?? 'KGL 101',
    website: profile.website ?? 'https://nectara-jewels.com',
    commissionRate: profile.commissionRate ?? 0.12,
    status: profile.status ?? 'approved',
    updatedAt: new Date().toISOString(),
  }

  const existingIndex = profiles.findIndex((item) => item.userId === profile.userId)
  const nextProfiles = existingIndex >= 0 ? profiles.map((item) => (item.userId === profile.userId ? next : item)) : [next, ...profiles]
  saveSellerProfiles(nextProfiles)

  return next
}

export function getPurchaseHistoryByCustomer(email?: string, startDate?: string, endDate?: string) {
  const allOrders = getOrders()

  return allOrders.filter((order) => {
    const matchesCustomer = !email || order.email.toLowerCase() === email.toLowerCase() || order.customerName.toLowerCase().includes(email.toLowerCase())
    const matchesStart = !startDate || new Date(order.createdAt) >= new Date(`${startDate}T00:00:00`)
    const matchesEnd = !endDate || new Date(order.createdAt) <= new Date(`${endDate}T23:59:59`)
    return matchesCustomer && matchesStart && matchesEnd
  })
}

export function getOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.orders)
    return raw ? (JSON.parse(raw) as OrderRecord[]) : []
  } catch {
    return []
  }
}

export function saveOrders(orders: OrderRecord[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders))
}

export function updateOrderStatus(orderId: string, status: string) {
  const orders = getOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order
  )
  saveOrders(orders)
  return orders
}

export function createOrder(payload: {
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  total: number
  paymentMethod: string
}) {
  const orders = getOrders()
  const orderNumber = `NECT-${Date.now().toString().slice(-8)}`
  const order: OrderRecord = {
    id: `order-${Date.now()}`,
    orderNumber,
    customerName: payload.customerName,
    email: payload.email,
    phone: payload.phone,
    address: payload.address,
    city: payload.city,
    province: payload.province,
    total: payload.total,
    paymentMethod: payload.paymentMethod,
    createdAt: new Date().toISOString(),
    status: 'Paid',
  }

  saveOrders([order, ...orders])
  clearCart()
  return order
}

export function getAddresses(userId?: string): AddressRecord[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.addresses)
    const addresses = raw ? (JSON.parse(raw) as AddressRecord[]) : []
    return userId ? addresses.filter((address) => address.userId === userId) : addresses
  } catch {
    return []
  }
}

export function saveAddresses(addresses: AddressRecord[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.addresses, JSON.stringify(addresses))
}

export function upsertAddress(address: Partial<AddressRecord> & { userId: string; recipientName: string; phone: string; district: string; sector: string; cell: string; village: string }) {
  const addresses = getAddresses()
  const nextAddress: AddressRecord = {
    id: address.id ?? `address-${Date.now()}`,
    userId: address.userId,
    recipientName: address.recipientName,
    phone: address.phone,
    district: address.district,
    sector: address.sector,
    cell: address.cell,
    village: address.village,
    additionalDirections: address.additionalDirections ?? '',
    isDefault: address.isDefault ?? false,
    createdAt: address.createdAt ?? new Date().toISOString(),
  }

  const nextAddresses = address.id
    ? addresses.map((item) => (item.id === address.id ? nextAddress : item))
    : [nextAddress, ...addresses]

  saveAddresses(nextAddresses)
  return nextAddress
}

export function deleteAddress(addressId: string) {
  const addresses = getAddresses().filter((address) => address.id !== addressId)
  saveAddresses(addresses)
  return addresses
}

export function setDefaultAddress(addressId: string, userId: string) {
  const addresses = getAddresses().map((address) => ({
    ...address,
    isDefault: address.userId === userId && address.id === addressId,
  }))
  saveAddresses(addresses)
  return addresses
}

export function getWishlist(userId?: string): WishlistItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.wishlist)
    const items = raw ? (JSON.parse(raw) as WishlistItem[]) : []
    return userId ? items.filter((item) => item.userId === userId) : items
  } catch {
    return []
  }
}

export function saveWishlist(items: WishlistItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(items))
}

export function toggleWishlist(item: Omit<WishlistItem, 'id' | 'addedAt'> & { id?: string }) {
  const wishlist = getWishlist(item.userId)
  const existing = wishlist.find((entry) => entry.productId === item.productId)

  if (existing) {
    const updated = wishlist.filter((entry) => entry.productId !== item.productId)
    saveWishlist(updated)
    return updated
  }

  const next = {
    ...item,
    id: item.id ?? `wishlist-${Date.now()}`,
    addedAt: new Date().toISOString(),
  }

  const updated = [next, ...wishlist]
  saveWishlist(updated)
  return updated
}

export function getNotifications(userId?: string): NotificationRecord[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.notifications)
    const notifications = raw ? (JSON.parse(raw) as NotificationRecord[]) : []
    return userId ? notifications.filter((notification) => notification.userId === userId) : notifications
  } catch {
    return []
  }
}

export function saveNotifications(notifications: NotificationRecord[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications))
}

export function markNotificationRead(notificationId: string) {
  const notifications = getNotifications().map((notification) =>
    notification.id === notificationId ? { ...notification, isRead: true } : notification
  )
  saveNotifications(notifications)
  return notifications
}

export function getReturnRequests(userId?: string): ReturnRequest[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.returns)
    const items = raw ? (JSON.parse(raw) as ReturnRequest[]) : []
    return userId ? items.filter((item) => item.userId === userId) : items
  } catch {
    return []
  }
}

export function saveReturnRequests(items: ReturnRequest[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.returns, JSON.stringify(items))
}

export function createReturnRequest(payload: { userId: string; orderId: string; reason: string }) {
  const requests = getReturnRequests()
  const next: ReturnRequest = {
    id: `return-${Date.now()}`,
    userId: payload.userId,
    orderId: payload.orderId,
    reason: payload.reason,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  saveReturnRequests([next, ...requests])
  return next
}

export function getSupportTickets(userId?: string): SupportTicket[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.support)
    const items = raw ? (JSON.parse(raw) as SupportTicket[]) : []
    return userId ? items.filter((item) => item.userId === userId) : items
  } catch {
    return []
  }
}

export function saveSupportTickets(items: SupportTicket[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.support, JSON.stringify(items))
}

export function createSupportTicket(payload: { userId: string; subject: string; message: string }) {
  const tickets = getSupportTickets()
  const next: SupportTicket = {
    id: `support-${Date.now()}`,
    userId: payload.userId,
    subject: payload.subject,
    message: payload.message,
    status: 'open',
    createdAt: new Date().toISOString(),
  }

  saveSupportTickets([next, ...tickets])
  return next
}
