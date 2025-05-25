import { Banner } from "./_components/banner";
import { CategoriesMiniCardList } from "./_components/categoriesMiniCardList";
import { Header } from "./_components/header";
import { OnSaleProductList } from "./_components/onSaleProductList";

export default function MainPage() {
  return (
    <div>
      <Header />
      <Banner />
      <CategoriesMiniCardList />
      <OnSaleProductList />
    </div>
  );
}
