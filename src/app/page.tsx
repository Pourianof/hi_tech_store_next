import { Banner } from "./_components/banner";
import { CategoriesMiniCardList } from "./_components/categoriesMiniCardList";
import { Header } from "./_components/header";
import { HighlightedItems } from "./_components/highlightedItems";
import { NewProductsList } from "./_components/newProducsList";
import { OnSaleProductList } from "./_components/onSaleProductList";

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
      </div>
    </div>
  );
}
