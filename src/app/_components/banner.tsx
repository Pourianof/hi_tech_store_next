import { CustomImage } from "./customImage";

export function Banner() {
  return (
    <div className="flex align-top wrapper h-[300px] mt-4">
      <div className="flex flex-col justify-around items-start">
        <h2 className="text-6xl text-blue-950 font-semibold">Tech Store</h2>
        <p className="text-blue-950 text-3xl text-nowrap">
          {'"'}Join the{" "}
          <span className="text-orange-600">digital revoloution</span>
          {'"'}
        </p>
        <button className="text-sm text-gray-200 rounded-md  bg-orange-600 py-2 px-10">
          Explore More
        </button>
      </div>
      <CustomImage
        src="/images/double_laptop.png"
        alt="Tech Store"
        imageClassName="object-contain"
      />
    </div>
  );
}
