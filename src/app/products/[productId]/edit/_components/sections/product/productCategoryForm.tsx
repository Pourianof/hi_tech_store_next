import {
  CATEGORY_VALUES_FIELD_NAME,
  ProductCategorySelector,
} from "@/app/dashboard/add-product/_components/ProductCategorySelector";
import { productCategoryValuesSchema } from "@/core/schemas/productCreationSchema";
import { useChangeConsumer } from "@/ui/changeNotifiers/consumer";
import { ProductChangeNotifier } from "@/ui/changeNotifiers/productChangeNotifier";
import { useCategories } from "@/ui/contexts/categoriesContext";
import { FilledButton } from "@/ui/form/AppButtons";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Column } from "@/ui/layouts/column";
import { Caption } from "@/ui/theme/text/caption";
import { H4 } from "@/ui/theme/text/headers";
import toast from "react-hot-toast";
import { FormBox } from "./formBox";

export function ProductCategoryForm() {
  const productNc = useChangeConsumer(ProductChangeNotifier);
  const categories = useCategories().categories;

  if (!categories) {
    return (
      <center>
        <Column className="gap-1">
          <H4 className="text-error">Categories data could not fetch</H4>
          <Caption size="md" className="text-error-light">
            Refresh page maybe it get fixed
          </Caption>
        </Column>
      </center>
    );
  }

  const product = productNc.product;

  return (
    <FormBox>
      <StatefulForm
        formName="product-category-update"
        onValidation={(data) => {
          const actualData = data[CATEGORY_VALUES_FIELD_NAME];
          const result = productCategoryValuesSchema.safeParse({
            ...actualData,
            category: categories.find(
              (c) => c.categoryId == actualData.categoryId,
            ),
          });

          if (!result.success) {
            return { errors: zodToRhsError(result.error) };
          }

          return { validData: result.data };
        }}
        onSubmit={(data) => productNc.updateCategory(data)}
        onSubmitionSuccessful={() => {
          toast.success("Updated succussfully");
        }}
        defaultValues={{
          [CATEGORY_VALUES_FIELD_NAME]: {
            categoryId: product.categoryId,
            componentModels: product.components.flatMap((pc) => pc.models),
            properties: product.properties?.map((prop) => ({
              propertyId: prop.propertyId,
              propertyValue: prop.value,
            })),
          },
        }}
      >
        <ProductCategorySelector categories={categories} />
        <StatefulForm.Submitter
          render={(submitter) => {
            return <FilledButton onClick={submitter}>Save</FilledButton>;
          }}
        />
      </StatefulForm>
    </FormBox>
  );
}
