import Image from "next/image";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CustomImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  square?: boolean;
  imageClassName?: string;
  width?: number;
  height?: number;
  fit?: "contain" | "cover";
}

export function CustomImage(props: CustomImageProps) {
  const isSquare = "square" in props && props.square !== false;
  if (isSquare && props.aspectRatio)
    throw new Error(
      "Cannot set [props.aspectRatio] and [props.isSquare] in CustomImage at same time.",
    );

  return (
    <ImageBox
      aspectRatio={props.aspectRatio}
      isSquare={isSquare}
      className={props.className}
      width={props.width}
      height={props.height}
    >
      {
        <Image
          src={props.src ?? "/images/no-image.jpg"}
          fill
          alt={props.alt}
          className={twMerge(
            props.fit == "contain" ? "object-contain" : "object-cover",
            props.imageClassName ?? "",
          )}
        />
      }
    </ImageBox>
  );
}

export function RawImage(
  props: Omit<CustomImageProps, "src"> & {
    src: string | undefined | null;
  },
) {
  const isSquare = "square" in props && props.square !== false;
  if (isSquare && props.aspectRatio)
    throw new Error(
      "Cannot set [props.aspectRatio] and [props.isSquare] in CustomImage at same time.",
    );

  return (
    <ImageBox
      isSquare={isSquare}
      aspectRatio={props.aspectRatio}
      className={props.className}
      width={props.width}
    >
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="object-cover w-full h-full"
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
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={twMerge(
        `relative w-full`,
        props.isSquare ? "aspect-square" : "",
        props.className,
      )}
      style={{
        ...(props.aspectRatio ? { aspectRatio: props.aspectRatio } : {}),
        ...(props.width
          ? { width: `${props.width}px`, minWidth: `${props.width}px` }
          : {}),
        ...(props.height
          ? { height: `${props.height}px`, minheight: `${props.height}px` }
          : {}),
      }}
    >
      {props.children}
    </div>
  );
}
