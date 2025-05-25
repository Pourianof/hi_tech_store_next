import { Banner } from "./_components/banner";
import { CategoriesMiniCardList } from "./_components/categoriesMiniCardList";
import { Header } from "./_components/header";

export default function MainPage() {
  return (
    <div>
      <Header />
      <Banner />
      <CategoriesMiniCardList />
    </div>
  );
}
