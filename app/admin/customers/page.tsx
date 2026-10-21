'use client'

import { useEffect, useState } from 'react'
import { getSessionUser, getStoredUsers, type StoredUser } from '@/lib/store'

export default function AdminCustomersPage() {
  const [user, setUser] = useState<StoredUser | null>(null)

  useEffect(() => {
    const session = getSessionUser()

    if (!session || session.role !== 'admin') {
      window.location.href = '/login'
      return
    }

    setUser(session)
  }, [])

  const customers = getStoredUsers().filter((person) => person.role === 'buyer')

  if (!user) {
    return <div className="py-16 text-center text-[#6a563f]">Checking admin access…</div>
  }

  return (
    <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
        <span className="rounded-full bg-[#faf8f3] px-3 py-1 text-sm font-medium text-[#7a5f3d]">
          {customers.length} buyers
        </span>
      </div>

      <div className="space-y-4">
        {customers.length ? (
          customers.map((customer) => (
            <div key={customer.id} className="flex flex-col gap-2 rounded-[1.5rem] border border-[#efe3d4] bg-[#faf8f3] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{customer.fullName}</p>
                <p className="text-sm text-[#7a5f3d]">{customer.email}</p>
              </div>
              <div className="text-sm text-[#7a5f3d] sm:text-right">
                <p>{customer.phone}</p>
                <p>{new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-[1.5rem] bg-[#faf8f3] p-4 text-[#6a563f]">No customer accounts yet.</p>
        )}
      </div>
    </div>
  )
}
