import { GetProductsFilters } from "@/api/filterApi";
import { FilterSection } from "./filtersForm";

export async function FilterFeeder({
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
