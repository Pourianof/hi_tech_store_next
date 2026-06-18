import { ProductMedia } from "@/core/models/product";
import { CustomImage } from "@/ui/image/CustomImage";
import { twMerge } from "tailwind-merge";

export function ProductMediaLargeView({
  media,
  className,
}: {
  media?: ProductMedia;
  className?: string;
}) {
  return (
    <div className={twMerge("mb-4 aspect-[500/340] w-full", className)}>
      {!!media &&
        (media.type == "Image" ? (
          <CustomImage
            className="rounded-lg overflow-clip"
            src={media.url}
            alt={media.type}
            aspectRatio={500 / 340}
          />
        ) : (
          <video
            style={{
              aspectRatio: `500/340`,
            }}
            src={media.url}
            controls={true}
            className="w-full"
          />
        ))}
    </div>
  );
}
