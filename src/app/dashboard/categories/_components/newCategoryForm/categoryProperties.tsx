import { CategoryProperty, PropertyType } from "@/core/models/category";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import Icon from "@/ui/icons/icon";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export function CategoryProperties({
  title,
  defaultProperties,
}: {
  title: string;
  defaultProperties?: CategoryProperty[];
}) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });
  const filedName = "properties";

  useEffect(() => {
    if (defaultProperties) {
      defaultProperties.forEach(({ name, description }) =>
        append({ name, description })
      );
    } else {
      append({ name: "", description: "" });
    }
    return () => remove();
  }, [append, remove, defaultProperties]);

  const errorMesage = errors.properties?.message as string;

  return (
    <div className="border my-2 p-2 flex flex-col gap-2">
      <h4 className="font-semibold border-b py-2">
        <Icon name="checklist" className="text-2xl inline-block me-2" />
        {title}
      </h4>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex gap-2 items-center">
            <span>{index + 1}</span>
            <ErrorLabeledInput
              filedName={`${filedName}.${index}.name`}
              placeholder="Property Name"
              type="text"
            />
            <ErrorLabeledInput
              filedName={`${filedName}.${index}.description`}
              placeholder="Property Descriptions"
              type="text"
            />

            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Value type
              </InputLabel>
              <Controller
                control={control}
                name={`${filedName}.${index}.propertyType`}
                render={({ field }) => {
                  const { value, onChange } = field;
                  return (
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value ?? ""}
                      label="Value type"
                      onChange={({ target }) => {
                        onChange(target.value);
                      }}
                    >
                      <MenuItem value={PropertyType.Number}>Number</MenuItem>
                      <MenuItem value={PropertyType.String}>Text</MenuItem>
                      <MenuItem value={PropertyType.Boolean}>
                        True - False
                      </MenuItem>
                      <MenuItem value={PropertyType.DateTime}>
                        Date time
                      </MenuItem>
                    </Select>
                  );
                }}
              />
            </FormControl>
            <button
              className=""
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (fields.length == 1) {
                  return;
                }
                remove(index);
              }}
            >
              ×
            </button>
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          append({ name: "", description: "" });
        }}
        type="button"
        className="block border"
      >
        Add new property
      </button>
      {!!errorMesage && (
        <span className="text-sm text-red-500">{errorMesage}</span>
      )}
    </div>
  );
}
