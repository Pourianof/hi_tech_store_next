import { SearchParams } from "next/dist/server/request/search-params";
import { FilterFeeder } from "../../_components/filterFeeder";
import { FilterPage } from "../_components/filterPage";

export default async function FilterDefaultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <FilterPage>
      <FilterFeeder
        searchParams={(await searchParams) as Record<string, string>}
      />
    </FilterPage>
  );
}
