"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import type { InStockBikeWithVariants } from "@/lib/types";
import NewCard from "./NewCard";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IoMdSearch } from "react-icons/io";
import {
  pageVariants,
  sideReveal,
  stackContainer,
  lineItem,
  fadeUp,
  fadeUpDelayed,
  rightPanel,
  cardsStagger,
} from "@/animations/shopVariants";

type HeroSectionProps = {
  popularBikes: InStockBikeWithVariants[];
};

export default function HeroSection({ popularBikes }: HeroSectionProps) {
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const quotes = [
    "One of the best e-bikes available at any price and far and away my favourite ride of the year.",
    "A perfect balance of performance and comfort — a ride that feels effortless.",
    "This e-bike redefines what's possible. Smooth, powerful, and genuinely exciting."
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);
  const cycleQuote = (direction: 1 | -1) => {
    setQuoteIndex((prev) => (prev + direction + quotes.length) % quotes.length);
  };

  const [selectedTab, setSelectedTab] = useState<"in-stock" | "order">("in-stock");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Smooth horizontal scrolling for wheel/trackpad input using GSAP
  useEffect(() => {
    const containers = [desktopScrollRef.current, mobileScrollRef.current].filter(
      Boolean
    ) as HTMLDivElement[];

    const listeners: Array<{
      el: HTMLDivElement;
      handler: (e: WheelEvent) => void;
    }> = [];

    containers.forEach((el) => {
      const handler = (e: WheelEvent) => {
        // Only apply when horizontal scrolling is possible
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        // Translate vertical wheel to horizontal movement
        const magnitude = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        const SPEED = 5; // speed multiplier for a snappier feel

        if (magnitude === 0) return;

        // Prevent default vertical page scroll while interacting with the grid
        e.preventDefault();

        // Kill any ongoing tween for snappy responsiveness
        gsap.killTweensOf(el);

        const target = Math.max(0, Math.min(maxScroll, el.scrollLeft + magnitude * SPEED));
        gsap.to(el, {
          duration: 0.45,
          ease: "power4.out",
          scrollLeft: target,
        });
      };

      el.addEventListener("wheel", handler, { passive: false });
      listeners.push({ el, handler });
    });

    return () => {
      listeners.forEach(({ el, handler }) => el.removeEventListener("wheel", handler));
    };
  }, []);

  const nudgeDesktop = (direction: 1 | -1) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const amount = Math.max(260, Math.round(el.clientWidth * 0.75));
    const target = Math.max(0, Math.min(maxScroll, el.scrollLeft + direction * amount));
    gsap.killTweensOf(el);
    gsap.to(el, { duration: 0.45, ease: "power3.out", scrollLeft: target });
  };

  return (
    <>
    <motion.section
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="relative h-[calc(100vh-55px)] md:h-[calc(100vh-106px)] flex items-center justify-center overflow-hidden"
    >
      <div className="w-full h-full flex flex-col md:flex-row">
        
        {/* Left Side */}
        <motion.div variants={sideReveal} className="w-full h-full md:w-1/4  bg-gray-100 border-r flex flex-col">
          
          {/* Left UP */}
          <div className="relative w-full h-full md:h-1/2">
            <div className="w-full h-[54px] bg-white flex flex-row gap-[6px] justify-start items-center pl-[23px] border-b border-slate-200">
                <IoMdSearch className="text-black/50 transform translate-y-[0.5px]"/>
                <input
                  type="text"
                  placeholder="SEARCH BIKES..."
                  className="text-sm outline-none bg-white w-full placeholder-black/50 tracking-[0.03em]"
                />
            </div>
            <div className="w-full h-[48px] flex flex-row justify-between border-b border-slate-200 items-center text-sm">
                <button 
                  onClick={() => setSelectedTab("in-stock")}
                  className={`h-full w-1/2 cursor-pointer border-r border-slate-200 transition duration-100 hover:bg-gray-100 ${selectedTab === "in-stock" ? "bg-gray-100" : "bg-white"} select-none`}
                >
                  <p>IN STOCK</p>
                </button>
                <button 
                  onClick={() => setSelectedTab("order")}
                  className={`h-full w-1/2 cursor-pointer transition duration-100 hover:bg-gray-100 ${selectedTab === "order" ? "bg-gray-100" : "bg-white"} select-none`}
                >
                  <p>ORDER</p>
                </button>
            </div>


            <div>
              
            </div>
              
            <div className="w-full bg-white border-b border-slate-200 h-[48px] flex items-center pl-[23px] relative text-sm select-none cursor-pointer">
              <span>CATEGORY</span>
              <IoIosArrowDown className="absolute right-[20px] text-black/60" />
            </div>
            <div className="w-full bg-white border-b border-slate-200 h-[48px] flex items-center pl-[23px] relative text-sm select-none cursor-pointer">
              <span>SUBCATEGORY</span>
              <IoIosArrowDown className="absolute right-[20px] text-black/60" />
            </div>  

            <div className="h-[97px] w-full grid grid-cols-2 border-b border-slate-200">
              <button
                onClick={() => toggleBrand("back")}
                className={`h-[48px] cursor-pointer transition duration-100 text-sm flex items-center justify-center border-r border-slate-200 ${selectedBrands.includes("back") ? "bg-gray-100" : "bg-white hover:bg-gray-100"} select-none`}
              >
                <Image src="/logos/bach.png" alt="Back" width={100} height={30} className="object-contain" draggable={false} />
              </button>
              <button
                onClick={() => toggleBrand("orient")}
                className={`h-[48px] cursor-pointer transition duration-100 text-sm flex items-center justify-center ${selectedBrands.includes("orient") ? "bg-gray-100" : "bg-white hover:bg-gray-100"} select-none`}
              >
                <Image src="/logos/orient-logo-black.svg" alt="Orient" width={100} height={30} className="object-contain" draggable={false} />
              </button>
              <button
                onClick={() => toggleBrand("samebike")}
                className={`h-[48px] cursor-pointer transition duration-100 text-sm flex items-center justify-center border-r border-t border-slate-200 ${selectedBrands.includes("samebike") ? "bg-gray-100" : "bg-white hover:bg-gray-100"} select-none`}
              >
                <Image src="/logos/samebike.png" alt="Samebike" width={100} height={30} className="object-contain" draggable={false} />
              </button>
              <button
                onClick={() => toggleBrand("shengmilo")}
                className={`h-[48px] cursor-pointer transition duration-100 text-sm flex items-center justify-center border-t border-slate-200 ${selectedBrands.includes("shengmilo") ? "bg-gray-100" : "bg-white hover:bg-gray-100"} select-none`}
              >
                <Image src="/logos/shengmilo.png" alt="Shengmilo" width={85} height={30} className="object-contain" draggable={false} />
              </button>
            </div>

          </div>


          {/* Left DOWN */}
          <div className="relative w-full h-full md:h-1/2 bg-black">
            <motion.div variants={stackContainer} className="div1 relative h-full w-full bg-blue-300">
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div variants={sideReveal} className="hidden md:block w-full sm:w-3/4 h-full bg-white flex flex-col">
          <div className="div3 hidden md:flex h-full bg-slate-100">
            {popularBikes.length > 0 ? (
              <motion.div
                ref={desktopScrollRef}
                initial="hidden"
                animate="show"
                variants={rightPanel}
                className="flex h-full w-full overflow-x-auto scrollbar-hide overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <motion.div variants={cardsStagger} className="grid h-full min-w-full grid-flow-col grid-rows-2 gap-0 auto-cols-[minmax(300px,1fr)]">
                  {popularBikes.map((bike) => {
                    const coverImage = bike.images[0] || "/images/3.webp";
                    const price = bike.new_price ?? bike.old_price;
                    const subcategory = bike.subcategories[0];
                    return (
                      <NewCard
                        key={bike.id}
                        id={String(bike.id)}
                        title={bike.title}
                        brand={bike.brand}
                        description={bike.description}
                        price={price}
                        category={bike.category}
                        subcategory={subcategory}
                        section="in-stock"
                        popular={bike.popular ? "Popular" : undefined}
                        imageSrc={coverImage}
                        className="h-full"
                      />
                    );
                  })}
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                Loading popular bikes...
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
    <motion.section initial="hidden" animate="show" variants={pageVariants} className="block md:hidden h-[calc(100vh-0px)]">
      <div className="w-full h-full md:w-1/2 bg-white flex flex-col">
        <div className="div3 flex md:hidden h-full bg-slate-100">
          {popularBikes.length > 0 ? (
            <motion.div
              ref={mobileScrollRef}
              initial="hidden"
              animate="show"
              variants={rightPanel}
              className="flex h-full w-full overflow-x-auto scrollbar-hide overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <motion.div variants={cardsStagger} className="grid h-full min-w-full grid-flow-col grid-rows-2 gap-0 auto-cols-[minmax(300px,1fr)]">
                {popularBikes.map((bike) => {
                  const coverImage = bike.images[0] || "/images/3.webp";
                  const price = bike.new_price ?? bike.old_price;
                  const subcategory = bike.subcategories[0];
                  return (
                  <NewCard
                    key={bike.id}
                    id={String(bike.id)}
                    title={bike.title}
                    brand={bike.brand}
                    description={bike.description}
                    price={price}
                    category={bike.category}
                    subcategory={subcategory}
                    section="in-stock"
                    popular={bike.popular ? "Popular" : undefined}
                    imageSrc={coverImage}
                    className="h-full"
                  />
                  );
                })}
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              Loading popular bikes...
            </div>
          )}
        </div>
      </div>
    </motion.section>
  </>
  );
}

//dsfa i did absolutely nothing today but hery lets commit something cause i need it for the chart