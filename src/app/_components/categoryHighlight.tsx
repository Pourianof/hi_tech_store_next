import { CustomImage } from "./customImage";

export function CategoryHighlight() {
  return (
    <div className="overflow-hidden relative rounded-lg aspect-[2.9] flex bg-navy text-white py-4">
      <div className="absolute -right-1/3 top-1/2 -translate-y-1/2 w-[70%] h-[150%] rounded-[50%] bg-pastilRed"></div>
      <div className="flex flex-col ms-4 lg:ms-12 items-center justify-center gap-2">
        <h3 className="font-semibold text-2xl lg:text-5xl">SMART WATCH</h3>
        <p className="text-sm lg:text-xl text-stone-300">
          Various designs and brands
        </p>
        <button className="bg-pastilRed text-navy py-1 px-4 text-xs lg:text-base rounded-md mt-2">
          view
        </button>
      </div>
      <CustomImage
        className="w-auto h-full flex-1"
        src={"/images/highlight/smart_watches.png"}
        alt="Smart Watches"
        imageClassName="object-contain"
      />
    </div>
  );
}
