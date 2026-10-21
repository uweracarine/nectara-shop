'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/lib/store'

type AddToCartButtonProps = {
  product: {
    id: string
    slug: string
    name: string
    price: number
    image: string
    category: string
  }
  className?: string
  label?: string
}

export default function AddToCartButton({
  product,
  className = 'inline-flex items-center justify-center rounded-full bg-[#d4af8f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a0824d] transition',
  label = 'Add to cart',
}: AddToCartButtonProps) {
  const router = useRouter()
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => {
      router.push('/cart')
    }, 250)
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {isAdded ? 'Added to cart' : label}
    </button>
  )
}
