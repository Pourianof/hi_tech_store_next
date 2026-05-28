"use client";
import { ProductVariation } from "@/core/models/product";
import { useChangeConsumer } from "@/ui/changeNotifiers/consumer";
import { NotifierProvider } from "@/ui/changeNotifiers/notifierProvider";
import { ProductChangeNotifier } from "@/ui/changeNotifiers/productChangeNotifier";
import { ProductVariationConsumer } from "@/ui/changeNotifiers/productVariationChangeNotifier";
import { useState } from "react";
import { FiChevronRight, FiEye } from "react-icons/fi";
import { ProductVariationPreview } from "./variationItemForm";

// Variations List Preview Component
export const VariationsPreviewList = () => {
  const [selectedVariation, setSelectedVariation] = useState<{
    variation: ProductVariation;
    index: number;
  } | null>(null);

  const product = useChangeConsumer(ProductChangeNotifier);

  const changeNofiedVariations = product!.product.variations;
  const variations = product!.product.variations.map((p) => p.productVariation);

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Product Variations
        </h2>
        <p className="text-sm text-gray-500">
          {variations.length} variation items in dataset
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Variations
            </span>
            <span className="text-xs text-gray-400">
              {variations.length} items
            </span>
          </div>

          <div className="space-y-2">
            {changeNofiedVariations.map((variation, index) => (
              <NotifierProvider
                key={variation.productVariation.productVariationId}
                changeNotifier={variation}
              >
                <VariationPreviewCard
                  selected={
                    variation.productVariation.productVariationId ==
                    selectedVariation?.variation.productVariationId
                  }
                  onSelect={() =>
                    setSelectedVariation({
                      variation: variation.productVariation,
                      index,
                    })
                  }
                />
              </NotifierProvider>
            ))}
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <div className="sticky top-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Live Preview
              </span>
              {selectedVariation && (
                <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  Variation #{selectedVariation.variation.productVariationId}
                </span>
              )}
            </div>

            {selectedVariation ? (
              <NotifierProvider
                changeNotifier={
                  changeNofiedVariations.find(
                    (pv) =>
                      pv.productVariation.productVariationId ==
                      selectedVariation.variation.productVariationId,
                  )!
                }
              >
                <ProductVariationPreview index={selectedVariation.index} />
              </NotifierProvider>
            ) : (
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center">
                <FiEye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">
                  Select a variation to preview
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Click on any variation from the list
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function VariationPreviewCard({
  selected,
  onSelect,
}: {
  selected?: boolean;
  onSelect(): void;
}) {
  return (
    <ProductVariationConsumer
      builder={(productVariation) => {
        const variation = productVariation!.productVariation;
        return (
          <button
            key={variation.productVariationId}
            onClick={(e) => {
              e.preventDefault();
              onSelect();
              // setSelectedVariation({ variation, index });
            }}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                  ${
                    selected
                      ? // selectedVariation?.variation?.productVariationId ===
                        // variation.productVariationId
                        "border-blue-500 bg-blue-50/30 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg shadow-inner"
                  style={{
                    backgroundColor: `#${variation.color.code}`,
                  }}
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {variation.color.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    ID: {variation.productVariationId}
                  </p>
                </div>
              </div>
              <FiChevronRight
                className={`w-4 h-4 transition-colors
                    ${
                      selected
                        ? // selectedVariation?.variation?.productVariationId ===
                          // variation.productVariationId
                          "text-blue-500"
                        : "text-gray-300"
                    }`}
              />
            </div>

            <div className="mt-2 flex items-center gap-3 text-xs">
              <span className="text-gray-600">
                ${variation.price.toFixed(2)}
              </span>
              {variation.discount && (
                <span className="text-green-600">-{variation.discount}%</span>
              )}
              <span
                className={
                  variation.inventory > 0 ? "text-gray-500" : "text-red-400"
                }
              >
                Stock: {variation.inventory}
              </span>
              <span className="text-gray-400">
                {variation.media.length} media
              </span>
            </div>
          </button>
        );
      }}
    />
  );
}
