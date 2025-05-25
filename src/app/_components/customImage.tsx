import Image from "next/image";

export function CustomImage(props: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  square?: boolean;
}) {
  const isSquare = "square" in props && props.square !== false;
  if (isSquare && props.aspectRatio)
    throw new Error(
      "Cannot set [props.aspectRatio] and [props.isSquare] in CustomImage at same time."
    );

  return (
    <div
      className={`relative w-full ${props.className ?? ""} ${
        isSquare
          ? "aspect-square"
          : props.aspectRatio
          ? `aspect-[${props.aspectRatio}]`
          : ""
      }`}
    >
      <Image src={props.src} fill alt="string" />
    </div>
  );
}
