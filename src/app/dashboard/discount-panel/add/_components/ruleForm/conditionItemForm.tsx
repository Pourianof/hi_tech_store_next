import {
  DiscountConditionOperation,
  DiscountEntity,
} from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { IconButton, MenuItem } from "@mui/material";
import { useWatch } from "react-hook-form";
import { EntityPropertyOperationSelection } from "./conditionOperatorSelection";
import { EntityPropertySelection } from "./entityPropertySelection";
import {
  DISCOUNT_CONDITION_ENTITY,
  DISCOUNT_CONDITION_VALUE,
  DISCOUNT_ENTITY_OPERATOR,
  DISCOUNT_ENTITY_PROPERTY,
} from "./fieldNames";
import { DISCOUNT_Entities_KEY } from "./ruleForm";

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

function ConditionInterpreter() {
  const entityFieldname = useFieldPath(DISCOUNT_CONDITION_ENTITY);
  const valueFieldname = useFieldPath(DISCOUNT_CONDITION_VALUE);
  const propFieldname = useFieldPath(DISCOUNT_ENTITY_PROPERTY);
  const operatorFieldname = useFieldPath(DISCOUNT_ENTITY_OPERATOR);

  const [ent, val, prop, op] = useWatch({
    name: [entityFieldname, valueFieldname, propFieldname, operatorFieldname],
  });

  const entities = useStaticData(DISCOUNT_Entities_KEY) as DiscountEntity[];

  const entity = entities.find((e) => e.id == ent);
  const porperty = entity?.properties.find((p) => p.id == prop);

  let operatorName: string = "";
  switch (op as DiscountConditionOperation) {
    case DiscountConditionOperation.EQUAL:
      operatorName = "equal";
      break;
    case DiscountConditionOperation.CONTAINS:
      operatorName = "contains";
      break;
    case DiscountConditionOperation.GREATER_THAN:
      operatorName = "greater than";
      break;
    case DiscountConditionOperation.GREATER_THAN_OR_EQUAL:
      operatorName = "greater than or equal";
      break;

    case DiscountConditionOperation.LESS_THAN:
      operatorName = "less than";
      break;
    case DiscountConditionOperation.LESS_THAN_OR_EQUAL:
      operatorName = "less than or equal";
      break;
  }

  return (
    <div className="flex gap-1 bg-slate-600 p-1 rounded text-sm text-white">
      {!entity && !porperty && !op ? (
        <span>Condtition parameters are missing</span>
      ) : (
        <>
          <span
            className="capitalize bg-green-800"
            title="Target Entity"
          >{`${entity?.name ?? ""}'s`}</span>
          <span className="capitalize bg-amber-800" title="Target property">
            {porperty?.name}
          </span>
          <span>Must be</span>
          <span className="capitalize bg-red-800" title="Operator">
            {operatorName}
          </span>
          <span
            className="bg-gradient-middle-blue font-bold"
            title="Condition Value"
          >
            {val}
          </span>
        </>
      )}
    </div>
  );
}
