"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { buildSearchParamsForSection } from "@/lib/shop-query"
import { SectionFilters, ShopQueryState } from "@/lib/types"

interface ShopPaginationProps {
  state: ShopQueryState
  totalPages: number
}

export function ShopPagination({ state, totalPages }: ShopPaginationProps) {
  const activeFilters = state.section === "ready-to-order" ? state.ready : state.stock

  const buildUrl = (overrides: Partial<SectionFilters>) => {
    const params = buildSearchParamsForSection(state, state.section, overrides)
    const queryString = params.toString()
    return `/shop${queryString ? `?${queryString}` : ""}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2">
      {activeFilters.page > 1 && (
        <Button asChild variant="outline">
          <Link href={buildUrl({ page: activeFilters.page - 1 })}>Previous</Link>
        </Button>
      )}

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= activeFilters.page - 2 && page <= activeFilters.page + 2)
          ) {
            return (
              <Button key={page} asChild variant={page === activeFilters.page ? "default" : "outline"}>
                <Link href={buildUrl({ page })}>{page}</Link>
              </Button>
            )
          } else if (page === activeFilters.page - 3 || page === activeFilters.page + 3) {
            return (
              <span key={page} className="px-2">
                ...
              </span>
            )
          }
          return null
        })}
      </div>

      {activeFilters.page < totalPages && (
        <Button asChild variant="outline">
          <Link href={buildUrl({ page: activeFilters.page + 1 })}>Next</Link>
        </Button>
      )}
    </div>
  )
}
