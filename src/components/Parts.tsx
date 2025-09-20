"use client";

import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

const Parts: React.FC = () => {
    return (
        <div
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Background image */}
              <Image
                src={"/images/22.webp"}
                alt="Cycling road background"
                fill
                className="object-cover rounded-3xl bg-transparent"
              />

              {/* Soft overlay for legibility */}
              <div className="absolute inset-0 bg-transparent" />

              {/* Slide content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 sm:h-[314px] text-white">
                <h3 className="text-2xl md:text-4xl font-semibold text-center leading-tight">
                    Need spare bike parts? <br></br>
                    We’ve got you covered.
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="btn mt-6  sm:w-auto sm:max-w-fit"
                >
                    Order Parts
                </motion.button>
              </div>
            </div>
    );
};

export default Parts;