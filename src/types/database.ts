// Database types for Nectara Jewels
// This is the auto-generated or manually defined database schema

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
        Relationships: Array<{
          foreignKeyName: string
          columns: string[]
          referencedRelation: string
          referencedColumns: string[]
        }>
      }
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
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          profile_picture_url?: string | null
          phone_number?: string | null
          status?: 'active' | 'suspended' | 'pending_verification'
          email_verified?: boolean
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
      products: {
        Row: {
          id: string
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
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'created_at' | 'updated_at' | 'id'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          price: number
          quantity: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'created_at' | 'id'>
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>
        Relationships: []
      }
      seller_fulfillments: {
        Row: {
          id: string
          order_id: string
          seller_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered'
          tracking_number: string | null
          carrier: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          order_id: string
          seller_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered'
          tracking_number?: string | null
          carrier?: string | null
        }
        Update: Partial<Database['public']['Tables']['seller_fulfillments']['Insert']>
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'created_at' | 'id'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
        Relationships: []
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
