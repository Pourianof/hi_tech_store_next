import { ProductBasicInfo } from "@/app/dashboard/add-product/_components/sections/productBasicInfo";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { ProductChangeNotifierProvider } from "@/ui/changeNotifiers/productChangeNotifier";
import { Column } from "@/ui/layouts/column";
import { H4 } from "@/ui/theme/text/headers";
import { VariationsSection } from "../variation/variationsSection";
import { ProductBasicInfoUpdateForm } from "./productBasicInfoUpdateForm";
import { ProductCategoryForm } from "./productCategoryForm";

export function ProductBasicInfoForm({ product }: { product: ProductDto }) {
  return (
    <ProductChangeNotifierProvider product={product}>
      <div className="grid grid-cols-2 gap-8">
        <Column className="gap-2">
          <H4 className="font-bold text-center text-gray-800">
            Product basic details
          </H4>
          <ProductBasicInfoUpdateForm>
            <ProductBasicInfo />
          </ProductBasicInfoUpdateForm>
        </Column>
        <Column className="gap-2">
          <H4 className="font-bold text-center text-gray-800">
            Product category
          </H4>
          <ProductCategoryForm />
        </Column>
      </div>
      <VariationsSection />
    </ProductChangeNotifierProvider>
  );
}
