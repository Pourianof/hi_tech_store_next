import { DiscountEntity } from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { LabeldInput } from "@/ui/form/inputs";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { DISCOUNT_Entities_KEY } from "./ruleForm";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";

export function EntityPropertySelection() {
  const propFieldname = useFieldPath("discountProperty");
  const entityFieldname = useFieldPath("discountEntity");

  console.log(entityFieldname);
  const { setValue } = useFormContext();
  const entities = useStaticData(DISCOUNT_Entities_KEY) as DiscountEntity[];
  const selectedEntityId = +useWatch({ name: entityFieldname });

  useEffect(() => {
    setValue(propFieldname, undefined);
  }, [propFieldname, selectedEntityId, setValue]);

  if (Number.isNaN(selectedEntityId)) {
    return null;
  }

  const selectedEntity = entities.find((e) => e.id == selectedEntityId);

  if (!selectedEntity) {
    return null;
  }

  return (
    <LabeldInput label="Entity properties">
      <Controller
        name={propFieldname}
        render={({ field: { value, onChange } }) => (
          <FormControl fullWidth>
            <InputLabel id="entity">Properties</InputLabel>
            <Select
              size="small"
              label="Entity"
              labelId="entity"
              onChange={(event) => onChange(event.target.value)}
              value={value ?? ""}
            >
              {selectedEntity.properties.map((prop) => (
                <MenuItem key={prop.id} value={prop.id}>
                  {prop.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </LabeldInput>
  );
}
