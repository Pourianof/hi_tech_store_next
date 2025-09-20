import { ProductDto } from "@/core/Dtos/ProductDto";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { createProduct } from "@/lib/server_actions/productActions";
import { useCategories } from "@/ui/contexts/categoriesContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import Link from "next/link";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FilePreviewList, FormProductMedia } from "./productMediaSelector";
import { ProductCategorySelector } from "./ProductCategorySelector";

export function ProductForm(props: {
  onFormSubmitted: (submittedProduct: ProductDto) => void;
}) {
  const { categories } = useCategories();

  async function handleSubmission(
    data: FieldValues,
    { setError }: UseFormReturn
  ) {
    const media = data.media as FormProductMedia[] | null;
    if (!media?.length || !media.find((m) => m.type == "image")) {
      setError(
        "media",
        {
          message: "At least one cover image must set for product",
        },
        { shouldFocus: true }
      );
      return;
    }

    delete data.media;
    const formData = convertFieldValuesToFormData(data);

    media.forEach((m) => formData.append("media", m.file));

    return createProduct(formData);
  }

  if (!categories) {
    return <div>Something went wrong on fetching categories</div>;
  }

  if (!categories.length) {
    return (
      <div>
        <h3>No category defined</h3>
        <span>
          First you must define the category of the product you want register
        </span>
        <span>
          This is mandatory because the category define the properties and
          features of the product
        </span>
        <Link href="/dashboard/categories">Add new category</Link>
      </div>
    );
  }

  return (
    <div className="p-6 border m-4">
      <h3 className="mb-2 font-semibold text-2xl border-b border-b-gray-500 pb-2">
        Register new product
      </h3>
      <StatefulForm
        onSubmit={handleSubmission}
        onSubmitionSuccessful={(res) => {
          props.onFormSubmitted(res as unknown as ProductDto);
        }}
      >
        <label>Title</label>
        <ErrorLabeledInput
          filedName="title"
          placeholder="Product title"
          type="text"
        />
        <label>Description</label>
        <ErrorLabeledInput
          filedName="description"
          placeholder="Product description"
          type="text"
        />
        <label>Price</label>
        <ErrorLabeledInput
          filedName="price"
          placeholder="Product Price"
          type="number"
        />
        <ProductCategorySelector categories={categories} />
        <label className="text-xl font-semibold">Product media:</label>
        <FilePreviewList />
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
