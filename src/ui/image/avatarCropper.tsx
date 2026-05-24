import { ReactNode } from "react";

export default function AvatarCropper({ image }: { image: ReactNode }) {
  return (
    <div className="relative overflow-hidden w-full h-full rounded-xl">
      {image}

      <div className="absolute inset-0 bg-black/10" />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          w-full
          h-full
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border-2
          border-white
          shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]
        "
      />
    </div>
  );
}
