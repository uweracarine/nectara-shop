'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { CATALOG_PRODUCTS } from '@/lib/catalog-data'
import { getOrders, getSessionUser, getStoredUsers, type StoredUser } from '@/lib/store'

export default function AdminDashboardPage() {
  const [user, setUser] = useState<StoredUser | null>(null)

  useEffect(() => {
    const session = getSessionUser()

    if (!session || session.role !== 'admin') {
      window.location.href = '/login'
      return
    }

    setUser(session)
  }, [])

  const stats = useMemo(() => {
    const orders = getOrders()
    const catalog = CATALOG_PRODUCTS.filter((product) => !product.deleted)
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const averageOrderValue = orders.length ? totalRevenue / orders.length : 0
    const buyers = getStoredUsers().filter((customer) => customer.role === 'buyer')
    const lowStock = catalog.filter((product) => product.availableQuantity <= 5).length
    const categorySummary = catalog.reduce<Record<string, number>>((summary, product) => {
      summary[product.categoryLabel] = (summary[product.categoryLabel] ?? 0) + 1
      return summary
    }, {})
    const bestCategory = Object.entries(categorySummary).sort((a, b) => b[1] - a[1])[0]
    const monthlyRevenue = Array.from({ length: 6 }, (_, index) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - index))
      const key = date.toLocaleString('en-US', { month: 'short' })
      const value = orders
        .filter((order) => new Date(order.createdAt).getMonth() === date.getMonth())
        .reduce((sum, order) => sum + order.total, 0)
      return { label: key, value }
    })
    const categoryRevenue = Object.entries(
      catalog.reduce<Record<string, number>>((summary, product) => {
        summary[product.categoryLabel] = (summary[product.categoryLabel] ?? 0) + product.price * 0.08
        return summary
      }, {})
    ).sort((a, b) => b[1] - a[1])

    return {
      revenue: totalRevenue,
      orders: orders.length,
      customers: buyers.length,
      lowStock,
      averageOrderValue,
      bestCategory: bestCategory ? `${bestCategory[0]} (${bestCategory[1]})` : 'N/A',
      monthlyRevenue,
      categoryRevenue,
    }
  }, [])

  const recentOrders = getOrders().slice(0, 5)

  if (!user) {
    return <div className="py-16 text-center text-[#6a563f]">Checking admin access…</div>
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-[1.5rem] border border-[#efe3d4] bg-white p-6 shadow-[0_12px_28px_rgba(61,40,23,0.06)]">
          <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Revenue</p>
          <p className="mt-4 text-3xl font-bold">{stats.revenue.toLocaleString('en-US')} RWF</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#efe3d4] bg-white p-6 shadow-[0_12px_28px_rgba(61,40,23,0.06)]">
          <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Orders</p>
          <p className="mt-4 text-3xl font-bold">{stats.orders}</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#efe3d4] bg-white p-6 shadow-[0_12px_28px_rgba(61,40,23,0.06)]">
          <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Customers</p>
          <p className="mt-4 text-3xl font-bold">{stats.customers}</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#efe3d4] bg-white p-6 shadow-[0_12px_28px_rgba(61,40,23,0.06)]">
          <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Avg. order</p>
          <p className="mt-4 text-3xl font-bold">{stats.averageOrderValue.toLocaleString('en-US')} RWF</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#efe3d4] bg-white p-6 shadow-[0_12px_28px_rgba(61,40,23,0.06)]">
          <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Best category</p>
          <p className="mt-4 text-xl font-bold">{stats.bestCategory}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-[#a0824d] hover:text-[#3d2817]">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.length ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col gap-2 rounded-[1.25rem] bg-[#faf8f3] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-[#7a5f3d]">{order.customerName} • {order.city}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold">{order.total.toLocaleString('en-US')} RWF</p>
                    <p className="text-sm text-[#7a5f3d]">{order.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-[1.25rem] bg-[#faf8f3] p-4 text-[#6a563f]">No orders yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <h2 className="text-2xl font-bold">Quick actions</h2>
          <div className="mt-5 space-y-3">
            <Link href="/admin/products" className="block rounded-[1.25rem] bg-[#faf8f3] p-4 text-[#3d2817] hover:bg-[#f3ece1] transition">
              Manage products
            </Link>
            <Link href="/admin/orders" className="block rounded-[1.25rem] bg-[#faf8f3] p-4 text-[#3d2817] hover:bg-[#f3ece1] transition">
              Review orders
            </Link>
            <Link href="/admin/customers" className="block rounded-[1.25rem] bg-[#faf8f3] p-4 text-[#3d2817] hover:bg-[#f3ece1] transition">
              View customers
            </Link>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-[#faf8f3] p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Low stock</p>
            <p className="mt-3 text-3xl font-bold">{stats.lowStock}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <h2 className="text-2xl font-bold">Monthly revenue</h2>
          <div className="mt-6 flex h-40 items-end gap-3">
            {stats.monthlyRevenue.map((month) => {
              const maxValue = Math.max(...stats.monthlyRevenue.map((item) => item.value), 1)
              const height = `${Math.max((month.value / maxValue) * 100, 12)}%`

              return (
                <div key={month.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end justify-center rounded-t-[1rem] bg-[#f4e9dd] p-1">
                    <div
                      className="w-full rounded-t-[0.8rem] bg-gradient-to-t from-[#a0824d] to-[#d4af8f]"
                      style={{ height }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#7a5f3d]">{month.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <h2 className="text-2xl font-bold">Category performance</h2>
          <div className="mt-6 space-y-4">
            {stats.categoryRevenue.length ? (
              stats.categoryRevenue.map(([label, value]) => {
                const maxValue = Math.max(...stats.categoryRevenue.map(([, itemValue]) => itemValue), 1)
                return (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-sm text-[#3d2817]">
                      <span>{label}</span>
                      <span>{value.toLocaleString('en-US')} RWF</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#f3ece1]">
                      <div
                        className="h-full rounded-full bg-[#d4af8f]"
                        style={{ width: `${(value / maxValue) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-[#6a563f]">No category data yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
