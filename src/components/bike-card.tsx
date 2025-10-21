import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InStockBike, ReadyBike, ShopSection } from "@/lib/types"

interface BikeCardProps {
  bike: ReadyBike | InStockBike
  section: ShopSection
}

const SECTION_LABELS: Record<ShopSection, string> = {
  "in-stock": "In Stock",
  "ready-to-order": "Ready to Order"
}

function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "N/A"
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(price)
}

function formatLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatSubcategories(values: string[]): string {
  if (values.length === 0) {
    return "General"
  }

  return values
    .slice(0, 2)
    .map(formatLabel)
    .join(", ")
}

export function BikeCard({ bike, section }: BikeCardProps) {
  const firstImage = bike.images[0]
  const primaryPrice = bike.old_price
  const href = `/bike/${bike.id}?section=${section}`

  return (
    <Link href={href}>
      <Card className="flex min-h-[500px] cursor-pointer flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-white">
          {firstImage ? (
            <img src={firstImage} alt={bike.title} className="max-h-full max-w-full object-contain px-4" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <span className="absolute left-3 top-0 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
            {SECTION_LABELS[section]}
          </span>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className={`${bike.title.length > 30 ? "text-sm" : "text-lg"} line-clamp-2`}>
            {bike.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{bike.brand}</p>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold">{formatPrice(primaryPrice)}</span>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>{formatLabel(bike.category)}</p>
              <p>{formatSubcategories(bike.subcategories)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
