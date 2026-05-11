/* eslint-disable @next/next/no-img-element */
import React from "react";

import { FormProductMedia } from "./types";
import Icon from "@/ui/icons/icon";

interface MediaPreviewItemProps {
  item: FormProductMedia;
  index: number;
  onRemove: (index: number) => void;
  onEdit?: (index: number) => void;
  isEditable?: boolean;
}

export function MediaPreviewItem({
  item,
  index,
  onRemove,
  onEdit,
  isEditable = false,
}: MediaPreviewItemProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(index);
    }
  };

  return (
    <div className="relative group cursor-pointer">
      {item.type === "image" ? (
        <div className="relative w-28 h-28 rounded-2xl shadow-md overflow-hidden">
          <img
            src={item.url}
            alt={`preview-${index}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
            <Icon name="image" className="w-3 h-3" />
            Image
          </div>
        </div>
      ) : (
        <div className="relative w-28 h-28 rounded-2xl shadow-md overflow-hidden bg-gray-900">
          <img
            src={item.thumbnailUrl}
            alt={`video-thumbnail-${index}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-200">
            <Icon name="play" className="w-8 h-8 text-white drop-shadow-lg" />
          </div>

          {isEditable && onEdit && (
            <button
              onClick={handleEditClick}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-20 shadow-lg"
            >
              <Icon name="edit" className="w-4 h-4" />
            </button>
          )}

          <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
            <Icon name="video" className="w-3 h-3" />
            Video
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110 z-10"
      >
        <Icon name="trash" className="w-3 h-3" />
      </button>
    </div>
  );
}
