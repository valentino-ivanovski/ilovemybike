import Link from "next/link"
import { notFound } from "next/navigation"
import { BikeDetailContent, ToggleOption } from "@/components/bike-detail-content"
import { getInStockBikeById, getReadyToOrderBikeById } from "@/lib/bikes"
import { InStockBikeWithVariants, ReadyBike, ShopSection } from "@/lib/types"

interface BikePageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function resolveSection(value: string | undefined): ShopSection {
  if (value === "in-stock") {
    return "in-stock"
  }
  return "ready-to-order"
}

export default async function BikePage({ params, searchParams }: BikePageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams])

  const section = resolveSection(typeof query.section === "string" ? query.section : undefined)

  const bikeId = Number(id)
  if (!Number.isFinite(bikeId)) {
    notFound()
  }

  const [inStockBike, readyBike] = await Promise.all([
    getInStockBikeById(bikeId, { includeVariants: section === "in-stock" }),
    getReadyToOrderBikeById(bikeId)
  ])

  const activeBike: ReadyBike | InStockBikeWithVariants | null = section === "in-stock" ? inStockBike : readyBike

  if (!activeBike) {
    notFound()
  }

  const basePath = `/bike/${bikeId}`

  const toggleOptions: ToggleOption[] = (["in-stock", "ready-to-order"] as ShopSection[]).map((targetSection) => ({
    section: targetSection,
    label: targetSection === "in-stock" ? "In Stock" : "Ready to Order",
    href: `${basePath}?section=${targetSection}`,
    disabled: targetSection === "in-stock" ? !inStockBike : !readyBike
  }))

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 transition-all duration-200 sm:text-base"
        >
          ← <span className="hover:underline underline-offset-4">Back to Shop</span>
        </Link>
      </div>

    <div className="">
      <BikeDetailContent
        section={section}
        activeBike={activeBike}
        inStockBike={inStockBike ?? null}
        readyBike={readyBike ?? null}
        toggleOptions={toggleOptions}
      />
    </div>
    </div>
  )
}
