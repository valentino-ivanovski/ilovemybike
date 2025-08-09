"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export default function CartSidepanel({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}) {
  const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
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
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-base font-semibold">Your Cart</div>
              <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 py-12">Your cart is empty</div>
              ) : (
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.image} alt="" className="w-16 h-16 rounded object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-sm">{it.title}</div>
                        <div className="text-xs text-gray-500">{it.price.toFixed(2)} €</div>
                        <div className="mt-2 text-xs text-gray-600">Qty: {it.quantity}</div>
                      </div>
                      <div className="text-sm font-semibold">{(it.price * it.quantity).toFixed(2)} €</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Total</span>
                <span className="font-semibold">{total.toFixed(2)} €</span>
              </div>
              <button className="w-full py-2 rounded-md bg-black text-white hover:opacity-90 active:scale-[.99] transition">
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}