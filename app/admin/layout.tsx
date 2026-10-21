'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { getSessionUser } from '@/lib/store'

const navItems = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/customers', label: 'Customers' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const user = getSessionUser()

    if (!user || user.role !== 'admin') {
      router.replace('/login')
      return
    }

    setAuthorized(true)
  }, [router])

  if (!authorized) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Nectara admin</p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Business dashboard</h1>
            </div>
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[#d4af8f] px-5 py-2.5 text-sm font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">
              View storefront
            </Link>
          </div>

          <nav className="mt-6 flex flex-wrap gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[#efe3d4] bg-[#faf8f3] px-4 py-2 text-sm font-medium text-[#3d2817] transition hover:border-[#d4af8f]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {children}
      </div>
    </main>
  )
}
