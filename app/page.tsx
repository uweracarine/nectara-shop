'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Heart, Search, User, Menu, X, ArrowRight, ShieldCheck, Truck, Sparkles, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddToCartButton from '@/components/AddToCartButton'
import CartCount from '@/components/CartCount'
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS } from '@/lib/catalog-data'
import { getSessionUser, logoutUser, toggleWishlist, type StoredUser } from '@/lib/store'

const featuredCategories = CATALOG_CATEGORIES.filter((category) =>
  ['necklaces', 'earrings', 'rings', 'bracelets'].includes(category.slug)
).slice(0, 4)

const bestsellers = CATALOG_PRODUCTS.filter(
  (product) =>
    product.featured ||
    product.badge?.toLowerCase().includes('bestseller') ||
    product.badge?.toLowerCase().includes('best seller')
).slice(0, 4)

const newArrivals = CATALOG_PRODUCTS.filter((product) =>
  product.badge?.toLowerCase().includes('new')
).slice(0, 4)

export default function Home() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [subscriptionMessage, setSubscriptionMessage] = useState('')
  const [sessionUser, setSessionUser] = useState<StoredUser | null>(null)

  useEffect(() => {
    setSessionUser(getSessionUser())
  }, [])

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

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setSubscriptionMessage('Please enter your email to subscribe.')
      return
    }

    setSubscriptionMessage(`Thanks! ${email} has been added to our newsletter.`)
    setEmail('')
  }

  const handleWishlistToggle = (product: (typeof CATALOG_PRODUCTS)[number]) => {
    if (!sessionUser) {
      router.push('/login')
      return
    }

    toggleWishlist({
      userId: sessionUser.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      stockStatus: product.availableQuantity > 0 ? 'In Stock' : 'Unavailable',
    })
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#2e211b]/80 text-white shadow-[0_8px_24px_rgba(20,12,9,0.12)] backdrop-blur-md">
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
              <Link href="/shop" className="hidden text-sm font-medium text-white/80 transition hover:text-[#f9e7c7] md:inline-flex">
                Shop
              </Link>
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
                  <Link href="/login" className="rounded-full border border-[#d6b56d]/80 px-4 py-2 text-sm font-medium text-[#f9e7c7] transition hover:bg-[#d6b56d] hover:text-[#2e211b]">
                    Login
                  </Link>
                  <Link href="/register" className="rounded-full bg-[#d6b56d] px-4 py-2 text-sm font-medium text-[#2e211b] transition hover:bg-[#e7c88b]">
                    Register
                  </Link>
                </div>
              )}

              <button type="button" className="rounded-full p-1.5 text-white/80 transition hover:bg-white/5 hover:text-[#f9e7c7] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="pb-4 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search jewelry..."
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 outline-none focus:border-[#d6b56d]"
              />
              <button type="submit" aria-label="Search products" className="absolute right-3 top-2.5 text-white/80 transition hover:text-[#f9e7c7]">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#2e211b]/95 md:hidden">
            <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
              <Link href="/shop" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Shop</Link>
              <Link href="/shop?category=necklaces" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Necklaces</Link>
              <Link href="/shop?category=earrings" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Earrings</Link>
              <Link href="/shop?category=rings" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Rings</Link>
              {!sessionUser && (
                <>
                  <Link href="/login" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Login</Link>
                  <Link href="/register" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Register</Link>
                </>
              )}
              {sessionUser && (
                <>
                  <Link href={sessionUser.role === 'admin' ? '/admin' : '/account'} className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">My account</Link>
                  <Link href="/seller" className="block text-sm text-white/80 transition hover:text-[#f9e7c7]">Seller dashboard</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="bg-[#d6b56d] px-4 py-2 text-center text-sm font-medium text-[#2e211b]">
        Nectara is the seller. Shop directly, message us, and order with confidence.
      </div>

      <main className="bg-[#FAF7F0] text-[#2e211b]">
        <section className="relative isolate overflow-hidden bg-[#2e211b]">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/jewery1.png"
          >
            <source src="/video/nectara-jewelry-hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,247,240,0.12),rgba(17,12,10,0.72)_55%,rgba(17,12,10,0.85))]" />

          <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#f9e7c7] backdrop-blur-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Jewelry for Every Moment
            </div>

            <h1 className="hero-fade-in luxury-heading mx-auto max-w-4xl text-4xl text-white sm:text-5xl lg:text-7xl">
              Your Style. Your Sparkle. Your Nectara.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
              Discover elegant jewelry for everyday moments and unforgettable occasions. Find your next favorite piece at Nectara Shop.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#d6b56d] px-7 py-3.5 text-sm font-semibold text-[#2e211b] transition hover:bg-[#e7c88b]">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a href="#bestsellers" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Bestsellers
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.18em] text-white/80">
              <span>Curated pieces</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56d]" />
              <span>Gift-ready</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56d]" />
              <span>Luxury finishes</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-[#a0824d]">Collections</p>
              <h2 className="luxury-heading text-3xl text-[#2e211b] sm:text-4xl">Explore Our Collections</h2>
            </div>
            <Link href="/shop" className="hidden items-center text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b] sm:inline-flex">
              Browse all categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCategories.map((category) => (
              <Link key={category.slug} href={`/shop?category=${category.slug}`} className="luxury-card group relative overflow-hidden rounded-[1.75rem] border border-[#efe4d5] bg-white shadow-[0_15px_30px_rgba(46,33,27,0.04)]">
                <div className="relative h-80 overflow-hidden">
                  <Image src={category.image} alt={category.name} fill className="luxury-card-image object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1d140f]/80 via-[#1d140f]/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-2 text-xs uppercase tracking-[0.18em] text-[#f9e7c7]">Collection</div>
                  <div className="text-2xl font-semibold text-white">{category.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="bestsellers" className="bg-[#F4EEE6] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-[#a0824d]">Most loved</p>
                <h2 className="luxury-heading text-3xl text-[#2e211b] sm:text-4xl">Bestsellers</h2>
              </div>
              <Link href="/shop" className="hidden items-center text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b] sm:inline-flex">
                View all pieces <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {bestsellers.map((product) => (
                <article key={product.id} className="luxury-card group overflow-hidden rounded-[1.75rem] border border-[#eee1d2] bg-white shadow-[0_16px_32px_rgba(46,33,27,0.05)]">
                  <div className="relative h-72 overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="luxury-card-image object-cover" />
                    {product.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2e211b]">
                        {product.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label={`Save ${product.name} to wishlist`}
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#2e211b] shadow-md transition hover:bg-[#f9e7c7]"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#a0824d]">{product.categoryLabel}</span>
                      <span className="flex items-center gap-1 text-xs font-medium text-[#6f5645]">
                        <Star className="h-3.5 w-3.5 fill-[#d6b56d] text-[#d6b56d]" />
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-[#2e211b]">{product.name}</h3>
                    <p className="mb-4 text-lg font-semibold text-[#a0824d]">{product.price.toLocaleString('en-US')} RWF</p>
                    <div className="flex gap-2">
                      <Link href={`/product/${product.slug}`} className="flex-1 rounded-full border border-[#e5d4b2] bg-[#faf7f0] px-4 py-2.5 text-center text-sm font-medium text-[#2e211b] transition hover:bg-[#f0e5d7]">
                        Details
                      </Link>
                      <AddToCartButton
                        product={{
                          id: product.id,
                          slug: product.slug,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        }}
                        className="flex-1 rounded-full bg-[#d6b56d] px-4 py-2.5 text-sm font-medium text-[#2e211b] transition hover:bg-[#cfa75a]"
                        label="Add"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-[#a0824d]">New arrivals</p>
              <h2 className="luxury-heading text-3xl text-[#2e211b] sm:text-4xl">Fresh Finds</h2>
            </div>
            <Link href="/shop" className="hidden items-center text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b] sm:inline-flex">
              See the collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((product) => (
              <article key={product.id} className="luxury-card group overflow-hidden rounded-[1.75rem] border border-[#efe5d8] bg-white shadow-[0_16px_30px_rgba(46,33,27,0.04)]">
                <div className="relative h-72 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="luxury-card-image object-cover" />
                  {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#2e211b] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#a0824d]">
                    <span>{product.categoryLabel}</span>
                    <span>{product.availableQuantity > 0 ? 'In stock' : 'Sold out'}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-[#2e211b]">{product.name}</h3>
                  <p className="mb-4 text-lg font-semibold text-[#a0824d]">{product.price.toLocaleString('en-US')} RWF</p>
                  <div className="flex gap-2">
                    <Link href={`/product/${product.slug}`} className="flex-1 rounded-full border border-[#e5d4b2] bg-[#faf7f0] px-4 py-2.5 text-center text-sm font-medium text-[#2e211b] transition hover:bg-[#f0e5d7]">
                      Details
                    </Link>
                    <AddToCartButton
                      product={{
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      }}
                      className="flex-1 rounded-full bg-[#2e211b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#46382d]"
                      label="Add"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#FAF7F0] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="rounded-4xl border border-[#efe4d5] bg-white p-8 shadow-[0_18px_36px_rgba(46,33,27,0.04)] sm:p-10">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#a0824d]">Our story</p>
              <h2 className="luxury-heading text-3xl text-[#2e211b] sm:text-4xl">Jewelry designed for real life and unforgettable moments.</h2>
              <p className="mt-5 text-base leading-7 text-[#5f473d]">
                Nectara Shop brings together elevated silhouettes, polished finishes, and thoughtfully curated pieces for everyday elegance and meaningful occasions.
              </p>
              <p className="mt-4 text-base leading-7 text-[#5f473d]">
                Explore a boutique collection of rings, necklaces, earrings, bracelets, and more, all brought together in one refined shopping experience.
              </p>
              <Link href="/about" className="mt-6 inline-flex items-center rounded-full bg-[#2e211b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#46382d]">
                Learn more about Nectara
              </Link>
            </div>

            <div className="grid gap-5">
              <div className="overflow-hidden rounded-4xl border border-[#efe4d5] bg-white shadow-[0_18px_36px_rgba(46,33,27,0.04)]">
                <Image src="/images/jewery2.png" alt="Luxury jewelry arrangement" width={900} height={700} className="h-64 w-full object-cover" />
              </div>
              <div className="rounded-4xl border border-[#efe4d5] bg-[#f4eee6] p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#a0824d]">Shop with confidence</p>
                <p className="text-lg text-[#2e211b]">Premium pieces, secure checkout, and straightforward support from our customer care team.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-6 text-center shadow-[0_15px_30px_rgba(46,33,27,0.04)]">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
              <h3 className="text-xl font-semibold text-[#2e211b]">Secure checkout</h3>
              <p className="mt-2 text-sm leading-6 text-[#675343]">Order with confidence through a protected and simple checkout experience.</p>
              <Link href="/checkout" className="mt-4 inline-flex text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b]">
                Go to checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-6 text-center shadow-[0_15px_30px_rgba(46,33,27,0.04)]">
              <Truck className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
              <h3 className="text-xl font-semibold text-[#2e211b]">Delivery details</h3>
              <p className="mt-2 text-sm leading-6 text-[#675343]">Learn about shipping, order preparation, and fulfillment information.</p>
              <Link href="/shipping" className="mt-4 inline-flex text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b]">
                Shipping info <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-6 text-center shadow-[0_15px_30px_rgba(46,33,27,0.04)]">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
              <h3 className="text-xl font-semibold text-[#2e211b]">Customer support</h3>
              <p className="mt-2 text-sm leading-6 text-[#675343]">Get help with orders, product questions, and account support through the contact channels.</p>
              <Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b]">
                Contact support <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-[#efe5d8] bg-white p-6 text-center shadow-[0_15px_30px_rgba(46,33,27,0.04)]">
              <Heart className="mx-auto mb-4 h-10 w-10 text-[#d6b56d]" />
              <h3 className="text-xl font-semibold text-[#2e211b]">Return policy</h3>
              <p className="mt-2 text-sm leading-6 text-[#675343]">Review our return and exchange guidance before placing your order.</p>
              <Link href="/returns" className="mt-4 inline-flex text-sm font-medium text-[#a0824d] transition hover:text-[#2e211b]">
                Read policy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#2e211b] py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#d6b56d]">Newsletter</p>
            <h2 className="luxury-heading text-3xl sm:text-4xl">Stay updated on new arrivals</h2>
            <p className="mt-3 text-base text-white/75">Receive thoughtful updates on new drops, styling inspiration, and curated jewelry highlights.</p>
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/60 outline-none focus:border-[#d6b56d]"
              />
              <button type="submit" className="rounded-full bg-[#d6b56d] px-7 py-3.5 text-sm font-semibold text-[#2e211b] transition hover:bg-[#e7c88b]">
                Subscribe
              </button>
            </form>
            {subscriptionMessage && <p className="mt-4 text-sm text-[#f9e7c7]">{subscriptionMessage}</p>}
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
