/* eslint-disable jsx-a11y/alt-text */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function FavoritesSidepanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state, removeFromFavorites, addToCart } = useCart();
  const { favorites } = state;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[65] bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-[90vw] max-w-md z-[70] bg-white shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Favorites"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-base font-semibold">Your Favorites</div>
              <button aria-label="Close favorites" onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {favorites.length === 0 ? (
                <div className="text-center text-gray-500 py-12">No favorites yet</div>
              ) : (
                <ul className="space-y-3">
                  {favorites.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-sm">{item.name}</div>
                        {item.brand && (
                          <div className="text-xs text-gray-400">{item.brand}</div>
                        )}
                        <div className="text-xs text-gray-500">{item.price.toFixed(2)} €</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => addToCart(item)}
                          className="text-xs px-3 py-1 rounded bg-black text-white hover:bg-gray-800 transition"
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => removeFromFavorites(item.id)}
                          className="text-xs px-3 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}