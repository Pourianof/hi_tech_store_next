import { Banner } from "./_components/banner";
import { BestSellersList } from "./_components/bestSellersList";
import { CategoriesMiniCardList } from "./_components/categoriesMiniCardList";
import { CategoryHighlight } from "./_components/categoryHighlight";
import { Footer } from "./_components/footer";
import { HighlightedItems } from "./_components/highlightedItems";
import { NewProductsList } from "./_components/newProducsList";
import { OnSaleProductList } from "./_components/onSaleProductList";
import { TopBrandsList } from "./_components/topBrandsList";
import { Wrapper } from "./_shared/wrapper";

export default function MainPage() {
  return (
    <div>
      <Wrapper>
        <Banner />
        <CategoriesMiniCardList />
        <OnSaleProductList />
        <NewProductsList />
        <HighlightedItems />
        <BestSellersList />
        <TopBrandsList />
        <CategoryHighlight />
      </Wrapper>
      <Footer />
    </div>
  );
}
