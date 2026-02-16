import { DiscountEntity } from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { Row } from "@/ui/layouts/row";
import { MenuItem } from "@mui/material";
import { useWatch } from "react-hook-form";
import { EntityPropertyOperationSelection } from "./conditionOperatorSelection";
import { EntityPropertySelection } from "./entityPropertySelection";
import {
  DISCOUNT_CONDITION_ENTITY,
  DISCOUNT_CONDITION_VALUE,
} from "./fieldNames";
import { DISCOUNT_Entities_KEY } from "./ruleForm";

export function EntitSelection() {
  const valueFieldname = useFieldPath(DISCOUNT_CONDITION_VALUE);
  const discountEntityFieldname = useFieldPath(DISCOUNT_CONDITION_ENTITY);

  const selectedEntityId = useWatch({ name: discountEntityFieldname });

  const discountEntities = useStaticData(
    DISCOUNT_Entities_KEY,
  ) as DiscountEntity[];

  const selectedEntity = discountEntities.find(
    (e) => e.id === selectedEntityId,
  );

  return (
    <Row>
      <LabeldInput label="Choose the criteria you want to target">
        <ControlledSelect
          fieldname={discountEntityFieldname}
          label="Entity"
          selectLabel="Entity"
        >
          {discountEntities.map((entity) => (
            <MenuItem key={entity.id} value={entity.id}>
              {entity.name}
            </MenuItem>
          ))}
        </ControlledSelect>
      </LabeldInput>
      {!!selectedEntity && (
        <EntityPropertySelection baseEntity={selectedEntity} index={0} />
      )}
      <EntityPropertyOperationSelection />
      <LabeldInput label="Value">
        <ErrorLabeledInput
          filedName={valueFieldname}
          type="text"
          placeholder="Condition value"
        />
      </LabeldInput>
    </Row>
  );
}
