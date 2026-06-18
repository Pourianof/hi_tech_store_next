import { H1 } from "@/ui/theme/text/headers";
import { CustomImage } from "../../ui/image/customImage";
import { Caption } from "@/ui/theme/text/caption";
import { Column } from "@/ui/layouts/column";
import Link from "next/link";

export function Banner() {
  return (
    <div className="flex align-top h-[300px] mt-4">
      <Column className="flex flex-col justify-around items-start">
        <Column>
          <H1 className="text-blue-950 font-semibold text-nowrap">
            Tech Store
          </H1>
          <Caption size="lg" className="text-blue-950 text-nowrap">
            {'"'}Join the{" "}
            <span className="text-orange-600">digital revoloution</span>
            {'"'}
          </Caption>
        </Column>
        <Link
          href={{ pathname: "/products" }}
          className="text-sm text-gray-200 rounded-md  bg-secondary-f4 hover:bg-secondary-be py-2 px-4 md:px-10"
        >
          Explore More
        </Link>
      </Column>
      <CustomImage
        src="/images/double_laptop.png"
        alt="Tech Store"
        imageClassName="object-contain"
        className="origin-right scale-125 sm:scale-100 -z-10"
      />
    </div>
  );
}
