import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { DISCOUNT_CONDITION_VALUE } from "./fieldNames";
import { useSelectedProps } from "./hooks/useSelectedProps";
import { DiscountEntityProperyValueType } from "@/core/models/discount";
import { AppDatePicker } from "@/ui/form/datePicker";

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

  let input = (
    <ErrorLabeledInput
      filedName={valueFieldname}
      type="text"
      placeholder="Condition value"
    />
  );

  if (lastProp.type === DiscountEntityProperyValueType.DATETIME) {
    input = <AppDatePicker fieldname={valueFieldname} />;
  }

  return <LabeldInput label="Value">{input}</LabeldInput>;
}
