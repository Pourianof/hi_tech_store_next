/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, ReactElement, useRef, useState } from "react";
import { AddMediaButton } from "./AddMediaButton";
import { FormProductVideoThumbnailPicker } from "./formProductVideoThumbnailPicker";
import { FormProductMedia } from "./types";

export function MediaSelectInput({
  addButton,
  onNewMedia,
}: {
  addButton?: ReactElement<HTMLElement>;
  onNewMedia(media: FormProductMedia): void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [pendingVideo, setPendingVideo] = useState<FormProductMedia | null>(
    null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file.type.startsWith("image")) {
      const newMedia: FormProductMedia = {
        file,
        url: URL.createObjectURL(file),
        type: "image",
      };

      onNewMedia(newMedia);
      return;
    }

    if (file.type.startsWith("video")) {
      setPendingVideo({ file, type: "video" });
      setShowVideoPicker(true);
    }
  };

  const handleVideoCapture = (thumbnailFile: File, thumbnailUrl: string) => {
    if (!pendingVideo) return;

    const newMedia: FormProductMedia = {
      file: pendingVideo.file,
      url: pendingVideo.url,
      type: "video",
      thumbnailUrl,
      thumbnail: thumbnailFile,
    };
    onNewMedia(newMedia);
    handleCloseVideoPicker();
  };

  const handleCloseVideoPicker = () => {
    setShowVideoPicker(false);
    setPendingVideo(null);
  };

  function clickOnFileInput() {
    inputRef.current?.click();
  }

  return (
    <>
      {addButton ? (
        React.cloneElement(addButton, {
          // @ts-ignore
          onClick(e) {
            e.preventDefault();
            addButton.props.onclick?.(e);
            clickOnFileInput();
          },
        })
      ) : (
        <AddMediaButton onClick={clickOnFileInput} />
      )}
      {showVideoPicker && pendingVideo && (
        <FormProductVideoThumbnailPicker
          video={pendingVideo}
          onCapture={handleVideoCapture}
          onClose={handleCloseVideoPicker}
          isEditMode={false}
        />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
