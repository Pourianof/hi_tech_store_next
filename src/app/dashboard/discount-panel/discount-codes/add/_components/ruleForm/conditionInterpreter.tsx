import { DiscountEntity, DiscountEntityProperty } from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { useWatch } from "react-hook-form";
import {
  DISCOUNT_CONDITION_ENTITY,
  DISCOUNT_CONDITION_VALUE,
  DISCOUNT_ENTITY_OPERATOR,
} from "./fieldNames";
import { useSelectedProps } from "./hooks/useSelectedProps";
import { DISCOUNT_Entities_KEY } from "../ruleMakerEntitiesInjector";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import {
  DiscountConditionOperation,
  DiscountEntityProperyValueType,
} from "@/core/schemas/discountCodeSchema";

export function ConditionInterpreter() {
  const entityFieldname = useFieldPath(DISCOUNT_CONDITION_ENTITY);
  const valueFieldname = useFieldPath(DISCOUNT_CONDITION_VALUE);
  const operatorFieldname = useFieldPath(DISCOUNT_ENTITY_OPERATOR);

  const [ent, val, op] = useWatch({
    name: [entityFieldname, valueFieldname, operatorFieldname],
  });

  const entities = useStaticData(DISCOUNT_Entities_KEY) as DiscountEntity[];

  const entity = entities.find((e) => e.id == ent);

  const porperties = useSelectedProps();

  return (
    <BaseConditionInterpreter
      entity={entity}
      porperties={porperties}
      op={op}
      value={val}
    />
  );
}

export function BaseConditionInterpreter({
  entity,
  porperties,
  op,
  value,
  ...props
}: {
  entity?: DiscountEntity;
  porperties?: DiscountEntityProperty[];
  op?: DiscountConditionOperation;
  value?: unknown;
  column?: boolean;
  withFieldNames?: boolean;
}) {
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

  const lastProp = porperties?.at(-1);

  const isNameIncluded =
    "withFieldNames" in props && props.withFieldNames !== false;

  const fieldNameClassNames =
    "mr-1 font-bold text-xs uppercase bg-white text-slate-800 px-1 rounded";

  const children = (
    <>
      {!entity && !porperties?.length && !op ? (
        <span>Condtition parameters are missing</span>
      ) : (
        <>
          <span className="capitalize bg-green-800" title="Target Entity">
            {isNameIncluded && (
              <span className={fieldNameClassNames}>Target Entity:</span>
            )}
            {`${entity?.name ?? ""}'s`}
          </span>
          <span className="capitalize bg-amber-800" title="Target property">
            {isNameIncluded && (
              <span className={fieldNameClassNames}>Property:</span>
            )}
            {porperties
              ?.map((p) => p.name)
              .reverse()
              .join(" of ")}
          </span>
          <span>Must be</span>
          <span className="capitalize bg-red-800" title="Operator">
            {isNameIncluded && (
              <span className={fieldNameClassNames}>Operator:</span>
            )}
            {operatorName}
          </span>
          <span className="bg-[#803090] font-bold px-1" title="Condition Value">
            {isNameIncluded && (
              <span className={fieldNameClassNames}>Value:</span>
            )}
            {!!lastProp && formatPropertyValue(lastProp, value)}
          </span>
        </>
      )}
    </>
  );

  const className = "gap-1 bg-slate-600 p-1 rounded text-sm text-white";
  const isColumn = "column" in props && props.column !== false;

  return isColumn ? (
    <Column className={className}>{children}</Column>
  ) : (
    <Row className={className}>{children}</Row>
  );
}

function formatPropertyValue(
  entity: DiscountEntityProperty,
  value: unknown,
): string {
  if (!value) {
    return "";
  }

  switch (entity.type) {
    case DiscountEntityProperyValueType.BOOLEAN:
      return value ? "true" : "false";
    case DiscountEntityProperyValueType.DATETIME:
      return new Date(Number(value)).toLocaleString();
    default:
      return String(value);
  }
}
