import { ProductMedia } from "@/core/models/product";
import { CustomImage } from "@/ui/image/customImage";
import { FiImage, FiVideo } from "react-icons/fi";

export const MediaThumbnail = ({
  media,
  isActive,
  onClick,
}: {
  media: ProductMedia;
  isActive?: boolean;
  onClick(): void;
}) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border-2 transition-all
      ${isActive ? "border-blue-500 shadow-md" : "border-transparent hover:border-gray-300"}`}
  >
    {media.type === "Image" ? (
      <CustomImage
        src={media.url}
        alt=""
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <FiVideo className="w-5 h-5 text-white/50" />
      </div>
    )}
    {media.isMain && (
      <div className="absolute top-0 left-0 bg-blue-500 text-white text-[9px] px-1 py-0.5 rounded-br">
        Main
      </div>
    )}
    <div className="absolute bottom-1 right-1">
      {media.type === "Image" ? (
        <FiImage className="w-3 h-3 text-white drop-shadow-md" />
      ) : (
        <FiVideo className="w-3 h-3 text-white drop-shadow-md" />
      )}
    </div>
  </button>
);
