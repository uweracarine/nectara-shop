import Link from 'next/link'

export default function SellersPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)] md:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">The seller</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] md:text-5xl">Nectara is the seller.</h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#7a5f3d]">
            Nectara is a jewelry business selling directly to customers online. We design, curate, and deliver premium pieces for women who want elegance, confidence, and memorable gifting.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
              Shop the collection
            </Link>
            <a
              href="https://wa.me/250788123456?text=Hello%20Nectara%2C%20I%20want%20to%20order%20a%20jewelry%20piece."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af8f] px-6 py-3 text-sm font-semibold text-[#a0824d] hover:bg-[#d4af8f] hover:text-white transition"
            >
              Chat with seller
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#faf8f3] p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Origin</p>
              <p className="mt-3 text-[#3d2817] font-medium">Rwanda luxury jewelry</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#faf8f3] p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Support</p>
              <p className="mt-3 text-[#3d2817] font-medium">Orders, gifts, and custom advice</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#faf8f3] p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Contact</p>
              <p className="mt-3 text-[#3d2817] font-medium">hello@nectarajewels.rw</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
