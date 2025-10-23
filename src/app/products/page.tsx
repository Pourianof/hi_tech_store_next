import { getProducts } from "@/api/productApi";
import { ProductItem } from "../_components/productItem";
import { CategoryList } from "./_components/categoryList";
import { FilterSection } from "./_components/filtersForm";
import { GetProductsFilters } from "@/api/filterApi";

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
        <div className="p-2 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
          {products.map((product) => (
            <ProductItem key={product.productId} product={product} />
          ))}
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
