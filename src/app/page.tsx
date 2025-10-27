import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import NewHeader from "@/components/NewHeader";
import { getPopularInStockBikes } from "@/lib/bikes";

export default async function Home() {
  const popularBikes = await getPopularInStockBikes({
    includeVariants: false,
  });

  return (
    <div className="h-screen w-full">
      <NewHeader />
      <HeroSection popularBikes={popularBikes} />
      <Footer />
    </div>
  );
}
