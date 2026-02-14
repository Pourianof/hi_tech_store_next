import { DiscountConditionOperation } from "@/core/models/discount";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { LabeldInput } from "@/ui/form/inputs";
import { MenuItem } from "@mui/material";
import { DISCOUNT_ENTITY_OPERATOR } from "./fieldNames";

const OPERATORS = [
  {
    name: "Equal",
    value: DiscountConditionOperation.EQUAL,
  },
  {
    name: "Greater than",
    value: DiscountConditionOperation.GREATER_THAN,
  },
  {
    name: "Greater than or equal",
    value: DiscountConditionOperation.GREATER_THAN_OR_EQUAL,
  },
  {
    name: "Less than",
    value: DiscountConditionOperation.LESS_THAN,
  },
  {
    name: "Less than or equal",
    value: DiscountConditionOperation.LESS_THAN_OR_EQUAL,
  },
  {
    name: "Contains",
    value: DiscountConditionOperation.CONTAINS,
  },
];

export function EntityPropertyOperationSelection() {
  const fieldname = useFieldPath(DISCOUNT_ENTITY_OPERATOR);
  return (
    <LabeldInput label="Operator">
      <ControlledSelect fieldname={fieldname} label="Operator">
        {OPERATORS.map((op) => (
          <MenuItem key={op.name} value={op.value}>
            {op.name}
          </MenuItem>
        ))}
      </ControlledSelect>
    </LabeldInput>
  );
}
