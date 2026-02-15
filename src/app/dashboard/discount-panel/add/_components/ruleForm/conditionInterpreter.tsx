import {
  DiscountEntity,
  DiscountConditionOperation,
} from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { useWatch } from "react-hook-form";
import {
  DISCOUNT_CONDITION_ENTITY,
  DISCOUNT_CONDITION_VALUE,
  DISCOUNT_ENTITY_PROPERTY,
  DISCOUNT_ENTITY_OPERATOR,
} from "./fieldNames";
import { DISCOUNT_Entities_KEY } from "./ruleForm";

export function ConditionInterpreter() {
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
          <span className="bg-[#803090] font-bold px-1" title="Condition Value">
            {val}
          </span>
        </>
      )}
    </div>
  );
}
