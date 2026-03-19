import { FilledButton } from "@/ui/form/AppButtons";
import { FieldnamePathProvider } from "@/ui/form/contexts/FieldnamePathContext";
import { useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductVariationForm } from "./productVariationForm";

export const PRODUCT_VARIATION_FIELD_NAME = "variations";
export function ProductVariationsList() {
  const { append, fields, remove } = useFieldArray({
    name: PRODUCT_VARIATION_FIELD_NAME,
  });

  function handleRemoveVariation(index: number) {
    if (fields.length <= 1) {
      toast.error("At least one product variation must exist");
      return;
    }

    remove(index);
  }

  return (
    <div className="flex flex-col gap-3">
      <FieldnamePathProvider name={PRODUCT_VARIATION_FIELD_NAME}>
        {fields.map((pv, idx) => (
          <ProductVariationForm
            key={pv.id}
            index={idx}
            remove={() => handleRemoveVariation(idx)}
          />
        ))}
        <FilledButton onClick={() => append({})}>New variation</FilledButton>
      </FieldnamePathProvider>
    </div>
  );
}
