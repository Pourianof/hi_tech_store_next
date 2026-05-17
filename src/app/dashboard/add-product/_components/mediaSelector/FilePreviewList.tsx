import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormProductVideoThumbnailPicker } from "./formProductVideoThumbnailPicker";
import { MediaPreviewItem } from "./MediaPreviewItem";
import { FormProductMedia } from "./types";
import { MediaSelectInput } from "./mediaSelectInput";

export function FilePreviewList({ fieldname }: { fieldname: string }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const formContext = useFormContext();
  const files = useWatch({
    name: fieldname,
    defaultValue: [],
  }) as FormProductMedia[];

  function handleEditing(thumbnailFile: File, thumbnailUrl: string) {
    if (editingIndex == null) return;

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
          thumbnail: thumbnailFile,
        };

        return newFiles;
      })(files),
    );

    setEditingIndex(null);
  }

  function handleCloseThumbnailPicker() {
    setEditingIndex(null);
  }

  const handleEditVideo = (index: number) => {
    const videoToEdit = files[index];
    if (videoToEdit.type !== "video") return;

    setEditingIndex(index);
  };

  const handleRemoveMedia = (index: number) => {
    const removed = files[index];
    if (removed.url) {
      URL.revokeObjectURL(removed.url);
    }
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
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
        if (file.thumbnailUrl) URL.revokeObjectURL(file.thumbnailUrl);
      });
    };
  }, [files]);

  function handleNewMediaSelected(media: FormProductMedia) {
    setFiles([...files, media]);
    formContext.clearErrors(fieldname);
  }

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
              <MediaSelectInput onNewMedia={handleNewMediaSelected} />
            </div>
          </div>
        )}
      />

      {editingIndex != null && (
        <FormProductVideoThumbnailPicker
          video={files[editingIndex]}
          onCapture={handleEditing}
          onClose={handleCloseThumbnailPicker}
          isEditMode={true}
        />
      )}
    </>
  );
}
