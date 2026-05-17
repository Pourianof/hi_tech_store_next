import { ProductBasicInfo } from "@/app/dashboard/add-product/_components/sections/productBasicInfo";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { StatefulForm } from "@/ui/form/statefulForm";
import { VariationsSection } from "./variation/variationsSection";

export function ProductBasicInfoForm({ product }: { product: ProductDto }) {
  return (
    <StatefulForm
      onSubmit={StatefulForm.SuccessSubmit}
      onSubmitionSuccessful={StatefulForm.SuccessSubmit}
      formName="product-basic-info"
    >
      <ProductBasicInfo />
      <VariationsSection variations={product.variations} />
    </StatefulForm>
  );
}
