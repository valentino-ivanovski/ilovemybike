export type ShopSection = 'ready-to-order' | 'in-stock'

export interface ReadyBike {
  id: number
  title: string
  brand: string
  old_price: number
  new_price: number | null
  category: string
  subcategories: string[]
  images: string[]
  url: string
}

export interface InStockBike {
  id: number
  title: string
  brand: string
  old_price: number
  new_price: number | null
  category: string
  subcategories: string[]
  images: string[]
  description: string
  stock: boolean
  popular: boolean
  url: string
  youtube_link: string | null
}

export interface BikeVariant {
  id: number
  bike_id: number
  variant_name: string
  price: number
  price_sale: number | null
  stock: number
}

export interface SectionFilters {
  category?: string
  subcategory?: string
  sortBy: 'price' | 'title'
  sortOrder: 'asc' | 'desc'
  page: number
}

export interface ShopQueryState {
  section: ShopSection
  ready: SectionFilters
  stock: SectionFilters
}

export interface PaginatedBikes<T> {
  bikes: T[]
  total: number
  page: number
  totalPages: number
}

export interface InStockBikeWithVariants extends InStockBike {
  variants: BikeVariant[]
}
