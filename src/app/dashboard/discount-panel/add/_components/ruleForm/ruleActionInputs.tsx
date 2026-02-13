import { DiscountActionType } from "@/core/models/discount";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { Label } from "@/ui/form/label";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { useWatch } from "react-hook-form";

export function ActionValueInput() {
  const fieldName = useFieldPath("value");
  const value = useWatch({ name: "discountType" });

  const isFixed = value == DiscountActionType.FIXED;
  const placeholder = isFixed ? "How much dollar" : "Percentage";

  return (
    <Row>
      <Label>Discount value:</Label>
      <ErrorLabeledInput
        filedName={fieldName}
        placeholder={placeholder}
        type="number"
      />
      {<Icon name={isFixed ? "dollar" : "discount"} className="text-2xl" />}
    </Row>
  );
}
