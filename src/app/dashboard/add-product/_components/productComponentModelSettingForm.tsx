import { CategoryComponent } from "@/core/models/category";
import { ProductComponentModel } from "@/core/models/product";
import { ProductComponentControlledAsyncSelect } from "@/ui/form/controlledAsyncSelect";
import Icon from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { useState } from "react";
import { ComponentModelForm } from "./componentModelForm";
import { useFormContext } from "react-hook-form";
import { CATEGORY_VALUES_FIELD_NAME } from "./ProductCategorySelector";

export function ProductComponentsFormSection({
  components,
}: {
  components: CategoryComponent[];
}) {
  const [baseComponentToCreateModel, setBaseComponentToCreateModel] =
    useState<CategoryComponent>();

  const { setValue, getValues, watch } = useFormContext();

  const fieldName = "categoryValues.componentModels";

  const addedComponents = watch(fieldName) as ProductComponentModel[];

  return (
    <div className="flex flex-col gap-2">
      {!!baseComponentToCreateModel && (
        <Modal>
          <ComponentModelForm
            baseComponent={baseComponentToCreateModel}
            onCancel={() => setBaseComponentToCreateModel(undefined)}
            onSubmit={(model) => {
              setValue(fieldName, [...getValues(fieldName), model]);
              setBaseComponentToCreateModel(undefined);
            }}
          />
        </Modal>
      )}
      {components.map((component) => {
        const associatedModels = addedComponents.filter(
          (cmpnt) => cmpnt.componentTypeId == component.componentTypeId,
        );
        return (
          <div
            key={component.componentTypeId}
            className="bg-stone-200 p-4 rounded flex flex-col gap-2"
          >
            <h4 className="font-semibold">{component.name}</h4>
            <p className="text-xs bg-stone-300 p-1 rounded">
              {component.description}
            </p>
            <ProductComponentControlledAsyncSelect
              fieldName={`${CATEGORY_VALUES_FIELD_NAME}.componentModels`}
              componentTypeId={component.componentTypeId}
            />

            <div className="flex flex-col gap-2">
              {associatedModels.map((component, index) => (
                <div
                  key={index}
                  className="bg-neutral-300 rounded p-2 text-slate-600"
                >
                  <h4 className="flex justify-between items-center font-semibold border-b pb-1 border-b-white/40">
                    <span>
                      {component.brandModel?.brandName} -{" "}
                      {component.brandModel?.modelName}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setValue(
                          fieldName,
                          addedComponents.filter(
                            (cmpnt) =>
                              cmpnt.componentModelId !=
                              component.componentModelId,
                          ),
                        );
                      }}
                      className="p-0.5 px-1 rounded hover:bg-slate-400 hover:text-red-100 hover:cursor-pointer hover:duration-200"
                    >
                      <Icon name="trash" />
                    </button>
                  </h4>
                  {!!component.description && (
                    <div className="text-sm py-1">{component.description}</div>
                  )}
                  <div className="flex gap-1 text-sm relative font-medium mt-1">
                    <span className="text-sm bg-amber-200 p-1 rounded">
                      Properties:{" "}
                    </span>
                    {component.properties?.map((prop) => (
                      <div
                        key={prop.propertyId}
                        className="bg-neutral-400 p-1 rounded"
                      >
                        <span>{prop.name}</span> :{" "}
                        <span className="font-bold">{prop.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {associatedModels.length > 1 && (
              <div className="text-sm bg-orange-300 p-2 rounded ">
                <span className="text-yellow-950 bg-amber-300 p-1 rounded inline-block me-1">
                  Warning:{" "}
                </span>
                <span className="text-yellow-800">
                  You selected more than 1 item for this component-type. This is
                  allowable bit think twice about this to make sure it makes
                  sense.
                </span>
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded p-1 text-white"
              onClick={(e) => {
                e.preventDefault();
                setBaseComponentToCreateModel(component);
              }}
            >
              Add new model
            </button>
          </div>
        );
      })}
    </div>
  );
}
