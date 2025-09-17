import { getCategories } from "@/api/categoryApi";
import { Category } from "@/core/models/category";
import { ApiImage } from "@/ui/image/ApiImage";

function CategoryMiniCard(props: { category: Category }) {
  return (
    <div className="flex-col items-center text-center w-1/5 relative shadow-md p-4 rounded-sm">
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

  const categories = categoriesResult.data as Category[];
  return (
    <div className="flex gap-4 my-4">
      {categories.map((cat) => (
        <CategoryMiniCard category={cat} key={cat.categoryId} />
      ))}
    </div>
  );
}
