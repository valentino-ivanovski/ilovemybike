"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, MessageSquare, FileText, Truck } from "lucide-react";

export default function HowToOrder() {
  const spring = { type: "spring", stiffness: 300, damping: 15 } as const;
  const steps = [
    { icon: ShoppingCart, title: "Add to Cart", description: "Select your desired bikes and accessories" },
    { icon: MessageSquare, title: "Send Request", description: "Contact us through our contact form" },
    { icon: FileText, title: "Get Invoice", description: "We reply with a detailed invoice" },
    { icon: Truck, title: "Bike Shipped", description: "Your bike is shipped directly to you" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="w-full pb-8">
      <div className="mx-auto w-full max-w-[370px] sm:max-w-[1130px] px-4">
        <div className="bg-white rounded-3xl border border-black/5 shadow-md p-6">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-900">How to Order</h2>

          {isMobile ? (
            <>
              <div
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4"
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const width = container.clientWidth;
                  const newStep = Math.round(container.scrollLeft / width);
                  setCurrentStep(newStep);
                }}
              >
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center snap-center min-w-full flex-shrink-0 hover:scale-105 transition-transform duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </div>
                      <h3 className="font-semibold text-base mb-1 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === currentStep ? "bg-black" : "bg-gray-400"}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-base mb-1 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-15">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-full px-5 py-2 text-sm bg-gradient-to-tr from-[#1F1F1F] to-[#4D4D4D] text-white"
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}