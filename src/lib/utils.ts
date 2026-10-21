import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CURRENCY, CURRENCY_SYMBOL, ORDER_NUMBER_PREFIX } from './constants'

// Tailwind CSS utility merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting
export function formatCurrency(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-US')}`
}

export function formatCurrencyWithCode(amount: number): string {
  return `${amount.toLocaleString('en-US')} ${CURRENCY}`
}

// Slug generation
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Order number generation
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${ORDER_NUMBER_PREFIX}${timestamp}${random}`
}

// UUID generation
export function generateId(): string {
  return crypto.randomUUID()
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format date with time
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format relative time
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`
  return `${Math.floor(seconds / 31536000)}y ago`
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation (international format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ''))
}

// Convert cents to main currency unit
export function centsToMajor(cents: number): number {
  return cents / 100
}

// Convert major currency unit to cents
export function majorToCents(major: number): number {
  return Math.round(major * 100)
}

// Calculate order total
export function calculateOrderTotal(
  subtotal: number,
  deliveryFee: number,
  discount: number = 0
): number {
  return Math.max(0, subtotal + deliveryFee - discount)
}

// Calculate seller payout
export function calculateSellerPayout(
  grossSales: number,
  refunds: number,
  commissionRate: number
): number {
  const netSales = grossSales - refunds
  const commission = Math.round((netSales * commissionRate) / 100)
  return Math.max(0, netSales - commission)
}

// Parse query string
export function parseQueryString(query: string): Record<string, string> {
  const params = new URLSearchParams(query)
  const result: Record<string, string> = {}
  params.forEach((value, key) => {
    result[key] = value
  })
  return result
}

// Build query string
export function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, String(value))
    }
  })
  return query.toString()
}

// Deduplicate array
export function deduplicateArray<T>(
  array: T[],
  key?: (item: T) => any
): T[] {
  if (!key) {
    return Array.from(new Set(array))
  }
  const seen = new Set()
  return array.filter((item) => {
    const keyValue = key(item)
    if (seen.has(keyValue)) {
      return false
    }
    seen.add(keyValue)
    return true
  })
}

// Group array by key
export function groupBy<T>(
  array: T[],
  key: (item: T) => string | number
): Record<string | number, T[]> {
  return array.reduce(
    (result, item) => {
      const k = key(item)
      if (!result[k]) {
        result[k] = []
      }
      result[k].push(item)
      return result
    },
    {} as Record<string | number, T[]>
  )
}

// Chunk array
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Sleep/delay
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Retry function
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number
    delayMs?: number
    backoff?: boolean
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 1000, backoff = true } = options

  let lastError: Error | undefined

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxAttempts) {
        const wait = backoff ? delayMs * attempt : delayMs
        await delay(wait)
      }
    }
  }

  throw lastError
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Safe JSON parse
export function safeJsonParse<T = any>(
  json: string,
  fallback: T | null = null
): T | null {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

// Safe JSON stringify
export function safeJsonStringify(obj: any, fallback: string = ''): string {
  try {
    return JSON.stringify(obj)
  } catch {
    return fallback
  }
}

// Check if value is empty
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// Get error message
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  if (error?.message) return error.message
  return 'An unknown error occurred'
}

// Environment check
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isServer(): boolean {
  return typeof window === 'undefined'
}

export function isClient(): boolean {
  return typeof window !== 'undefined'
}
