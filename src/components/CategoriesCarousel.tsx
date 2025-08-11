"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const categories = [
  { key: "city", title: "City", src: "/categories/city.jpg" },
  { key: "ebike", title: "E-Bike", src: "/categories/ebike.jpg" },
  { key: "kids", title: "Kids", src: "/categories/kids.jpg" },
  { key: "mtb", title: "MTB", src: "/categories/mtb.jpg" },
  { key: "road", title: "Road", src: "/categories/road.jpg" },
];

export default function CategoriesCarousel() {
  const [api, setApi] = useState<any>(null);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
    };
    setSnaps(api.scrollSnapList());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="ml-0 mr-0">
          {categories.map((cat) => (
            <CarouselItem
              key={cat.key}
              className="pl-1.5 pr-1.5 basis-[49.7%] sm:basis-[40%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="group relative overflow-hidden rounded-2xl border border-black/5 shadow-sm">
                <div className="relative h-[200px] sm:h-[230px] md:h-[260px] lg:h-[280px]">
                  <Image
                    src={cat.src}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block text-white text-base sm:text-lg md:text-xl font-semibold drop-shadow-md">
                    {cat.title}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Mobile/Tablet controls: subtle circular arrows (bottom-right, under cards) */}
      <div className="mt-3 flex justify-end xl:hidden" aria-label="Carousel controls">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => api && api.scrollPrev()}
            className="h-9 w-9 rounded-full border border-black/10 bg-white/70 shadow-sm backdrop-blur-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.9] transition"
            aria-label="Previous"
          >
            <IoIosArrowBack className="text-black/70" />
          </button>
          <button
            type="button"
            onClick={() => api && api.scrollNext()}
            className="h-9 w-9 rounded-full border border-black/10 bg-white/70 shadow-sm backdrop-blur-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.90] transition"
            aria-label="Next"
          >
            <IoIosArrowForward className="text-black/70" />
          </button>
        </div>
      </div>
    </div>
  );
}