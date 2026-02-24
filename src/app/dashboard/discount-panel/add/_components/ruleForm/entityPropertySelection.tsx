import { DiscountEntity } from "@/core/models/discount";
import { captalize } from "@/lib/helpers/stringHelpers";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { LabeldInput } from "@/ui/form/inputs";
import { Row } from "@/ui/layouts/row";
import { MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { DISCOUNT_ENTITY_PROPERTY } from "./fieldNames";

type Props = {
  baseEntity: DiscountEntity;
  index: number;
};

export function EntityPropertySelection({ baseEntity, index }: Props) {
  const propFieldname = useFieldPath(DISCOUNT_ENTITY_PROPERTY, index);
  const selectedEntityPropertyId = useWatch({ name: propFieldname });

  const { setValue } = useFormContext();

  const selectedEntityProperty = baseEntity.properties.find(
    (p) => p.id === selectedEntityPropertyId,
  );

  const isObjectType = selectedEntityProperty?.type.toLowerCase() === "object";

  useEffect(() => {
    setValue(propFieldname, undefined);
    return () => setValue(propFieldname, undefined);
  }, [propFieldname, setValue, baseEntity?.id]);

  const label = captalize(`${baseEntity.name} properties`)!;

  return (
    <Row>
      <LabeldInput label={label}>
        <ControlledSelect
          selectLabel={label}
          label={label}
          fieldname={propFieldname}
          required
        >
          {baseEntity.properties.map((prop) => (
            <MenuItem key={prop.id} value={prop.id}>
              {prop.name}
            </MenuItem>
          ))}
        </ControlledSelect>
      </LabeldInput>
      {isObjectType && (
        <EntityPropertySelection
          baseEntity={selectedEntityProperty.subEntity!}
          index={index + 1}
        />
      )}
    </Row>
  );
}
