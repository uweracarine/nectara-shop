'use client'

import { useEffect, useMemo, useState } from 'react'
import { getOrders, getSessionUser, updateOrderStatus, type StoredUser } from '@/lib/store'

const ORDER_STATUSES = ['Paid', 'Packed', 'Shipped', 'Delivered', 'Cancelled']

export default function AdminOrdersPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [orders, setOrders] = useState(() => getOrders())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [customerFilter, setCustomerFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    const session = getSessionUser()

    if (!session || session.role !== 'admin') {
      window.location.href = '/login'
      return
    }

    setUser(session)
  }, [])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      const matchesSearch =
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesCustomer = customerFilter === 'all' || order.customerName === customerFilter
      const matchesDateFrom = !dateFrom || orderDate >= new Date(`${dateFrom}T00:00:00`)
      const matchesDateTo = !dateTo || orderDate <= new Date(`${dateTo}T23:59:59`)
      return matchesSearch && matchesStatus && matchesCustomer && matchesDateFrom && matchesDateTo
    })
  }, [orders, search, statusFilter, customerFilter, dateFrom, dateTo])

  const handleStatusChange = (orderId: string, nextStatus: string) => {
    setOrders(updateOrderStatus(orderId, nextStatus))
  }

  const exportCsv = () => {
    const exportRows = filteredOrders.length ? filteredOrders : orders
    const headers = ['Order Number', 'Customer', 'Email', 'Phone', 'City', 'Total', 'Status', 'Payment Method', 'Date']
    const rows = exportRows.map((order) => [
      order.orderNumber,
      order.customerName,
      order.email,
      order.phone,
      order.city,
      String(order.total),
      order.status,
      order.paymentMethod,
      new Date(order.createdAt).toISOString().slice(0, 10),
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nectara-orders-${dateFrom || 'all'}-${dateTo || 'all'}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!user) {
    return <div className="py-16 text-center text-[#6a563f]">Checking admin access…</div>
  }

  return (
    <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders or customer"
            className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          >
            <option value="all">All statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button type="button" onClick={exportCsv} className="rounded-full bg-[#3d2817] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20160f] transition">
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <label className="text-sm font-medium text-[#3d2817]">
          <span className="mb-2 block">Customer</span>
          <select
            value={customerFilter}
            onChange={(event) => setCustomerFilter(event.target.value)}
            className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          >
            <option value="all">All customers</option>
            {[...new Set(orders.map((order) => order.customerName))].map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-[#3d2817]">
          <span className="mb-2 block">From date</span>
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          />
        </label>
        <label className="text-sm font-medium text-[#3d2817]">
          <span className="mb-2 block">To date</span>
          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          />
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setCustomerFilter('all')
              setDateFrom('')
              setDateTo('')
            }}
            className="w-full rounded-full border border-[#d4af8f] bg-[#fffaf3] px-4 py-2.5 text-sm font-semibold text-[#3d2817] hover:bg-[#f8f0e7] transition"
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] bg-[#faf8f3] p-4">
          <p className="text-sm uppercase tracking-[0.14em] text-[#a0824d]">Total revenue</p>
          <p className="mt-3 text-2xl font-bold">{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('en-US')} RWF</p>
        </div>
        <div className="rounded-[1.5rem] bg-[#faf8f3] p-4">
          <p className="text-sm uppercase tracking-[0.14em] text-[#a0824d]">Avg. order</p>
          <p className="mt-3 text-2xl font-bold">{(orders.length ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0).toLocaleString('en-US')} RWF</p>
        </div>
        <div className="rounded-[1.5rem] bg-[#faf8f3] p-4">
          <p className="text-sm uppercase tracking-[0.14em] text-[#a0824d]">Open orders</p>
          <p className="mt-3 text-2xl font-bold">{orders.filter((order) => order.status !== 'Delivered' && order.status !== 'Cancelled').length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="rounded-[1.5rem] border border-[#efe3d4] bg-[#faf8f3] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-bold">{order.orderNumber}</p>
                  <p className="text-sm text-[#7a5f3d]">{order.customerName} • {order.email}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-semibold">{order.total.toLocaleString('en-US')} RWF</p>
                  <p className="text-sm text-[#7a5f3d]">{order.status}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex flex-wrap gap-3 text-sm text-[#3d2817]">
                  <span>{order.paymentMethod}</span>
                  <span>{order.city}</span>
                  <span>{order.phone}</span>
                </div>

                <select
                  value={order.status}
                  onChange={(event) => handleStatusChange(order.id, event.target.value)}
                  className="rounded-full border border-[#e8dccb] bg-white px-4 py-2 text-sm outline-none focus:border-[#d4af8f]"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-[1.5rem] bg-[#faf8f3] p-4 text-[#6a563f]">No matching orders were found.</p>
        )}
      </div>
    </div>
  )
}
