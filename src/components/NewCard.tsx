import { FiHeart } from "react-icons/fi";
import Image from "next/image";
import type { ComponentPropsWithoutRef, KeyboardEvent, MouseEvent } from "react";
import { useCart } from "@/contexts/CartContext";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopSection } from "@/lib/types";

type NewCardProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title: string;
  brand?: string;
  price: number;
  category: string;
  subcategory?: string;
  popular?: string;
  description: string;
  imageSrc: string;
  compareLabel?: string;
  ctaLabel?: string;
  section?: ShopSection;
};

export default function NewCard({
  id,
  title,
  brand,
  price,
  category,
  subcategory,
  popular,
  description,
  imageSrc,
  compareLabel = "Favorites",
  ctaLabel = "Explore",
  section = "in-stock",
  className = "",
}: NewCardProps) {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const [isFav, setIsFav] = useState(false);
  const router = useRouter();
  const priceFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  const formattedPrice = priceFormatter.format(price);

  useEffect(() => {
    setIsFav(isInFavorites(id));
  }, [id, isInFavorites]);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(id);
      setIsFav(false);
      return;
    }
    addToFavorites({
      id,
      name: title,
      brand,
      price,
      category,
      description,
      image: imageSrc,
    });
    setIsFav(true);
  };

  const navigateToBike = () => {
    router.push(`/bike/${id}?section=${section}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToBike();
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${title}`}
      onClick={navigateToBike}
      onKeyDown={handleKeyDown}
      className={`flex h-full min-w-[300px] w-full flex-col border-r border-b border-slate-200 bg-white text-slate-900 cursor-pointer ${className}`}
    >
      <div className="flex items-start justify-between gap-4 p-4 pb-2">
        <div className="space-y-1 z-10">
          <p className="text-md font-medium uppercase tracking-wide">{title}</p>
          {brand && (
            <p className="text-xs text-slate-500 uppercase tracking-wide">{brand}</p>
          )}
        </div>
        <div className="z-10 text-right">
          <p className="text-md font-regular">{formattedPrice}</p>
          {popular && (
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
              {popular}
            </span>
          )}
        </div>
      </div>

      <div className="relative mx-4 my-2 flex-1">
        
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            loading="lazy"
            fetchPriority="low"
          />

      </div>

      <div className="flex z-10 items-center justify-between px-4 pb-4 pt-2">
        <p className="text-xs text-slate-500">
          {category}
          {subcategory ? ` · ${subcategory}` : ""}
        </p>
        <button
          type="button"
          onClick={(e: MouseEvent) => { e.stopPropagation(); handleToggleFavorite(); }}
          onKeyDown={(e: KeyboardEvent) => e.stopPropagation()}
          aria-pressed={isFav}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className="group relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 cursor-pointer"
        >
          {isFav ? (
            <FiHeart className="text-sm text-red-500 fill-red-500" />
          ) : (
            <FiHeart className="text-sm text-slate-600" />
          )}
          <span>{compareLabel}</span>
        </button>
      </div>
    </motion.div>
  );
}
