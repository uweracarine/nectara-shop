'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('If this email is registered, a secure recovery link has been sent.')
    setEmail('')
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Password recovery</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Forgot your password?</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#3d2817]">Email address</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          </div>

          {message && <p className="text-sm font-medium text-[#3d2817]">{message}</p>}

          <button type="submit" className="w-full rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
            Send recovery link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#7a5f3d]">
          <Link href="/login" className="font-semibold text-[#a0824d] hover:text-[#3d2817]">Back to login</Link>
        </div>
      </div>
    </main>
  )
}
