"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Header from "@/components/Header";
import { IoIosArrowDown } from "react-icons/io";
import Marquee from "react-fast-marquee";
import CategoriesCarousel from "@/components/CategoriesCarousel"; 
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.28, // was 0.18
      delayChildren: 0.35    // was 0.2
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { 
      type: "spring",
      stiffness: 180,  // was 300 (slower, softer spring)
      damping: 26     // was 24
    },
  },
};

const imageEnter: Variants = {
  hidden: { opacity: 0, x: -24, y: 0, scale: 1, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      type: "spring",
      stiffness: 180, // was 260
      damping: 26,    // was 22
      delay: 0.15     // slight delay so it matches text rhythm
    },
  },
};

const heroSlides = [
  {
    heading: "Some placeholder text goes here.",
    subtext: "Short supporting copy for slide one — swap with real content later.",
    cta: "Shop Now",
  },
  {
    heading: "Another placeholder headline.",
    subtext: "Second slide copy. Keep it brief so it looks clean on the image.",
    cta: "Shop Now",
  },
  {
    heading: "Final placeholder headline.",
    subtext: "Third slide copy to demo autoplay between slides.",
    cta: "Shop Now",
  },
];

export default function Home() {
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-radial from-white to-[#E9E9E9]">
      <Header />

      
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between w-full h-screen overflow-hidden">

        <motion.div
          className="w-full md:w-[50%] h-full"
          initial="hidden"
          animate="visible"
          variants={imageEnter}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={imageEnter}
          >
            <motion.div>
              <Image
                src="/images/1.webp"
                alt="Logo"
                width={2000}
                height={1300}
                quality={100}
                className="w-full h-full object-contain transform md:-translate-x-[20%] md:translate-y-[3%] sm:-translate-y-[20%] sm:translate-x-[20%] -translate-y-[35%] translate-x-[38%] scale-[1.6] sm:scale-[1.2] md:scale-[1.4] [@media_(min-width:444px)_and_(max-width:650px)]:scale-[1.4] [@media_(min-width:444px)_and_(max-width:650px)]:translate-x-[30%] [@media_(min-width:444px)_and_(max-width:650px)]:-translate-y-[28%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="flex flex-col items-center justify-center w-full md:w-[50%] h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col gap-1 items-start justify-center w-full pl-10 bg-blue-0 mr-3 md:mr-0"
        >
          <motion.div variants={item} className="ILOVEMYBIKE flex flex-row gap-2 mt-25 md:mt-8 items-center justify-center">
                <h1 className="hidden md:block text-6xl font-bold bg-gradient-to-t from-[#A9A9A9] to-black/90 text-transparent bg-clip-text">I </h1>

              <motion.svg
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="hidden md:inline-block mx-2 w-[3.3em] h-[3.3em] align-middle"
                fill="url(#heartGradient)"
              >
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#E56F6F" />
                    <stop offset="100%" stopColor="#FAD814" />
                  </linearGradient>
                </defs>
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
              </motion.svg>

              <h1 className="hidden md:block text-5xl md:text-6xl font-bold bg-gradient-to-t from-[#A9A9A9] to-black/90 text-transparent bg-clip-text"> MY BIKE</h1>
            </motion.div>

            <motion.h2 variants={item} className="text-3xl font-semibold text-black mt-4">
              The most reliable bike store in Argostoli
            </motion.h2>
            <motion.p variants={item} className="text-lg text-gray-600 mt-2 max-w-[100%] md:max-w-[85%] pb-5">
              Tempor ad commodo nisi nostrud. Consequat elit mollit cillum proident consequat.
            </motion.p>
            <motion.button
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-full px-4 py-2 cursor-pointer bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] text-white"
            >
              Shop Now
            </motion.button>
        </motion.div>
        </div>
        <div className="absolute bottom-7 sm:bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-300 text-3xl">
          <IoIosArrowDown />
        </div>
      </section>


      {/* Marquee Section */}
      <section className="flex flex-col items-center justify-center w-full h-20 md:h-40">
        <Marquee>
          {["/logos/cube.svg", "/logos/bach.png", "/logos/orient-logo-black.svg", "/logos/cannondale-logo-black.svg", "/logos/samebike.png", "/logos/shengmilo.png"].map((logo, index) => (
            <div key={index} className="md:mx-13 mx-10">
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
      </section>


      {/* Categories Section */}
      <section className="w-full py-10 md:py-10">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 ">

          {/* Carousel with responsive items */}
          <CategoriesCarousel />
        </div>
      </section>

      <section className="w-full pb-5 md:px-7.5 px-6 bg-transparent rounded-3xl max-w-[1200px]">
        <div className="mx-auto w-full max-w-[1200px] bg-transparent rounded-3xl">
          {/* Embla Hero Carousel */}
          <div className="embla bg-transparent">
            <div className="embla__viewport overflow-hidden bg-transparent rounded-3xl" ref={emblaRef}>
              <div className="embla__container flex touch-pan-y select-none gap-2 pxl-2 bg-transparent rounded-3xl">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="embla__slide relative flex-[0_0_100%] min-w-0 rounded-3xl overflow-hidden"
                  >
                    {/* Background image */}
                    <Image
                      src="/images/3.webp?v2"
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
                        variants={item}
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
            <div className="mt-4 flex items-center justify-center gap-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi && emblaApi.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-[3px] md:h-[2px] rounded-full transition-all duration-300 ${
                    selectedIndex === i ? "w-16 bg-gray-900/70" : "w-8 bg-gray-400/50"
                  }`}
                />)
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
