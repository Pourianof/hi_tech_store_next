import { AddProductFormPage } from "./_components/addProductFormPage";
import { BrandInjector } from "./_components/brandProvider";

export default function AddProductPage() {
  return (
    <BrandInjector>
      <AddProductFormPage />
    </BrandInjector>
  );
}
