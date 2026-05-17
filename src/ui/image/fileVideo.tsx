"use client";

import {
  DetailedHTMLProps,
  useEffect,
  useState,
  VideoHTMLAttributes,
} from "react";

type Props = { file: File } & Omit<
  DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
  "src"
>;

export function FileVideo({ file, ...props }: Props) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const videoUrl = URL.createObjectURL(file);

    setSrc(videoUrl);

    return () => URL.revokeObjectURL(videoUrl);
  }, [file]);

  return <video src={src} {...props} />;
}
