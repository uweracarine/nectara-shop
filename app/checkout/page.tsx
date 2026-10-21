'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { createOrder, getCart, getCartSubtotal, getSessionUser } from '@/lib/store'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState(getCart())
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Kigali')
  const [province, setProvince] = useState('Kigali City')
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const session = getSessionUser()
    const nextCart = getCart()

    setCart(nextCart)
    if (session) {
      setCustomerName(session.fullName)
      setEmail(session.email)
      setPhone(session.phone)
    }
  }, [])

  const subtotal = useMemo(() => getCartSubtotal(), [cart])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!cart.length) {
      setError('Your cart is empty.')
      return
    }

    try {
      createOrder({
        customerName,
        email,
        phone,
        address,
        city,
        province,
        total: subtotal,
        paymentMethod,
      })

      setError('')
      setSuccessMessage('Order placed successfully! We will contact you shortly.')
      setTimeout(() => {
        router.push('/account')
      }, 1200)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to place your order.')
    }
  }

  if (!cart.length) {
    return (
      <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#efe3d4] bg-white p-8 text-center shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Checkout</p>
          <h1 className="mt-3 text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-4 text-[#6a563f]">Choose a few pieces from the collection to complete your order.</p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-16 text-[#3d2817]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Checkout</p>
          <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em]">Complete your order</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Full name</label>
                <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} required className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} required className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Street address</label>
              <input value={address} onChange={(event) => setAddress(event.target.value)} required className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">City</label>
                <input value={city} onChange={(event) => setCity(event.target.value)} required className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Province</label>
                <input value={province} onChange={(event) => setProvince(event.target.value)} required className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Payment method</label>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]">
                <option>Cash on delivery</option>
                <option>Mobile Money</option>
                <option>Bank transfer</option>
              </select>
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            {successMessage && <p className="text-sm font-medium text-green-600">{successMessage}</p>}

            <button type="submit" className="w-full rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
              Place order
            </button>
          </form>

          <aside className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">Order summary</p>
            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div key={item.slug} className="flex items-center gap-4 border-b border-[#f2e9df] pb-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-[#efe3d4] bg-[#faf7f2]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-[#7a5f3d]">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{(item.price * item.quantity).toLocaleString('en-US')} RWF</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#f2e9df] pt-5 text-[#3d2817]">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>{subtotal.toLocaleString('en-US')} RWF</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
