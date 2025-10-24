"use client"

import { useEffect, useMemo, useState } from "react"
import { Heart, Play, ShoppingCart } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ShopSectionToggle } from "@/components/shop-section-toggle"
import { InStockBikeWithVariants, ReadyBike, ShopSection } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/CartContext"
import { resolveVariantColorClass, stringToColor } from "@/lib/variant-colors"

const SECTION_LABELS: Record<ShopSection, string> = {
  "in-stock": "In Stock",
  "ready-to-order": "Ready to Order"
}

interface ToggleOption {
  section: ShopSection
  label: string
  href: string
  disabled?: boolean
}

interface BikeDetailContentProps {
  section: ShopSection
  activeBike: ReadyBike | InStockBikeWithVariants
  inStockBike: InStockBikeWithVariants | null
  readyBike: ReadyBike | null
  toggleOptions: ToggleOption[]
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
  return values.map(formatLabel).join(", ")
}

function buildReadyDescription(bike: ReadyBike): string {
  const categories = formatLabel(bike.category)
  const rides = bike.subcategories.length > 0 ? formatSubcategories(bike.subcategories) : "everyday"
  return `Discover the ${bike.title} from ${bike.brand}. This ${categories.toLowerCase()} bike is ready to order and ideal for ${rides.toLowerCase()} rides.`
}

export function BikeDetailContent({
  section,
  activeBike,
  inStockBike,
  readyBike,
  toggleOptions
}: BikeDetailContentProps) {
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart()
  const isInStock = section === "in-stock" && Boolean(inStockBike)
  const currentInStock = isInStock && inStockBike ? inStockBike : null
  const variants = currentInStock?.variants ?? []
  const hasVariantChoices = variants.length > 1
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(variants[0]?.id ?? null)
  const bikeId = String(activeBike.id)
  const [isFavorite, setIsFavorite] = useState(() => isInFavorites(bikeId))

  useEffect(() => {
    if (variants.length === 0) {
      setSelectedVariantId(null)
      return
    }

    const stillExists = variants.some((variant) => variant.id === selectedVariantId)
    if (!stillExists) {
      setSelectedVariantId(variants[0].id)
    }
  }, [variants, selectedVariantId])

  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedVariantId) ?? null,
    [variants, selectedVariantId]
  )

  const defaultPrice = activeBike.old_price

  const displayPrice =
    isInStock && selectedVariant
      ? selectedVariant.price
      : defaultPrice

  const youtubeLink = currentInStock?.youtube_link?.trim() || null
  const descriptionText =
    currentInStock && section === "in-stock"
      ? currentInStock.description
      : readyBike
        ? buildReadyDescription(readyBike)
        : ""

  const handleAddToCart = () => {
    if (variants.length > 0 && !selectedVariant) {
      return
    }

    const primaryImage = activeBike.images[0] ?? ""
    const variantDetails = selectedVariant
      ? {
          variantId: selectedVariant.id,
          variantName: selectedVariant.variant_name
        }
      : {}

    const cartItemId = selectedVariant ? `variant-${selectedVariant.id}` : `bike-${activeBike.id}`

    addToCart({
      id: cartItemId,
      name: activeBike.title,
      brand: activeBike.brand,
      price: displayPrice ?? 0,
      image: primaryImage,
      category: formatLabel(activeBike.category),
      description: descriptionText,
      section,
      ...variantDetails
    })
  }

  const disableAddToCart = hasVariantChoices && !selectedVariant

  useEffect(() => {
    setIsFavorite(isInFavorites(bikeId))
  }, [bikeId, isInFavorites])

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(bikeId)
      setIsFavorite(false)
      return
    }

    addToFavorites({
      id: bikeId,
      name: activeBike.title,
      brand: activeBike.brand,
      price: displayPrice ?? activeBike.old_price ?? 0,
      image: activeBike.images[0] ?? "",
      category: formatLabel(activeBike.category),
      description: descriptionText
    })
    setIsFavorite(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:min-h-screen lg:flex lg:items-center lg:justify-center">

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-4 px-6">
          {activeBike.images.length > 1 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {activeBike.images.map((image, index) => (
                  <CarouselItem key={`${image}-${index}`}>
                    <div className="relative aspect-square">
                      <img
                        src={image}
                        alt={`${activeBike.title} - Image ${index + 1}`}
                        className="h-full w-full rounded-lg bg-white object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="relative aspect-square">
              <img
                src={activeBike.images[0] || ""}
                alt={activeBike.title}
                className="h-full w-full rounded-lg bg-white object-contain"
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-4xl font-bold">
              {activeBike.title}{" "}
              <span className="ml-2 text-lg font-semibold text-primary">{SECTION_LABELS[section]}</span>
            </h1>
            <p className="mb-4 text-xl text-muted-foreground">{activeBike.brand}</p>
            <div className="mb-4 flex flex-wrap items-end gap-4">
              <span className="text-4xl font-bold text-primary">{formatPrice(displayPrice)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Category: {formatLabel(activeBike.category)}</p>
              <p>Subcategories: {formatSubcategories(activeBike.subcategories)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-muted-foreground">
              {descriptionText}
            </p>
          </div>

          {currentInStock && hasVariantChoices && (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant) => {
                    const isSelected = variant.id === selectedVariantId
                    const backgroundClass = resolveVariantColorClass(variant.color_class)
                    const fallbackColorStyle = backgroundClass ? undefined : { backgroundColor: stringToColor(variant.variant_name) }

                    return (
                      <Button
                        key={`variant-${variant.id}`}
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={cn(
                          "h-10 w-10 rounded-md border border-border bg-background p-0 transition-all",
                          isSelected
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:ring-2 hover:ring-primary/40 hover:ring-offset-2"
                        )}
                        aria-label={variant.variant_name}
                        title={variant.variant_name}
                      >
                        <span
                          className={cn(
                            "block h-6 w-6 rounded-md border border-black/10",
                            backgroundClass ?? ""
                          )}
                          style={fallbackColorStyle}
                        />
                        <span className="sr-only">{variant.variant_name}</span>
                      </Button>
                    )
                  })}
                </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <Button className="inline-flex items-center gap-2" onClick={handleAddToCart} disabled={disableAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              type="button"
              variant={isFavorite ? "default" : "outline"}
              className="inline-flex items-center gap-2"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
              {isFavorite ? "Favorited" : "Favorite"}
            </Button>
            {youtubeLink ? (
              <Button variant="secondary" className="inline-flex items-center gap-2" asChild>
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4" />
                  Watch Video
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export type { ToggleOption }
