/**
 * =============================
 * Header (site-wide navigation)
 * =============================
 * This file renders:
 *  - Mobile/Tablet header (≤ md)
 *  - Desktop header (≥ md)
 *  - Mobile side drawer with search, language, quick actions, and nav links
 *  - Favorites & Cart sidepanels (local components)
 *
 * State managed here:
 *  - isMenuOpen: controls the mobile side drawer
 *  - lang / isLangOpen: controls language value and dropdown open state
 *  - isFavOpen / isCartOpen: controls the two sidepanels
 *  - favorites / cartItems: demo arrays (replace with your real app state)
 *
 * Animation:
 *  - framer-motion is used for spring-based entrances and slide-in panels
 *
 * Accessibility:
 *  - aria-labels on buttons and panels, aria-modal on slide-in dialogs
 */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "flag-icons/css/flag-icons.min.css";
import { motion, AnimatePresence } from "framer-motion";
import FavoritesSidepanel from "./FavoritesSidepanel";
import CartSidepanel from "./CartSidepanel";  //something to do with this why the numbers are not kept in memory i think
import { useCart } from "@/contexts/CartContext";


// -----------------------------------------------------------------------------
// Header: Top-level navigation wrapper
// Layout map:
//   <header>
//     ├─ MobileHeader (≤ md)
//     ├─ DesktopHeader (≥ md)
//     ├─ MobileDrawer (off-canvas)
//     ├─ FavoritesSidepanel (off-canvas)
//     └─ CartSidepanel (off-canvas)
// -----------------------------------------------------------------------------
const Header: React.FC = () => {
  // --- UI State ---------------------------------------------------------------
  // Drawer visibility, language selection, and panel toggles
  const { state, getTotalItems } = useCart();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "el">("en");
  const [isLangOpen, setLangOpen] = useState(false);
  const [isFavOpen, setFavOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  // --- Track scroll position for header background ----------------------------
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* =====================================================================
          Mobile / Tablet Header (≤ md)
          - Left: language dropdown
          - Center: logo
          - Right: hamburger to open the drawer
         ===================================================================== */}
      <motion.div
        className={`flex lg:hidden w-full items-center justify-between px-4 py-6.5 transition-colors ${isScrolled ? "bg-white/80 shadow-sm backdrop-blur-xl" : "bg-transparent shadow-none backdrop-blur-none"}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 1.5 }}
      >
        {/* Language selector (flag + chevron) */}
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

        {/* Center logo (I ❤ MY / BIKE) */}
        <div className="leading-tight mr-6 text-center select-none">
          <div className="flex items-center justify-center gap-2 text-2xl transform translate-y-0.5 font-extrabold tracking-wide text-gray-900">
            <span>I</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4.5 h-4.5 inline-block align-middle"
              fill="url(#goldHeart)"
              style={{ width: "1.4rem", height: "1.4rem" }}
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
          <div className="text-2xl font-extrabold tracking-wide mr-1 transform -translate-y-0.5 text-gray-900">BIKE</div>
        </div>

        {/* Right-side actions (hamburger opens the drawer) */}
        <div className="flex items-center gap-4">
          <button aria-label="Menu" onClick={() => { setMenuOpen(true); setLangOpen(false); setFavOpen(false); }} className="p-1.5 rounded-md hover:bg-gray-100 active:scale-95 transition">
            <FaBars className="text-gray-700 text-lg" />
          </button>
        </div>
      </motion.div>

      {/* =====================================================================
          Desktop Header (≥ md)
          - Left: language + nav links
          - Center: logo
          - Right: search + favorites + cart
         ===================================================================== */}
      <motion.div
        className="hidden lg:flex w-full justify-center pt-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 1.5 }}
      >
        <div className="w-[95%] max-w-fit rounded-full bg-white/95 backdrop-blur-sm px-4 ring-1 ring-slate-200 sm:px-6 py-2.5 items-center justify-between  gap-8 flex">
          {/* Left cluster: language dropdown + primary nav */}
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
            <nav className="hidden sm:flex items-center gap-6 pl-8 pr-6 text-gray-700">
              <a href="/" className="px-3 py-1 rounded-md hover:text-black hover:bg-gray-100 transition-colors">Home</a>
              <a href="/shop" className="px-3 py-1 rounded-md hover:text-black hover:bg-gray-100 transition-colors">Shop</a>
              <a href="/contact" className="px-3 py-1 rounded-md hover:text-black hover:bg-gray-100 transition-colors">Contact</a>
            </nav>
          </div>

          {/* Center logo */}
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

          {/* Right controls: search field + favorites + cart */}
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
              className="relative p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
              onClick={() => { setFavOpen(true); setLangOpen(false); }}
            >
              <FaHeart className="text-yellow-500 text-xl" />
              {state.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.favorites.length}
                </span>
              )}
            </button>

            {/* Cart (sidepanel) */}
            <button
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
              onClick={() => { setCartOpen(true); setFavOpen(false); setLangOpen(false); }}
            >
              <FaShoppingCart className="text-gray-700 text-xl" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
      {/* =====================================================================
          Mobile Drawer (off-canvas right)
          Contains: inline logo, search, quick actions, language toggles, nav
         ===================================================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Drawer overlay (closes on click) */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/30"
              onClick={() => { setMenuOpen(false); setFavOpen(false); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer panel */}
            <motion.aside
              className="fixed top-0 right-0 z-[60] h-full w-80 max-w-[85vw] bg-white shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Drawer header with inline logo + close button */}
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

              {/* Drawer search */}
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

              {/* Drawer quick actions + language toggles */}
              <div className="p-4 border-b">
                <div className="flex items-stretch gap-3">
                  <button
                    className="relative flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm active:scale-95 transition"
                    onClick={() => setFavOpen(true)}
                  >
                    <FaHeart className="text-yellow-500 text-xl" />
                    {state.favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {state.favorites.length}
                      </span>
                    )}
                    <span className="text-xs text-gray-700">Favorites</span>
                  </button>
                  <button
                    className="relative flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm active:scale-95 transition"
                    onClick={() => setCartOpen(true)}
                  >
                    <FaShoppingCart className="text-gray-700 text-xl" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
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

              {/* Drawer primary nav links */}
              <nav className="p-4 flex flex-col gap-3 text-gray-700">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium transition hover:bg-gray-100 transition-colors "
                >
                  Home
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium transition hover:bg-gray-100 transition-colors "
                >
                  Shop
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium transition hover:bg-gray-100 transition-colors "
                >
                  Contact
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================================
          Sidepanels Mount Points (outside of drawer)
         ===================================================================== */}
      <FavoritesSidepanel isOpen={isFavOpen} onClose={() => setFavOpen(false)} />
      <CartSidepanel isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

// Export for app-wide usage
export default Header;