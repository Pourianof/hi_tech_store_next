"use client";
import { Filters } from "@/core/models/filter";
import { CupertinoSwitch } from "@/ui/form/cupertinoSwitch";
import { StatefulForm } from "@/ui/form/statefulForm";
import { RangeSlider } from "@/ui/form/twoWaySlider";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { CheckboxItem, CheckboxList } from "../../../ui/form/checkboxList";
import { ExpandableBox } from "./expandableBox";

export function FilterSection({ filterStats }: { filterStats: Filters }) {
  const filters = filterStats;
  const router = useRouter();

  return (
    <StatefulForm
      onSubmitionSuccessful={() => {}}
      onSubmit={async (data) => {
        const url = new URL(window.location.href);
        debugger;
        for (const [key, value] of Object.entries(data)) {
          const _key = key.toLowerCase().trim();
          if (key && value && !url.searchParams.has(_key)) {
            if (typeof value == "object" && (value.upper || value.lower)) {
              const isNotNull = (value: unknown) =>
                value != undefined && value != null;
              if (isNotNull(value.upper)) {
                url.searchParams.set(`${_key}[lte]`, value.upper);
              }
              if (isNotNull(value.lower)) {
                url.searchParams.set(`${_key}[gte]`, value.lower);
              }
            } else {
              url.searchParams.set(_key, value);
            }
          }
        }

        router.push(url.href);
        return { status: "success", statusCode: 200, data: {} };
      }}
    >
      <div>
        <div className="flex">
          <span className="font-semibold">Filters</span>
          <button
            type="reset"
            className="text-sm grow text-center text-main-blue"
          >
            Clear all
          </button>
        </div>
        <div>
          {!!filters.brands?.length && (
            <ExpandableBox
              title="Brand"
              className="border-b border-b-gray-neutral-b4"
              titleClassName="p-2"
            >
              <ul className="px-2 pb-2">
                <CheckboxList fieldName="brand">
                  {filters.brands.map((brand) => (
                    <li key={brand.brandId}>
                      <CheckboxItem
                        label={
                          <>
                            <span>{brand.name}</span>
                            <span className="text-xs text-gray-neutral-b4">
                              ({brand.frequency})
                            </span>
                          </>
                        }
                        checkedValue={brand.name!}
                      />
                    </li>
                  ))}
                </CheckboxList>
              </ul>
            </ExpandableBox>
          )}
          <div className="border-b border-b-gray-neutral-b4 p-2 flex items-center justify-between">
            <span>Discount</span>
            <CupertinoSwitch fieldName="discount" />
          </div>
          {!!filters.priceRange && (
            <ExpandableBox
              title="Price"
              className="border-b border-b-gray-neutral-b4"
              titleClassName="p-2"
            >
              <ul className="px-2 pb-2">
                <span>Min: {filters.priceRange.min}</span>
                <span>Max: {filters.priceRange.max}</span>
                <RangeSlider
                  fieldName="price"
                  minDistance={10}
                  min={filterStats.priceRange?.min ?? 0}
                  max={filterStats.priceRange?.max ?? 1000}
                />
              </ul>
            </ExpandableBox>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "10px",
            boxShadow: "none",
            marginTop: "5px",
          }}
        >
          Apply Filters
        </Button>
      </div>
    </StatefulForm>
  );
}
