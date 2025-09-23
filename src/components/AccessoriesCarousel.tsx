"use client";
import { useEffect, useMemo, useState } from "react";
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from "embla-carousel-react";
import AccessoryCard from "./AccessoryCard";

// Sample accessories data - replace with Airtable data later
const accessories = [
  {
    id: "acc-1",
    name: "Premium Bike Helmet",
    category: "Safety",
    brand: "SafeRide",
    description: "Lightweight and durable helmet for maximum protection",
    price: 89,
    image: "/images/5.jpg",
  },
  {
    id: "acc-2",
    name: "LED Light Set",
    category: "Lighting",
    brand: "BrightPath",
    description: "High-intensity LED lights for safe night riding",
    price: 45,
    image: "/images/5.jpg",
  },
  {
    id: "acc-3",
    name: "Water Bottle Holder",
    category: "Hydration",
    brand: "HydroMount",
    description: "Secure and lightweight bottle holder for easy access",
    price: 25,
    image: "/images/5.jpg",
  },
  {
    id: "acc-4",
    name: "Bike Lock",
    category: "Security",
    brand: "LockTite",
    description: "Heavy-duty lock to keep your bike secure",
    price: 65,
    image: "/images/5.jpg",
  },
  {
    id: "acc-5",
    name: "Cycling Gloves",
    category: "Apparel",
    brand: "GripFit",
    description: "Comfortable gloves with enhanced grip and padding",
    price: 35,
    image: "/images/5.jpg",
  },
  {
    id: "acc-6",
    name: "Bike Computer",
    category: "Electronics",
    brand: "CycleTech",
    description: "Advanced bike computer with GPS and performance tracking",
    price: 120,
    image: "/images/5.jpg",
  },
];

export default function AccessoriesCarousel() {
  // Track mobile state
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 639px)"); // Tailwind sm breakpoint
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Embla Carousel setup (always initialize with options)
  const emblaOptions: EmblaOptionsType = useMemo(() => ({
    align: isMobile ? "center" : "start",
    loop: false,
    dragFree: isMobile, // dragFree only on mobile, snapping on desktop
    containScroll: "trimSnaps",
  }), [isMobile]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [api, setApi] = useState<any>(null);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    setApi(emblaApi);
  }, [emblaApi]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    const onRecalc = () => setTotalSlides(api.slideNodes().length);
    setSnaps([]);
    onSelect();
    onRecalc();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    api.on("reInit", onRecalc);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      api.off("reInit", onRecalc);
    };
  }, [api]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto pt-4 pb-0 pl-[20px] pr-[20px] md:px-6 md:pr-7.5">
      {isMobile ? (
        // Mobile: CSS Scroll Snapping
        <div
          className="overflow-x-auto snap-x snap-mandatory ml-[6px] mr-[6px] no-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex gap-6 py-2">
            {accessories.map((accessory, index) => (
              <div
                key={index}
                className="min-w-[250px] max-w-[340px] flex-shrink-0 snap-center"
              >
                <AccessoryCard
                  {...accessory}
                  description={
                    accessory.description.length > 37
                      ? accessory.description.slice(0, 30) + "..."
                      : accessory.description
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop/Tablet: Embla Carousel
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 py-2 ml-[27px]">
            {accessories.map((accessory, index) => (
              <div
                key={index}
                className={`min-w-[250px] sm:min-w-[250px] max-w-[340px] flex-shrink-0 ${
                  index === 0 ? "ml-3 sm:ml-0" : ""
                } ${index === accessories.length - 1 ? "mr-4 sm:mr-0" : ""}`}
              >
                <AccessoryCard
                  {...accessory}
                  description={
                    accessory.description.length > 37
                      ? accessory.description.slice(0, 30) + "..."
                      : accessory.description
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Desktop arrow controls */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => api?.scrollPrev()}
        disabled={!canPrev}
        className="hidden xl:flex items-center justify-center cursor-pointer absolute -left-10 top-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-40"
        style={{ transform: "translateY(calc(-50% - 20px))" }}
      >
        <span className="sr-only">Previous</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => api?.scrollNext()}
        disabled={!canNext}
        className="hidden xl:flex items-center justify-center absolute cursor-pointer -right-10 top-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-40"
        style={{ transform: "translateY(calc(-50% - 20px))" }}
      >
        <span className="sr-only">Next</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {/* Progress indicator (only for Embla on non-mobile) */}
      {!isMobile && snaps.length > 1 && (
        <div className="mt-4 xl:hidden px-10" aria-label="Carousel indicator">
          <div className="flex items-center">
            <div className="relative flex-1 h-[3px] rounded-full bg-black/10 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-black/60 transition-all duration-300"
                style={{ width: totalSlides ? `${((selected + 1) / totalSlides) * 100}%` : "0%" }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <a
          href="/accessories"
          className="text-gray-600 hover:text-black hover:underline font-medium"
        >
          Shop Accessories →
        </a>
      </div>
    </div>
  );
}