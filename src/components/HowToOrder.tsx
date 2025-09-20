"use client";

import { ShoppingCart, MessageSquare, FileText, Truck } from "lucide-react";

export default function HowToOrder() {
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
    <section className="w-full py-10">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="bg-white rounded-3xl border border-black/5 shadow-md p-8 md:p-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">How to Order</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mb-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}