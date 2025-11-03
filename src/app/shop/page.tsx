import NewHeader from "@/components/NewHeader"
import ShopSection from "@/components/ShopSection"
import Footer from "@/components/Footer"
import { getInStockBikes } from "@/lib/bikes";

export default async function ShopPage() {
  const initialPageData = await getInStockBikes(
    {
      sortBy: "title",
      sortOrder: "asc",
      page: 1,
    },
    { includeVariants: false }
  );

  return (
    <>
      <NewHeader />
      <ShopSection initialPageData={initialPageData} />
      <Footer />
    </>
  )
}
