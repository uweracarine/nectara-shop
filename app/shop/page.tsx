'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS } from '@/lib/catalog-data'

function ShopContent() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const filteredProducts =
    activeCategory === 'all'
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter(
          (product) =>
            product.category === activeCategory ||
            product.secondaryCategories?.includes(activeCategory)
        )

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#3d2817]">
      <section className="border-b border-[#f0e5d8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.22em] text-[#a0824d]">Shop</p>
              <h1 className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">Nectara jewelry collection</h1>
            </div>
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[#d4af8f] px-5 py-2.5 text-sm font-medium text-[#a0824d] transition hover:bg-[#d4af8f] hover:text-white">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/shop" className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === 'all' ? 'bg-[#3d2817] text-white' : 'border border-[#eadcc5] bg-white text-[#3d2817] hover:bg-[#f5f1eb]'}`}>
            All
          </Link>

          {CATALOG_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === category.slug ? 'bg-[#d4af8f] text-white' : 'border border-[#eadcc5] bg-white text-[#3d2817] hover:bg-[#f5f1eb]'}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[1.5rem] border border-[#efe3d4] bg-white shadow-[0_12px_28px_rgba(61,40,23,0.06)] transition hover:-translate-y-1">
              <div className="relative h-72 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d2817]">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#a0824d]">{product.categoryLabel}</p>
                  <span className="text-xs font-medium text-[#7a5f3d]">★ {product.rating}</span>
                </div>
                <h2 className="mb-2 text-xl font-semibold leading-snug">{product.name}</h2>
                <p className="mb-4 text-lg font-semibold text-[#a0824d]">{product.price.toLocaleString('en-US')} RWF</p>
                <Link href={`/product/${product.slug}`} className="inline-flex w-full items-center justify-center rounded-full bg-[#f5f1eb] px-4 py-2.5 text-sm font-medium text-[#3d2817] transition hover:bg-[#d4af8f] hover:text-white">
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-[1.5rem] border border-dashed border-[#d8c5ad] bg-white p-12 text-center text-[#7a5f3d]">
            No products found in this category yet.
          </div>
        )}
      </section>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3]" />}> 
      <ShopContent />
    </Suspense>
  )
}
