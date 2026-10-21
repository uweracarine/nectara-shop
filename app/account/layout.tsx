'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSessionUser, logoutUser, type StoredUser } from '@/lib/store'

const navItems = [
  { href: '/account', label: 'Overview' },
  { href: '/account/orders', label: 'My Orders' },
  { href: '/account/wishlist', label: 'Wishlist' },
  { href: '/account/profile', label: 'Profile' },
  { href: '/account/addresses', label: 'Addresses' },
  { href: '/account/security', label: 'Security' },
  { href: '/account/notifications', label: 'Notifications' },
  { href: '/account/returns', label: 'Returns' },
  { href: '/account/support', label: 'Support' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<StoredUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const sessionUser = getSessionUser()

    if (!sessionUser) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    setUser(sessionUser)
    setReady(true)
  }, [pathname, router])

  const handleLogout = () => {
    logoutUser()
    router.push('/')
  }

  if (!ready || !user) {
    return <div className="min-h-screen bg-[#faf8f3] px-4 py-20 text-center text-[#6a563f]">Loading account…</div>
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            <div className="flex items-center gap-4 border-b border-[#f0e7db] pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3d2817] text-sm font-bold text-white">
                {user.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-[#7a5f3d]">{user.email}</p>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map((item) => {
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-full px-4 py-2.5 text-sm font-medium transition ${active ? 'bg-[#3d2817] text-white' : 'bg-[#faf8f3] text-[#3d2817] hover:bg-[#f5eee5]'}`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 w-full rounded-full border border-[#d4af8f] px-4 py-2.5 text-sm font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition"
            >
              Logout
            </button>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </main>
  )
}
