import { ProductBasicInfo } from "@/app/dashboard/add-product/_components/sections/productBasicInfo";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { ProductChangeNotifierProvider } from "@/ui/changeNotifiers/productChangeNotifier";
import { StatefulForm } from "@/ui/form/statefulForm";
import { VariationsSection } from "./variation/variationsSection";

export function ProductBasicInfoForm({ product }: { product: ProductDto }) {
  return (
    <ProductChangeNotifierProvider product={product}>
      <StatefulForm
        onSubmit={StatefulForm.SuccessSubmit}
        onSubmitionSuccessful={StatefulForm.SuccessSubmit}
        formName="product-basic-info"
      >
        <ProductBasicInfo />
        <VariationsSection />
      </StatefulForm>
    </ProductChangeNotifierProvider>
  );
}
