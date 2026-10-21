'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getOrders, getSessionUser, type OrderRecord, type StoredUser } from '@/lib/store'

export default function CustomerOrdersPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [orders, setOrders] = useState<OrderRecord[]>([])

  useEffect(() => {
    const currentUser = getSessionUser()
    if (!currentUser) return

    const allOrders = getOrders().filter((order) => order.email.toLowerCase() === currentUser.email.toLowerCase())
    setUser(currentUser)
    setOrders(allOrders)
  }, [])

  return (
    <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">My orders</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Order history</h1>
        </div>
        <Link href="/shop" className="rounded-full bg-[#d4af8f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
          Continue shopping
        </Link>
      </div>

      {orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[1.5rem] border border-[#efe3d4] bg-[#faf8f3] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-bold">{order.orderNumber}</p>
                  <p className="text-sm text-[#7a5f3d]">{new Date(order.createdAt).toLocaleDateString()} • {order.city}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-semibold">{order.total.toLocaleString('en-US')} RWF</p>
                  <p className="text-sm text-[#7a5f3d]">{order.status}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#3d2817]">{order.paymentMethod}</span>
                <Link href={`/account/orders/${order.id}`} className="rounded-full border border-[#d4af8f] px-4 py-1.5 text-xs font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-[#d4af8f] bg-[#faf8f3] p-8 text-center">
          <p className="text-lg font-semibold">No orders yet</p>
          <p className="mt-2 text-[#6a563f]">Your order history will appear here once you place a purchase.</p>
          <Link href="/shop" className="mt-5 inline-flex rounded-full bg-[#d4af8f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
            Start shopping
          </Link>
        </div>
      )}
    </div>
  )
}
