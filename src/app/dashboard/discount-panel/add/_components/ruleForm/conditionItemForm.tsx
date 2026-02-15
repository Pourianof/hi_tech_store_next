import { DiscountEntity } from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { IconButton, MenuItem } from "@mui/material";
import { EntityPropertyOperationSelection } from "./conditionOperatorSelection";
import { EntityPropertySelection } from "./entityPropertySelection";
import {
  DISCOUNT_CONDITION_ENTITY,
  DISCOUNT_CONDITION_VALUE,
} from "./fieldNames";
import { DISCOUNT_Entities_KEY } from "./ruleForm";
import { ConditionInterpreter } from "./conditionInterpreter";

export function ConditionItem({
  conditionIndex,
  onConditionRemove,
}: {
  conditionIndex: number;
  onConditionRemove(index: number): void;
}) {
  const entityFieldname = useFieldPath(DISCOUNT_CONDITION_ENTITY);
  const valueFieldname = useFieldPath(DISCOUNT_CONDITION_VALUE);

  const discountEntities = useStaticData(
    DISCOUNT_Entities_KEY,
  ) as DiscountEntity[];

  return (
    <Column>
      <Row>
        <Column center>
          <div className="bg-discount-condition-blue w-8 rounded-xl aspect-square flex justify-center items-center font-semibold">
            #{conditionIndex + 1}
          </div>
          <IconButton onClick={() => onConditionRemove(conditionIndex)}>
            <Icon name="trash" className="text-lg text-red-500" />
          </IconButton>
        </Column>
        <div className="bg-discount-condition-blue p-2 rounded grow">
          <Row>
            <LabeldInput label="Choose the criteria you want to target">
              <ControlledSelect
                fieldname={entityFieldname}
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
            <EntityPropertySelection />
            <EntityPropertyOperationSelection />
            <LabeldInput label="Value">
              <ErrorLabeledInput
                filedName={valueFieldname}
                type="text"
                placeholder="Condition value"
              />
            </LabeldInput>
          </Row>
        </div>
      </Row>
      <ConditionInterpreter />
    </Column>
  );
}
