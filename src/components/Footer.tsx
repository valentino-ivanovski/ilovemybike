"use client";

import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaWpforms } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { motion, Variants } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-[33px]">
        <div className="border-t border-black/20 mb-8"></div>
        <motion.div className="ILOVEMYBIKE flex flex-row gap-2 pb-[33px] items-center justify-start select-none">
            <h1 className="block text-3xl font-bold bg-gradient-to-t from-[#A9A9A9] to-black/90 text-transparent bg-clip-text pointer-events-none">I </h1>

            <motion.svg
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="inline-block mx-2 w-[2em] h-[2em] cursor-pointer align-middle"
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

            <h1 className="block text-3xl font-bold bg-gradient-to-t from-[#A9A9A9] to-black/90 text-transparent bg-clip-text pointer-events-none"> MY BIKE</h1>
          </motion.div>
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Mountain Bikes</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Road Bikes</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Electric Bikes</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">City Bikes</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Accessories</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Parts</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Warranty</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Our Story</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">GDPR</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Accessibility</a></li>
              <li><a href="#" className="text-gray-700 hover:underline transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* First Divider */}
        <div className="border-t border-black/20 mb-8"></div>

        {/* Contact Info Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a href="https://wa.me/1234567890" className="flex items-center gap-2 text-gray-700 hover:underline transition-colors">
            <FaWhatsapp className="text-xl" />
            <span>WhatsApp</span>
          </a>
          <a href="mailto:info@ilovemybike.com" className="flex items-center gap-2 text-gray-700 hover:underline transition-colors">
            <HiOutlineMail className="text-xl" />
            <span>Email</span>
          </a>
          <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-700 hover:underline transition-colors">
            <LuPhone className="text-xl" />
            <span>Phone</span>
          </a>
          <a href="#contact" className="flex items-center gap-2 text-gray-700 hover:underline transition-colors">
            <FaWpforms className="text-xl" />
            <span>Contact Form</span>
          </a>
        </div>

        {/* Second Divider */}
        <div className="border-t border-black/20 mb-8"></div>

        {/* Payment Methods and Trademark */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">We accept:</span>
            <div className="flex items-center gap-3">
              <FaCcVisa className="text-3xl text-blue-600" />
              <FaCcMastercard className="text-3xl text-red-500" />
              <FaCcPaypal className="text-3xl text-blue-500" />
              <FaCcApplePay className="text-3xl text-black" />
            </div>
          </div>
          <div className="text-gray-700 text-sm">
            © 2024 I 💚 MY BIKE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}