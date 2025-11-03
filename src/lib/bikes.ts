import { supabase } from './supabase'
import {
  BikeVariant,
  InStockBike,
  InStockBikeWithVariants,
  PaginatedBikes,
  ReadyBike,
  SectionFilters
} from './types'

const READY_TABLE = 'bike-discount'
const IN_STOCK_TABLE = 'in-stock'
const VARIANT_TABLE = 'bike-variants'
// Default page size for listings
const ITEMS_PER_PAGE = 20

type ReadyBikeRow = {
  id: number
  title: string
  brand: string
  old_price: number | string
  new_price: number | string | null
  category: string
  images: string
  url: string
  'final-subcategory': string | null
}

type ReadySubcategoryRow = {
  category: string
  'final-subcategory': string | null
}

type InStockBikeRow = {
  id: number
  title: string
  brand: string
  old_price: number | string
  new_price: number | string | null
  category: string
  subcategory: string | null
  images: string | null
  description: string
  stock: boolean
  popular: boolean
  url: string
  youtube_link: string | null
}

type InStockVariantRow = {
  id: number
  bike_id: number
  variant_name: string
  price: number | string
  price_sale: number | string | null
  stock: number | string
  color_class: string | null
}

function parseNumeric(value: number | string | null, fallback: number | null = null): number | null {
  if (value === null || value === undefined) {
    return fallback
  }
  if (typeof value === 'number') {
    return value
  }
  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    return fallback
  }
  return parsed
}

function splitCommaSeparated(value: string | null | undefined): string[] {
  if (!value) {
    return []
  }

  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function splitList(value: string | null | undefined): string[] {
  if (!value) {
    return []
  }

  return value
    .split(/[;,]/)
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function mapReadyBike(row: ReadyBikeRow): ReadyBike {
  return {
    id: row.id,
    title: row.title,
    brand: row.brand,
    old_price: parseNumeric(row.old_price, 0) ?? 0,
    new_price: parseNumeric(row.new_price),
    category: row.category,
    subcategories: splitList(row['final-subcategory']),
    images: splitCommaSeparated(row.images),
    url: row.url
  }
}
function mapInStockBike(row: InStockBikeRow): InStockBike {
  return {
    id: row.id,
    title: row.title,
    brand: row.brand,
    old_price: parseNumeric(row.old_price, 0) ?? 0,
    new_price: parseNumeric(row.new_price),
    category: row.category,
    subcategories: splitList(row.subcategory),
    images: splitCommaSeparated(row.images),
    description: row.description,
    stock: row.stock,
    popular: row.popular,
    url: row.url,
    youtube_link: row.youtube_link
  }
}

function mapVariant(row: InStockVariantRow): BikeVariant {
  return {
    id: row.id,
    bike_id: row.bike_id,
    variant_name: row.variant_name,
    price: parseNumeric(row.price, 0) ?? 0,
    price_sale: parseNumeric(row.price_sale),
    stock: parseNumeric(row.stock, 0) ?? 0,
    color_class: row.color_class
  }
}

async function attachVariantsToBikes(
  bikes: InStockBike[],
  includeVariants?: boolean
): Promise<InStockBikeWithVariants[]> {
  if (bikes.length === 0) {
    return []
  }

  if (includeVariants === false) {
    return bikes.map((bike) => ({
      ...bike,
      variants: []
    }))
  }

  const bikeIds = bikes.map((bike) => bike.id)
  const { data: variantsData, error: variantsError } = await supabase
    .from(VARIANT_TABLE)
    .select('*')
    .in('bike_id', bikeIds)

  if (variantsError) {
    const message = variantsError.message.toLowerCase()
    if (!message.includes('could not find the table')) {
      throw new Error(`Failed to fetch bike variants: ${variantsError.message}`)
    }
    return bikes.map((bike) => ({
      ...bike,
      variants: []
    }))
  }

  const variantMap = new Map<number, BikeVariant[]>()
  for (const row of (variantsData as InStockVariantRow[]) ?? []) {
    const variant = mapVariant(row)
    const list = variantMap.get(variant.bike_id)
    if (list) {
      list.push(variant)
    } else {
      variantMap.set(variant.bike_id, [variant])
    }
  }

  return bikes.map((bike) => ({
    ...bike,
    variants: variantMap.get(bike.id) ?? []
  }))
}

function buildPagination(page: number) {
  const currentPage = page > 0 ? page : 1
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  return { from, to, page: currentPage }
}

export async function getReadyToOrderBikes(filters: SectionFilters): Promise<PaginatedBikes<ReadyBike>> {
  const { category, subcategory, sortBy, sortOrder, page } = filters

  const { from, to, page: safePage } = buildPagination(page)

  let query = supabase
    .from(READY_TABLE)
    .select('*', { count: 'exact' })

  if (category) {
    query = query.ilike('category', category)
  }

  if (subcategory) {
    query = query.ilike('final-subcategory', `%${subcategory}%`)
  }

  if (sortBy === 'price') {
    query = query.order('old_price', {
      ascending: sortOrder === 'asc',
      nullsFirst: false
    })
  } else {
    query = query.order('title', { ascending: sortOrder === 'asc' })
  }
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Failed to fetch ready-to-order bikes: ${error.message}`)
  }

  const total = count || 0
  const bikes = (data as ReadyBikeRow[] | null)?.map(mapReadyBike) ?? []
  const totalPages = total === 0 ? 1 : Math.ceil(total / ITEMS_PER_PAGE)

  return {
    bikes,
    total,
    page: safePage,
    totalPages
  }
}

export async function getReadyToOrderCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from(READY_TABLE)
    .select('category')
    .not('category', 'is', null)

  if (error) {
    throw new Error(`Failed to fetch ready-to-order categories: ${error.message}`)
  }

  const categories = (data ?? [])
    .map((item) => item.category?.trim())
    .filter(Boolean) as string[]

  return [...new Set(categories)].sort((a, b) => a.localeCompare(b))
}

export async function getReadyToOrderSubcategories(category?: string): Promise<string[]> {
  let query = supabase
    .from(READY_TABLE)
    .select('category, final-subcategory')
    .not('final-subcategory', 'is', null)

  if (category) {
    query = query.ilike('category', category)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch ready-to-order subcategories: ${error.message}`)
  }

  const rows = ((data as unknown) as ReadySubcategoryRow[] | null) ?? []

  const subcategories = rows
    .flatMap((item) => splitList(item['final-subcategory']))
    .filter(Boolean)

  return [...new Set(subcategories)].sort((a, b) => a.localeCompare(b))
}

export async function getInStockBikes(
  filters: SectionFilters,
  options: { includeVariants?: boolean } = {}
): Promise<PaginatedBikes<InStockBikeWithVariants>> {
  const { category, subcategory, sortBy, sortOrder, page } = filters
  const { from, to, page: safePage } = buildPagination(page)

  let query = supabase
    .from(IN_STOCK_TABLE)
    .select('*', { count: 'exact' })
    .eq('stock', true)

  if (category) {
    query = query.ilike('category', category)
  }

  if (subcategory) {
    query = query.ilike('subcategory', `%${subcategory}%`)
  }

  if (sortBy === 'price') {
    query = query.order('new_price', {
      ascending: sortOrder === 'asc',
      nullsFirst: false
    }).order('old_price', {
      ascending: sortOrder === 'asc',
      nullsFirst: false
    })
  } else {
    query = query.order('title', { ascending: sortOrder === 'asc' })
  }
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Failed to fetch in-stock bikes: ${error.message}`)
  }

  const total = count || 0
  const mappedBikes = (data as InStockBikeRow[] | null)?.map(mapInStockBike) ?? []
  const bikesWithVariants = await attachVariantsToBikes(mappedBikes, options.includeVariants)

  const totalPages = total === 0 ? 1 : Math.ceil(total / ITEMS_PER_PAGE)

  return {
    bikes: bikesWithVariants,
    total,
    page: safePage,
    totalPages
  }
}

export async function getInStockCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from(IN_STOCK_TABLE)
    .select('category')
    .not('category', 'is', null)

  if (error) {
    throw new Error(`Failed to fetch in-stock categories: ${error.message}`)
  }

  const categories = (data ?? [])
    .map((item) => item.category?.trim())
    .filter(Boolean) as string[]

  return [...new Set(categories)].sort((a, b) => a.localeCompare(b))
}

export async function getInStockSubcategories(category?: string): Promise<string[]> {
  let query = supabase
    .from(IN_STOCK_TABLE)
    .select('category, subcategory')
    .not('subcategory', 'is', null)

  if (category) {
    query = query.ilike('category', category)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch in-stock subcategories: ${error.message}`)
  }

  const subcategories = (data ?? [])
    .flatMap((item) => splitList(item.subcategory))
    .filter(Boolean)

  return [...new Set(subcategories)].sort((a, b) => a.localeCompare(b))
}

export async function getPopularInStockBikes(
  options: { includeVariants?: boolean } = {}
): Promise<InStockBikeWithVariants[]> {
  const { data, error } = await supabase
    .from(IN_STOCK_TABLE)
    .select('*')
    .eq('stock', true)
    .eq('popular', true)
    .order('title', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch popular in-stock bikes: ${error.message}`)
  }

  const bikes = (data as InStockBikeRow[] | null)?.map(mapInStockBike) ?? []
  return attachVariantsToBikes(bikes, options.includeVariants)
}

export async function getReadyToOrderBikeById(id: number): Promise<ReadyBike | null> {
  const { data, error } = await supabase
    .from(READY_TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch ready-to-order bike: ${error.message}`)
  }

  if (!data) {
    return null
  }

  return mapReadyBike(data as ReadyBikeRow)
}

export async function getInStockBikeById(
  id: number,
  options: { includeVariants?: boolean } = {}
): Promise<InStockBikeWithVariants | null> {
  const { data, error } = await supabase
    .from(IN_STOCK_TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch in-stock bike: ${error.message}`)
  }

  if (!data) {
    return null
  }

  const bike = mapInStockBike(data as InStockBikeRow)

  let variants: BikeVariant[] = []

  if (options.includeVariants !== false) {
    const { data: variantsData, error: variantsError } = await supabase
      .from(VARIANT_TABLE)
      .select('*')
      .eq('bike_id', bike.id)

    if (variantsError) {
      const message = variantsError.message.toLowerCase()
      if (!message.includes('could not find the table')) {
        throw new Error(`Failed to fetch bike variants: ${variantsError.message}`)
      }
      variants = []
    } else {
      variants = (variantsData as InStockVariantRow[] | null)?.map(mapVariant) ?? []
    }
  }

  return {
    ...bike,
    variants
  }
}
