"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import type { InStockBikeWithVariants } from "@/lib/types";
import NewCard from "./NewCard";

type HeroSectionProps = {
  popularBikes: InStockBikeWithVariants[];
};

export default function HeroSection({ popularBikes }: HeroSectionProps) {

  return (
    <>
    <section className="relative h-[calc(100vh-55px)] md:h-[calc(100vh-106px)] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col md:flex-row">
        
        {/* Left Side */}
        <div className="w-full h-full md:w-1/2 bg-gray-100 border-r flex flex-col">
          
          {/* Top Left */}
          <div className="relative w-full h-full md:h-1/2 border-b">
            <div className="div1 relative h-full w-full">
              <span className="absolute top-4 left-4 md:top-4 sm:left-4 text-6xl md:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl 3xl:text-8xl font-regular">
                We create <br /> New ways <br /> To move.
              </span>
              <span className="absolute bottom-4 right-4 text-sm sm:text-lg leading-tight text-right text-gray-500">
                Located in <br /> Argostoli, <br /> Available <br /> around Greece
              </span>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="relative h-[130%] md:h-1/2 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/3.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            <span className="absolute inset-0 flex items-end justify-center md:items-end md:justify-start text-left text-3xl sm:text-4xl font-regular text-white pl-4 pb-8 sm:pl-4 sm:pb-4 sm:max-w-lg">
              "One of the best e-bikes available at any price and far and away my favourite ride of the year".
            </span>
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="flex items-center justify-center w-8 h-8 bg-transparent border border-white rounded-full hover:bg-black/50 transition cursor-pointer">
                <IoIosArrowDown className="rotate-90 mr-[3px] text-2xl text-white" />
              </button>
              <button className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full border border-white hover:bg-black/50 transition cursor-pointer">
                <IoIosArrowDown className="-rotate-90 ml-[3px] text-2xl text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:block w-full sm:w-1/2 h-full bg-white flex flex-col">
          <div className="div3 hidden md:flex h-full bg-slate-100">
            {popularBikes.length > 0 ? (
              <div className="flex h-full w-full overflow-x-auto scrollbar-hide overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="grid h-full min-w-full grid-flow-col grid-rows-2 gap-0 auto-cols-[minmax(300px,1fr)]">
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
                        popular={bike.popular ? "Popular" : undefined}
                        imageSrc={coverImage}
                        className="h-full"
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                Loading popular bikes...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    <section className="block md:hidden h-[calc(100vh-0px)]">
      <div className="w-full h-full md:w-1/2 bg-white flex flex-col">
        <div className="div3 flex md:hidden h-full bg-slate-100">
          {popularBikes.length > 0 ? (
            <div className="flex h-full w-full overflow-x-auto scrollbar-hide overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="grid h-full min-w-full grid-flow-col grid-rows-2 gap-0 auto-cols-[minmax(300px,1fr)]">
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
                      popular={bike.popular ? "Popular" : undefined}
                      imageSrc={coverImage}
                      className="h-full"
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              Loading popular bikes...
            </div>
          )}
        </div>
      </div>
    </section>
  </>
  );
}
