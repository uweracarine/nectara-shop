'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { loginUser } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const user = loginUser(email, password)
      router.push(user.role === 'admin' ? '/admin' : '/account')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.')
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Customer login</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Welcome back</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#3d2817]">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none transition focus:border-[#d4af8f]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#3d2817]">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none transition focus:border-[#d4af8f]"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button type="submit" className="w-full rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#7a5f3d]">
          Don’t have an account?{' '}
          <Link href="/register" className="font-semibold text-[#a0824d] hover:text-[#3d2817]">
            Create one
          </Link>
        </div>

        <div className="mt-6 rounded-[1.25rem] bg-[#faf8f3] p-4 text-xs text-[#7a5f3d]">
          Demo admin login: admin@nectara-jewels.com / Nectara@2026
        </div>
      </div>
    </main>
  )
}
