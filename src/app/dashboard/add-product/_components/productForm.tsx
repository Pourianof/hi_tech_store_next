import { createProduct } from "@/lib/server_actions/productActions";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FilePreviewList, FormProductMedia } from "./productMediaSelector";
import { ProductDto } from "@/core/Dtos/ProductDto";

export function ProductForm(props: {
  onFormSubmitted: (submittedProduct: ProductDto) => void;
}) {
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

    const formData = new FormData();
    delete data.media;
    for (const [key, val] of Object.entries(data)) {
      formData.append(key, val);
    }

    media.forEach((m) => formData.append("media", m.file));

    return createProduct(formData);
  }
  return (
    <div className="p-4">
      <h3 className="mb-2 font-semibold text-xl">Register new product</h3>
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
        <label className="text-xl font-semibold">Product media:</label>
        <FilePreviewList />
        <div className="flex gap-4">
          <button type="submit">Submit</button>
          <StatefulForm.ResetButton>Reset</StatefulForm.ResetButton>
        </div>
      </StatefulForm>
    </div>
  );
}
