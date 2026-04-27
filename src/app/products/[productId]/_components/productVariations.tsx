"use client";
import { ColorInput } from "@/ui/form/colorInput";
import { useProduct } from "../_contexts/productContext";
import { useActiveVariation } from "../_contexts/variationContext";
import { Row } from "@/ui/layouts/row";

export function ProductVariations() {
  const product = useProduct();
  const {
    updateVariation,
    activeVariation: { color },
  } = useActiveVariation();

  return (
    <Row className="gap-8px">
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
    </Row>
  );
}
