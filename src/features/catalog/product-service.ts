// Product catalog service for Nectara Jewels
'use server'

import { getServiceClient } from '@/lib/supabase-server'
import { ProductFilterInput } from '@/lib/validation'

export async function searchProducts(filters: ProductFilterInput) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      products: [],
      total: 0,
    }
  }

  try {
    let query = supabase
      .from('products')
      .select(
        `
        id,
        name,
        slug,
        description,
        price,
        comparison_price,
        category_id,
        available_quantity,
        featured,
        published,
        created_at,
        categories(name, slug),
        product_images(image_url)
      `
      )
      .eq('published', true)

    // Filter by category
    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId)
    }

    // Filter by search query
    if (filters.searchQuery) {
      query = query.or(
        `name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`
      )
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        query = query.order('price', { ascending: true })
        break
      case 'price-desc':
        query = query.order('price', { ascending: false })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'popular':
        // Sort by reviews/ratings (implement later)
        query = query.order('created_at', { ascending: false })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    // Pagination
    const from = (filters.page - 1) * filters.perPage
    const to = from + filters.perPage - 1
    query = query.range(from, to)

    const { data: products, error, count } = await query

    if (error) {
      return {
        success: false,
        error: error.message,
        products: [],
        total: 0,
      }
    }

    return {
      success: true,
      products: products || [],
      total: count || 0,
      page: filters.page,
      perPage: filters.perPage,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to search products',
      products: [],
      total: 0,
    }
  }
}

export async function getProduct(productId: string) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      product: null,
    }
  }

  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(
        `
        *,
        categories(name, slug),
        product_images(id, image_url, alt_text, display_order),
        reviews(rating, comment, created_at)
      `
      )
      .eq('id', productId)
      .eq('published', true)
      .single()

    if (error || !product) {
      return {
        success: false,
        error: 'Product not found',
        product: null,
      }
    }

    return {
      success: true,
      product,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch product',
      product: null,
    }
  }
}

export async function getCategories() {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      categories: [],
    }
  }

  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) {
      return {
        success: false,
        error: error.message,
        categories: [],
      }
    }

    return {
      success: true,
      categories: categories || [],
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch categories',
      categories: [],
    }
  }
}

export async function getFeaturedProducts(limit: number = 8) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      products: [],
    }
  }

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(
        `
        id,
        name,
        slug,
        price,
        comparison_price,
        featured,
        product_images(image_url)
      `
      )
      .eq('published', true)
      .eq('featured', true)
      .limit(limit)

    if (error) {
      return {
        success: false,
        error: error.message,
        products: [],
      }
    }

    return {
      success: true,
      products: products || [],
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch featured products',
      products: [],
    }
  }
}

export async function getProducts(limit: number = 20) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      products: [],
    }
  }

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(
        `
        id,
        name,
        slug,
        price,
        comparison_price,
        available_quantity,
        product_images(image_url)
      `
      )
      .eq('published', true)
      .limit(limit)

    if (error) {
      return {
        success: false,
        error: error.message,
        products: [],
      }
    }

    return {
      success: true,
      products: products || [],
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch products',
      products: [],
    }
  }
}
