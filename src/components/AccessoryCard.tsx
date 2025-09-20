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
  const { addToCart } = useCart();

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={spring}
      className="group flex flex-col bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-gradient-to-b from-white to-zinc-50">
        <Image
          src={image}
          alt={name}
          fill
          priority={false}
          className="object-contain p-6"
        />
      </div>

      {/* Text content */}
      <div className="px-5 pb-5 pt-4 flex flex-col gap-3">
        <h3 className="font-semibold text-xl leading-tight text-zinc-900">{name}</h3>

        <div className="flex items-center justify-between">
          <p className="font-extrabold text-2xl tracking-tight pt-1 pl-1 text-green-500">{price.toFixed(0)}€</p>

          {/* Add to cart button */}
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className="flex-1 ml-4.5 inline-flex items-center justify-center rounded-full bg-black text-white text-sm font-medium px-6 py-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/70"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}