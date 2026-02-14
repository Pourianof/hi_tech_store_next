import { DiscountEntity } from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { LabeldInput } from "@/ui/form/inputs";
import { MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { DISCOUNT_Entities_KEY } from "./ruleForm";

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
      <ControlledSelect selectLabel="Entity" fieldname={propFieldname}>
        {selectedEntity.properties.map((prop) => (
          <MenuItem key={prop.id} value={prop.id}>
            {prop.name}
          </MenuItem>
        ))}
      </ControlledSelect>
    </LabeldInput>
  );
}
