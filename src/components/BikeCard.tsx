"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BikeCardProps {
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
  onAddToCart?: () => void;
  onToggleFavorite?: (fav: boolean) => void;
}

const spring = { type: "spring", stiffness: 300, damping: 15 } as const;

export default function BikeCard({
  category,
  name,
  description,
  price,
  image,
  onAddToCart,
  onToggleFavorite,
}: BikeCardProps) {
  const [isFav, setIsFav] = useState(false);

  const toggleFav = () => {
    const next = !isFav;
    setIsFav(next);
    onToggleFavorite?.(next);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={spring}
      className="group flex flex-col bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden"
    >
      {/* Image + Favorite */}
      <div className="relative w-full h-64 bg-gradient-to-b from-white to-zinc-50">
        <Image
          src={image}
          alt={name}
          fill
          priority={false}
          className="object-contain p-6"
        />

        {/* Favorites button */}
        <motion.button
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          onClick={toggleFav}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={{ scale: isFav ? [1, 1.18, 1] : 1 }}
          transition={spring}
          className="absolute top-3 right-3 rounded-full backdrop-blur bg-white/90 border border-black/10 shadow-sm p-2"
        >
          {/* Provided heart SVG: outline when not clicked, green when clicked */}
          <motion.svg
            whileHover={{ scale: 1.2 }}
            transition={spring}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6"
            fill={isFav ? "#22c55e" : "transparent"}
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#E56F6F" />
                <stop offset="100%" stopColor="#FAD814" />
              </linearGradient>
            </defs>
            <motion.path
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              stroke={isFav ? "#22c55e" : "#9ca3af"}
              strokeWidth={isFav ? 0 : 34}
              animate={{ scale: isFav ? [1, 1.12, 1] : 1 }}
              transition={spring}
            />
          </motion.svg>
        </motion.button>
      </div>

      {/* Text content */}
      <div className="px-5 pb-5 pt-4 flex flex-col gap-2">
        <p className="text-xs tracking-wide text-gray-500">{category}</p>
        <h3 className="font-semibold text-xl leading-tight text-zinc-900">{name}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{description}</p>

        <div className="mt-1 flex items-center justify-between">
          <p className="font-extrabold text-2xl tracking-tight text-[#E11D48]">{price}</p>

          {/* Add to cart button */}
          <motion.button
            onClick={onAddToCart}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className="inline-flex items-center justify-center rounded-full bg-black text-white text-sm font-medium px-6 py-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/70"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}