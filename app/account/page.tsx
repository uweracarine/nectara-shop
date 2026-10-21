'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { getOrders, getPurchaseHistoryByCustomer, getSessionUser, logoutUser, type StoredUser } from '@/lib/store'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<StoredUser | null>(null)
  const [customerFilter, setCustomerFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    setUser(getSessionUser())
  }, [])

  const filteredOrders = useMemo(() => {
    const orders = getPurchaseHistoryByCustomer(
      customerFilter || user?.email,
      dateFrom,
      dateTo
    )

    return orders.filter((order) => !user || user.role === 'admin' || order.email.toLowerCase() === user.email.toLowerCase())
  }, [user, customerFilter, dateFrom, dateTo])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    router.push('/')
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-[#efe3d4] bg-white p-8 text-center shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Account access</p>
          <h1 className="mt-3 text-3xl font-bold">Please sign in</h1>
          <p className="mt-4 text-[#6a563f]">Access your profile, saved orders, and checkout history.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/login" className="rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
              Login
            </Link>
            <Link href="/register" className="rounded-full border border-[#d4af8f] px-6 py-3 text-sm font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">
              Register
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <div className="flex flex-col gap-4 border-b border-[#f0e7db] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">My account</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">{user.fullName}</h1>
          </div>
          <button onClick={handleLogout} className="rounded-full border border-[#d4af8f] px-5 py-2.5 text-sm font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">
            Log out
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-[#faf6f1] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#a0824d]">Email</p>
            <p className="mt-3 text-lg font-semibold">{user.email}</p>
          </div>
          <div className="rounded-[1.5rem] bg-[#faf6f1] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#a0824d]">Phone</p>
            <p className="mt-3 text-lg font-semibold">{user.phone}</p>
          </div>
          <div className="rounded-[1.5rem] bg-[#faf6f1] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#a0824d]">Role</p>
            <p className="mt-3 text-lg font-semibold capitalize">{user.role}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link href="/shop" className="rounded-[1.5rem] border border-[#efe3d4] bg-[#fdfaf5] p-6 hover:shadow-[0_12px_30px_rgba(61,40,23,0.04)] transition">
            <p className="text-xs uppercase tracking-[0.18em] text-[#a0824d]">Shop</p>
            <h2 className="mt-3 text-2xl font-bold">Continue shopping</h2>
          </Link>
          <Link href="/cart" className="rounded-[1.5rem] border border-[#efe3d4] bg-[#fdfaf5] p-6 hover:shadow-[0_12px_30px_rgba(61,40,23,0.04)] transition">
            <p className="text-xs uppercase tracking-[0.18em] text-[#a0824d]">Cart</p>
            <h2 className="mt-3 text-2xl font-bold">Review your bag</h2>
          </Link>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#efe3d4] bg-[#faf8f3] p-6">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Purchase history</p>
              <h2 className="mt-2 text-2xl font-bold">Order timeline</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <input
                value={customerFilter}
                onChange={(event) => setCustomerFilter(event.target.value)}
                placeholder="Customer name"
                className="rounded-full border border-[#e8dccb] bg-white px-4 py-2.5 outline-none focus:border-[#d4af8f]"
              />
              <input
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                className="rounded-full border border-[#e8dccb] bg-white px-4 py-2.5 outline-none focus:border-[#d4af8f]"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                className="rounded-full border border-[#e8dccb] bg-white px-4 py-2.5 outline-none focus:border-[#d4af8f]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="rounded-[1.5rem] border border-[#efe3d4] bg-white p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-[#7a5f3d]">{order.customerName} • {order.email}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold">{order.total.toLocaleString('en-US')} RWF</p>
                      <p className="text-sm text-[#7a5f3d]">{new Date(order.createdAt).toLocaleDateString()} • {order.status}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-[1.5rem] bg-white p-4 text-[#6a563f]">No purchases match the selected customer and date filters.</p>
            )}
          </div>
        </div>

        {user.role === 'admin' && (
          <div className="mt-8">
            <Link href="/admin" className="inline-flex items-center justify-center rounded-full bg-[#3d2817] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20160f] transition">
              Open admin dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
