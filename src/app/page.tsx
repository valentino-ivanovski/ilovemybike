"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Header from "@/components/Header";
import { IoIosArrowDown } from "react-icons/io";

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

export default function Home() {
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
                className="w-full h-full object-contain transform md:-translate-x-[20%] md:translate-y-[3%] sm:-translate-y-[20%] sm:translate-x-[20%] -translate-y-[30%] translate-x-[45%] scale-[1.8] sm:scale-[1.2] md:scale-[1.4] [@media_(min-width:444px)_and_(max-width:650px)]:scale-[1.4] [@media_(min-width:444px)_and_(max-width:650px)]:translate-x-[30%] [@media_(min-width:444px)_and_(max-width:650px)]:-translate-y-[28%]"
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
        <div className="absolute bottom-4 sm:bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-300 text-3xl">
          <IoIosArrowDown />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
        this where the marquee goes
      </section>

    </div>
  );
}
