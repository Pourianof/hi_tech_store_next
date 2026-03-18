"use client";

import { ComponentModelDto } from "@/core/Dtos/componentDto";
import { BrandModel } from "@/core/models/brand";
import { CategoryComponent } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { captalize } from "@/lib/utils/stringHelpers";
import { submitComponentModelAction } from "@/lib/server_actions/componentActions";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useBrands } from "./brandsReducer";
import { NewBrandModelForm } from "./newBrandModelForm";
import { CategoryPropertiesForm } from "./propertiesForm";
import { ProductComponentModel } from "@/core/models/product";

function generateFullBrandModelName(brandModel: BrandModel) {
  return `${brandModel.brandName} - ${brandModel.modelName}`;
}

export function ComponentModelForm({
  baseComponent,
  onCancel,
  onSubmit,
}: {
  baseComponent: CategoryComponent;
  onCancel: VoidFunction;
  onSubmit: (component: ProductComponentModel) => void;
}) {
  const { data: brands, isLoading, error, isFetching } = useBrands();
  const [newBrandModelMode, setNewBrandModelMode] = useState(false);

  if (error) {
    return <div>There is some problem on fetching brand models data</div>;
  }

  if (!brands) {
    if (isLoading) {
      return <div>Loding...</div>;
    }

    return <div>Something went wrong in loading brands</div>;
  }

  function handleNewBrandFormCancel() {
    setNewBrandModelMode(false);
  }

  function submitComponent(
    data: Record<string, unknown>,
  ): Promise<ResultModel<ProductComponentModel>> {
    const brandModel = data.brandModel as BrandModel | undefined;

    const componentModel = {
      description: data.description,
      brandModelId: brandModel?.modelId,
      properties: data.properties,
    } as unknown as ComponentModelDto;

    return submitComponentModelAction(
      baseComponent.componentTypeId,
      componentModel,
    );
  }

  return (
    <div className="text-neutral-700 flex flex-col gap-2">
      <StatefulForm
        onSubmit={submitComponent}
        onSubmitionSuccessful={(componentModel) => {
          onSubmit(componentModel as unknown as ProductComponentModel);
        }}
      >
        {newBrandModelMode && (
          <Modal>
            <Controller
              name="brandModel"
              render={({ field: { onChange } }) => (
                <NewBrandModelForm
                  onCancel={handleNewBrandFormCancel}
                  onNewBrandSubmitted={(brandModel) => {
                    onChange(brandModel);
                    handleNewBrandFormCancel();
                  }}
                />
              )}
            />
          </Modal>
        )}
        <h2 className="font-semibold border-b pb-2">
          Create new component model for{" "}
          <span className="bg-slate-600 text-slate-200 px-1 py-0.5 rounded">
            {baseComponent.name}
          </span>
        </h2>
        <label>
          <span>Brand model</span>
          <div className="flex gap-1">
            {isFetching ? (
              <CircularProgress size={40} />
            ) : (
              <Controller
                name="brandModel"
                render={({ field: { value, onChange } }) => (
                  <Select
                    className="flex-5/6"
                    isClearable
                    components={{
                      SingleValue: (props) => (
                        <span
                          {...props.innerProps}
                          style={
                            props.getStyles(
                              "singleValue",
                              props,
                            ) as unknown as React.CSSProperties
                          }
                        >
                          {props.data.label}
                        </span>
                      ),
                    }}
                    options={brands
                      ?.filter((brand) => !!brand.brandModels?.length)
                      .map((b) => ({
                        label: b.name,
                        options: b.brandModels.map((bm) => ({
                          label: bm.modelName,
                          value: { ...bm, brandId: b.brandId },
                        })),
                      }))}
                    onChange={(opt) => {
                      onChange(
                        (opt as { value: BrandModel } | undefined)?.value,
                      );
                    }}
                    value={
                      value
                        ? {
                            label: generateFullBrandModelName(value),
                            value: value,
                          }
                        : undefined
                    }
                  />
                )}
              />
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                setNewBrandModelMode(true);
              }}
              className="cursor-pointer hover:transition-colors hover:duration-300 hover:bg-blue-600 text-white text-2xl flex-1/6 bg-blue-500 rounded"
            >
              +
            </button>
          </div>
          <span className="text-sm p-1 rounded inline-block bg-slate-200 mt-2 text-slate-600">
            <Icon name="guarantee" className="me-1 align-middle" />
            Brand model is optional but it recommended to specify what brand is
            this component
          </span>
        </label>
        <div>
          <label>Description</label>
          <ErrorLabeledInput
            isOptional
            filedName="description"
            placeholder="Description about component model"
            type="text"
          />
        </div>
        <div className="bg-slate-200 rounded p-2 pt-3 mt-2 relative">
          <span className="absolute top-0 left-2 -translate-y-1/2 bg-inherit shadow py-0.5 px-1.5 rounded text-sm ">
            Properties:
          </span>
          {!!baseComponent.properties.length ? (
            <CategoryPropertiesForm properties={baseComponent.properties} />
          ) : (
            <div>{captalize(baseComponent.name)} has no property to set</div>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <StatefulForm.Submitter
            render={(submit) => (
              <button
                className="rounded bg-slate-600 p-1 px-2 text-slate-300 hover:bg-slate-800 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                Add
              </button>
            )}
          />

          <button
            className="rounded bg-neutral-200 p-1 px-2 text-neutral-600 hover:bg-neutral-300 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </StatefulForm>
    </div>
  );
}
