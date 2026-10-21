import Link from 'next/link'

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <section className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d] mb-3">Shipping</p>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Delivery details</h1>
          <ul className="mt-6 space-y-4 text-[#7a5f3d]">
            <li>• Orders are packed within 48 hours of confirmation.</li>
            <li>• Domestic delivery in Rwanda typically takes 2–5 business days.</li>
            <li>• Secure insured packaging is included with every order.</li>
            <li>• International shipping is available on selected collections.</li>
          </ul>

          <div className="mt-8">
            <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
