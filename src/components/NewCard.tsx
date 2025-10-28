import { FiHeart } from "react-icons/fi";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  className = "",
  ...rest
}: NewCardProps) {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const [isFav, setIsFav] = useState(false);
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

  return (
    <div
      className={`flex h-full min-w-[300px] w-full flex-col border-r border-b border-slate-200 bg-white text-slate-900 ${className}`}
      {...rest}
    >
      <div className="flex items-start justify-between gap-4 p-4 pb-2">
        <div className="space-y-1 z-50">
          <p className="text-md font-medium uppercase tracking-wide">{title}</p>
          {brand && (
            <p className="text-xs text-slate-500 uppercase tracking-wide">{brand}</p>
          )}
        </div>
        <div className="z-50 text-right">
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
            priority
          />

      </div>

      <div className="flex z-50 items-center justify-between px-4 pb-4 pt-2">
        <p className="text-xs text-slate-500">
          {category}
          {subcategory ? ` · ${subcategory}` : ""}
        </p>
        <motion.button
          type="button"
          onClick={handleToggleFavorite}
          aria-pressed={isFav}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className="group relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:shadow-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isFav ? (
            <FiHeart className="text-sm text-red-500 fill-red-500" />
          ) : (
            <FiHeart className="text-sm text-slate-600" />
          )}
          <span>{compareLabel}</span>
        </motion.button>
      </div>
    </div>
  );
}
