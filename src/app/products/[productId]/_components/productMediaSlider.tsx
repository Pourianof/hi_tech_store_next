"use client";
import { ProductMedia } from "@/core/models/product";
import { ProductVariationModel } from "@/core/models/productModel";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { useEffect, useState } from "react";
import { useActiveVariation } from "../_contexts/variationContext";
import Icon from "@/ui/icons/icon";
import { Body } from "@/ui/theme/text/body";
import { getApiImageSrc } from "@/ui/image/getApiImageSrc";

export function ProductMediaSlider() {
  const { activeVariation } = useActiveVariation();

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
      <div className="mb-4 aspect-[500/340] w-full">
        {!!activeMedia && (
          <ApiImage
            className="rounded-lg overflow-clip"
            src={activeMedia.url}
            alt={activeMedia.type}
            aspectRatio={500 / 340}
          />
        )}
      </div>
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
              />
            </Column>
          );
        })}
      </Row>
    </Column>
  );
}

function ProductMediaItem({
  onClick,
  media,
  isSelected,
  hasMore,
}: {
  onClick: VoidFunction;
  media: ProductMedia;
  isSelected?: boolean;
  hasMore?: number;
}) {
  return (
    <div
      key={media.productMediaId}
      className={[
        "h-20 aspect-[80/70] hover:cursor-pointer overflow-clip relative",
        isSelected ? "outline-2 outline-primary-blue-0c rounded-lg" : "",
      ].join(" ")}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {!!hasMore && (
        <Column
          center
          className="absolute top-0 left-0 w-full h-full rounded-lg overflow-clip bg-black/20 z-10"
        >
          <Body
            size="md"
            className="absolute w-full h-full text-center bg-cover bg-center bg-black/20 bg-blend-multiply"
            style={{
              backgroundImage: `url(${getApiImageSrc(media.url)})`,
            }}
          >
            <Body
              size="md"
              className="absolute w-[40px] aspect-square rounded-full bg-theme-white z-10  font-semibold p-8px text-transparent left-1/2 top-1/2 -translate-1/2"
            >
              +{hasMore}
            </Body>
            <Body
              size="md"
              className="absolute w-full h-full font-semibold bg-inherit z-10 bg-clip-text bg-cover bg-center flex justify-center items-center  text-transparent bg-blend-multiply p-8px"
              style={{
                backgroundImage: "inherit",
              }}
            >
              +{hasMore}
            </Body>
          </Body>
        </Column>
      )}
      {media.type == "Video" ? (
        <Column className="absolute top-0 left-0 w-full h-full" center>
          <Icon name="video_play" />
        </Column>
      ) : (
        !hasMore && (
          <ApiImage
            className={[
              "h-full w-full",
              !isSelected ? "rounded-lg overflow-clip" : "",
            ].join(" ")}
            alt={media.type}
            src={media.url}
          />
        )
      )}
    </div>
  );
}
