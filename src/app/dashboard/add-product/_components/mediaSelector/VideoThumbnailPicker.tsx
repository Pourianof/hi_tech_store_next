import Icon from "@/ui/icons/icon";
import { MODAL_CONTAINER_ID } from "@/ui/modal/modalContainer";
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
export interface VideoThumbnailPickerProps {
  videoUrl: string;
  onCapture: (thumbnailFile: File, thumbnailUrl: string) => void;
  onClose: () => void;
  isEditMode?: boolean;
  size?: {
    width: number;
    height: number;
  };
}

export function VideoThumbnailPicker({
  videoUrl,
  onCapture,
  onClose,
  isEditMode = false,
  size = { width: 400, height: 400 },
}: VideoThumbnailPickerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const captureThumbnail = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isCapturing || !isVideoReady) return;

    if (!videoRef.current || !canvasRef.current) {
      setError("Please wait for video to load");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.readyState < 2) {
      setError("Video not ready yet");
      return;
    }

    setIsCapturing(true);
    setError(null);

    try {
      const wasPlaying = !video.paused;
      if (wasPlaying) {
        video.pause();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const targetWidth = size.width;
      const targetHeight = size.height;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");
      if (!context) throw new Error("Cannot get canvas context");

      context.clearRect(0, 0, targetWidth, targetHeight);

      const videoRatio = video.videoWidth / video.videoHeight;
      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (videoRatio > 1) {
        drawHeight = targetHeight;
        drawWidth = targetHeight * videoRatio;
        offsetX = (targetWidth - drawWidth) / 2;
      } else {
        drawWidth = targetWidth;
        drawHeight = targetWidth / videoRatio;
        offsetY = (targetHeight - drawHeight) / 2;
      }

      context.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Failed to create thumbnail");
            setIsCapturing(false);
            return;
          }

          const thumbnailFile = new File(
            [blob],
            `thumbnail-${Date.now()}.jpg`,
            { type: "image/jpeg" },
          );
          const thumbnailUrl = URL.createObjectURL(thumbnailFile);
          onCapture(thumbnailFile, thumbnailUrl);
          setIsCapturing(false);
        },
        "image/jpeg",
        0.9,
      );
    } catch (error) {
      console.error(error);
      setError("Failed to capture thumbnail");
      setIsCapturing(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsVideoReady(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 overflow-y-auto overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)",
        backdropFilter: "blur(12px)",
      }}
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div
          className="relative w-full max-w-4xl mx-auto"
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute -top-12 right-0 text-white/60 hover:text-white transition-all duration-200 hover:scale-110 z-10 focus:outline-none"
          >
            <Icon name="close" className="w-8 h-8" />
          </button>

          <div
            className="flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            style={{ maxHeight: "calc(90vh - 48px)" }}
          >
            <div className="relative px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm flex-shrink-0">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {isEditMode ? "Edit Video Thumbnail" : "Choose Video Thumbnail"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 flex items-center gap-2">
                <Icon name="info_circle" className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {isEditMode
                    ? "Select a new frame as thumbnail for this video"
                    : "Play the video, pause at the perfect moment, then capture"}
                </span>
              </p>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-custom">
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-center gap-2">
                    <Icon
                      name="info_circle"
                      className="w-5 h-5 flex-shrink-0"
                    />
                    {error}
                  </div>
                )}

                <div className="relative group rounded-xl overflow-hidden bg-black shadow-2xl">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    autoPlay={false}
                    className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={() => setError("Error loading video")}
                    playsInline
                  />

                  {duration > 0 && (
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-white text-[10px] sm:text-xs font-mono border border-white/20">
                      <span className="font-medium">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-gray-400"> / </span>
                      <span className="text-gray-300">
                        {formatTime(duration)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Icon
                        name="info_circle"
                        className="w-4 h-4 text-blue-400"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium">
                        💡 Pro Tip
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-400">
                        Pause the video first, then click Capture for best
                        results
                      </p>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 font-mono">
                    Press ESC to close
                  </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gray-900/50 border-t border-white/10 flex justify-end gap-2 sm:gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base focus:outline-none active:scale-95"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={captureThumbnail}
                disabled={isCapturing || !isVideoReady}
                className="group relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base focus:outline-none active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isCapturing ? (
                    <>
                      <Icon name="loading" className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Icon name="camera" className="w-4 h-4" />
                      {isEditMode ? "Update Thumbnail" : "Capture Frame"}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full pointer-events-none" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById(MODAL_CONTAINER_ID) || document.body,
  );
}
