import { getProducts } from "@/api/productApi";
import { ProductItem } from "../_components/productItem";
import { CategoryList } from "./_components/categoryList";
import { FilterSection } from "./_components/filtersForm";
import { GetProductsFilters } from "@/api/filterApi";
import { SortProductSelect } from "./_components/sortProductSelect";
import Icon from "@/ui/icons/icon";
import Link from "next/link";

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = await searchParams;
  const productsResult = await getProducts(params);
  if (productsResult.status == "failed") {
    return <div>Something went wrong on fetching products...</div>;
  }

  const products = productsResult.data;
  return (
    <div>
      <CategoryList />
      <div className="flex">
        <FilterFeeder searchParams={params} />
        <div>
          <div className="p-2 grid grid-cols-2 gap-5 sm:flex sm:justify-end">
            <Link
              className="sm:hidden flex items-center gap-2 shadow-lg rounded-xl text-xl text-start px-4"
              href={{ pathname: "products/filters" }}
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

async function FilterFeeder({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const filterResult = await GetProductsFilters(Number(searchParams.category));
  if (filterResult.status == "failed") {
    return <div>Could not fetch the filters</div>;
  }

  return <FilterSection filterStats={filterResult.data} />;
}
