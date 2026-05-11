"use client";
import { ProductMedia } from "@/core/models/product";
import { ProductVariationModel } from "@/core/models/productModel";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { useEffect, useState } from "react";
import { useActiveVariation } from "../_contexts/variationContext";
import { ProductMediaItem } from "./productMediaItem";
import { ProductMediaLargeView } from "./productMediaLargeView";
import { ProductMediaSlider } from "./productMediaSlider";

export function ProductMediaFixedList() {
  const { activeVariation } = useActiveVariation();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [activeMedia, setActiveMedia] = useState<ProductMedia>();

  const medias = activeVariation.media;

  useEffect(() => {
    const media = (
      activeVariation as ProductVariationModel
    ).getCandidateImageMedia();

    setActiveMedia(media);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariation.productVariationId]);

  if (!medias?.length) {
    return null;
  }

  const numberOfDisplayingMedia = 5;

  return (
    <Column>
      <ProductMediaLargeView media={activeMedia} />
      <Row className="h-40 grid grid-cols-5 justify-center">
        {medias.slice(0, numberOfDisplayingMedia).map((media, index) => {
          const isLast = numberOfDisplayingMedia - 1 == index;
          const hasMore = medias.length > numberOfDisplayingMedia && isLast;
          return (
            <Column key={media.productMediaId} centerH>
              <ProductMediaItem
                media={media}
                onClick={() => {
                  if (hasMore) {
                    // open media modal
                    return;
                  }
                  setActiveMedia(media);
                }}
                isSelected={activeMedia?.productMediaId == media.productMediaId}
                hasMore={
                  hasMore ? medias.length - numberOfDisplayingMedia : undefined
                }
                onMoreClicked={() => setIsMediaModalOpen(true)}
              />
            </Column>
          );
        })}
      </Row>
      {isMediaModalOpen && (
        <ProductMediaSlider
          media={medias}
          onClose={() => setIsMediaModalOpen(false)}
        />
      )}
    </Column>
  );
}
