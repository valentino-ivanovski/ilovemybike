"use client";
import { motion } from "framer-motion";
import { ShoppingCart, MessageSquare, FileText, Truck } from "lucide-react";

export default function HowToOrder() {

  const spring = { type: "spring", stiffness: 300, damping: 15 } as const;

  const steps = [
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      description: "Select your desired bikes and accessories"
    },
    {
      icon: MessageSquare,
      title: "Send Request",
      description: "Contact us through our contact form"
    },
    {
      icon: FileText,
      title: "Get Invoice",
      description: "We reply with a detailed invoice"
    },
    {
      icon: Truck,
      title: "Bike Shipped",
      description: "Your bike is shipped directly to you"
    }
  ];

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="bg-white rounded-3xl border border-black/5 shadow-md p-8 md:p-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">How to Order</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
          
        </div>
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-full px-[23px] py-[8px] cursor-pointer bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] text-white"
            >
              Shop Now
            </motion.button>
          </div>
      </div>
    </section>
  );
}