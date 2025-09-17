import { Category } from "@/core/models/category";
import { categoryTreeBuilder } from "@/lib/helpers/categoryTreeBuilder";
import { getCategoriesAction } from "@/lib/server_actions/categoryActions";
import { CategoryTree } from "./_components/categoryTree";

export default async function CategoriesMangePage() {
  const categoriesResult = await getCategoriesAction();
  if (categoriesResult.status == "failed") {
    return <div>Some error happened</div>;
  }

  const categories = categoriesResult.data as Category[];
  const tree = categoryTreeBuilder(categories);

  return (
    <div className="p-4">
      <h3 className="font-semibold text-2xl">Manage the categories</h3>
      <div>
        <CategoryTree tree={tree} />
      </div>
    </div>
  );
}
