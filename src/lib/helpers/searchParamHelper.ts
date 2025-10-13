import { ReadonlyURLSearchParams } from "next/navigation";

export enum QueryOperator {
  In = "in",
  GreaterThanOrEqual = "gte",
  LessThanOrEqual = "lte",
  Equal = "eq",
}

function findMatchedKey(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  operator: QueryOperator
) {
  const pattern = `${key}(\\[${operator}\\])${
    operator == QueryOperator.Equal ? "?" : ""
  }`;
  for (const filterKey of searchParams.keys()) {
    if (new RegExp(pattern, "ig").test(filterKey)) {
      return filterKey;
    }
  }
}

export function getSearchParamValue(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  operator: QueryOperator
): string | undefined {
  const filterKey = findMatchedKey(searchParams, key, operator);

  if (!filterKey) {
    return;
  }
  const result = searchParams.get(filterKey);
  return result ? result : undefined;
}

export function getSearchParamAllValues(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  operator: QueryOperator
): string[] | undefined {
  const filterKey = findMatchedKey(searchParams, key, operator);

  if (!filterKey) {
    return;
  }

  const result = searchParams.getAll(filterKey);
  return operator == QueryOperator.In
    ? result?.map((v) => v.split(",")).flat()
    : result;
}
