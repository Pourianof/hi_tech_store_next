import Image from "next/image";
import { ReactNode } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  square?: boolean;
  imageClassName?: string;
}

export function CustomImage(props: CustomImageProps) {
  const isSquare = "square" in props && props.square !== false;
  if (isSquare && props.aspectRatio)
    throw new Error(
      "Cannot set [props.aspectRatio] and [props.isSquare] in CustomImage at same time."
    );

  return (
    <ImageBox
      aspectRatio={props.aspectRatio}
      isSquare={isSquare}
      className={props.className}
    >
      <Image
        src={props.src}
        fill
        alt="string"
        className={props.imageClassName ?? ""}
      />
    </ImageBox>
  );
}

export function RawImage(
  props: Omit<Parameters<typeof CustomImage>[0], "src"> & {
    src: string | undefined | null;
  }
) {
  const isSquare = "square" in props && props.square !== false;
  if (isSquare && props.aspectRatio)
    throw new Error(
      "Cannot set [props.aspectRatio] and [props.isSquare] in CustomImage at same time."
    );
  return (
    <ImageBox
      isSquare={isSquare}
      aspectRatio={props.aspectRatio}
      className={props.className}
    >
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="object-fill max-w-full max-h-full"
          src={props.src!}
          alt={props.alt}
        />
      }
    </ImageBox>
  );
}

function ImageBox(props: {
  isSquare: boolean;
  className?: string;
  aspectRatio?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative ${props.className ?? "w-full"} ${
        props.isSquare ? "aspect-square" : ""
      }`}
      style={props.aspectRatio ? { aspectRatio: props.aspectRatio } : undefined}
    >
      {props.children}
    </div>
  );
}
