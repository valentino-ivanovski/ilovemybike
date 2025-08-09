/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "flag-icons/css/flag-icons.min.css";
import { motion, AnimatePresence } from "framer-motion";

// Types for demo purposes (replace with your app's real types/state)
interface FavoriteItem {
  id: string;
  title: string;
  image: string;
  price?: number;
}

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

// Favorites sidepanel component (local)
const FavoritesSidepanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: FavoriteItem[];
}> = ({ isOpen, onClose, items }) => (
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
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
            {items.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No favorites yet</div>
            ) : (
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt="" className="w-16 h-16 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-sm">{it.title}</div>
                      {typeof it.price === 'number' && (
                        <div className="text-xs text-gray-500">{it.price.toFixed(2)} €</div>
                      )}
                    </div>
                    <button className="text-xs px-2 py-1 rounded border hover:bg-gray-100">View</button>
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

// Cart sidepanel component (local)
const CartSidepanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}> = ({ isOpen, onClose, items }) => {
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
};

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "el">("en");
  const [isLangOpen, setLangOpen] = useState(false);
  const [isFavOpen, setFavOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  // Demo data — replace with real state/context
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Mobile / Tablet (≤ md) */}
      <motion.div
        className="flex md:hidden w-full items-center justify-between px-4 py-5 bg-white/90 backdrop-blur-md shadow-sm ring-1 ring-black/10"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0 }}
      >
        {/* Left: language */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 active:scale-95 transition"
            aria-haspopup="listbox"
            aria-expanded={isLangOpen}
          >
            <span className={`fi ${lang === "en" ? "fi-gb" : "fi-gr"} rounded-[5px]`} />
            <motion.span
              animate={{ rotate: isLangOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              <FaChevronDown className="text-gray-600 text-sm" />
            </motion.span>
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute top-full left-0 mt-2 w-36 rounded-md border bg-white shadow-md z-[70] overflow-hidden"
                role="listbox"
              >
                <li>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                    onClick={() => { setLang("en"); setLangOpen(false); }}
                  >
                    <span className="fi fi-gb rounded-[4px]" />
                    <span className="text-sm text-gray-800">English</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                    onClick={() => { setLang("el"); setLangOpen(false); }}
                  >
                    <span className="fi fi-gr rounded-[4px]" />
                    <span className="text-sm text-gray-800">Greek</span>
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Center: logo */}
        <div className="leading-tight mr-6 text-center select-none">
          <div className="flex items-center justify-center gap-1 text-xs font-extrabold tracking-wide text-gray-900">
            <span>I</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-3.5 h-3.5 inline-block align-middle"
              fill="url(#goldHeart)"
            >
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
          <div className="text-xs font-extrabold tracking-wide text-gray-900">BIKE</div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-4">
          <button aria-label="Menu" onClick={() => { setMenuOpen(true); setLangOpen(false); setFavOpen(false); }} className="p-1.5 rounded-md hover:bg-gray-100 active:scale-95 transition">
            <FaBars className="text-gray-700 text-lg" />
          </button>
        </div>
      </motion.div>

      {/* Desktop (≥ md by design, shown ≥ md) */}
      <motion.div
        className="hidden md:flex w-full justify-center pt-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
      >
        <div className="w-[95%] max-w-fit rounded-2xl bg-white/90 backdrop-blur-md shadow-sm ring-1 ring-black/10 px-4 sm:px-6 py-3 items-center justify-between gap-8 flex">
          {/* Left: flag and nav */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 active:scale-95 transition"
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                <span className={`fi ${lang === "en" ? "fi-gb" : "fi-gr"} rounded-[5px]`} />
                <motion.span
                  animate={{ rotate: isLangOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-block"
                >
                  <FaChevronDown className="text-gray-600 text-sm" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-full left-0 mt-2 w-40 rounded-md border bg-white shadow-md z-[70] overflow-hidden"
                    role="listbox"
                  >
                    <li>
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                        onClick={() => { setLang("en"); setLangOpen(false); }}
                      >
                        <span className="fi fi-gb rounded-[4px]" />
                        <span className="text-sm text-gray-800">English</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                        onClick={() => { setLang("el"); setLangOpen(false); }}
                      >
                        <span className="fi fi-gr rounded-[4px]" />
                        <span className="text-sm text-gray-800">Greek</span>
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <nav className="hidden sm:flex items-center gap-8 pl-8 pr-6 text-gray-700">
              <a href="#" className="hover:text-black">Home</a>
              <a href="#" className="hover:text-black">Shop</a>
              <a href="#" className="hover:text-black">Contact</a>
            </nav>
          </div>

          {/* Center: logo */}
          <div className="flex-1 flex justify-center">
            <div className="leading-tight text-center select-none">
              <div className="flex items-center justify-center gap-1 text-sm font-extrabold tracking-wide text-gray-900">
                <span>I</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 inline-block align-middle"
                  fill="url(#goldHeart)"
                >
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
          </div>

          {/* Right: search + icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 w-64">
              <FaSearch className="mr-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
              />
            </div>
            {/* Favorites (sidepanel) */}
            <button
              aria-label="Open favorites"
              onClick={() => { setFavOpen(true); setLangOpen(false); }}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
            >
              <FaHeart className="text-yellow-500 text-xl" />
            </button>

            {/* Cart (sidepanel) */}
            <button
              aria-label="Open cart"
              onClick={() => { setCartOpen(true); setFavOpen(false); setLangOpen(false); }}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
            >
              <FaShoppingCart className="text-gray-700 text-xl" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/30"
              onClick={() => { setMenuOpen(false); setFavOpen(false); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 z-[60] h-full w-80 max-w-[85vw] bg-white shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header row inside drawer */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="leading-tight text-center select-none">
                  <div className="flex items-center justify-center gap-1 text-sm font-extrabold tracking-wide text-gray-900">
                    <span>I</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 inline-block align-middle" fill="url(#goldHeart)">
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
                <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
                  <FaTimes className="text-xl text-gray-700" />
                </button>
              </div>

              {/* Search inside drawer */}
              <div className="p-4 border-b">
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <FaSearch className="mr-2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Quick actions */}
              <div className="p-4 border-b">
                <div className="flex items-stretch gap-3">
                  <button
                    className="flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm active:scale-95 transition"
                    onClick={() => setFavOpen(true)}
                  >
                    <FaHeart className="text-yellow-500 text-xl" />
                    <span className="text-xs text-gray-700">Favorites</span>
                  </button>
                  <button
                    className="flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm active:scale-95 transition"
                    onClick={() => setCartOpen(true)}
                  >
                    <FaShoppingCart className="text-gray-700 text-xl" />
                    <span className="text-xs text-gray-700">Cart</span>
                  </button>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-medium text-gray-500 mb-2">Language</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`flex items-center justify-center gap-2 p-2 rounded-md border ${lang === "en" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
                      onClick={() => setLang("en")}
                    >
                      <span className="fi fi-gb rounded-[4px]" />
                      <span className="text-sm">English</span>
                    </button>
                    <button
                      className={`flex items-center justify-center gap-2 p-2 rounded-md border ${lang === "el" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
                      onClick={() => setLang("el")}
                    >
                      <span className="fi fi-gr rounded-[4px]" />
                      <span className="text-sm">Greek</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Nav links */}
              <nav className="p-4 flex flex-col gap-3 text-gray-700">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium shadow-sm transition hover:-translate-y-[1px] hover:shadow md:active:translate-y-0"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium shadow-sm transition hover:-translate-y-[1px] hover:shadow md:active:translate-y-0"
                >
                  Shop
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium shadow-sm transition hover:-translate-y-[1px] hover:shadow md:active:translate-y-0"
                >
                  Contact
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <FavoritesSidepanel isOpen={isFavOpen} onClose={() => setFavOpen(false)} items={favorites} />
      <CartSidepanel isOpen={isCartOpen} onClose={() => setCartOpen(false)} items={cartItems} />
    </header>
  );
};

export default Header;