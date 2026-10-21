'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  archiveCatalogProduct,
  createCatalogProduct,
  deleteCatalogProduct,
  getCatalogProducts,
  getSessionUser,
  restoreCatalogProduct,
  updateCatalogProduct,
  type StoredUser,
} from '@/lib/store'

const PRODUCT_CATEGORIES = ['rings', 'necklaces', 'earrings', 'bracelets', 'sets', 'watches'] as const

export default function AdminProductsPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [products, setProducts] = useState(() => getCatalogProducts())
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showDeleted, setShowDeleted] = useState(false)
  const [newProductName, setNewProductName] = useState('')
  const [newProductCategory, setNewProductCategory] = useState<(typeof PRODUCT_CATEGORIES)[number]>('rings')

  useEffect(() => {
    const session = getSessionUser()

    if (!session || session.role !== 'admin') {
      window.location.href = '/login'
      return
    }

    setUser(session)
    setSelectedSlug((current) => current || getCatalogProducts()[0]?.slug || '')
  }, [])

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesDeleted = showDeleted ? product.deleted : !product.deleted
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
      return matchesDeleted && matchesSearch && matchesCategory
    })
  }, [products, search, categoryFilter, showDeleted])

  const selectedProduct =
    visibleProducts.find((product) => product.slug === selectedSlug) ??
    products.find((product) => product.slug === selectedSlug) ??
    products[0]

  const handleFieldChange = (
    field: 'name' | 'price' | 'availableQuantity' | 'featured' | 'image' | 'gallery' | 'category' | 'categoryLabel',
    value: string | number | boolean | string[]
  ) => {
    if (!selectedProduct) return

    const next = updateCatalogProduct(selectedProduct.slug, {
      [field]: value,
    })
    setProducts(next)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedProduct) return

    const base64 = await fileToDataUrl(file)
    const next = updateCatalogProduct(selectedProduct.slug, { image: base64 })
    setProducts(next)
  }

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length || !selectedProduct) return

    const images = await Promise.all(files.map((file) => fileToDataUrl(file)))
    const next = updateCatalogProduct(selectedProduct.slug, {
      gallery: [...selectedProduct.gallery, ...images],
    })
    setProducts(next)
  }

  const handleAddProduct = () => {
    if (!newProductName.trim()) return

    const next = createCatalogProduct({
      name: newProductName.trim(),
      category: newProductCategory,
      categoryLabel: newProductCategory.charAt(0).toUpperCase() + newProductCategory.slice(1),
      price: 250000,
      image: '/images/jewery1.png',
      gallery: ['/images/jewery1.png'],
      availableQuantity: 1,
      featured: false,
      description: 'Newly added signature Nectara artisan piece.',
      material: '18K Gold',
      color: 'Signature Nectara',
      size: 'One size',
      weight: 'Standard',
    })

    setProducts(next)
    setSelectedSlug(next[0]?.slug || '')
    setNewProductName('')
  }

  const handleDeleteProduct = () => {
    if (!selectedProduct) return

    const next = archiveCatalogProduct(selectedProduct.slug, true)
    setProducts(next)
    const fallback = next.find((product) => !product.deleted)
    setSelectedSlug(fallback?.slug || '')
  }

  const handleRestoreProduct = () => {
    if (!selectedProduct) return

    const next = restoreCatalogProduct(selectedProduct.slug)
    setProducts(next)
    setSelectedSlug(selectedProduct.slug)
  }

  const exportCsv = () => {
    const headers = ['Name', 'Category', 'Price', 'Stock', 'Featured', 'Image']
    const rows = products.map((product) => [
      product.name,
      product.category,
      String(product.price),
      String(product.availableQuantity),
      product.featured ? 'Yes' : 'No',
      product.image,
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'nectara-products.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!user || !selectedProduct) {
    return <div className="py-16 text-center text-[#6a563f]">Checking admin access…</div>
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <h2 className="text-2xl font-bold">Product catalog</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
            />
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-2.5 outline-none focus:border-[#d4af8f]"
            >
              <option value="all">All categories</option>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
              <option value="sets">Sets</option>
              <option value="watches">Watches</option>
            </select>
            <button type="button" onClick={() => setShowDeleted((value) => !value)} className="rounded-full border border-[#d4af8f] bg-[#fffaf3] px-4 py-2.5 text-sm font-semibold text-[#3d2817] hover:bg-[#f8f0e7] transition">
              {showDeleted ? 'Hide archived' : 'Show archived'}
            </button>
            <button type="button" onClick={exportCsv} className="rounded-full bg-[#3d2817] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20160f] transition">
              Export CSV
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-[1.5rem] bg-[#faf8f3] p-4 md:flex-row md:items-center">
          <input
            value={newProductName}
            onChange={(event) => setNewProductName(event.target.value)}
            placeholder="New product name"
            className="flex-1 rounded-full border border-[#e8dccb] bg-white px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          />
          <select
            value={newProductCategory}
            onChange={(event) => setNewProductCategory(event.target.value as (typeof PRODUCT_CATEGORIES)[number])}
            className="rounded-full border border-[#e8dccb] bg-white px-4 py-2.5 outline-none focus:border-[#d4af8f]"
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddProduct} className="rounded-full bg-[#d4af8f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#a0824d] transition">
            Add product
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelectedSlug(product.slug)}
              className={`rounded-[1.5rem] border p-4 text-left transition ${
                selectedProduct.slug === product.slug
                  ? 'border-[#d4af8f] bg-[#fffaf3]'
                  : 'border-[#efe3d4] bg-[#faf8f3]'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#a0824d]">{product.categoryLabel}</p>
                  <h3 className="mt-1 truncate text-xl font-bold">{product.name}</h3>
                </div>
              </div>
              <p className="mt-3 text-lg font-semibold">{product.price.toLocaleString('en-US')} RWF</p>
              <div className="mt-4 flex items-center justify-between text-sm text-[#7a5f3d]">
                <span>Stock: {product.availableQuantity}</span>
                <span>{product.deleted ? 'Archived' : product.featured ? 'Featured' : 'Standard'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#efe3d4] bg-white p-6 shadow-[0_18px_40px_rgba(61,40,23,0.08)]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h3 className="text-2xl font-bold">Edit selected product</h3>
          {selectedProduct.deleted ? (
            <button
              type="button"
              onClick={handleRestoreProduct}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
            >
              Restore product
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
            >
              Archive product
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Product name</label>
            <input
              value={selectedProduct.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <select
              value={selectedProduct.category}
              onChange={(event) => {
                const nextCategory = event.target.value as (typeof PRODUCT_CATEGORIES)[number]
                handleFieldChange('category', nextCategory)
                handleFieldChange('categoryLabel', nextCategory.charAt(0).toUpperCase() + nextCategory.slice(1))
              }}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Price (RWF)</label>
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(event) => handleFieldChange('price', Number(event.target.value))}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Available quantity</label>
            <input
              type="number"
              value={selectedProduct.availableQuantity}
              onChange={(event) => handleFieldChange('availableQuantity', Number(event.target.value))}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Featured item</label>
            <select
              value={String(selectedProduct.featured)}
              onChange={(event) => handleFieldChange('featured', event.target.value === 'true')}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            >
              <option value="true">Featured</option>
              <option value="false">Standard</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Main image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[#d4af8f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Main image URL</label>
            <input
              value={selectedProduct.image}
              onChange={(event) => handleFieldChange('image', event.target.value)}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Gallery images (comma separated)</label>
            <input
              value={selectedProduct.gallery.join(', ')}
              onChange={(event) => handleFieldChange('gallery', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
              className="w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none focus:border-[#d4af8f]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Upload gallery images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="block w-full rounded-full border border-[#e8dccb] bg-[#faf7f2] px-4 py-3 outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[#d4af8f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(new Error('Unable to read image file.'))
    reader.readAsDataURL(file)
  })
}
