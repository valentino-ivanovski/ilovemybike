"use client";

import { ShoppingCart, CreditCard, Truck, CheckCircle } from "lucide-react";

export default function HowToOrder() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Browse & Select",
      description: "Choose your favorite bikes and accessories"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay safely with multiple payment options"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We deliver to your doorstep quickly"
    },
    {
      icon: CheckCircle,
      title: "Enjoy Riding",
      description: "Start your cycling adventure"
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
      </div>
    </section>
  );
}