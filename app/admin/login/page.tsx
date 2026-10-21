'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { loginUser } from '@/lib/store'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@nectara-jewels.com')
  const [password, setPassword] = useState('Nectara@2026')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = loginUser(email, password)

      if (user.role !== 'admin') {
        setError('This account is not authorized for the administrator dashboard.')
        setLoading(false)
        return
      }

      router.push('/admin/dashboard')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Administrator access</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Secure admin login</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#3d2817]">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#3d2817]">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="w-full rounded-full bg-[#3d2817] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20160f] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#7a5f3d]">
          <Link href="/login" className="font-semibold text-[#a0824d] hover:text-[#3d2817]">Customer login</Link>
        </div>
      </div>
    </main>
  )
}
