import Icon from "@/ui/icons/icon";
import Link from "next/link";
import { ProductItem } from "../_components/productItem";
import { CategoryList } from "./_components/categoryList";
import { FilterFeeder } from "./_components/filterFeeder";
import { SortProductSelect } from "./_components/sortProductSelect";
import { productActions } from "@/ui/server_actions_wrapper/productActions";

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = await searchParams;
  const productsResult = await productActions.getProducts(params);
  if (productsResult.status == "failed") {
    return <div>Something went wrong on fetching products...</div>;
  }

  const searchString = new URLSearchParams(params).toString();

  const products = productsResult.data.items;
  return (
    <div>
      <CategoryList />
      <div className="flex">
        <div className="md:min-w-[max(25%,200px)] sm:block sm:min-w-1/3 hidden">
          <FilterFeeder searchParams={params} />
        </div>
        <div>
          <div className="p-2 grid grid-cols-2 gap-5 sm:flex sm:justify-end">
            <Link
              className="sm:hidden flex items-center gap-2 shadow-lg rounded-xl text-xl text-start px-4"
              href={{ pathname: "products/filters", search: searchString }}
              prefetch={true}
            >
              <Icon name="filter" />
              <span>Filters</span>
            </Link>
            <SortProductSelect />
          </div>
          <div className="p-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {products.map((product) => (
              <ProductItem key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
