"use client";
import { ComponentFilter, Filters } from "@/core/models/filter";
import { CupertinoSwitch } from "@/ui/form/cupertinoSwitch";
import { StatefulForm } from "@/ui/form/statefulForm";
import { RangeSlider } from "@/ui/form/twoWaySlider";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { ExpandableBox } from "./expandableBox";
import { SelectableItemsBox } from "./SelectableItemsBox";
import {
  findMatchedKey,
  getSearchParamAllValues,
  getSearchParamValue,
  QueryOperator,
} from "@/lib/helpers/searchParamHelper";
import { parseNumberOrUndefined } from "@/lib/helpers/converter";

export function FilterSection({ filterStats }: { filterStats: Filters }) {
  const filters = filterStats;
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <StatefulForm
      onSubmitionSuccessful={() => {}}
      onSubmit={async (data) => {
        const url = new URL(window.location.href);
        url.pathname = "/products";
        for (const [key, value] of Object.entries(data)) {
          // convert keys like a_b to a.b that compatible with api server format
          let _key = key.toLowerCase().trim().split("_").join(".");
          if (_key && value) {
            if (typeof value == "object" && (value.upper || value.lower)) {
              const isNotNull = (value: unknown) =>
                value != undefined && value != null;
              if (isNotNull(value.upper)) {
                url.searchParams.set(`${_key}[lte]`, value.upper);
              } else {
                url.searchParams.delete(`${_key}[lte]`);
              }
              if (isNotNull(value.lower)) {
                url.searchParams.set(`${_key}[gte]`, value.lower);
              } else {
                url.searchParams.delete(`${_key}[gte]`);
              }
            } else if (value instanceof Array) {
              _key = `${_key}[in]`;
              if (!value.length) {
                url.searchParams.delete(_key);
              } else {
                url.searchParams.set(_key, value.join(","));
              }
            } else {
              url.searchParams.set(_key, value);
            }
          } else if (_key) {
            const registeredKey = findMatchedKey(searchParams, _key);
            if (!registeredKey) {
              continue;
            }
            url.searchParams.delete(registeredKey);
          }
        }
        router.push(url.href);
        return { status: "success", statusCode: 200, data: {} };
      }}
    >
      <div className="flex justify-between">
        <span className="font-semibold">Filters</span>
        <StatefulForm.ResetButton
          type="reset"
          className="text-sm px-1  text-center text-main-blue cursor-pointer"
        >
          Clear all
        </StatefulForm.ResetButton>
      </div>
      <div>
        {!!filters.brands?.length && (
          <SelectableItemsBox
            initialSelectedItems={searchParams.getAll("brand")}
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
                initialRange={[
                  parseNumberOrUndefined(
                    getSearchParamValue(
                      searchParams,
                      "price",
                      QueryOperator.GreaterThanOrEqual
                    )
                  ),
                  parseNumberOrUndefined(
                    getSearchParamValue(
                      searchParams,
                      "price",
                      QueryOperator.LessThanOrEqual
                    )
                  ),
                ]}
                fieldName="price"
                minDistance={10}
                min={filterStats.priceRange?.min ?? 0}
                max={filterStats.priceRange?.max ?? 1000}
              />
            </ul>
          </ExpandableBox>
        )}
        {!!filterStats.components && (
          <ComponentFilters components={filterStats.components} />
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
    </StatefulForm>
  );
}

function ComponentFilters({ components }: { components: ComponentFilter[] }) {
  const searchParams = useSearchParams();

  return components.map((component) => (
    <React.Fragment key={component.componentTypeId}>
      {component.properties.map((prop) => {
        const initialValues = getSearchParamAllValues(
          searchParams,
          `${component.name}.${prop.name}`,
          QueryOperator.In
        );

        return (
          <SelectableItemsBox
            key={prop.propertyId}
            title={prop.name}
            initialSelectedItems={initialValues}
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
        initialSelectedItems={searchParams.getAll(component.name)}
        items={component.commonBrands.map((b) => ({
          name: b.name!,
          value: b.name!,
          frequency: b.frequency,
        }))}
      />
    </React.Fragment>
  ));
}
