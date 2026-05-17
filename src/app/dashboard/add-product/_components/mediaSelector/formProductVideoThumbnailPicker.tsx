import { useEffect, useState } from "react";
import { FormProductMedia } from "./types";
import {
  VideoThumbnailPicker,
  VideoThumbnailPickerProps,
} from "./VideoThumbnailPicker";
import toast from "react-hot-toast";

export function FormProductVideoThumbnailPicker({
  video,
  onClose,
  ...props
}: Omit<VideoThumbnailPickerProps, "videoUrl"> & {
  video: FormProductMedia;
}) {
  const [editingVideoUrl, setEditingVideoUrl] = useState<string>();

  useEffect(() => {
    if (video.type != "video") {
      toast.error("cannot capture thumbnail from non-video media");
      onClose();
      return;
    }

    const videoUrl = URL.createObjectURL(video.file);

    setEditingVideoUrl(videoUrl);

    return () => URL.revokeObjectURL(videoUrl);
  }, [onClose, video]);

  return (
    !!editingVideoUrl && (
      <VideoThumbnailPicker
        {...props}
        videoUrl={editingVideoUrl}
        onClose={onClose}
      />
    )
  );
}
