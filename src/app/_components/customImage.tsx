import Image from "next/image";

export function CustomImage(props: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${props.className}`}>
      <Image src={props.src} fill alt="string" />
    </div>
  );
}
