import NewHeader from "@/components/NewHeader"
import ShopSection from "@/components/ShopSection"
import Footer from "@/components/Footer"
import { getPopularInStockBikes } from "@/lib/bikes";

export default async function ShopPage() {

  const popularBikes = await getPopularInStockBikes({
      includeVariants: false,
    });

  return (
    <>
      <NewHeader />
      <ShopSection popularBikes={popularBikes} />
      <Footer />
    </>
  )
}
