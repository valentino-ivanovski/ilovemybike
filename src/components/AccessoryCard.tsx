"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

interface AccessoryCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

const spring = { type: "spring", stiffness: 300, damping: 15 } as const;

export default function AccessoryCard({
  id,
  name,
  price,
  image,
}: AccessoryCardProps) {
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isInFavorites(id));
  }, [id, isInFavorites]);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      category: "accessory",
      description: `${name} - Premium bike accessory`,
    });
  };

  const toggleFav = () => {
    if (isFav) {
      removeFromFavorites(id);
      setIsFav(false);
    } else {
      addToFavorites({
        id,
        name,
        price,
        image,
        category: "accessory",
        description: `${name} - Premium bike accessory`,
      });
      setIsFav(true);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={spring}
      className="group flex flex-col w-64 sm:w-[261px] bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-white to-zinc-50">
        <motion.div
          className="absolute inset-0 p-2 mt-4 border-b border-black/10"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={spring}
        >
          <Image
            src={image}
            alt={name}
            fill
            priority={false}
            className="object-contain sm:object-scale-down"
          />
        </motion.div>
        <motion.button
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          onClick={toggleFav}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={spring}
          className="absolute top-3 right-3 p-2"
        >
          {/* Updated heart SVG from BikeCard */}
          <motion.svg
            whileHover={{ scale: 1.2, rotate: -10 }}
            transition={spring}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 p-0.5"
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
      <div className="px-4 pb-4 pt-[20px] flex flex-col gap-1.5">
        <h3 className="font-semibold text-xl leading-tight text-zinc-900 truncate" title={name}>
          {name}
        </h3>
        <a
          href="#"
          className="text-black/40 text-sm hover:underline"
        >
          Read More →
        </a>

        <p className="font-bold text-2xl tracking-tight pt-1 pl-1 text-green-500">{price.toFixed(0)}€</p>

        {/* Add to cart button */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={spring}
          className="w-full mt-1 inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] text-white text-sm font-medium px-6 py-3 shadow-sm cursor-pointer"
        >
          Add to cart
        </motion.button>
      </div>
    </motion.article>
  );
}