// Order management service for Nectara Jewels
'use server'

import { getServiceClient, createClient } from '@/lib/supabase-server'
import { generateOrderNumber } from '@/lib/utils'

export async function createOrder(buyerId: string, addressId: string) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    // Get buyer's cart
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('buyer_id', buyerId)
      .single()

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found',
      }
    }

    // Get cart items with product details
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(
        `
        id,
        product_id,
        quantity,
        products(
          id,
          name,
          price,
          available_quantity
        )
      `
      )
      .eq('cart_id', cart.id)

    if (itemsError || !cartItems || cartItems.length === 0) {
      return {
        success: false,
        error: 'Cart is empty',
      }
    }

    // Validate stock and calculate totals
    let totalAmount = 0
    const orderItems = []

    for (const item of cartItems) {
      const product = (item as any).products
      if (!product) continue

      if (product.available_quantity < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${product.name}`,
        }
      }

      const itemTotal = product.price * item.quantity
      totalAmount += itemTotal

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity: item.quantity,
      })
    }

    // Create order
    const orderNumber = generateOrderNumber()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        buyer_id: buyerId,
        order_number: orderNumber,
        total_amount: totalAmount,
        shipping_address: addressId,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError || !order) {
      return {
        success: false,
        error: 'Failed to create order',
      }
    }

    // Create order items
    const { error: itemInsertError } = await supabase.from('order_items').insert(
      orderItems.map((item) => ({
        order_id: order.id,
        ...item,
      }))
    )

    if (itemInsertError) {
      // Rollback order
      await supabase.from('orders').delete().eq('id', order.id)
      return {
        success: false,
        error: 'Failed to add items to order',
      }
    }

    // Clear cart
    await supabase.from('cart_items').delete().eq('cart_id', cart.id)

    return {
      success: true,
      message: 'Order created successfully',
      orderId: order.id,
      orderNumber: order.order_number,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create order',
    }
  }
}

export async function getOrder(orderId: string, userId: string) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      order: null,
    }
  }

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items(
          id,
          product_id,
          product_name,
          price,
          quantity,
          products(slug)
        )
      `
      )
      .eq('id', orderId)
      .eq('buyer_id', userId)
      .single()

    if (error || !order) {
      return {
        success: false,
        error: 'Order not found',
        order: null,
      }
    }

    return {
      success: true,
      order,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch order',
      order: null,
    }
  }
}

export async function getBuyerOrders(buyerId: string, limit: number = 20) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
      orders: [],
    }
  }

  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, order_number, status, total_amount, created_at')
      .eq('buyer_id', buyerId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      return {
        success: false,
        error: error.message,
        orders: [],
      }
    }

    return {
      success: true,
      orders: orders || [],
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch orders',
      orders: [],
    }
  }
}

export async function cancelOrder(orderId: string, userId: string) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    // Check if order belongs to user and can be cancelled
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('status')
      .eq('id', orderId)
      .eq('buyer_id', userId)
      .single()

    if (fetchError || !order) {
      return {
        success: false,
        error: 'Order not found',
      }
    }

    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return {
        success: false,
        error: 'Order cannot be cancelled in its current status',
      }
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)

    if (updateError) {
      return {
        success: false,
        error: 'Failed to cancel order',
      }
    }

    return {
      success: true,
      message: 'Order cancelled successfully',
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to cancel order',
    }
  }
}
