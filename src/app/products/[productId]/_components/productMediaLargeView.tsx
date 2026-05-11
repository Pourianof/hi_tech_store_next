import { ProductMedia } from "@/core/models/product";
import { ApiImage } from "@/ui/image/ApiImage";
import { getApiSrc } from "@/ui/image/getApiImageSrc";
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
          <ApiImage
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
            src={getApiSrc(media.url)}
            controls={true}
            className="w-full"
          />
        ))}
    </div>
  );
}
