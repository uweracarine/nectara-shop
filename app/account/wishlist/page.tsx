'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSessionUser, getWishlist, toggleWishlist, type StoredUser, type WishlistItem } from '@/lib/store'

export default function WishlistPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const currentUser = getSessionUser()
    if (!currentUser) return

    setUser(currentUser)
    setItems(getWishlist(currentUser.id))
  }, [])

  const removeItem = (productId: string) => {
    if (!user) return
    const next = getWishlist(user.id).filter((item) => item.productId !== productId)
    toggleWishlist({ userId: user.id, productId, slug: '', name: '', image: '', price: 0, category: '', stockStatus: 'Unavailable' })
    setItems(next)
  }

  return (
    <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Wishlist</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Saved favorites</h1>
        </div>
        <Link href="/shop" className="rounded-full bg-[#d4af8f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
          Shop more
        </Link>
      </div>

      {items.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] border border-[#efe3d4] bg-[#faf8f3] p-4">
              <div className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-[1rem] bg-white">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-[#7a5f3d]">{item.category}</p>
                  <p className="mt-2 text-lg font-semibold">{item.price.toLocaleString('en-US')} RWF</p>
                  <p className="mt-1 text-xs text-[#7a5f3d]">{item.stockStatus}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Link href={`/product/${item.slug}`} className="rounded-full border border-[#d4af8f] px-4 py-2 text-xs font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">View product</Link>
                <button type="button" onClick={() => removeItem(item.productId)} className="rounded-full bg-[#3d2817] px-4 py-2 text-xs font-semibold text-white hover:bg-[#20160f] transition">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-[#d4af8f] bg-[#faf8f3] p-8 text-center">
          <p className="text-lg font-semibold">Your wishlist is empty</p>
          <p className="mt-2 text-[#6a563f]">Save pieces you love and come back to them anytime.</p>
          <Link href="/shop" className="mt-5 inline-flex rounded-full bg-[#d4af8f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">Browse products</Link>
        </div>
      )}
    </div>
  )
}
