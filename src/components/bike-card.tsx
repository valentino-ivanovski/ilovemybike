"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { InStockBike, InStockBikeWithVariants, ReadyBike, ShopSection, BikeVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { resolveVariantColorClass, stringToColor } from "@/lib/variant-colors";

interface BikeCardProps {
  bike: ReadyBike | InStockBikeWithVariants;
  section: ShopSection;
}

const spring = { type: "spring", stiffness: 300, damping: 15 } as const;

function isInStockBikeWithVariants(bike: ReadyBike | InStockBike | InStockBikeWithVariants): bike is InStockBikeWithVariants {
  return Array.isArray((bike as InStockBikeWithVariants).variants);
}

function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "N/A";
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatSubcategories(values: string[]): string {
  if (values.length === 0) {
    return "General";
  }

  return values
    .slice(0, 2)
    .map(formatLabel)
    .join(", ");
}

function getDescription(bike: ReadyBike | InStockBike): string {
  if ("description" in bike && typeof bike.description === "string" && bike.description.trim().length > 0) {
    return bike.description;
  }

  const subcategories = formatSubcategories(bike.subcategories);
  return `${formatLabel(bike.category)} · ${subcategories}`;
}

export function BikeCard({ bike, section }: BikeCardProps) {
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const [isFav, setIsFav] = useState(false);

  const bikeId = String(bike.id);
  const href = `/bike/${bike.id}?section=${section}`;
  const primaryImage = bike.images[0] ?? null;
  const inStockVariants = useMemo<BikeVariant[]>(() => {
    if (section !== "in-stock") {
      return [];
    }
    if (isInStockBikeWithVariants(bike)) {
      return bike.variants;
    }
    return [];
  }, [bike, section]);
  const firstVariant = inStockVariants[0] ?? null;
  const primaryPrice = firstVariant ? firstVariant.price : (bike.new_price ?? bike.old_price);
  const formattedPrice = useMemo(() => formatPrice(primaryPrice), [primaryPrice]);
  const description = useMemo(() => getDescription(bike), [bike]);
  const categoryLabel = useMemo(() => formatLabel(bike.category), [bike.category]);
  const isPopular = useMemo(() => "popular" in bike && Boolean((bike as InStockBike).popular), [bike]);
  useEffect(() => {
    setIsFav(isInFavorites(bikeId));
  }, [bikeId, isInFavorites]);

  const toggleFav = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFav) {
      removeFromFavorites(bikeId);
    } else {
      addToFavorites({
        id: bikeId,
        name: bike.title,
        brand: bike.brand,
        price: primaryPrice ?? 0,
        image: primaryImage ?? "",
        category: categoryLabel,
        description,
      });
    }
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const variantDetails = firstVariant
      ? {
          id: `variant-${firstVariant.id}`,
          price: firstVariant.price,
          variantId: firstVariant.id,
          variantName: firstVariant.variant_name,
        }
      : null;

    addToCart({
      id: variantDetails?.id ?? bikeId,
      name: bike.title,
      brand: bike.brand,
      price: variantDetails?.price ?? (primaryPrice ?? 0),
      image: primaryImage ?? "",
      category: categoryLabel,
      description,
      section,
      ...(variantDetails
        ? {
            variantId: variantDetails.variantId,
            variantName: variantDetails.variantName,
          }
        : {}),
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={spring}
      className="group flex h-[530px] flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white shadow-md"
    >
      <div className="relative h-64 w-full bg-white">
        {primaryImage ? (
          <Link href={href} className="relative block h-full w-full">
            <Image
              src={primaryImage}
              alt={bike.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
              className="pointer-events-none select-none object-contain p-6"
            />
          </Link>
        ) : (
          <Link href={href} className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm text-zinc-500">
            No Image Available
          </Link>
        )}

        {isPopular && (
          <span className="absolute left-4 top-4 rounded-full bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            Popular
          </span>
        )}

        {inStockVariants.length > 1 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-1 shadow-sm backdrop-blur-sm">
            {inStockVariants.slice(0, 5).map((variant) => {
              const backgroundClass = resolveVariantColorClass(variant.color_class);
              const fallbackColorStyle = backgroundClass ? undefined : { backgroundColor: stringToColor(variant.variant_name) };
              return (
                <span
                  key={variant.id}
                  className={cn("h-4 w-4 rounded-[4px] border border-black/10", backgroundClass ?? "")}
                  style={fallbackColorStyle}
                  aria-label={variant.variant_name}
                  title={variant.variant_name}
                />
              );
            })}
            {inStockVariants.length > 5 && (
              <span className="ml-1 text-[10px] font-medium text-gray-700">+{inStockVariants.length - 5}</span>
            )}
          </div>
        )}

        <motion.button
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          onClick={toggleFav}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={spring}
          className="absolute right-3 top-3 rounded-full cursor-pointer p-2 shadow-sm backdrop-blur-sm"
        >
          <motion.svg
            whileHover={{ scale: 1.2, rotate: -10 }}
            transition={spring}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-6 w-6 p-0.5"
            fill={isFav ? "url(#goldHeart)" : "transparent"}
          >
            <defs>
              <linearGradient id="goldHeart" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E7C14F" />
                <stop offset="100%" stopColor="#C9A227" />
              </linearGradient>
            </defs>
            <motion.path
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              stroke={isFav ? "#22c55e" : "#9ca3af"}
              strokeWidth={isFav ? 0 : 34}
              transition={spring}
            />
          </motion.svg>
        </motion.button>
      </div>

      <div className="flex flex-col justify-end flex-1 gap-2 px-5 pb-5 pt-4">
        <p className="text-xs tracking-wide text-gray-500">
          {categoryLabel}
          {bike.subcategories.length > 0 && (
            <>
              {" "}
              |{" "}
              {bike.subcategories
                .slice(0, 2)
                .map((sub, idx) => formatLabel(sub))
                .join(", ")}
            </>
          )}
        </p>
        <Link href={href} className="max-w-fit">
          <h3 className="cursor-pointer text-xl font-semibold leading-tight text-zinc-900 hover:underline">
            {bike.title}
          </h3>
        </Link>
        {bike.brand && <p className="text-sm text-zinc-400">{bike.brand}</p>}
        <p
          className={`${
            bike.title.length > 25
              ? "line-clamp-2"
              : "line-clamp-4"
          } text-sm leading-relaxed text-zinc-500`}
        >
          {description}
        </p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <div>
            <p className="pl-1 pt-1 text-2xl font-bold tracking-tight text-green-500">{formattedPrice}</p>
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className="ml-4.5 inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] px-6 py-3 text-sm font-medium text-white shadow-sm w-full"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
