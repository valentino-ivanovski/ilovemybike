"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-radial from-white to-[#E9E9E9]">
      <Header />
      <section className="flex flex-row items-center justify-between w-full h-screen overflow-hidden">

        <div className="w-[50%] h-full">
          <Image
            src="/images/1.webp"
            alt="Logo"
            width={2000}
            height={1300}
            quality={100}
            className="w-full h-full object-contain transform -translate-x-[20%] translate-y-[3%] scale-[1.4]"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-[50%] h-full">
          <div className="flex flex-col gap-1 items-start justify-center w-full pl-10 bg-blue-0">
            <div className="ILOVEMYBIKE flex flex-row gap-2 items-center justify-center">
              <h1 className="text-6xl font-bold bg-gradient-to-t from-[#A9A9A9] to-black/90 text-transparent bg-clip-text">I </h1>

              <motion.svg
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="inline-block mx-2 w-[3.3em] h-[3.3em] align-middle"
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

              <h1 className="text-6xl font-bold bg-gradient-to-t from-[#A9A9A9] to-black/90 text-transparent bg-clip-text"> MY BIKE</h1>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 mt-4">
              The most reliable bike store in Argostoli
            </h2>
            <p className="text-lg text-gray-600 mt-2 max-w-[85%] pb-5">
              Tempor ad commodo nisi nostrud. Consequat elit mollit cillum proident consequat.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-full px-4 py-2 cursor-pointer bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] text-white"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
