"use client";
import { ComponentFilter, Filters } from "@/core/models/filter";
import { CupertinoSwitch } from "@/ui/form/cupertinoSwitch";
import { StatefulForm } from "@/ui/form/statefulForm";
import { RangeSlider } from "@/ui/form/twoWaySlider";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { ExpandableBox } from "./expandableBox";
import { SelectableItemsBox } from "./SelectableItemsBox";

export function FilterSection({ filterStats }: { filterStats: Filters }) {
  const filters = filterStats;
  const router = useRouter();

  return (
    <StatefulForm
      onSubmitionSuccessful={() => {}}
      onSubmit={async (data) => {
        const url = new URL(window.location.href);
        for (const [key, value] of Object.entries(data)) {
          // convert keys like a_b to a.b that compatible with api server format
          const _key = key.toLowerCase().trim().split("_").join(".");

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
            } else if (value instanceof Array) {
              url.searchParams.set(_key, value.join(","));
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
            <SelectableItemsBox
              title="Brand"
              valueLabel="brand"
              items={filters.brands.map((b) => ({
                name: b.name!,
                value: b.name!,
                frequency: b.frequency,
              }))}
            />
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
          <ComponentFilters components={filterStats.components} />
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

function ComponentFilters({ components }: { components: ComponentFilter[] }) {
  return components.map((component) => (
    <React.Fragment key={component.componentId}>
      {component.properties.map((prop) => {
        return (
          <SelectableItemsBox
            key={prop.propertyId}
            title={prop.name}
            valueLabel={`${component.name}_${prop.name}`}
            items={
              prop.commonValues?.map((cv) => ({
                name: `${cv.value}`,
                value: cv.value,
                frequency: cv.frequency,
              })) ?? []
            }
          />
        );
      })}
      <SelectableItemsBox
        title={component.name}
        valueLabel={component.name}
        items={component.commonBrands.map((b) => ({
          name: b.name!,
          value: b.name!,
          frequency: b.frequency,
        }))}
      />
    </React.Fragment>
  ));
}
