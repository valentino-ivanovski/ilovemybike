"use client";

import { useEffect, useMemo, useState } from "react";
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from "embla-carousel-react";
import BikeCard from "./BikeCard";


//make bikes be the data retreieved from the Airtable database
const bikes = [
  {
    id: "1",
    category: "Mountain Bike",
    name: "Name of Bike",
    brand: "Brand Name",
    description:
      "Non ad ut fugiat aute fugiat velit aliqua adipisicing exercitation nostrud ea.",
    price: 4099,
    image: "/images/1.webp",
  },
  {
    id: "2",
    category: "Mountain Bike",
    name: "Name of Bike",
    brand: "Brand Name",
    description:
      "Non ad ut fugiat aute fugiat velit aliqua adipisicing exercitation nostrud ea.",
    price: 4099,
    image: "/images/1.webp",
  },
  {
    id: "3",
    category: "Mountain Bike",
    name: "Name of Bike",
    brand: "Brand Name",
    description:
      "Non ad ut fugiat aute fugiat velit aliqua adipisicing exercitation nostrud ea.",
    price: 4099,
    image: "/images/1.webp",
  },
  {
    id: "4",
    category: "Mountain Bike",
    name: "Name of Bike",
    brand: "Brand Name",
    description:
      "Non ad ut fugiat aute fugiat velit aliqua adipisicing exercitation nostrud ea.",
    price: 4099,
    image: "/images/1.webp",
  },
  {
    id: "5",
    category: "Mountain Bike",
    name: "Name of Bike",
    brand: "Brand Name",
    description:
      "Non ad ut fugiat aute fugiat velit aliqua adipisicing exercitation nostrud ea.",
    price: 4099,
    image: "/images/1.webp",
  },
  {
    id: "6",
    category: "Mountain Bike",
    name: "Name of Bike",
    brand: "Brand Name",
    description:
      "Non ad ut fugiat aute fugiat velit aliqua adipisicing exercitation nostrud ea.",
    price: 4099,
    image: "/images/1.webp",
  },
];

export default function BikeCarousel() {
  // Responsive: center slides on mobile, keep start on larger screens
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 639px)'); // Tailwind sm breakpoint
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const emblaOptions: EmblaOptionsType = useMemo(() => {
    const align = isMobile ? 'center' : 'start';
    return {
      align,
      loop: false,
      slidesToScroll: 1,
    };
  }, [isMobile]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const [api, setApi] = useState<any>(null);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (emblaApi) setApi(emblaApi);
  }, [emblaApi]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    const onRecalc = () => setTotalSlides(api.slideNodes().length);

    setSnaps(api.scrollSnapList());
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
    <div className="relative w-full max-w-[1200px] mx-auto pt-4 pb-0 pl-0 md:px-6 md:pr-7.5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 py-2 pl-2">
          {bikes.map((bike, index) => (
            <div
              key={index}
              className={`min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 ${index === 0 ? "ml-3 sm:ml-0" : ""} ${index === bikes.length - 1 ? "mr-4 sm:mr-0" : ""}`}
            >
              <BikeCard {...bike} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop arrow controls */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => api?.scrollPrev()}
        disabled={!canPrev}
        className="hidden xl:flex items-center justify-center absolute -left-10 top-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-40" style={{ transform: "translateY(calc(-50% - 20px))" }}
      >
        <span className="sr-only">Previous</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    <button
      type="button"
      aria-label="Next"
      onClick={() => api?.scrollNext()}
      disabled={!canNext}
      className="hidden xl:flex items-center justify-center absolute -right-10 top-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-40"
      style={{ transform: "translateY(calc(-50% - 20px))" }}
    >
      <span className="sr-only">Next</span>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

      {snaps.length > 1 && (
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
          href="/shop"
          className="text-gray-600 hover:text-black font-medium"
        >
          Shop Bikes →
        </a>
      </div>
    </div>
  );
}