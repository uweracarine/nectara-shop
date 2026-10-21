'use client'

import { useState } from 'react'
import { updateUserPassword } from '@/lib/store'

export default function SecurityPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (newPassword.length < 8 || newPassword !== confirmPassword) {
      setMessage('Password must be at least 8 characters and match the confirmation.')
      return
    }

    const currentUser = JSON.parse(localStorage.getItem('nectara_session') || 'null')
    if (!currentUser) {
      setMessage('Please sign in again to update your password.')
      return
    }

    updateUserPassword(currentUser.email, newPassword)
    setMessage('Password updated successfully.')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
      <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Account security</p>
      <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Security settings</h1>

      <div className="mt-6 max-w-xl space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#3d2817]">New password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#3d2817]">Confirm password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
        </div>

        <button type="button" onClick={handleSubmit} className="rounded-full bg-[#3d2817] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20160f] transition">Update password</button>
        {message && <p className="text-sm font-medium text-[#3d2817]">{message}</p>}
      </div>
    </div>
  )
}
