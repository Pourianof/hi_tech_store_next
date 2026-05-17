import { ProductVariation } from "@/core/models/product";
import { BsGrid3X3 } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { MediaSection } from "./mediaSection";
import { VariationDetails } from "./variationDetailsSection";

// Main Preview Component
export const ProductVariationPreview = ({
  variation,
  // index,
}: {
  variation: ProductVariation;
  index: number;
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Variation Details
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Product variation information preview
            </p>
          </div>
          <div className="px-2.5 py-1 bg-blue-50 rounded-lg">
            <span className="text-xs font-medium text-blue-600">
              Preview Mode
            </span>
          </div>
        </div>
      </div>

      <MediaSection
        key={variation.productVariationId}
        media={variation.media}
        variationId={variation.productVariationId}
      />
      <VariationDetails variation={variation} />

      {/* Footer Stats */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <BsGrid3X3 className="w-3 h-3" />
            {variation.media.length} media files
          </span>
          <span className="flex items-center gap-1">
            <FiEye className="w-3 h-3" />
            {variation.media.filter((m) => m.isMain).length > 0
              ? "Main media set"
              : "No main media"}
          </span>
        </div>
        <span className="font-mono text-[11px]">
          v.{variation.productVariationId}
        </span>
      </div>
    </div>
  );
};
