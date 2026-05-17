import { ProductVariation } from "@/core/models/product";
import { Column } from "@/ui/layouts/column";
import { VariationsPreviewList } from "./variationsPreviewList";

export function VariationsSection({
  variations,
}: {
  variations: ProductVariation[];
}) {
  return (
    <Column>
      <VariationsPreviewList variations={variations} />
    </Column>
  );
}
