'use client'

import { useEffect, useState } from 'react'
import { getSessionUser, updateSessionUser, type StoredUser } from '@/lib/store'

export default function ProfilePage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const currentUser = getSessionUser()
    if (!currentUser) return

    setUser(currentUser)
    setFullName(currentUser.fullName)
    setPhone(currentUser.phone)
  }, [])

  const handleSave = () => {
    if (!user) return

    const nextUser = updateSessionUser({ fullName, phone })
    setUser(nextUser)
    setMessage('Profile updated successfully.')
  }

  return (
    <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Profile</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">My profile</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-[#3d2817]">
          <span className="mb-2 block">Full name</span>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
        </label>

        <label className="text-sm font-medium text-[#3d2817]">
          <span className="mb-2 block">Phone number</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
        </label>

        <label className="md:col-span-2 text-sm font-medium text-[#3d2817]">
          <span className="mb-2 block">Email</span>
          <input value={user?.email || ''} disabled className="w-full rounded-full border border-[#e8dccb] bg-[#f0efe9] px-4 py-3 text-[#6a563f]" />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-[#7a5f3d]">{message || 'Keep your account details up to date.'}</p>
        <button type="button" onClick={handleSave} className="rounded-full bg-[#3d2817] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20160f] transition">Save profile</button>
      </div>
    </div>
  )
}
