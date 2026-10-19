// Database types for Nectara Jewels
// This is the auto-generated or manually defined database schema

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'buyer' | 'seller' | 'admin'
          profile_picture_url: string | null
          phone_number: string | null
          status: 'active' | 'suspended' | 'pending_verification'
          email_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      seller_profiles: {
        Row: {
          id: string
          user_id: string
          store_name: string
          store_slug: string
          description: string | null
          logo_url: string | null
          banner_url: string | null
          business_registration: string
          tax_id: string | null
          contact_email: string
          phone_number: string
          address: string
          city: string
          country: string
          postal_code: string
          website: string | null
          commission_rate: number
          status: 'pending' | 'approved' | 'rejected' | 'suspended'
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['seller_profiles']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['seller_profiles']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      products: {
        Row: {
          id: string
          seller_id: string
          category_id: string
          name: string
          slug: string
          description: string
          price: number
          comparison_price: number | null
          material: string | null
          color: string | null
          size: string | null
          weight: number | null
          available_quantity: number
          featured: boolean
          approval_status: 'pending' | 'approved' | 'rejected'
          published: boolean
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text: string | null
          display_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['product_images']['Row'], 'created_at' | 'id'>
        Update: Partial<Database['public']['Tables']['product_images']['Insert']>
      }
      carts: {
        Row: {
          id: string
          buyer_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['carts']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['carts']['Insert']>
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cart_items']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['cart_items']['Insert']>
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          order_number: string
          total_amount: number
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone: string
          street_address: string
          city: string
          province: string | null
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['addresses']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['addresses']['Insert']>
      }
      wishlist: {
        Row: {
          id: string
          buyer_id: string
          product_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['wishlist']['Row'], 'created_at' | 'id'>
        Update: Partial<Database['public']['Tables']['wishlist']['Insert']>
      }
      payments: {
        Row: {
          id: string
          order_id: string
          amount: number
          currency: string
          status: 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded'
          method: string
          provider: string
          provider_reference: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          data: Record<string, any> | null
          read: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'created_at' | 'id'>
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'buyer' | 'seller' | 'admin'
      product_status: 'pending' | 'approved' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
