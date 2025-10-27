"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import "flag-icons/css/flag-icons.min.css";

import FavoritesSidepanel from "./FavoritesSidepanel";
import CartSidepanel from "./CartSidepanel";
import { useCart } from "@/contexts/CartContext";

const NewHeader = () => {
  const { state, getTotalItems } = useCart();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFavOpen, setFavOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "el">("en");

  const closeAllMenus = () => {
    setMenuOpen(false);
    setFavOpen(false);
    setCartOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-[100] w-full h-[54px] sm:h-[48px] border-b border-gray-300 font-semibold text-black bg-gray-100">
      <nav className="w-full">
        <div className="flex flex-row items-center justify-between px-6 2xl:px-20 transform translate-y-[15px] sm:translate-y-[12px]">
          <Link href="/shop" className="text-sm  hover:underline cursor-pointer">
            SHOP
          </Link>
          <div className="flex w-full flex-row justify-center">
            <motion.svg
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-[1.5em] w-[1.5em] cursor-pointer align-middle cursor-pointer"
              fill="url(#newHeaderHeartGradient)"
            >
              <defs>
                <linearGradient id="newHeaderHeartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#35ac2cff" />
                  <stop offset="100%" stopColor="#79f966ff" />
                </linearGradient>
              </defs>
              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
            </motion.svg>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-controls="site-menu-drawer"
            aria-expanded={isMenuOpen}
            className="text-sm font-semibold hover:underline cursor-pointer"
          >
            MENU
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/30"
              onClick={closeAllMenus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              id="site-menu-drawer"
              className="fixed top-0 right-0 z-[60] flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b p-4">
                <div className="select-none text-center leading-tight">
                  <div className="flex items-center justify-center gap-1 text-sm font-extrabold tracking-wide text-gray-900">
                    <span>I</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block h-4 w-4 align-middle" fill="url(#goldHeart)">
                      <defs>
                        <linearGradient id="goldHeart" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#E7C14F" />
                          <stop offset="100%" stopColor="#C9A227" />
                        </linearGradient>
                      </defs>
                      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                    </svg>
                    <span>MY</span>
                  </div>
                  <div className="text-sm font-extrabold tracking-wide text-gray-900">BIKE</div>
                </div>
                <button aria-label="Close menu" onClick={closeAllMenus} className="rounded-md p-2 hover:bg-gray-100">
                  <FaTimes className="text-xl text-gray-700" />
                </button>
              </div>

              <div className="border-b p-4">
                <div className="flex items-center rounded-lg bg-gray-100 px-3 py-2">
                  <FaSearch className="mr-2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="border-b p-4">
                <div className="flex items-stretch gap-3">
                  <button
                    className="relative flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 transition hover:bg-gray-50 hover:shadow-sm active:scale-95"
                    onClick={() => setFavOpen(true)}
                  >
                    <FaHeart className="text-xl text-yellow-500" />
                    {state.favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {state.favorites.length}
                      </span>
                    )}
                    <span className="text-xs text-gray-700">Favorites</span>
                  </button>
                  <button
                    className="relative flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 transition hover:bg-gray-50 hover:shadow-sm active:scale-95"
                    onClick={() => setCartOpen(true)}
                  >
                    <FaShoppingCart className="text-xl text-gray-700" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {getTotalItems()}
                      </span>
                    )}
                    <span className="text-xs text-gray-700">Cart</span>
                  </button>
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-xs font-medium text-gray-500">Language</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`flex items-center justify-center gap-2 rounded-md border p-2 ${lang === "en" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
                      onClick={() => setLang("en")}
                    >
                      <span className="fi fi-gb rounded-[4px]" />
                      <span className="text-sm">English</span>
                    </button>
                    <button
                      className={`flex items-center justify-center gap-2 rounded-md border p-2 ${lang === "el" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
                      onClick={() => setLang("el")}
                    >
                      <span className="fi fi-gr rounded-[4px]" />
                      <span className="text-sm">Greek</span>
                    </button>
                  </div>
                </div>
              </div>

              <nav className="flex flex-col gap-3 p-4 text-gray-700">
                <a
                  href="/"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium transition hover:bg-gray-100"
                >
                  Home
                </a>
                <a
                  href="/shop"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium transition hover:bg-gray-100"
                >
                  Shop
                </a>
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium transition hover:bg-gray-100"
                >
                  Contact
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <FavoritesSidepanel isOpen={isFavOpen} onClose={() => setFavOpen(false)} />
      <CartSidepanel isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default NewHeader;
