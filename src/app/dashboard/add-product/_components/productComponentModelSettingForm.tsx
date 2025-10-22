import { CategoryComponent } from "@/core/models/category";
import { ProductComponentModel } from "@/core/models/product";
import { getAllComponentModelsAction } from "@/lib/server_actions/componentActions";
import { Modal } from "@/ui/modal/modal";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { ComponentModelForm } from "./componentModelForm";
import Icon from "@/ui/icons/icon";
import { useFormContext } from "react-hook-form";

export function ProductComponentsFormSection({
  components,
}: {
  components: CategoryComponent[];
}) {
  const [baseComponentToCreateModel, setBaseComponentToCreateModel] =
    useState<CategoryComponent>();
  const [addedComponents, setAddedComponents] = useState<
    ProductComponentModel[]
  >([]);

  const { setValue } = useFormContext();

  useEffect(() => {
    addedComponents.forEach((cmpnt, idx) =>
      setValue(`categoryValues.componentModels.${idx}`, cmpnt.componentModelId)
    );
  }, [addedComponents, setValue]);

  return (
    <div className="flex flex-col gap-2">
      {!!baseComponentToCreateModel && (
        <Modal>
          <ComponentModelForm
            baseComponent={baseComponentToCreateModel}
            onCancel={() => setBaseComponentToCreateModel(undefined)}
            onSubmit={(model) => {
              setAddedComponents((cms) => [
                ...cms,
                {
                  ...model,
                  componentTypeId: baseComponentToCreateModel.componentTypeId,
                },
              ]);
              setBaseComponentToCreateModel(undefined);
            }}
          />
        </Modal>
      )}
      {components.map((component) => {
        return (
          <div
            key={component.componentTypeId}
            className="bg-stone-200 p-4 rounded flex flex-col gap-2"
          >
            <h4 className="font-semibold">{component.name}</h4>
            <p className="text-xs bg-stone-300 p-1 rounded">
              {component.description}
            </p>
            <AsyncSelect
              isMulti
              defaultOptions
              cacheOptions
              placeholder="Select from available component models"
              components={{
                Option: ({ data: { value }, innerProps }) => {
                  const model = value as ProductComponentModel;
                  const hasName = model.brandModel;
                  const name = hasName
                    ? `${model.brandModel.brandName} - ${model.brandModel.modelName}`
                    : "<No-Name>";
                  return (
                    <div
                      className="m-2 bg-stone-200 rounded p-2 cursor-pointer hover:bg-stone-400"
                      {...innerProps}
                    >
                      <h4 className="font-semibold bg-gray-500 text-gray-200 rounded py-0.5 px-1">
                        {name}
                      </h4>
                      {!!model.properties?.length && (
                        <div className="text-sm flex flex-wrap gap-2 my-2">
                          {model.properties.map((m) => (
                            <span
                              key={m.propertyId}
                              className="inline-block bg-gray-300 py-1 px-2 rounded"
                            >
                              {m.name} : {m.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                },
              }}
              onChange={(changes, { action, option, removedValue }) => {
                const cmpnt = (
                  (option ?? removedValue) as
                    | { value: ProductComponentModel }
                    | undefined
                )?.value;
                switch (action) {
                  case "select-option":
                    setAddedComponents((old) => [...old, cmpnt!]);
                    break;
                  case "pop-value":
                  case "remove-value":
                    setAddedComponents((old) =>
                      old.filter(
                        (c) => c.componentModelId != cmpnt!.componentModelId
                      )
                    );
                    break;
                  case "clear":
                    setAddedComponents([]);
                }
              }}
              loadOptions={async function () {
                const result = await getAllComponentModelsAction(
                  component.componentTypeId
                );

                if (result.status == "failed") {
                  return [];
                }

                return result.data.map((m) => ({
                  label: `${m.brandModel?.brandName} - ${m.brandModel?.modelName}`,
                  value: m,
                }));
              }}
              value={addedComponents.map((cmpnt) => ({
                label: `${cmpnt.brandModel?.brandName} - ${cmpnt.brandModel?.modelName}`,
                value: cmpnt,
              }))}
            />
            <div className="flex flex-col gap-2">
              {addedComponents.map((component, index) => (
                <div
                  key={index}
                  className="bg-neutral-300 rounded p-2 text-slate-600"
                >
                  <h4 className="flex justify-between items-center font-semibold border-b pb-1 border-b-white/40">
                    <span>
                      {component.brandModel?.brandName} -{" "}
                      {component.brandModel?.modelName}
                    </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        setAddedComponents((old) =>
                          old.filter(
                            (c) =>
                              c.componentModelId != component.componentModelId
                          )
                        );
                      }}
                      className="p-0.5 px-1 rounded hover:bg-slate-400 hover:text-red-100 hover:cursor-pointer hover:duration-200"
                    >
                      <Icon name="trash" />
                    </span>
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
            {addedComponents.length > 1 && (
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
