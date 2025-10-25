"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";


export default function HeroSection() {
  return (
    <section className="h-[calc(100vh-112px)] sm:h-[calc(100vh-106px)] flex items-center justify-center overflow-hidden">
      <div className="bg-black w-full h-full flex">

        <div className="relative w-1/2 bg-gray-100 border-r flex flex-col">
          <div className="h-1/2 border-b">
            <div className="relative h-full w-full">
              <span className="absolute text-6xl font-regular top-2 left-4">We create <br></br> New ways <br></br> To move.</span>
              <span className="absolute text-lg leading-tight text-right bottom-4 right-4 text-gray-500">Designed in <br></br> Amsterdam, <br></br> Handmade <br></br> in Europe</span>
            </div>
          </div>
          <div className="h-1/2 absolute bottom-10 right-10 text-right ">
          
          </div>
        </div>

        <div className="w-1/2 bg-white flex flex-col">
          <div className="h-1/2">sdf</div>
          <div className="h-1/2">sdf</div>
        </div>

      </div>
    </section>
  );
}