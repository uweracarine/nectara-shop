'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSellerProfile, getSessionUser, upsertSellerProfile, type SellerProfile, type StoredUser } from '@/lib/store'

const emptySellerProfile: Omit<SellerProfile, 'id' | 'updatedAt'> = {
  userId: 'nectara-seller',
  storeName: 'Nectara Jewels',
  storeSlug: 'nectara-jewels',
  description: 'Luxury handcrafted jewelry and bridal essentials from Rwanda.',
  logoUrl: '/images/jewery3.png',
  bannerUrl: '/images/jewery2.png',
  contactEmail: 'atelier@nectara-jewels.com',
  phoneNumber: '+250788123456',
  address: 'Kigali Heights',
  city: 'Kigali',
  country: 'Rwanda',
  postalCode: 'KGL 101',
  website: 'https://nectara-jewels.com',
  commissionRate: 0.12,
  status: 'approved',
}

export default function SellerPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [profile, setProfile] = useState(emptySellerProfile)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const session = getSessionUser()
    setUser(session)

    const sellerProfile = getSellerProfile(session?.id ?? 'nectara-seller')
    if (sellerProfile) {
      setProfile({
        userId: sellerProfile.userId,
        storeName: sellerProfile.storeName,
        storeSlug: sellerProfile.storeSlug,
        description: sellerProfile.description,
        logoUrl: sellerProfile.logoUrl,
        bannerUrl: sellerProfile.bannerUrl,
        contactEmail: sellerProfile.contactEmail,
        phoneNumber: sellerProfile.phoneNumber,
        address: sellerProfile.address,
        city: sellerProfile.city,
        country: sellerProfile.country,
        postalCode: sellerProfile.postalCode,
        website: sellerProfile.website,
        commissionRate: sellerProfile.commissionRate,
        status: sellerProfile.status,
      })
    }
  }, [])

  const handleSave = () => {
    upsertSellerProfile({
      ...profile,
      userId: user?.id ?? 'nectara-seller',
      id: getSellerProfile(user?.id ?? 'nectara-seller')?.id,
    })
    setStatus('Seller profile saved.')
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Seller profile</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] md:text-4xl">{profile.storeName}</h1>
          <p className="mt-5 text-[#7a5f3d] leading-relaxed">{profile.description}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
              Shop now
            </Link>
            <a
              href="https://wa.me/250788123456?text=Hello%20Nectara%2C%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af8f] px-6 py-3 text-sm font-semibold text-[#a0824d] hover:bg-[#d4af8f] hover:text-white transition"
            >
              Message seller
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Seller administration</h2>
            <span className="rounded-full bg-[#faf8f3] px-3 py-1 text-sm font-medium text-[#7a5f3d]">{profile.status}</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Store name</span>
              <input value={profile.storeName} onChange={(event) => setProfile((current) => ({ ...current, storeName: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Store URL slug</span>
              <input value={profile.storeSlug} onChange={(event) => setProfile((current) => ({ ...current, storeSlug: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="md:col-span-2 text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Description</span>
              <textarea value={profile.description} rows={5} onChange={(event) => setProfile((current) => ({ ...current, description: event.target.value }))} className="w-full rounded-[1.25rem] border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Contact email</span>
              <input value={profile.contactEmail} onChange={(event) => setProfile((current) => ({ ...current, contactEmail: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Phone number</span>
              <input value={profile.phoneNumber} onChange={(event) => setProfile((current) => ({ ...current, phoneNumber: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Address</span>
              <input value={profile.address} onChange={(event) => setProfile((current) => ({ ...current, address: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">City</span>
              <input value={profile.city} onChange={(event) => setProfile((current) => ({ ...current, city: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Country</span>
              <input value={profile.country} onChange={(event) => setProfile((current) => ({ ...current, country: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Postal code</span>
              <input value={profile.postalCode} onChange={(event) => setProfile((current) => ({ ...current, postalCode: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Website</span>
              <input value={profile.website} onChange={(event) => setProfile((current) => ({ ...current, website: event.target.value }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
            <label className="text-sm font-medium text-[#3d2817]">
              <span className="mb-2 block">Commission rate</span>
              <input type="number" step="0.01" value={profile.commissionRate} onChange={(event) => setProfile((current) => ({ ...current, commissionRate: Number(event.target.value) }))} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#7a5f3d]">{status || 'Profile updates sync to your local persistence layer and Supabase-ready storage when configured.'}</p>
            <button type="button" onClick={handleSave} className="rounded-full bg-[#3d2817] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20160f] transition">
              Save profile
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
