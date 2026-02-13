import { DiscountConditionOperation } from "@/core/models/discount";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { LabeldInput } from "@/ui/form/inputs";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

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
  const fieldname = useFieldPath("discountEntityOperator");
  return (
    <LabeldInput label="Operator">
      <Controller
        name={fieldname}
        render={({ field: { value, onChange } }) => (
          <FormControl>
            <InputLabel id="entity-property-operator">Operator</InputLabel>
            <Select
              size="small"
              labelId="entity-property-operator"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {OPERATORS.map((op) => (
                <MenuItem key={op.name} value={op.value}>
                  {op.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </LabeldInput>
  );
}
