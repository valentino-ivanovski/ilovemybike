"use client";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { ShopSection } from "@/lib/types";

interface BikeCardProps {
  id: string;
  category: string;
  name: string;
  brand?: string;
  description: string;
  price: number;
  image: string;
  section?: ShopSection;
}

const spring = { type: "spring", stiffness: 300, damping: 15 } as const;

export default function BikeCard({
  id,
  category,
  name,
  brand,
  description,
  price,
  image,
  section = "in-stock",
}: BikeCardProps) {
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const [isFav, setIsFav] = useState(false);

  // Check if item is in favorites on mount and when favorites change
  useEffect(() => {
    setIsFav(isInFavorites(id));
  }, [id, isInFavorites]);

  const toggleFav = () => {
    if (isFav) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        name,
        brand,
        price,
        image,
        category,
        description,
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      brand,
      price,
      image,
      category,
      description,
      section,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={spring}
      className="group flex flex-col bg-white cursor-grab rounded-3xl border border-black/5 shadow-md overflow-hidden"
    >
      {/* Image + Favorite */}
      <div className="relative w-full h-64 bg-gradient-to-b from-white to-zinc-50">
        <Image
          src={image}
          alt={name}
          fill
          priority={false}
          className="object-contain select-none pointer-events-none p-6"
        />

        {/* Favorites button */}
        <motion.button
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          onClick={toggleFav}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={spring}
          className="absolute top-3 right-3 p-2"
        >
          {/* Provided heart SVG: outline when not clicked, green when clicked */}
          <motion.svg
            whileHover={{ scale: 1.2, rotate: -10 }}
            transition={spring}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 p-0.5 cursor-pointer"
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

      {/* Text content */}
      <div className="px-5 pb-5 pt-4 flex flex-col gap-2">
        <p className="text-xs tracking-wide text-gray-500 select-none pointer-events-none">{category}</p>
        <h3 className="font-semibold text-xl max-w-fit leading-tight text-zinc-900 cursor-pointer hover:underline select-none">{name}</h3>
        {brand && <p className="text-sm text-zinc-400 select-none pointer-events-none">{brand}</p>}
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 select-none pointer-events-none">{description}</p>

        <div className="mt-1 flex items-center justify-between">
          <p className="font-bold text-2xl tracking-tight pt-1 pl-1 text-green-500 select-none pointer-events-none">{price.toFixed(0)}€</p>

          {/* Add to cart button */}
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className="flex-1 ml-4.5 select-none pointer-events-none inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] cursor-pointer text-white text-sm font-medium px-6 py-3 shadow-sm"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
