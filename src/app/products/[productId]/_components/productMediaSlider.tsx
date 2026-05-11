"use client";
import { ProductMedia } from "@/core/models/product";
import { Column } from "@/ui/layouts/column";
import { Slider, SliderContainer } from "@/ui/slider";
import { ProductMediaItem } from "./productMediaItem";
import { useEffect, useState } from "react";
import { ProductMediaLargeView } from "./productMediaLargeView";
import { Row } from "@/ui/layouts/row";
import { H4 } from "@/ui/theme/text/headers";
import Icon from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { twMerge } from "tailwind-merge";

enum MediaListType {
  Video,
  Image,
}

export function ProductMediaSlider({
  media,
  onClose,
}: {
  media: ProductMedia[];
  onClose(): void;
}) {
  const [mediaListType, setMediaListType] = useState<MediaListType>(
    MediaListType.Image,
  );
  const [activeMedia, setActiveMedia] = useState<ProductMedia | undefined>(
    media.at(0),
  );

  const mediaList = media.filter(
    (m) =>
      (mediaListType == MediaListType.Image && m.type == "Image") ||
      (mediaListType == MediaListType.Video && m.type == "Video"),
  );

  useEffect(() => {
    setActiveMedia(mediaList.at(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaListType]);

  return (
    <Modal containerClassName="w-1/2 overflow-auto">
      <Column className="gap-4">
        <Row className="justify-between border-b border-gray-neutral-b4">
          <Row>
            <MediaListTypeLabelButton
              label="Images"
              onClick={() => setMediaListType(MediaListType.Image)}
              active={mediaListType == MediaListType.Image}
            />
            <MediaListTypeLabelButton
              label="Videos"
              onClick={() => setMediaListType(MediaListType.Video)}
              active={mediaListType == MediaListType.Video}
            />
          </Row>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="hover:cursor-pointer"
          >
            <H4>
              <Icon name="circular_close" />
            </H4>
          </button>
        </Row>
        <ProductMediaLargeView
          media={activeMedia}
          className="max-w-1/2 mx-auto"
        />
        <Slider>
          <SliderContainer className="gap-2 p-1">
            {mediaList.map((m) => (
              <ProductMediaItem
                key={m.productMediaId}
                media={m}
                onClick={() => {
                  setActiveMedia(m);
                }}
                isSelected={m.productMediaId == activeMedia?.productMediaId}
              />
            ))}
          </SliderContainer>
        </Slider>
      </Column>
    </Modal>
  );
}

function MediaListTypeLabelButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick(): void;
  active?: boolean;
}) {
  const activeClassNames = "text-primary-blue-0c border-primary-blue-0c";

  return (
    <button
      className={twMerge(
        "border-b p-8px px-16px hover:cursor-pointer",
        active
          ? activeClassNames
          : "border-b-transparent hover:bg-black/10 hover:text-gray-700",
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <H4>{label}</H4>
    </button>
  );
}
