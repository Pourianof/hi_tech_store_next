import { getCategories } from "@/api/categoryApi";
import { Category } from "@/core/models/category";
import { ApiImage } from "@/ui/image/ApiImage";
import { Slider, SliderContainer, SliderItem } from "@/ui/slider";
import Link from "next/link";

function CategoryMiniCard(props: { category: Category }) {
  return (
    <div className="flex-col h-full items-center text-center relative shadow-md p-4 rounded-sm">
      <ApiImage
        serverMode
        className="w-full aspect-square"
        src={props.category.image}
        alt={props.category.name}
      />
      {props.category.name}
    </div>
  );
}

export async function CategoriesMiniCardList() {
  const categoriesResult = await getCategories();
  if (categoriesResult.status != "success") {
    return <span>Something wrong to fetching categories</span>;
  }

  const categories = categoriesResult.data;
  return (
    <Slider>
      <SliderContainer className="gap-2 md:gap-4 my-4 items-stretch">
        {categories.items.map((cat) => (
          <SliderItem key={cat.categoryId} className="shrink-0 w-1/4 md:w-1/6">
            <Link
              href={{
                pathname: "/products",
                query: {
                  category: cat.categoryId,
                },
              }}
            >
              <CategoryMiniCard category={cat} key={cat.categoryId} />
            </Link>
          </SliderItem>
        ))}
      </SliderContainer>
    </Slider>
  );
}
