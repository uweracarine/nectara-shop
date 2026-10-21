'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Heart, Search, User, Menu, X, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CATALOG_PRODUCTS } from '@/lib/catalog-data'
import CartCount from '@/components/CartCount'
import { getSessionUser, logoutUser, type StoredUser } from '@/lib/store'

const categories = [
  { name: 'Necklaces', href: '/shop?category=necklaces', image: '/images/jewery1.png' },
  { name: 'Earrings', href: '/shop?category=earrings', image: '/images/jewery2.png' },
  { name: 'Rings', href: '/shop?category=rings', image: '/images/ring1.png' },
  { name: 'Bracelets', href: '/shop?category=bracelets', image: '/images/bracelet1.png' },
  { name: 'Watches', href: '/shop?category=watches', image: '/images/jewery3.png' },
  { name: 'Sets', href: '/shop?category=sets', image: '/images/jewery4.png' },
]

const featuredProducts = [
  { name: 'Eden Gold Necklace', price: '245,000 RWF', image: '/images/jewery1.png', tag: 'Bestseller' },
  { name: 'Aurora Ring Set', price: '180,000 RWF', image: '/images/ring2.png', tag: 'New' },
  { name: 'Celeste Bracelet', price: '160,000 RWF', image: '/images/bracelet2.png', tag: 'Limited' },
  { name: 'Luna Statement Earrings', price: '210,000 RWF', image: '/images/jewery4.png', tag: 'Featured' },
]

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

  return (
    <>
      <nav className="bg-white/95 shadow-refined backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#d4af8f] to-[#a0824d] rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">✦</span>
                </div>
                <span className="font-semibold text-lg text-[#3d2817] hidden sm:block">Nectara Jewels</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search jewelry..."
                  className="w-full px-4 py-2.5 border border-[#e8dccb] rounded-full bg-[#faf7f2] focus:outline-none focus:border-[#d4af8f] focus:ring-2 focus:ring-[#d4af8f]/20"
                />
                <button type="submit" aria-label="Search jewelry" className="absolute right-3 top-3 text-[#a0824d] hover:text-[#3d2817] transition">
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/seller" className="text-[#3d2817] hover:text-[#d4af8f] transition" aria-label="Seller dashboard">
                <Heart className="h-5 w-5" />
              </Link>
              <Link href={sessionUser ? (sessionUser.role === 'admin' ? '/admin' : '/account') : '/login'} className="text-[#3d2817] hover:text-[#d4af8f] transition" aria-label="Account dashboard">
                <User className="h-5 w-5" />
              </Link>
              <Link href="/cart" className="relative p-1.5 rounded-full hover:bg-[#f5f1eb] transition" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5 text-[#3d2817] hover:text-[#d4af8f]" />
                <span className="absolute -top-1 -right-1 bg-[#a0824d] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  <CartCount />
                </span>
              </Link>

              {sessionUser ? (
                <button type="button" onClick={handleLogout} className="hidden sm:inline-flex items-center rounded-full border border-[#d4af8f] px-4 py-2 text-sm font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">
                  Logout
                </button>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login" className="inline-flex items-center rounded-full border border-[#d4af8f] px-4 py-2 text-sm font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">
                    Login
                  </Link>
                  <Link href="/register" className="inline-flex items-center rounded-full bg-[#d4af8f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
                    Create account
                  </Link>
                </div>
              )}

              <button type="button" className="md:hidden p-1.5 rounded-full hover:bg-[#f5f1eb]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search jewelry..."
                className="w-full px-4 py-2.5 border border-[#e8dccb] rounded-full bg-[#faf7f2] focus:outline-none focus:border-[#d4af8f]"
              />
              <button type="submit" aria-label="Search jewelry" className="absolute right-3 top-3 text-[#a0824d] hover:text-[#3d2817] transition">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-[#e0d5c8] bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link href="/shop" className="block text-[#3d2817] hover:text-[#d4af8f]">Shop All</Link>
              <Link href="/shop?category=necklaces" className="block text-[#3d2817] hover:text-[#d4af8f]">Necklaces</Link>
              <Link href="/shop?category=earrings" className="block text-[#3d2817] hover:text-[#d4af8f]">Earrings</Link>
              <Link href="/shop?category=rings" className="block text-[#3d2817] hover:text-[#d4af8f]">Rings</Link>
              {!sessionUser && (
                <>
                  <Link href="/login" className="block text-[#3d2817] hover:text-[#d4af8f]">Login</Link>
                  <Link href="/register" className="block text-[#3d2817] hover:text-[#d4af8f]">Create account</Link>
                </>
              )}
              {sessionUser && (
                <>
                  <Link href={sessionUser.role === 'admin' ? '/admin' : '/account'} className="block text-[#3d2817] hover:text-[#d4af8f]">My dashboard</Link>
                  <Link href="/seller" className="block text-[#3d2817] hover:text-[#d4af8f]">Seller dashboard</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="bg-[#d4af8f] text-white text-center py-2 text-sm font-medium">
        Nectara is the seller. Shop directly, message us, and order with confidence.
      </div>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#fffdf9,_#f7f2ea_45%,_#f0e6da)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-[#e6d6bd] bg-white/70 px-3 py-1 text-sm font-medium text-[#7a5f3d] mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Handcrafted in Rwanda
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-[#3d2817] leading-[1.02] mb-6">
                  Your Style. Your Sparkle. Your Nectara.
                </h1>
                <p className="max-w-xl text-lg text-[#7a5f3d] mb-8 leading-relaxed">
                  Nectara is a luxury jewelry business selling directly to customers online. Browse our collection, order anytime, and chat with the seller for custom recommendations and support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center bg-[#d4af8f] hover:bg-[#a0824d] text-white font-semibold py-3.5 px-7 rounded-full shadow-[0_12px_28px_rgba(164,124,84,0.35)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center border border-[#d4af8f] text-[#a0824d] hover:bg-[#d4af8f] hover:text-white font-semibold py-3.5 px-7 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Create account
                  </Link>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-[#efe3d4] bg-white/80 p-4 text-sm text-[#6a563f] shadow-[0_12px_24px_rgba(61,40,23,0.06)]">
                  <p className="font-semibold text-[#3d2817]">Quick access</p>
                  <p className="mt-2">Buyer: sign in to view orders and account details • Seller: update your profile • Admin: use admin@nectara-jewels.com / Nectara@2026</p>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-[#5c4635]">
                  <div>
                    <div className="font-bold text-2xl text-[#3d2817]">800+</div>
                    <div>premium pieces</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-[#3d2817]">4.9/5</div>
                    <div>customer rating</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-[#3d2817]">48h</div>
                    <div>dispatch time</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(61,40,23,0.12)] border border-white/60 h-[320px] relative">
                  <Image src="/images/jewery1.png" alt="Gold necklace" fill className="object-cover" priority />
                </div>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(61,40,23,0.12)] border border-white/60 h-[150px] relative">
                    <Image src="/images/bracelet1.png" alt="Bracelet" fill className="object-cover" />
                  </div>
                  <div className="bg-[#3d2817] text-white rounded-[2rem] p-5 h-[150px] flex flex-col justify-center shadow-[0_20px_40px_rgba(61,40,23,0.18)]">
                    <div className="text-2xl mb-2">✦</div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#e6d6bd] mb-1">Featured</p>
                    <p className="text-lg font-semibold">Modern heirlooms for everyday glamour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-18 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#a0824d] mb-2">Curated collection</p>
                <h2 className="text-3xl font-bold text-[#3d2817]">Shop by Category</h2>
              </div>
              <Link href="/shop" className="hidden sm:inline-flex items-center text-[#a0824d] font-medium hover:text-[#3d2817]">
                View all products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="group relative overflow-hidden rounded-[1.5rem] min-h-[240px] shadow-[0_12px_28px_rgba(61,40,23,0.10)] border border-[#f2e9df]">
                  <Image src={category.image} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f160f]/80 via-[#1f160f]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-white text-lg font-semibold">{category.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 bg-[#faf8f3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#a0824d] mb-2">Most loved</p>
                <h2 className="text-3xl font-bold text-[#3d2817]">Featured Products</h2>
              </div>
              <Link href="/shop" className="hidden sm:inline-flex items-center text-[#a0824d] font-medium hover:text-[#3d2817]">
                Explore collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => {
                const productDetails = CATALOG_PRODUCTS.find((item) => item.name === product.name)

                return (
                  <article key={product.name} className="group bg-white rounded-[1.75rem] border border-[#efe5d8] overflow-hidden shadow-[0_16px_30px_rgba(61,40,23,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_40px_rgba(61,40,23,0.12)]">
                    <div className="relative h-72 overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 bg-white/90 text-[#3d2817] text-xs font-semibold uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-full">
                        {product.tag}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#3d2817] mb-2">{product.name}</h3>
                      <p className="text-[#a0824d] text-lg font-medium mb-4">{product.price}</p>
                      <Link
                        href={productDetails ? `/product/${productDetails.slug}` : '/shop'}
                        className="inline-flex w-full items-center justify-center bg-[#f5f1eb] hover:bg-[#d4af8f] text-[#3d2817] hover:text-white font-medium py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                      >
                        View Details
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-18 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-[#faf8f3] rounded-[1.75rem] p-8 border border-[#efe5d8]">
                <ShieldCheck className="h-10 w-10 text-[#d4af8f] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#3d2817] mb-2">Secure Shopping</h3>
                <p className="text-[#7a5f3d]">Protected transactions and trusted checkout experiences for every order.</p>
              </div>
              <div className="bg-[#faf8f3] rounded-[1.75rem] p-8 border border-[#efe5d8]">
                <Sparkles className="h-10 w-10 text-[#d4af8f] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#3d2817] mb-2">Authentic Jewelry</h3>
                <p className="text-[#7a5f3d]">Handcrafted pieces made with premium materials and attention to detail.</p>
              </div>
              <div className="bg-[#faf8f3] rounded-[1.75rem] p-8 border border-[#efe5d8]">
                <Truck className="h-10 w-10 text-[#d4af8f] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#3d2817] mb-2">Fast Delivery</h3>
                <p className="text-[#7a5f3d]">Reliable shipping and fulfillment across Rwanda with elegant packaging.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-18 bg-[#f5f1eb]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-[#a0824d] mb-3">subscribe</p>
            <h2 className="text-3xl font-bold text-[#3d2817] mb-4">Stay updated on new arrivals</h2>
            <p className="text-[#7a5f3d] mb-8">Receive exclusive offers, new arrivals, and special promotions directly to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3.5 border border-[#d4af8f] rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af8f]/25 bg-white"
              />
              <button type="submit" className="bg-[#d4af8f] hover:bg-[#a0824d] text-white font-semibold py-3.5 px-8 rounded-full transition">
                Subscribe
              </button>
            </form>
            {subscriptionMessage && (
              <p className="mt-4 text-sm text-[#3d2817] font-medium">{subscriptionMessage}</p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#3d2817] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#d4af8f]">About Nectara</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Nectara Jewels brings you premium handcrafted jewelry with authentic beauty and timeless elegance.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#d4af8f]">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/shop" className="hover:text-[#d4af8f]">All Products</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#d4af8f]">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/contact" className="hover:text-[#d4af8f]">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-[#d4af8f]">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-[#d4af8f]">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#d4af8f]">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/privacy-policy" className="hover:text-[#d4af8f]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#d4af8f]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 Nectara Jewels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
