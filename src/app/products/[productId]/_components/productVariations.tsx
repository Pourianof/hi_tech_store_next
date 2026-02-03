"use client";
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
          <div key={pv.color.code} className="text-center">
            <div
              className={
                "p-1 rounded-full border-4 " +
                (hasSelected ? "border-primary-blue-0c" : "border-neutral-300")
              }
            >
              <div
                className="w-8 aspect-square rounded-full cursor-pointer"
                style={{ backgroundColor: `#${pv.color.code}` }}
                onClick={(e) => {
                  e.preventDefault();
                  updateVariation(pv);
                }}
              ></div>
            </div>
            <span
              className={
                "text-sm " + (hasSelected ? "text-primary-blue-0c" : "")
              }
            >
              {pv.color.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
