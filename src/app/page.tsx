"use client";

import CategoriesCarousel from "@/components/CategoriesCarousel"; 
import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import BikeCarousel from "@/components/BikeCarousel";
import Parts from "@/components/Parts";
import AccessoriesCarousel from "@/components/AccessoriesCarousel";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import NewHeader from "@/components/NewHeader";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <NewHeader />
      <HeroSection />
      <Footer />
    </div>
  );
}
