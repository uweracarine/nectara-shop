'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getCart, getCartSubtotal, removeFromCart, updateCartQuantity } from '@/lib/store'

export default function CartPage() {
  const [cart, setCart] = useState(getCart())

  useEffect(() => {
    const syncCart = () => setCart(getCart())
    syncCart()

    const handleStorage = () => syncCart()
    window.addEventListener('storage', handleStorage)
    window.addEventListener('nectara-cart-updated', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('nectara-cart-updated', handleStorage)
    }
  }, [])

  const subtotal = useMemo(() => getCartSubtotal(), [cart])

  const handleQuantityChange = (slug: string, delta: number) => {
    const item = cart.find((entry) => entry.slug === slug)
    if (!item) return

    const nextQuantity = Math.max(1, item.quantity + delta)
    setCart(updateCartQuantity(slug, nextQuantity))
    window.dispatchEvent(new Event('nectara-cart-updated'))
  }

  const handleRemove = (slug: string) => {
    setCart(removeFromCart(slug))
    window.dispatchEvent(new Event('nectara-cart-updated'))
  }

  if (!cart.length) {
    return (
      <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#a0824d]">Cart</p>
            <h1 className="text-3xl font-bold tracking-[-0.04em]">Your bag is empty</h1>
            <p className="mt-4 max-w-xl text-[#7a5f3d]">
              Start exploring our handcrafted collections and add a few pieces you’ll treasure forever.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
                Continue shopping
              </Link>
              <Link href="/sellers" className="inline-flex items-center justify-center rounded-full border border-[#d4af8f] px-6 py-3 text-sm font-semibold text-[#a0824d] hover:bg-[#d4af8f] hover:text-white transition">
                Meet the seller
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Cart</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Your bag</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            {cart.map((item) => (
              <div key={item.slug} className="flex flex-col gap-4 border-b border-[#f3ebdf] pb-4 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-[1.2rem] border border-[#efe3d4] bg-[#faf7f2]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-[#7a5f3d]">{item.category}</p>
                  <p className="mt-2 font-semibold text-[#3d2817]">{item.price.toLocaleString('en-US')} RWF</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-[#e8dccb] bg-[#faf7f2]">
                    <button type="button" onClick={() => handleQuantityChange(item.slug, -1)} className="px-3 py-2 text-lg text-[#3d2817]">−</button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
                    <button type="button" onClick={() => handleQuantityChange(item.slug, 1)} className="px-3 py-2 text-lg text-[#3d2817]">+</button>
                  </div>

                  <button type="button" onClick={() => handleRemove(item.slug)} className="text-sm font-medium text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Summary</p>
            <div className="mt-6 space-y-4 text-[#3d2817]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{subtotal.toLocaleString('en-US')} RWF</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#f2e9df] pt-4 text-lg font-bold">
                <span>Total</span>
                <span>{subtotal.toLocaleString('en-US')} RWF</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/checkout" className="inline-flex w-full items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
                Proceed to checkout
              </Link>
              <Link href="/shop" className="inline-flex w-full items-center justify-center rounded-full border border-[#d4af8f] px-6 py-3 text-sm font-semibold text-[#a0824d] hover:bg-[#d4af8f] hover:text-white transition">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
