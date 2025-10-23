"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function CartSidepanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { items } = state;
  const total = getTotalPrice();
  const [isCheckingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const inStockItems = useMemo(
    () => items.filter((item) => (item.section ?? "in-stock") === "in-stock"),
    [items],
  );
  const hasPurchasableItems = inStockItems.length > 0;

  const handleCheckout = async () => {
    if (!hasPurchasableItems || isCheckingOut) {
      return;
    }

    setCheckoutError(null);
    setCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = typeof data?.error === "string" ? data.error : "Unable to start checkout.";
        setCheckoutError(message);
        return;
      }

      if (typeof data?.url === "string" && data.url.length > 0) {
        window.location.assign(data.url);
        return;
      }

      setCheckoutError("Stripe checkout URL missing. Please try again.");
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Unexpected error. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  };

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
                <div className="py-3">
                  <ul className="flex flex-col gap-y-3">
                    {items.map((it) => (
                      <li key={it.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="relative w-16 h-16 rounded overflow-hidden">
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-sm">{it.name}</div>
                          {it.brand && (
                            <div className="text-xs text-gray-400">{it.brand}</div>
                          )}
                          <div className="text-xs text-gray-500">{it.price.toFixed(2)} €</div>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(it.id, it.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="text-xs font-medium w-8 text-center">{it.quantity}</span>
                            <button
                              onClick={() => updateQuantity(it.id, it.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-sm font-semibold">{(it.price * it.quantity).toFixed(2)} €</div>
                          <button
                            onClick={() => removeFromCart(it.id)}
                            className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Total</span>
                <span className="font-semibold">{total.toFixed(2)} €</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={!hasPurchasableItems || isCheckingOut}
                  className="w-full py-2 rounded-md bg-black text-white hover:opacity-90 active:scale-[.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? "Redirecting..." : "Checkout"}
                </button>
                {checkoutError && (
                  <p className="text-xs text-red-600">{checkoutError}</p>
                )}
                {items.length > 0 && !hasPurchasableItems && (
                  <p className="text-xs text-amber-600">
                    Only In Stock items can be purchased online. Add an In Stock bike to continue.
                  </p>
                )}
                {hasPurchasableItems && inStockItems.length < items.length && (
                  <p className="text-xs text-amber-600">
                    Items outside the In Stock section will stay in your cart.
                  </p>
                )}
                {items.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="w-full py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[.99] transition"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
