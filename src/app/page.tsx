import { Banner } from "./_components/banner";
import { BestSellersList } from "./_components/bestSellersList";
import { CategoriesMiniCardList } from "./_components/categoriesMiniCardList";
import { Header } from "./_components/header";
import { HighlightedItems } from "./_components/highlightedItems";
import { NewProductsList } from "./_components/newProducsList";
import { OnSaleProductList } from "./_components/onSaleProductList";
import { TopBrandsList } from "./_components/topBrandsList";

export default function MainPage() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Banner />
        <CategoriesMiniCardList />
        <OnSaleProductList />
        <NewProductsList />
        <HighlightedItems />
        <BestSellersList />
        <TopBrandsList />
      </div>
    </div>
  );
}
