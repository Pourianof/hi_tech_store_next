"use client";

import { ComponentModelDto } from "@/core/Dtos/componentDto";
import { BrandModel } from "@/core/models/brand";
import { CategoryComponent } from "@/core/models/category";
import { ProductComponentModel } from "@/core/models/product";
import { ResultModel } from "@/core/models/resultModel";
import { submitComponentModelAction } from "@/lib/server_actions/componentActions";
import { captalize } from "@/lib/utils/stringHelpers";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Column } from "@/ui/layouts/column";
import { BrandSelectorInput } from "./brandSelectorInput";
import { CategoryPropertiesForm } from "./propertiesForm";

export function ComponentModelForm({
  baseComponent,
  onCancel,
  onSubmit,
}: {
  baseComponent: CategoryComponent;
  onCancel: VoidFunction;
  onSubmit: (component: ProductComponentModel) => void;
}) {
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
    <div className="text-neutral-700 flex flex-col gap-2 h-full">
      <StatefulForm
        onSubmit={submitComponent}
        onSubmitionSuccessful={(componentModel) => {
          onSubmit(componentModel as unknown as ProductComponentModel);
        }}
        className="h-full"
      >
        <div className="grid grid-rows-[auto_1fr_auto] h-full">
          <h2 className="font-semibold border-b pb-2">
            Create new component model for{" "}
            <span className="bg-slate-600 text-slate-200 px-1 py-0.5 rounded">
              {baseComponent.name}
            </span>
          </h2>
          <Column className="overflow-auto h-full">
            <BrandSelectorInput fieldname="brandModel" />
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
                <div>
                  {captalize(baseComponent.name)} has no property to set
                </div>
              )}
            </div>
          </Column>
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
        </div>
      </StatefulForm>
    </div>
  );
}
