import NewHeader from "@/components/NewHeader"
import ShopSection from "@/components/ShopSection"
import Footer from "@/components/Footer"
import { getAllInStockBikes } from "@/lib/bikes";

export default async function ShopPage() {
  const all = await getAllInStockBikes(
    {
      sortBy: "title",
      sortOrder: "asc",
      page: 1,
    },
    { includeVariants: false }
  );
  const PER_PAGE = 20;
  const initialPageData = {
    bikes: all.slice(0, PER_PAGE),
    total: all.length,
    page: 1,
    totalPages: Math.max(1, Math.ceil(all.length / PER_PAGE)),
  };

  return (
    <>
      <NewHeader />
      <ShopSection initialPageData={initialPageData} />
      <Footer />
    </>
  )
}
