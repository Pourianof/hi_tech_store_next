"use client";
import { Slider } from "@/ui/slider";
import { ProductMedia } from "@/core/models/product";
import { ApiImage } from "@/ui/image/ApiImage";
import { ReactNode, useEffect, useState } from "react";
import { useActiveVariation } from "../_contexts/variationContext";

export function ProductMediaSlider() {
  const [activeMedia, setActiveMedia] = useState<ProductMedia>();
  const {
    activeVariation: { media },
  } = useActiveVariation();
  if (!media?.length) {
    return null;
  }

  return (
    <div>
      <div className="mb-4">
        {!!activeMedia && (
          <ApiImage src={activeMedia.url} alt={activeMedia.type} />
        )}
      </div>
      <div className="h-40">
        <SelectableSlider
          items={media.filter((m) => m.type == "Image")}
          builder={(item) => {
            return (
              <div className="h-20">
                <ApiImage className="h-full" alt={item.type} src={item.url} />
              </div>
            );
          }}
          onSelect={setActiveMedia}
        />
      </div>
    </div>
  );
}

function SelectableSlider<T>({
  items,
  builder,
  onSelect,
}: {
  items: T[];
  builder: (item: T) => ReactNode;
  onSelect: (item: T, index: number) => void;
}) {
  function handleSelect(item: T, index: number) {
    onSelect(item, index);
  }

  useEffect(() => {
    if (!items.length) {
      return;
    }
    onSelect(items[0], 0);
  }, [onSelect, items]);

  return (
    <Slider>
      <Slider.SliderContainer>
        {items.map((item, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={(e) => {
              e.preventDefault();
              handleSelect(item, index);
            }}
          >
            <Slider.SliderItem>{builder(item)}</Slider.SliderItem>
          </div>
        ))}
      </Slider.SliderContainer>
    </Slider>
  );
}
