import React, { useState, useEffect } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import { FormProductMedia } from "./types";
import { VideoThumbnailPicker } from "./VideoThumbnailPicker";
import { MediaPreviewItem } from "./MediaPreviewItem";
import { AddMediaButton } from "./AddMediaButton";

export function FilePreviewList({ fieldname }: { fieldname: string }) {
  const formContext = useFormContext();
  const files = useWatch({
    name: fieldname,
    defaultValue: [],
  }) as FormProductMedia[];

  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [pendingVideo, setPendingVideo] = useState<{
    file: File;
    url: string;
    index?: number;
    oldThumbnailUrl?: string;
  } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleFileSelect = async (file: File) => {
    if (file.type.startsWith("image")) {
      const newMedia: FormProductMedia = {
        file,
        url: URL.createObjectURL(file),
        type: "image",
      };
      setFiles([...files, newMedia]);
      formContext.clearErrors(fieldname);
      return;
    }

    if (file.type.startsWith("video")) {
      const videoUrl = URL.createObjectURL(file);
      setPendingVideo({ file, url: videoUrl });
      setEditingIndex(null);
      setShowVideoPicker(true);
    }
  };

  const handleEditVideo = (index: number) => {
    const videoToEdit = files[index];
    if (videoToEdit.type !== "video") return;

    const oldThumbnailUrl = videoToEdit.thumbnailUrl;

    const videoUrl = URL.createObjectURL(videoToEdit.file);

    setPendingVideo({
      file: videoToEdit.file,
      url: videoUrl,
      index,
      oldThumbnailUrl,
    });
    setEditingIndex(index);
    setShowVideoPicker(true);
  };

  const handleVideoCapture = (thumbnailFile: File, thumbnailUrl: string) => {
    if (!pendingVideo) return;

    if (editingIndex !== null) {
      setFiles(
        ((prev) => {
          const newFiles = [...prev];
          const oldMedia = newFiles[editingIndex];

          if (oldMedia.thumbnailUrl) {
            URL.revokeObjectURL(oldMedia.thumbnailUrl);
          }

          newFiles[editingIndex] = {
            ...oldMedia,
            thumbnailUrl: thumbnailUrl,
          };

          return newFiles;
        })(files),
      );
    } else {
      const newMedia: FormProductMedia = {
        file: pendingVideo.file,
        url: pendingVideo.url,
        type: "video",
        thumbnailUrl,
        thumbnail: thumbnailFile,
      };
      setFiles([...files, newMedia]);
    }

    handleCloseVideoPicker();
    formContext.clearErrors(fieldname);
  };

  const handleCloseVideoPicker = () => {
    if (editingIndex !== null && pendingVideo?.oldThumbnailUrl) {
      console.log("Edit cancelled, keeping old thumbnail");
    }

    if (pendingVideo?.url) {
      URL.revokeObjectURL(pendingVideo.url);
    }

    setShowVideoPicker(false);
    setPendingVideo(null);
    setEditingIndex(null);
  };

  const handleRemoveMedia = (index: number) => {
    const removed = files[index];
    URL.revokeObjectURL(removed.url);
    if (removed.thumbnailUrl) {
      URL.revokeObjectURL(removed.thumbnailUrl);
    }
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    formContext.clearErrors(fieldname);
  };

  function setFiles(files: FormProductMedia[]) {
    formContext.setValue(fieldname, files);
  }

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.url);
        if (file.thumbnailUrl) URL.revokeObjectURL(file.thumbnailUrl);
      });
    };
  }, [files]);

  return (
    <>
      <Controller
        name={fieldname}
        rules={{
          required: "At least one cover image must be set for product",
          validate: (value: FormProductMedia[]) => {
            if (!value?.length || !value.some((m) => m.type === "image")) {
              return "At least one cover image must be set for product";
            }
            return true;
          },
        }}
        render={() => (
          <div className="space-y-3">
            <ErrorMessageLabel fieldName={fieldname} />
            <div className="flex items-center gap-3 flex-wrap">
              {files.map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  onClick={() => {
                    if (item.type === "video") {
                      handleEditVideo(index);
                    }
                  }}
                >
                  <MediaPreviewItem
                    item={item}
                    index={index}
                    onRemove={handleRemoveMedia}
                    isEditable={item.type === "video"}
                  />
                </div>
              ))}
              <AddMediaButton onFileSelect={handleFileSelect} />
            </div>
          </div>
        )}
      />

      {showVideoPicker && pendingVideo && (
        <VideoThumbnailPicker
          videoUrl={pendingVideo.url}
          onCapture={handleVideoCapture}
          onClose={handleCloseVideoPicker}
          isEditMode={editingIndex !== null}
        />
      )}
    </>
  );
}
