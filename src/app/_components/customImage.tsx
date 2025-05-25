import Image from "next/image";

export function CustomImage(props: {
  src: string;
  alt: string;
  className?: string;
  square?: boolean;
}) {
  const isSquare = "square" in props && props.square !== false;
  return (
    <div
      className={`relative w-full ${props.className} ${
        isSquare ? "aspect-square" : ""
      }`}
    >
      <Image src={props.src} fill alt="string" />
    </div>
  );
}
