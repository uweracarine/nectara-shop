'use client'

import { useEffect, useState } from 'react'
import { getCart } from '@/lib/store'

export default function CartCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const syncCount = () => {
      const total = getCart().reduce((sum, item) => sum + item.quantity, 0)
      setCount(total)
    }

    syncCount()

    const handleStorage = () => syncCount()
    window.addEventListener('storage', handleStorage)
    window.addEventListener('nectara-cart-updated', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('nectara-cart-updated', handleStorage)
    }
  }, [])

  return <span>{count}</span>
}
