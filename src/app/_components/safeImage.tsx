import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { CustomImage } from "./customImage";

export function SafeImage({
  src,
  alt,
  ...props
}: Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "src"
> &
  Omit<Parameters<typeof CustomImage>[0], "src"> & {
    src?: string;
    alt: string;
  }) {
  let isValidURL = true;
  try {
    new URL(src!);
  } catch {
    isValidURL = false;
  }
  const coverImageURL = isValidURL ? new URL(src!) : undefined;
  const isSameOrigin =
    coverImageURL && window.location.origin == coverImageURL.origin;

  const shouldUseCustom = !!src && isSameOrigin;
  if (!shouldUseCustom) {
    // next errors for assigning camel-case attributes to dom elements
    delete props.aspectRatio;
    delete props.imageClassName;
  }
  return shouldUseCustom ? (
    <CustomImage alt={alt} aspectRatio={256 / 190} src={src} {...props} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );
}
