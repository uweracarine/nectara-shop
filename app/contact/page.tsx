import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <section className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d] mb-3">Contact</p>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">We’re here to help</h1>
          <p className="mt-4 text-[#7a5f3d]">
            Reach out for order support, gifting questions, custom design requests, or artisan collaborations.
          </p>

          <div className="mt-8 space-y-3 text-[#3d2817]">
            <p><strong>Email:</strong> hello@nectarajewels.rw</p>
            <p><strong>Phone:</strong> +250 788 123 456</p>
            <p><strong>Hours:</strong> Monday to Saturday, 9:00 AM – 6:00 PM</p>
          </div>

          <div className="mt-8">
            <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
              Back to shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
