import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import Header from "@/components/Header";
import CategoriesCarousel from "@/components/CategoriesCarousel"; 
import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import BikeCarousel from "@/components/BikeCarousel";

const heroSlides = [
  {
    heading: "Some placeholder text goes here.",
    subtext: "Short supporting copy for slide one — swap with real content later.",
    cta: "Shop Now",
  },
  {
    heading: "Another placeholder headline.",
    subtext: "Second slide copy. Keep it brief so it looks clean on the image.",
    cta: "Shop Now",
  },
  {
    heading: "Final placeholder headline.",
    subtext: "Third slide copy to demo autoplay between slides.",
    cta: "Shop Now",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-radial from-white to-[#E9E9E9]">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Section */}
      <BrandsMarquee logos={["/logos/cube.svg", "/logos/bach.png", "/logos/orient-logo-black.svg", "/logos/cannondale-logo-black.svg", "/logos/samebike.png", "/logos/shengmilo.png"]} />

      {/* Categories Section */}
      <section className="w-full pt-10 pb-7 md:py-10">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 ">

          {/* Carousel with responsive items */}
          <CategoriesCarousel />
        </div>
      </section>

      <section className="w-full pb-5 md:px-7.5 px-6 bg-transparent rounded-3xl max-w-[1200px]">
        <div className="mx-auto w-full max-w-[1200px] bg-transparent rounded-3xl">
          {/* Embla Hero Carousel Three Card Component*/}
          <HeroCarousel slides={heroSlides} />
        </div>
      </section>

      {/* Bike Carousel Section */}
      <section className="w-full py-10">
        <h2 className="text-2xl font-bold text-center mb-2">Our Picks 💚</h2>
        <p className="text-gray-600 text-center mb-5">Discover our most popular options, ideal to ride around the island. </p>
        <BikeCarousel />
      </section>

    </div>
  );
}
