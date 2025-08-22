"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import HeroCarouselDots from "@/components/HeroCarouselDots";

export type Slide = {
  heading: string;
  subtext: string;
  cta: string;
};

export default function HeroCarousel({
  slides,
  itemVariants,
  imageSrc = "/images/3.webp?v2",
}: {
  slides: Slide[];
  itemVariants?: Variants;
  imageSrc?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="embla bg-transparent">
      <div className="embla__viewport overflow-hidden bg-transparent rounded-3xl" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y select-none gap-2 px-2 md:px-3 bg-transparent rounded-3xl">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="embla__slide relative flex-[0_0_105%] sm:flex-[0_0_102.5%] min-w-0 rounded-3xl overflow-hidden"
            >
              {/* Background image */}
              <Image
                src={imageSrc}
                alt="Cycling road background"
                fill
                priority={idx === 0}
                className="object-cover rounded-3xl bg-transparent"
              />

              {/* Soft overlay for legibility */}
              <div className="absolute inset-0 bg-transparent" />

              {/* Slide content */}
              <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10 md:p-14 max-w-xl text-white">
                <h3 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                  {slide.heading}
                </h3>
                <p className="mt-4 text-base md:text-lg text-white/90 max-w-prose">
                  {slide.subtext}
                </p>
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-6 rounded-full px-4 py-2 cursor-pointer bg-gradient-to-tr from-[#BDBDBD] text-black/90 to-white w-full sm:w-auto sm:max-w-fit"
                >
                  {slide.cta}
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <HeroCarouselDots
        count={slides.length}
        selectedIndex={selectedIndex}
        onSelect={(i) => emblaApi && emblaApi.scrollTo(i)}
      />
    </div>
  );
}