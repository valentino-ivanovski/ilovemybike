"use client";

import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-[100] w-full border-t border-gray-300 sm:border-none h-[58px] text-black font-semibold transform text-[12px] md:text-sm bg-gray-100">
      <div className="flex flex-row items-center justify-between px-6 py-0 2xl:px-20 transform translate-y-[20px] sm:translate-y-[18px]">
          <Link href="/shop" className="font-semibold hover:underline cursor-pointer">
            ©2025 I LOVE MY BIKE
          </Link>
          <ul className="flex space-x-4">
            <li>
              <a href="/privacy" className="flex items-center space-x-1 hover:underline cursor-pointer">
                <span>PRIVACY POLICY</span>
              </a>        
            </li>
            <li>
              <a href="/contact" className="flex items-center space-x-1 hover:underline cursor-pointer">
                <span>CONTACT</span>
              </a>  
            </li>
          </ul>
        </div>
    </footer>
  );
}
