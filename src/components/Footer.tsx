import { FaWhatsapp, FaEnvelope, FaPhone, FaWpforms } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mountain Bikes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Road Bikes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Electric Bikes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">City Bikes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Parts</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">GDPR</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* First Divider */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Contact Info Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a href="https://wa.me/1234567890" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaWhatsapp className="text-xl" />
            <span>WhatsApp</span>
          </a>
          <a href="mailto:info@ilovemybike.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaEnvelope className="text-xl" />
            <span>Email</span>
          </a>
          <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaPhone className="text-xl" />
            <span>Phone</span>
          </a>
          <a href="#contact" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaWpforms className="text-xl" />
            <span>Contact Form</span>
          </a>
        </div>

        {/* Second Divider */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Payment Methods and Trademark */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">We accept:</span>
            <div className="flex items-center gap-3">
              <FaCcVisa className="text-2xl text-blue-600" />
              <FaCcMastercard className="text-2xl text-red-500" />
              <FaCcPaypal className="text-2xl text-blue-500" />
              <FaCcApplePay className="text-2xl text-white" />
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 I ❤️ MY BIKE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}