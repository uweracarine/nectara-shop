import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATALOG_PRODUCTS } from '@/lib/catalog-data'
import AddToCartButton from '@/components/AddToCartButton'

export function generateStaticParams() {
  return CATALOG_PRODUCTS.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = CATALOG_PRODUCTS.find((item) => item.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center text-sm font-medium text-[#a0824d] hover:text-[#3d2817]">
            ← Back to shop
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative h-[480px] overflow-hidden rounded-[2rem] border border-[#efe3d4] bg-white shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((image) => (
                <div key={image} className="relative h-28 overflow-hidden rounded-[1.25rem] border border-[#efe3d4] bg-white">
                  <Image src={image} alt={`${product.name} detail`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-8 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[#a0824d]">{product.categoryLabel}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">{product.name}</h1>

            <div className="mt-5 flex items-center gap-4">
              <span className="text-3xl font-bold text-[#3d2817]">{product.price.toLocaleString('en-US')} RWF</span>
              {product.comparisonPrice && (
                <span className="text-lg text-[#9d907d] line-through">{product.comparisonPrice.toLocaleString('en-US')} RWF</span>
              )}
            </div>

            <p className="mt-5 text-[#7a5f3d] leading-relaxed">{product.description}</p>

            <div className="mt-8 grid gap-3 text-sm text-[#3d2817]">
              <p><strong>Material:</strong> {product.material}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Size:</strong> {product.size}</p>
              <p><strong>Weight:</strong> {product.weight}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                product={{
                  id: product.slug,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                }}
              />
              <a
                href="https://wa.me/250788123456?text=Hello%20Nectara%2C%20I%20want%20to%20order%20the%20product%20${encodeURIComponent(product.name)}."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#d4af8f] px-6 py-3 text-sm font-semibold text-[#a0824d] hover:bg-[#d4af8f] hover:text-white transition"
              >
                Chat to order
              </a>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[#faf8f3] p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-[#a0824d]">Seller</p>
              <p className="mt-2 text-xl font-semibold">{product.sellerName}</p>
              <p className="mt-2 text-[#7a5f3d]">Fast support, trusted delivery, and direct communication with the brand.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
