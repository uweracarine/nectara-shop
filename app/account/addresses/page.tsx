'use client'

import { useEffect, useState } from 'react'
import { getAddresses, getSessionUser, setDefaultAddress, upsertAddress, deleteAddress, type AddressRecord, type StoredUser } from '@/lib/store'

export default function AddressesPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [addresses, setAddresses] = useState<AddressRecord[]>([])
  const [recipientName, setRecipientName] = useState('')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState('')
  const [sector, setSector] = useState('')
  const [cell, setCell] = useState('')
  const [village, setVillage] = useState('')
  const [additionalDirections, setAdditionalDirections] = useState('')

  useEffect(() => {
    const currentUser = getSessionUser()
    if (!currentUser) return

    setUser(currentUser)
    setAddresses(getAddresses(currentUser.id))
  }, [])

  const handleSave = () => {
    if (!user) return

    const created = upsertAddress({
      userId: user.id,
      recipientName,
      phone,
      district,
      sector,
      cell,
      village,
      additionalDirections,
      isDefault: addresses.length === 0,
    })

    const next = [created, ...addresses.filter((item) => item.id !== created.id)]
    setAddresses(next)
    setRecipientName('')
    setPhone('')
    setDistrict('')
    setSector('')
    setCell('')
    setVillage('')
    setAdditionalDirections('')
  }

  const handleDelete = (addressId: string) => {
    setAddresses(deleteAddress(addressId))
  }

  const handleDefault = (addressId: string) => {
    if (!user) return
    setAddresses(setDefaultAddress(addressId, user.id))
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Delivery addresses</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Manage addresses</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Recipient name" className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District" className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          <input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Sector" className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          <input value={cell} onChange={(e) => setCell(e.target.value)} placeholder="Cell" className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          <input value={village} onChange={(e) => setVillage(e.target.value)} placeholder="Village" className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
          <textarea value={additionalDirections} onChange={(e) => setAdditionalDirections(e.target.value)} placeholder="Additional directions" className="md:col-span-2 min-h-[120px] rounded-[1.25rem] border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
        </div>

        <div className="mt-6 flex justify-end">
          <button type="button" onClick={handleSave} className="rounded-full bg-[#3d2817] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20160f] transition">Add address</button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <h2 className="text-2xl font-bold">Saved addresses</h2>
        <div className="mt-5 space-y-4">
          {addresses.length ? addresses.map((address) => (
            <div key={address.id} className="rounded-[1.5rem] border border-[#efe3d4] bg-[#faf8f3] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{address.recipientName}</p>
                  <p className="text-sm text-[#7a5f3d]">{address.district}, {address.sector}, {address.cell}, {address.village}</p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button type="button" onClick={() => handleDefault(address.id)} className="rounded-full border border-[#d4af8f] px-3 py-1.5 text-xs font-semibold text-[#3d2817] hover:bg-[#faf6f1] transition">Set default</button>
                  )}
                  <button type="button" onClick={() => handleDelete(address.id)} className="rounded-full bg-[#3d2817] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#20160f] transition">Delete</button>
                </div>
              </div>
            </div>
          )) : <p className="text-[#6a563f]">You have no saved addresses yet.</p>}
        </div>
      </div>
    </div>
  )
}
