"use client";
import { ColorInput } from "@/ui/form/colorInput";
import { useProduct } from "../_contexts/productContext";
import { useActiveVariation } from "../_contexts/variationContext";

export function ProductVariations() {
  const product = useProduct();
  const {
    updateVariation,
    activeVariation: { color },
  } = useActiveVariation();

  return (
    <div className="flex gap-2">
      {product.variations.map((pv) => {
        const hasSelected = color.colorId == pv.color.colorId;
        return (
          <ColorInput
            key={pv.productVariationId}
            hasSelected={hasSelected}
            color={pv.color}
            onSelect={() => {
              updateVariation(pv);
            }}
          />
        );
      })}
    </div>
  );
}
