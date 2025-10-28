import Link from "next/link"
import { Suspense } from "react"
import { BikeCard } from "@/components/bike-card"
import { ShopFilters } from "@/components/shop-filters"
import { ShopPagination } from "@/components/shop-pagination"
import { ShopSectionToggle } from "@/components/shop-section-toggle"
import {
  getInStockBikes,
  getInStockCategories,
  getInStockSubcategories,
  getReadyToOrderBikes,
  getReadyToOrderCategories,
  getReadyToOrderSubcategories
} from "@/lib/bikes"
import { buildSearchParamsForSection, parseSectionFilters } from "@/lib/shop-query"
import { ShopQueryState, ShopSection } from "@/lib/types"

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const SECTION_LABELS: Record<ShopSection, string> = {
  "in-stock": "In Stock",
  "ready-to-order": "Order"
}

function resolveSection(value: string | undefined): ShopSection {
  if (value === "ready-to-order") {
    return "ready-to-order"
  }
  return "in-stock"
}

function formatCountLabel(count: number, total: number) {
  return `Showing ${count} of ${total} bikes`
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const section = resolveSection(typeof params.section === "string" ? params.section : undefined)

  const readyFilters = parseSectionFilters("ready", params)
  const stockFilters = parseSectionFilters("stock", params)

  const state: ShopQueryState = {
    section,
    ready: readyFilters,
    stock: stockFilters
  }

  const activeFilters = section === "ready-to-order" ? state.ready : state.stock

  const [bikesData, categories, subcategories] = await Promise.all([
    section === "ready-to-order"
      ? getReadyToOrderBikes(activeFilters)
      : getInStockBikes(activeFilters),
    section === "ready-to-order" ? getReadyToOrderCategories() : getInStockCategories(),
    section === "ready-to-order"
      ? getReadyToOrderSubcategories(activeFilters.category)
      : getInStockSubcategories(activeFilters.category)
  ])

  const toggleOptions = (["in-stock", "ready-to-order"] as ShopSection[]).map((targetSection) => {
    const paramsForTarget = buildSearchParamsForSection(state, targetSection)
    const query = paramsForTarget.toString()
    return {
      section: targetSection,
      label: SECTION_LABELS[targetSection],
      href: `/shop${query ? `?${query}` : ""}`
    }
  })

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-64">
            <ShopFilters state={state} categories={categories} subcategories={subcategories} />
            <h2 className="text-lg font-semibold mt-4">Sections</h2>
            <ShopSectionToggle active={section} options={toggleOptions} className="" />
          </div>

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold">
                Shop · <span className="text-primary">{SECTION_LABELS[section]}</span>
              </h1>
              <p className="text-muted-foreground">{formatCountLabel(bikesData.bikes.length, bikesData.total)}</p>
            </div>

            <Suspense fallback={<div>Loading bikes...</div>}>
              {bikesData.bikes.length > 0 ? (
                <>
                  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bikesData.bikes.map((bike) => (
                      <BikeCard key={`${section}-${bike.id}`} bike={bike} section={section} />
                    ))}
                  </div>

                  <ShopPagination state={state} totalPages={bikesData.totalPages} />
                </>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">No bikes found matching your criteria.</p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

// Ensure this route always renders on the server at request time
// so shop data stays up to date and isn't statically cached.
export const dynamic = "force-dynamic"
export const revalidate = 0
