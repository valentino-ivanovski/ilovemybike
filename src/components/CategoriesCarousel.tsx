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
              className="pl-2 pr-1.5 basis-[49.7%] sm:basis-[40%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
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
      {/* Right-edge fade hint (mobile/tablet) */}
      {/* Mobile/Tablet indicator: progress bar + swipe hint */}
      <div className="mt-4 xl:hidden px-10" aria-label="Carousel indicator">
        <div className="flex items-center">
          <div className="relative flex-1 h-[3px] rounded-full bg-black/10 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-black/60 transition-all duration-300"
              style={{ width: snaps.length ? `${((selected + 1) / snaps.length) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}