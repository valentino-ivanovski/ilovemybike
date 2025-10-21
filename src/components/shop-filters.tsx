"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { buildSearchParamsForSection } from "@/lib/shop-query"
import { SectionFilters, ShopQueryState } from "@/lib/types"
import { useRouter } from "next/navigation"

interface ShopFiltersProps {
  state: ShopQueryState
  categories: string[]
  subcategories: string[]
}

function formatLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function ShopFilters({ state, categories, subcategories }: ShopFiltersProps) {
  const router = useRouter()
  const activeFilters = state.section === "ready-to-order" ? state.ready : state.stock

  const pushWithOverrides = (overrides: Partial<SectionFilters>) => {
    const params = buildSearchParamsForSection(state, state.section, overrides)
    const queryString = params.toString()
    router.push(queryString ? `/shop?${queryString}` : "/shop")
  }

  const handleCategoryChange = (value: string) => {
    pushWithOverrides({
      category: value === "all" ? undefined : value,
      subcategory: undefined,
      page: 1
    })
  }

  const handleSubcategoryChange = (value: string) => {
    pushWithOverrides({
      subcategory: value === "all" ? undefined : value,
      page: 1
    })
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [SectionFilters["sortBy"], SectionFilters["sortOrder"]]
    pushWithOverrides({
      sortBy,
      sortOrder,
      page: 1
    })
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <Select value={activeFilters.category ?? "all"} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {formatLabel(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Subcategory</label>
          <Select value={activeFilters.subcategory ?? "all"} onValueChange={handleSubcategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Subcategories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subcategories</SelectItem>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {formatLabel(subcategory)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Sort By</label>
          <Select value={`${activeFilters.sortBy}-${activeFilters.sortOrder}`} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">Name (A-Z)</SelectItem>
              <SelectItem value="title-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
