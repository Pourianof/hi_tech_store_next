import { ProductComponentModel } from "@/core/models/product";
import { getAllComponentModelsAction } from "@/lib/server_actions/componentActions";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

export function ProductComponentControlledAsyncSelect(props: {
  fieldName: string;
  componentTypeId: number;
  isMulti?: boolean;
  defaultOptions?: boolean;
  cacheOptions?: boolean;
  placeholder?: string;
}) {
  return (
    <Controller
      name={props.fieldName}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => (
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
                onChange([...value, cmpnt!]);
                break;
              case "pop-value":
              case "remove-value":
                onChange(
                  value.filter(
                    (c: ProductComponentModel) =>
                      c.componentModelId != cmpnt!.componentModelId,
                  ),
                );

                break;
              case "clear":
                onChange([]);
            }
          }}
          loadOptions={async function () {
            const result = await getAllComponentModelsAction(
              props.componentTypeId,
            );

            if (result.status == "failed") {
              return [];
            }

            return result.data.map((m) => ({
              label: `${m.brandModel?.brandName} - ${m.brandModel?.modelName}`,
              value: m,
            }));
          }}
          value={value
            .filter(
              (cmpnt: ProductComponentModel) =>
                cmpnt.componentTypeId == props.componentTypeId,
            )
            .map((cmpnt: ProductComponentModel) => ({
              label: cmpnt.brandModel
                ? `${cmpnt.brandModel.brandName} - ${cmpnt.brandModel.modelName}`
                : cmpnt.description
                  ? `${cmpnt.description}`
                  : "<No-Name>",
              value: cmpnt,
            }))}
        />
      )}
    />
  );
}
