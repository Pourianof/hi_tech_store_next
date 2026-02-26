import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { DISCOUNT_CONDITION_VALUE } from "./fieldNames";
import { useSelectedProps } from "./hooks/useSelectedProps";
import { AppDatePicker } from "@/ui/form/datePicker";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { MenuItem } from "@mui/material";
import { DiscountEntityProperyValueType } from "@/core/schemas/discountCodeSchema";

export function ConditionValueInput() {
  const valueFieldname = useFieldPath(DISCOUNT_CONDITION_VALUE);
  const props = useSelectedProps();

  if (!props?.length) {
    return null;
  }

  const lastProp = props[props.length - 1];

  if (lastProp.type.toLowerCase() === "object") {
    return null;
  }

  let input = null;

  switch (lastProp.type) {
    case DiscountEntityProperyValueType.DATETIME:
      input = (
        <AppDatePicker
          fieldname={valueFieldname}
          dateModifier={(date) => {
            return date.setHour(0).setMinute(0).setSecond(0);
          }}
          required
        />
      );
      break;
    case DiscountEntityProperyValueType.BOOLEAN:
      input = (
        <ControlledSelect fieldname={valueFieldname} required>
          <MenuItem value={1}>True</MenuItem>
          <MenuItem value={0}>False</MenuItem>
        </ControlledSelect>
      );
      break;
    default:
      input = (
        <ErrorLabeledInput
          filedName={valueFieldname}
          type={
            lastProp.type === DiscountEntityProperyValueType.INT ||
            lastProp.type === DiscountEntityProperyValueType.FLOAT
              ? "number"
              : "text"
          }
          placeholder="Condition value"
        />
      );
  }

  return <LabeldInput label="Value">{input}</LabeldInput>;
}
