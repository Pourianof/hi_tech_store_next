"use client";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { CustomImage, RawImage } from "./customImage";

type Props = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "src"
> &
  Omit<Parameters<typeof CustomImage>[0], "src"> & {
    src?: string;
    alt: string;
  };

export function SafeImage({ src, alt, ...props }: Props) {
  let isValidURL = true;
  try {
    new URL(src!);
  } catch {
    isValidURL = false;
  }
  const coverImageURL = isValidURL ? new URL(src!) : undefined;
  const isSameOrigin =
    coverImageURL && window?.location.origin == coverImageURL.origin;

  const shouldUseCustom = !!src && isSameOrigin;

  return shouldUseCustom ? (
    <CustomImage alt={alt} src={src} {...props} />
  ) : (
    <RawImage alt={alt} src={src} {...props} />
  );
}
