"use client";

import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const container: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { delayChildren: 0.2, staggerChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
  };
  return (
    <motion.footer
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full border-t border-slate-200 sm:border-none h-[58px] text-black font-medium transform text-[12px] md:text-sm bg-gray-100"
    >
      <div className="flex flex-row items-center justify-between px-6 py-0 2xl:px-20 transform translate-y-[20px] sm:translate-y-[18px]">
          <motion.div variants={item}>
            <Link href="/shop" className="font-medium cursor-pointer">
              ©2025 I LOVE MY BIKE
            </Link>
          </motion.div>
          <motion.ul variants={item} className="flex space-x-4">
            <li>
              <a href="/privacy" className="flex items-center space-x-1 cursor-pointer">
                <span>PRIVACY POLICY</span>
              </a>
            </li>
            <li>
              <a href="/contact" className="flex items-center space-x-1 cursor-pointer">
                <span>CONTACT</span>
              </a>
            </li>
          </motion.ul>
        </div>
    </motion.footer>
  );
}
