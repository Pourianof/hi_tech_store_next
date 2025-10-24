import { FilterFeeder } from "../../_components/filterFeeder";
import { FilterPage } from "../_components/filterPage";

export default async function FilterDefaultPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <FilterPage>
      <FilterFeeder searchParams={searchParams} />
    </FilterPage>
  );
}
