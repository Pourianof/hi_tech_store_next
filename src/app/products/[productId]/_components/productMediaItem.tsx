import { ProductMedia } from "@/core/models/product";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { getApiSrc } from "@/ui/image/getApiImageSrc";
import { Column } from "@/ui/layouts/column";
import { Body } from "@/ui/theme/text/body";
import { twMerge } from "tailwind-merge";

export function ProductMediaItem({
  onClick,
  media,
  isSelected,
  hasMore,
  onMoreClicked,
}: {
  onClick: VoidFunction;
  media: ProductMedia;
  isSelected?: boolean;
  hasMore?: number;
  onMoreClicked?(): void;
}) {
  return (
    <div
      key={media.productMediaId}
      className={[
        "h-20 aspect-[80/70] rounded-lg hover:cursor-pointer overflow-clip relative outline-1 outline-gray-neutral-b4",
        isSelected ? "outline-2 outline-primary-blue-0c " : "",
      ].join(" ")}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {!!hasMore && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onMoreClicked?.();
          }}
        >
          <Column
            center
            className="absolute top-0 left-0 w-full h-full rounded-lg overflow-clip bg-black/20 z-10"
          >
            <Body
              size="md"
              className="absolute w-full h-full text-center bg-cover bg-center bg-black/20 bg-blend-multiply"
              style={{
                backgroundImage: `url(${getApiSrc(media.url)})`,
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
        </button>
      )}
      {media.type == "Video" ? (
        <>
          {media.thumbnailUrl && (
            <ApiImage
              className={twMerge(
                "h-full w-full",
                !isSelected ? "rounded-lg overflow-clip" : "",
              )}
              alt={media.type}
              src={media.thumbnailUrl}
            />
          )}
          <Column
            className="w-full h-full absolute top-0 left-0 bg-black/10 hover:bg-black/20"
            center
          >
            <Icon name="video_play" className="text-2xl" />
          </Column>
        </>
      ) : (
        !hasMore && (
          <ApiImage
            className={twMerge(
              "h-full w-full",
              !isSelected ? "rounded-lg overflow-clip" : "",
            )}
            alt={media.type}
            src={media.url}
          />
        )
      )}
    </div>
  );
}
