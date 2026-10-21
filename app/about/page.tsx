'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Search, ShieldCheck, ShoppingCart, Sparkles, Star, Truck, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CartCount from '@/components/CartCount'
import { getSessionUser, logoutUser, type StoredUser } from '@/lib/store'

export default function AboutPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sessionUser, setSessionUser] = useState<StoredUser | null>(getSessionUser())

  const handleLogout = () => {
    logoutUser()
    setSessionUser(null)
    router.push('/')
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalized = searchQuery.trim().toLowerCase()
    const categoryMap: Record<string, string> = {
      ring: 'rings',
      rings: 'rings',
      necklace: 'necklaces',
      necklaces: 'necklaces',
      earring: 'earrings',
      earrings: 'earrings',
      bracelet: 'bracelets',
      bracelets: 'bracelets',
      watch: 'watches',
      watches: 'watches',
      set: 'sets',
      sets: 'sets',
    }

    router.push(categoryMap[normalized] ? `/shop?category=${categoryMap[normalized]}` : '/shop')
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#2e211b]/90 text-white shadow-[0_8px_24px_rgba(20,12,9,0.12)] backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="shrink-0">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#f9e7c7] via-[#d6b56d] to-[#8f6d3a] shadow-sm">
                  <span className="text-lg font-bold text-[#2e211b]">✦</span>
                </div>
                <span className="hidden text-base font-semibold tracking-[0.18em] text-white sm:block">NECTARA</span>
              </Link>
            </div>

            <div className="hidden flex-1 max-w-lg px-8 md:flex">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search jewelry..."
                  className="w-full rounded-full border border-white/20 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-[#d6b56d] focus:ring-2 focus:ring-[#d6b56d]/30"
                />
                <button type="submit" aria-label="Search products" className="absolute right-3 top-2.5 text-white/80 transition hover:text-[#f9e7c7]">
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/shop" className="hidden text-sm font-medium text-white/80 transition hover:text-[#f9e7c7] md:inline-flex">Shop</Link>
              <Link href="/seller" aria-label="Seller dashboard" className="text-white/85 transition hover:text-[#f9e7c7]">
                <Heart className="h-5 w-5" />
              </Link>
              <Link href={sessionUser ? (sessionUser.role === 'admin' ? '/admin' : '/account') : '/login'} aria-label="Account dashboard" className="text-white/85 transition hover:text-[#f9e7c7]">
                <User className="h-5 w-5" />
              </Link>
              <Link href="/cart" aria-label="Shopping cart" className="relative rounded-full p-1.5 text-white/85 transition hover:bg-white/5 hover:text-[#f9e7c7]">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d6b56d] text-[9px] font-semibold text-[#2e211b]">
                  <CartCount />
                </span>
              </Link>

              {sessionUser ? (
                <button type="button" onClick={handleLogout} className="hidden items-center rounded-full border border-[#d6b56d]/80 px-4 py-2 text-sm font-medium text-[#f9e7c7] transition hover:bg-[#d6b56d] hover:text-[#2e211b] sm:inline-flex">
                  Logout
                </button>
              ) : (
                <div className="hidden items-center gap-2 sm:flex">
                  <Link href="/login" className="rounded-full border border-[#d6b56d]/80 px-4 py-2 text-sm font-medium text-[#f9e7c7] transition hover:bg-[#d6b56d] hover:text-[#2e211b]">Login</Link>
                  <Link href="/register" className="rounded-full bg-[#d6b56d] px-4 py-2 text-sm font-medium text-[#2e211b] transition hover:bg-[#e7c88b]">Register</Link>
                </div>
              )}

              <button type="button" className="rounded-full p-1.5 text-white/80 transition hover:bg-white/5 hover:text-[#f9e7c7] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-[#FAF7F0] text-[#2e211b]">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#a0824d]">About Nectara</p>
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-[#2e211b] sm:text-5xl">Jewelry for everyday elegance and meaningful moments.</h1>
              <p className="mt-6 text-lg leading-8 text-[#5f473d]">
                Nectara Shop is a curated jewelry destination focused on timeless silhouettes, refined detailing, and pieces that feel personal from the first wear.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#5f473d]">
                From engraved rings and luminous necklaces to elegant bracelets and statement drops, every piece is chosen to bring a sense of polish to daily routines and special occasions alike.
              </p>
              <Link href="/shop" className="mt-8 inline-flex items-center rounded-full bg-[#d6b56d] px-6 py-3 text-sm font-semibold text-[#2e211b] transition hover:bg-[#e7c88b]">
                Shop the collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#efe5d8] bg-white p-2 shadow-[0_20px_40px_rgba(46,33,27,0.07)]">
              <Image src="/images/jewery3.png" alt="Gold jewelry display" width={900} height={900} className="h-full w-full rounded-[1.5rem] object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-[#a0824d]">Nectara story</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#2e211b]">A refined direct-to-customer jewelry brand built for confidence, elegance, and everyday luxury.</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-7 shadow-[0_12px_28px_rgba(46,33,27,0.04)]">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#a0824d]">Brand identity</p>
                <p className="text-base leading-7 text-[#5f473d]">
                  Nectara brings together an elevated luxury palette, polished finishes, and a premium shopping experience tailored for jewelry lovers across Rwanda and beyond.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-7 shadow-[0_12px_28px_rgba(46,33,27,0.04)]">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#a0824d]">Business model</p>
                <p className="text-base leading-7 text-[#5f473d]">
                  The platform is built as a direct sales experience: Nectara owns the collection, manages inventory, and serves customers with clarity and care from browsing to checkout.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-7 shadow-[0_12px_28px_rgba(46,33,27,0.04)]">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#a0824d]">Customer promise</p>
                <p className="text-base leading-7 text-[#5f473d]">
                  Each piece is selected to feel personal and timeless, supporting everything from daily styling to memorable occasions with confidence and ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4EEE6] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-[#a0824d]">What we value</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#2e211b]">Thoughtful jewelry, refined presentation, and easy shopping.</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-7 text-center shadow-[0_12px_28px_rgba(46,33,27,0.04)]">
                <Star className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
                <h3 className="text-xl font-semibold text-[#2e211b]">Curated selection</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f473d]">A refined collection of rings, necklaces, earrings, bracelets, and statement pieces for every occasion.</p>
              </div>

              <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-7 text-center shadow-[0_12px_28px_rgba(46,33,27,0.04)]">
                <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
                <h3 className="text-xl font-semibold text-[#2e211b]">Trusted shopping</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f473d]">Secure checkout, clear policies, and support that keeps the experience simple and reassuring.</p>
              </div>

              <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-7 text-center shadow-[0_12px_28px_rgba(46,33,27,0.04)]">
                <Truck className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
                <h3 className="text-xl font-semibold text-[#2e211b]">Customer care</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f473d]">We make it easy to find your next favorite piece and to reach out when you need help.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#efe5d8] bg-white p-8 shadow-[0_18px_36px_rgba(46,33,27,0.04)]">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#a0824d]">Our promise</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#2e211b]">Elegant design that fits your life.</h2>
              <p className="mt-5 text-base leading-7 text-[#5f473d]">
                Whether you are styling a polished everyday look or preparing for a memorable celebration, Nectara offers jewelry with enough versatility to feel effortless and elevated.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#efe5d8] bg-[#faf7f0] p-8 shadow-[0_18px_36px_rgba(46,33,27,0.04)]">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#a0824d]">Support</p>
              <p className="text-base leading-7 text-[#5f473d]">
                Need help with a purchase, return, or shipping question? Visit our support channels or connect with the customer care team through the contact page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-[#2e211b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#46382d]">Contact us</Link>
                <Link href="/returns" className="rounded-full border border-[#d6b56d] px-5 py-2.5 text-sm font-medium text-[#2e211b] transition hover:bg-[#f3ebdf]">Return policy</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1b120e] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#d6b56d]">About Nectara</h3>
              <p className="text-sm leading-6 text-white/70">Luxury jewelry curated for everyday moments and unforgettable occasions.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#d6b56d]">Shop</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/shop" className="transition hover:text-[#f9e7c7]">All products</Link></li>
                <li><Link href="/shop?category=necklaces" className="transition hover:text-[#f9e7c7]">Necklaces</Link></li>
                <li><Link href="/shop?category=earrings" className="transition hover:text-[#f9e7c7]">Earrings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#d6b56d]">Support</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/contact" className="transition hover:text-[#f9e7c7]">Contact us</Link></li>
                <li><Link href="/shipping" className="transition hover:text-[#f9e7c7]">Shipping info</Link></li>
                <li><Link href="/returns" className="transition hover:text-[#f9e7c7]">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#d6b56d]">Legal</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/privacy-policy" className="transition hover:text-[#f9e7c7]">Privacy policy</Link></li>
                <li><Link href="/terms" className="transition hover:text-[#f9e7c7]">Terms</Link></li>
                <li><Link href="/about" className="transition hover:text-[#f9e7c7]">About</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60">
            &copy; 2026 Nectara Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
