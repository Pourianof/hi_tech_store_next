import { AddProductFormPage } from "./_components/addProductFormPage";
import { AvailableProductColorInjector } from "./_components/availableProductColorInjector";
import { BrandInjector } from "./_components/brandProvider";

export default function AddProductPage() {
  return (
    <BrandInjector>
      <AvailableProductColorInjector>
        <AddProductFormPage />
      </AvailableProductColorInjector>
    </BrandInjector>
  );
}
