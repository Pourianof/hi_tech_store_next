"use client";

import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useState,
} from "react";

type Props = { file: File } & Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "src"
>;

export function FileImage({ file, ...props }: Props) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const imageUrl = URL.createObjectURL(file);

    setSrc(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [file]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={props.alt ?? "file image"} {...props} />;
}
