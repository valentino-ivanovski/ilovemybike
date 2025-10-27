"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import type { InStockBikeWithVariants } from "@/lib/types";
import NewCard from "./NewCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Swift, sequential intro animation variants
const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const leftColVariants: Variants = {
  hidden: { x: -24, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const rightColVariants: Variants = {
  hidden: { x: 24, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.45, ease: "easeOut" } },
};

const stackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemFadeUp: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.35, ease: "easeOut" } },
};

const videoReveal: Variants = {
  hidden: { y: 24, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "tween", duration: 0.45, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.35, ease: "easeOut" } },
};

type HeroSectionProps = {
  popularBikes: InStockBikeWithVariants[];
};

export default function HeroSection({ popularBikes }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const gridTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current || !gridTrackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    const init = () => {
      const hero = heroRef.current!;
      const track = gridTrackRef.current!;

      const getScrollDistance = () => {
        const containerWidth = (track.parentElement as HTMLElement | null)?.clientWidth ?? hero.clientWidth;
        const trackWidth = track.scrollWidth;
        return Math.max(0, trackWidth - containerWidth);
      };

      hero.style.overflow = "hidden";

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        willChange: "transform",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    const cleanups: Array<() => void> = [];
    mm.add("(min-width: 768px)", () => {
      const cleanup = init();
      if (cleanup) cleanups.push(cleanup);
      return () => {
        cleanups.forEach((fn) => fn());
      };
    });

    return () => {
      mm.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [popularBikes?.length]);

  return (
    <>
    <motion.section
      ref={heroRef}
      className="relative z-0 h-[calc(100vh-54px)] sm:h-[calc(100vh-48px)] flex items-center justify-center overflow-hidden"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="w-full h-full flex flex-col md:flex-row" variants={stackVariants}>
        
        {/* Left Side */}
        <motion.div
          className="w-full h-full md:w-1/2 bg-gray-100 border-r flex flex-col"
          variants={leftColVariants}
        >
          
          {/* Top Left */}
          <motion.div className="relative w-full h-full md:h-1/2 border-b" variants={stackVariants}>
            <motion.div className="div1 relative h-full w-full" variants={stackVariants}>
              <motion.span
                className="absolute top-4 left-4 md:top-4 sm:left-4 text-6xl md:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl 3xl:text-8xl font-regular"
                variants={itemFadeUp}
              >
                We create <br /> New ways <br /> To move.
              </motion.span>
              <motion.span
                className="absolute bottom-4 right-4 text-sm sm:text-lg leading-tight text-right text-gray-500"
                variants={itemFadeUp}
              >
                Located in <br /> Argostoli, <br /> Available <br /> around Greece
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div className="relative h-[130%] md:h-1/2 overflow-hidden" variants={videoReveal}>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/3.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            <motion.span
              className="absolute inset-0 flex items-end justify-center md:items-end md:justify-start text-left text-3xl sm:text-4xl font-regular text-white pl-4 pb-8 sm:pl-4 sm:pb-4 sm:max-w-lg"
              variants={itemFadeUp}
            >
              "One of the best e-bikes available at any price and far and away my favourite ride of the year".
            </motion.span>
            <motion.div className="absolute top-4 right-4 flex gap-2" variants={itemFadeUp}>
              <button className="flex items-center justify-center w-8 h-8 bg-transparent border border-white rounded-full hover:bg-black/50 transition cursor-pointer">
                <IoIosArrowDown className="rotate-90 mr-[3px] text-2xl text-white" />
              </button>
              <button className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full border border-white hover:bg-black/50 transition cursor-pointer">
                <IoIosArrowDown className="-rotate-90 ml-[3px] text-2xl text-white" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="hidden md:block w-full sm:w-1/2 h-full bg-white flex flex-col"
          variants={rightColVariants}
        >
          <motion.div className="div3 hidden md:flex h-full bg-slate-100" variants={gridVariants}>
            {popularBikes.length > 0 ? (
              <motion.div
                className="flex h-full w-full overflow-hidden"
                variants={stackVariants}
              >
                <motion.div
                  ref={gridTrackRef}
                  className="grid h-full min-w-full grid-flow-col grid-rows-2 gap-0 auto-cols-[minmax(300px,1fr)]"
                  variants={gridVariants}
                >
                  {popularBikes.map((bike) => {
                    const coverImage = bike.images[0] || "/images/3.webp";
                    const price = bike.new_price ?? bike.old_price;
                    const subcategory = bike.subcategories[0];
                    return (
                      <motion.div key={bike.id} variants={cardVariants} className="h-full">
                        <NewCard
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
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="flex h-full w-full items-center justify-center text-sm text-gray-500"
                variants={itemFadeUp}
              >
                Loading popular bikes...
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
    <motion.section
      className="block md:hidden h-[calc(100vh-54px)] sm:h-[calc(100vh-48px)]"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="w-full h-full md:w-1/2 bg-white flex flex-col" variants={stackVariants}>
        <motion.div className="div3 flex md:hidden h-full bg-slate-100" variants={gridVariants}>
          {popularBikes.length > 0 ? (
            <motion.div
              className="flex h-full w-full overflow-x-auto scrollbar-hide overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              variants={stackVariants}
            >
              <motion.div
                className="grid h-full min-w-full grid-flow-col grid-rows-2 gap-0 auto-cols-[minmax(300px,1fr)]"
                variants={gridVariants}
              >
                {popularBikes.map((bike) => {
                  const coverImage = bike.images[0] || "/images/3.webp";
                  const price = bike.new_price ?? bike.old_price;
                  const subcategory = bike.subcategories[0];
                  return (
                    <motion.div key={bike.id} variants={cardVariants} className="h-full">
                      <NewCard
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
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="flex h-full w-full items-center justify-center text-sm text-gray-500"
              variants={itemFadeUp}
            >
              Loading popular bikes...
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  </>
  );
}
