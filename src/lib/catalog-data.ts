export interface CatalogProduct {
  id: string
  slug: string
  name: string
  category: 'rings' | 'bracelets' | 'necklaces' | 'earrings' | 'sets' | 'watches'
  categoryLabel: string
  secondaryCategories?: string[]
  price: number
  comparisonPrice?: number
  image: string
  gallery: string[]
  description: string
  material: string
  color: string
  size: string
  weight: string
  availableQuantity: number
  featured: boolean
  rating: number
  reviewCount: number
  sellerId: string
  sellerName: string
  sellerSlug: string
  badge?: string
  deleted?: boolean
}

export interface CatalogCategory {
  slug: string
  name: string
  description: string
  image: string
  count: number
}

export interface CatalogSeller {
  id: string
  name: string
  slug: string
  location: string
  specialty: string
  description: string
  rating: number
  totalSales: number
  verified: boolean
  avatarImage: string
  bannerImage: string
  phone: string
  email: string
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: 'rings',
    name: 'Rings',
    description: 'Solitaire engagement rings, artisan gold bands, and statement gemstone rings',
    image: '/images/ring1.png',
    count: 5,
  },
  {
    slug: 'bracelets',
    name: 'Bracelets',
    description: 'Handcrafted gold cuffs, clover link bracelets, and diamond tennis bracelets',
    image: '/images/bracelet1.png',
    count: 4,
  },
  {
    slug: 'sets',
    name: 'Sets',
    description: 'Complete bridal and ceremonial luxury pairs with matching necklace, earrings & rings',
    image: '/images/jewery1.png',
    count: 4,
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    description: 'Intricate 18K & 24K gold chokers, layered chains, and gemstone pendants',
    image: '/images/jewery3.png',
    count: 4,
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    description: 'Chandelier drop earrings, ruby teardrops, and freshwater pearl hoops',
    image: '/images/jewery4.png',
    count: 4,
  },
  {
    slug: 'watches',
    name: 'Watches',
    description: 'Fine diamond-bezel gold timepieces and luxury wristwear sets',
    image: '/images/bracelet2.png',
    count: 2,
  },
]

export const CATALOG_SELLERS: CatalogSeller[] = [
  {
    id: 'seller-1',
    name: 'Rwanda Artisan Jewels',
    slug: 'rwanda-artisan-jewels',
    location: 'Kigali Heights, Kigali',
    specialty: 'Bridal Sets & 24K Gold Filigree',
    description:
      'Master goldsmiths crafting heritage Rwandan and East African ceremonial necklaces, bridal boxes, and filigree jewelry sets.',
    rating: 4.9,
    totalSales: 420,
    verified: true,
    avatarImage: '/images/jewery3.png',
    bannerImage: '/images/jewery2.png',
    phone: '+250 788 123 456',
    email: 'atelier@rwandaartisanjewels.rw',
  },
  {
    id: 'seller-2',
    name: 'Luxury Rings Rwanda',
    slug: 'luxury-rings-rwanda',
    location: 'Nyarugenge District, Kigali',
    specialty: 'Diamond Engagement & Solitaire Rings',
    description:
      'Specializing in certified diamond engagement rings, bespoke wedding bands, and precious gemstone settings handcrafted for milestone moments.',
    rating: 5.0,
    totalSales: 315,
    verified: true,
    avatarImage: '/images/ring1.png',
    bannerImage: '/images/ring2.png',
    phone: '+250 787 654 321',
    email: 'concierge@luxuryrings.rw',
  },
  {
    id: 'seller-3',
    name: 'Kigali Gold Atelier',
    slug: 'kigali-gold-atelier',
    location: 'Kimihurura, Kigali',
    specialty: 'Fine Bracelets, Bangles & Timepieces',
    description:
      'Contemporary luxury wristwear, mother-of-pearl clover bracelets, and diamond-set gold watches curated for modern elegance.',
    rating: 4.8,
    totalSales: 260,
    verified: true,
    avatarImage: '/images/bracelet2.png',
    bannerImage: '/images/bracelet1.png',
    phone: '+250 789 445 110',
    email: 'studio@kigaligold.rw',
  },
  {
    id: 'seller-4',
    name: 'Amahoro Fine Gems',
    slug: 'amahoro-fine-gems',
    location: 'Remera, Kigali',
    specialty: 'Precious Ruby, Emerald & Crystal Sets',
    description:
      'Celebrated for vibrant gemstone pairs, rose-gold ruby teardrops, and red-carpet statement jewelry across Rwanda.',
    rating: 4.9,
    totalSales: 198,
    verified: true,
    avatarImage: '/images/jewery4.png',
    bannerImage: '/images/jewery1.png',
    phone: '+250 785 900 221',
    email: 'gems@amahorofine.rw',
  },
]

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-ring-1',
    slug: 'royal-solitaire-diamond-ring',
    name: 'Royal Solitaire Diamond Engagement Ring',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 520000,
    comparisonPrice: 600000,
    image: '/images/ring1.png',
    gallery: ['/images/ring1.png', '/images/ring2.png', '/images/ring3.png'],
    description:
      'A breathtaking solitaire engagement ring set in polished 18K gold with a brilliant-cut centerpiece and delicate pavé shoulders. Hand-finished by Luxury Rings Rwanda for timeless brilliance.',
    material: '18K Yellow Gold & Brilliant Diamond',
    color: 'Champagne Gold',
    size: 'Sizes 5 - 9 Available',
    weight: '4.6g',
    availableQuantity: 6,
    featured: true,
    rating: 5.0,
    reviewCount: 42,
    sellerId: 'seller-2',
    sellerName: 'Luxury Rings Rwanda',
    sellerSlug: 'luxury-rings-rwanda',
    badge: 'Best Seller',
  },
  {
    id: 'prod-ring-2',
    slug: 'kigali-empress-halo-gold-ring',
    name: 'Kigali Empress Halo Gold Ring',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 450000,
    comparisonPrice: 510000,
    image: '/images/ring2.png',
    gallery: ['/images/ring2.png', '/images/ring1.png', '/images/ring4.png'],
    description:
      'Exquisite double-halo diamond ring featuring a radiant cushion-cut center stone surrounded by micro-pavé accents on a warm gold band.',
    material: '18K Solid Gold & White Sapphires',
    color: 'Warm Gold',
    size: 'Sizes 5 - 8 Available',
    weight: '5.2g',
    availableQuantity: 8,
    featured: true,
    rating: 4.9,
    reviewCount: 31,
    sellerId: 'seller-2',
    sellerName: 'Luxury Rings Rwanda',
    sellerSlug: 'luxury-rings-rwanda',
    badge: 'Featured',
  },
  {
    id: 'prod-ring-3',
    slug: 'eternal-pave-gold-band',
    name: 'Eternal Pavé Diamond Wedding Band',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 290000,
    image: '/images/ring3.png',
    gallery: ['/images/ring3.png', '/images/ring5.png', '/images/ring1.png'],
    description:
      'Full-eternity pavé diamond ring crafted for stacking or solo elegance. Every stone is individually hand-set for seamless sparkle from every angle.',
    material: '14K Gold & Pavé Crystals',
    color: 'Gold / Clear',
    size: 'Sizes 6 - 9 Available',
    weight: '3.8g',
    availableQuantity: 12,
    featured: false,
    rating: 4.8,
    reviewCount: 24,
    sellerId: 'seller-2',
    sellerName: 'Luxury Rings Rwanda',
    sellerSlug: 'luxury-rings-rwanda',
  },
  {
    id: 'prod-ring-4',
    slug: 'vintage-marquise-gemstone-ring',
    name: 'Vintage Marquise Crown Ring',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 380000,
    comparisonPrice: 430000,
    image: '/images/ring4.png',
    gallery: ['/images/ring4.png', '/images/ring2.png', '/images/ring5.png'],
    description:
      'Inspired by royal heirloom craftsmanship, this sculptured ring pairs vintage filigree detailing with a luminous center stone.',
    material: '18K Gold Vermeil & Zirconia',
    color: 'Antique Gold',
    size: 'Sizes 5 - 9 Available',
    weight: '4.9g',
    availableQuantity: 9,
    featured: false,
    rating: 4.9,
    reviewCount: 19,
    sellerId: 'seller-2',
    sellerName: 'Luxury Rings Rwanda',
    sellerSlug: 'luxury-rings-rwanda',
    badge: 'New Arrival',
  },
  {
    id: 'prod-ring-5',
    slug: 'twisted-rope-sculpted-gold-ring',
    name: 'Twisted Rope & Dome Gold Ring',
    category: 'rings',
    categoryLabel: 'Rings',
    price: 210000,
    image: '/images/ring5.png',
    gallery: ['/images/ring5.png', '/images/ring3.png', '/images/bracelet2.png'],
    description:
      'Modern minimalist dome ring paired with an artisan braided rope band in mirror-polished 18K gold plating. Ideal for everyday luxury.',
    material: '18K Gold Plated Brass',
    color: 'Yellow Gold',
    size: 'Adjustable 6 - 8',
    weight: '6.1g',
    availableQuantity: 15,
    featured: false,
    rating: 4.7,
    reviewCount: 28,
    sellerId: 'seller-3',
    sellerName: 'Kigali Gold Atelier',
    sellerSlug: 'kigali-gold-atelier',
  },
  {
    id: 'prod-bracelet-1',
    slug: 'clover-gold-bracelet',
    name: 'Clover Gold Bracelet',
    category: 'bracelets',
    categoryLabel: 'Bracelets',
    price: 185000,
    image: '/images/bracelet1.png',
    gallery: ['/images/bracelet1.png', '/images/bracelet2.png', '/images/bracelet3.png'],
    description:
      'A sculptural clover-inspired bracelet designed with hand-polished gold links and subtle movement for a statement silhouette.',
    material: '18K Gold Vermeil',
    color: 'Champagne Gold',
    size: 'One Size',
    weight: '5.7g',
    availableQuantity: 10,
    featured: true,
    rating: 4.8,
    reviewCount: 22,
    sellerId: 'seller-3',
    sellerName: 'Kigali Gold Atelier',
    sellerSlug: 'kigali-gold-atelier',
    badge: 'Best Seller',
  },
  {
    id: 'prod-bracelet-2',
    slug: 'aurora-cuff-bracelet',
    name: 'Aurora Cuff Bracelet',
    category: 'bracelets',
    categoryLabel: 'Bracelets',
    price: 240000,
    comparisonPrice: 280000,
    image: '/images/bracelet2.png',
    gallery: ['/images/bracelet2.png', '/images/bracelet1.png', '/images/bracelet4.png'],
    description:
      'Minimalist cuff bracelet with a softly rounded profile and polished-bezel finish that contrasts beautifully with everyday tailoring.',
    material: '18K Gold Plated Brass',
    color: 'Warm Gold',
    size: 'Adjustable',
    weight: '6.8g',
    availableQuantity: 7,
    featured: true,
    rating: 4.9,
    reviewCount: 18,
    sellerId: 'seller-3',
    sellerName: 'Kigali Gold Atelier',
    sellerSlug: 'kigali-gold-atelier',
  },
  {
    id: 'prod-bracelet-3',
    slug: 'diamond-sparkle-tennis-bracelet',
    name: 'Diamond Sparkle Tennis Bracelet',
    category: 'bracelets',
    categoryLabel: 'Bracelets',
    price: 330000,
    image: '/images/bracelet3.png',
    gallery: ['/images/bracelet3.png', '/images/bracelet4.png', '/images/bracelet2.png'],
    description:
      'A radiant tennis bracelet studded with clear stones for a luxe finish that brings elegance to evening dresses and modern tailoring alike.',
    material: 'Gold & Cubic Zirconia',
    color: 'Gold / Clear',
    size: 'Sizes 6 - 8',
    weight: '7.2g',
    availableQuantity: 11,
    featured: false,
    rating: 4.7,
    reviewCount: 16,
    sellerId: 'seller-3',
    sellerName: 'Kigali Gold Atelier',
    sellerSlug: 'kigali-gold-atelier',
  },
  {
    id: 'prod-necklace-1',
    slug: 'harvest-gold-layer-necklace',
    name: 'Harvest Gold Layer Necklace',
    category: 'necklaces',
    categoryLabel: 'Necklaces',
    price: 265000,
    image: '/images/jewery1.png',
    gallery: ['/images/jewery1.png', '/images/jewery2.png', '/images/jewery3.png'],
    description:
      'A layered statement necklace with rich gold tones and a refined silhouette designed for elevated day-to-night dressing.',
    material: '18K Gold Plate',
    color: 'Golden Bronze',
    size: 'Adjustable 16 - 18in',
    weight: '9.5g',
    availableQuantity: 13,
    featured: true,
    rating: 4.9,
    reviewCount: 33,
    sellerId: 'seller-1',
    sellerName: 'Rwanda Artisan Jewels',
    sellerSlug: 'rwanda-artisan-jewels',
  },
  {
    id: 'prod-earring-1',
    slug: 'luna-statement-earrings',
    name: 'Luna Statement Earrings',
    category: 'earrings',
    categoryLabel: 'Earrings',
    price: 210000,
    image: '/images/jewery4.png',
    gallery: ['/images/jewery4.png', '/images/jewery3.png', '/images/jewery2.png'],
    description:
      'Graceful drop earrings shaped to catch the light with every movement, blending silhouette and sparkle in one refined piece.',
    material: 'Gold Plated Brass & Clear Stones',
    color: 'Gold / Crystal',
    size: 'One Size',
    weight: '4.4g',
    availableQuantity: 9,
    featured: true,
    rating: 4.9,
    reviewCount: 29,
    sellerId: 'seller-4',
    sellerName: 'Amahoro Fine Gems',
    sellerSlug: 'amahoro-fine-gems',
  },
  {
    id: 'prod-set-1',
    slug: 'royal-bridal-jewel-set',
    name: 'Royal Bridal Jewel Set',
    category: 'sets',
    categoryLabel: 'Sets',
    secondaryCategories: ['necklaces', 'earrings'],
    price: 620000,
    comparisonPrice: 710000,
    image: '/images/jewery2.png',
    gallery: ['/images/jewery2.png', '/images/jewery1.png', '/images/jewery4.png'],
    description:
      'A bridal statement set combining an heirloom-inspired necklace, matching earrings, and complementary accents designed for unforgettable occasions.',
    material: '18K Gold & Faceted Stones',
    color: 'Ivory Gold',
    size: 'One Size Set',
    weight: '18.2g',
    availableQuantity: 4,
    featured: true,
    rating: 5.0,
    reviewCount: 26,
    sellerId: 'seller-1',
    sellerName: 'Rwanda Artisan Jewels',
    sellerSlug: 'rwanda-artisan-jewels',
    badge: 'Bestseller',
  },
  {
    id: 'prod-watch-1',
    slug: 'velvet-diamond-watch',
    name: 'Velvet Diamond Watch',
    category: 'watches',
    categoryLabel: 'Watches',
    price: 475000,
    image: '/images/bracelet4.png',
    gallery: ['/images/bracelet4.png', '/images/bracelet1.png', '/images/bracelet2.png'],
    description:
      'An elegant timepiece with a gold bezel, diamond-accented dial, and polished bracelet finish for a sophisticated daily statement.',
    material: 'Gold Alloy & Diamond Accent',
    color: 'Champagne Gold',
    size: '38mm Case',
    weight: '26.4g',
    availableQuantity: 5,
    featured: false,
    rating: 4.8,
    reviewCount: 12,
    sellerId: 'seller-3',
    sellerName: 'Kigali Gold Atelier',
    sellerSlug: 'kigali-gold-atelier',
  },
]
