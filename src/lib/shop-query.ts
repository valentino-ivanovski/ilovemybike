import { SectionFilters, ShopQueryState, ShopSection } from './types'

const SORT_BY_VALUES: SectionFilters['sortBy'][] = ['price', 'title']
const SORT_ORDER_VALUES: SectionFilters['sortOrder'][] = ['asc', 'desc']

const DEFAULT_SORT_BY: SectionFilters['sortBy'] = 'title'
const DEFAULT_SORT_ORDER: SectionFilters['sortOrder'] = 'asc'
const DEFAULT_PAGE = 1

type SectionPrefix = 'ready' | 'stock'

const sectionToPrefix: Record<ShopSection, SectionPrefix> = {
  'ready-to-order': 'ready',
  'in-stock': 'stock'
}

export function createDefaultSectionFilters(): SectionFilters {
  return {
    sortBy: DEFAULT_SORT_BY,
    sortOrder: DEFAULT_SORT_ORDER,
    page: DEFAULT_PAGE
  }
}

function parseStringParam(value: string | string[] | undefined): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  if (!trimmed || trimmed.toLowerCase() === 'all') {
    return undefined
  }

  return trimmed
}

function isSortBy(value: string | undefined): value is SectionFilters['sortBy'] {
  return Boolean(value && (SORT_BY_VALUES as string[]).includes(value))
}

function isSortOrder(value: string | undefined): value is SectionFilters['sortOrder'] {
  return Boolean(value && (SORT_ORDER_VALUES as string[]).includes(value))
}

function sanitizePage(value: string | undefined): number {
  if (!value) {
    return DEFAULT_PAGE
  }

  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 1) {
    return DEFAULT_PAGE
  }

  return parsed
}

export function parseSectionFilters(
  prefix: SectionPrefix,
  params: Record<string, string | string[] | undefined>
): SectionFilters {
  const filters = createDefaultSectionFilters()

  const categoryKey = `${prefix}Category`
  const subcategoryKey = `${prefix}Subcategory`
  const sortByKey = `${prefix}SortBy`
  const sortOrderKey = `${prefix}SortOrder`
  const pageKey = `${prefix}Page`

  const category = parseStringParam(params[categoryKey])
  const subcategory = parseStringParam(params[subcategoryKey])
  const sortBy = parseStringParam(params[sortByKey])
  const sortOrder = parseStringParam(params[sortOrderKey])
  const page = parseStringParam(params[pageKey])

  filters.category = category
  filters.subcategory = subcategory
  filters.sortBy = isSortBy(sortBy) ? sortBy : DEFAULT_SORT_BY
  filters.sortOrder = isSortOrder(sortOrder) ? sortOrder : DEFAULT_SORT_ORDER
  filters.page = sanitizePage(page)

  return filters
}

function appendFilters(params: URLSearchParams, prefix: SectionPrefix, filters: SectionFilters) {
  if (filters.category) {
    params.set(`${prefix}Category`, filters.category)
  }

  if (filters.subcategory) {
    params.set(`${prefix}Subcategory`, filters.subcategory)
  }

  if (filters.sortBy !== DEFAULT_SORT_BY) {
    params.set(`${prefix}SortBy`, filters.sortBy)
  }

  if (filters.sortOrder !== DEFAULT_SORT_ORDER) {
    params.set(`${prefix}SortOrder`, filters.sortOrder)
  }

  if (filters.page > DEFAULT_PAGE) {
    params.set(`${prefix}Page`, filters.page.toString())
  }
}

export function buildSearchParamsForSection(
  state: ShopQueryState,
  nextSection: ShopSection,
  overrides: Partial<SectionFilters> = {}
): URLSearchParams {
  const readyFilters: SectionFilters = { ...state.ready }
  const stockFilters: SectionFilters = { ...state.stock }

  const targetPrefix = sectionToPrefix[nextSection]

  if (nextSection === 'ready-to-order') {
    Object.assign(readyFilters, overrides)
  } else {
    Object.assign(stockFilters, overrides)
  }

  if (readyFilters.page < 1) {
    readyFilters.page = DEFAULT_PAGE
  }

  if (stockFilters.page < 1) {
    stockFilters.page = DEFAULT_PAGE
  }

  const params = new URLSearchParams()
  params.set('section', nextSection)

  appendFilters(params, 'ready', readyFilters)
  appendFilters(params, 'stock', stockFilters)

  return params
}
