import { FailedBox } from "@/app/_components/failedBox";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { productCreationSchema } from "@/core/schemas/productCreationSchema";
import { createProduct } from "@/lib/server_actions/productActions";
import { useCategories } from "@/ui/contexts/categoriesContext";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Column } from "@/ui/layouts/column";
import Link from "next/link";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ProductCategorySelector } from "./ProductCategorySelector";
import { ProductVariationsList } from "./productVariationsList";
import { ProductBasicInfo } from "./sections/productBasicInfo";

export function ProductForm(props: {
  onFormSubmitted: (submittedProduct: ProductDto) => void;
}) {
  const { categories } = useCategories();

  async function handleSubmission(
    data: FieldValues,
    { setError }: UseFormReturn,
  ) {
    const parsedData = productCreationSchema.safeParse(data);
    console.log(data, parsedData);
    if (!parsedData.success) {
      zodToRhsError(parsedData.error).forEach((err) =>
        setError(err.path, { message: err.message }),
      );
      return;
    }

    const result = await createProduct(parsedData.data);

    return result;
  }

  if (!categories) {
    return <div>Something went wrong on fetching categories</div>;
  }

  if (!categories.length) {
    return (
      <Column>
        <FailedBox
          title="No category defined"
          message="First you must define the category of the product you want register\n
          This is mandatory because the category define the properties and
          features of the product"
        />
        <Link href="/dashboard/categories">Add new category</Link>
      </Column>
    );
  }

  return (
    <div className="p-6 border desktop:m-4">
      <h3 className="mb-2 font-semibold text-2xl border-b border-b-gray-500 pb-2">
        Register new product
      </h3>
      <StatefulForm
        formName="product-form"
        onSubmit={handleSubmission}
        onSubmitionSuccessful={(res) => {
          props.onFormSubmitted(res as unknown as ProductDto);
        }}
        defaultValues={{ variations: [{}] }}
      >
        <ProductBasicInfo />
        <ProductCategorySelector categories={categories} />
        <ProductVariationsList />
        <div className="flex gap-4">
          <button
            type="submit"
            className="border py-2 px-4 cursor-pointer bg-green-200 hover:bg-green-500 hover:text-gray-200"
          >
            Submit
          </button>
          <StatefulForm.ResetButton className="border py-2 px-4 cursor-pointer bg-gray-200 hover:bg-gray-300">
            Reset
          </StatefulForm.ResetButton>
        </div>
      </StatefulForm>
    </div>
  );
}
