"use client";

import { useCategories } from "@/ui/contexts/categoriesContext";
import { FillerBox } from "@/ui/fillerBox";
import { CustomImage } from "@/ui/image/customImage";
import { Column } from "@/ui/layouts/column";
import { Slider, SliderContainer, SliderItem } from "@/ui/slider";
import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";
import { Caption } from "@/ui/theme/text/caption";
import Link from "next/link";

export function CategoryList() {
  const isDesktop = useIsDesktopScreen();
  const { categories } = useCategories();
  if (!categories?.length) {
    return (
      <div>
        <center>No categories</center>
      </div>
    );
  }

  return (
    <ul className="flex gap-8 w-full justify-center text-gray-neutral-44">
      <FillerBox>
        <Slider disable={isDesktop}>
          <SliderContainer className="gap-2">
            {categories.map((category) => (
              <SliderItem
                key={category.categoryId}
                className="w-[80px] shrink-0"
              >
                <li className="cursor-pointer hover:bg-gray-neutral-ed p-2 rounded-xl">
                  <Link
                    href={{
                      query: {
                        category: category.categoryId,
                      },
                    }}
                  >
                    <Column className="gap-1" center>
                      <CustomImage alt={category.name} src={category.icon} />
                      <Caption size="md">{category.name}</Caption>
                    </Column>
                  </Link>
                </li>
              </SliderItem>
            ))}
          </SliderContainer>
        </Slider>
      </FillerBox>
    </ul>
  );
}
