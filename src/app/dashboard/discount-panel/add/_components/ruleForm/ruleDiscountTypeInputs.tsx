import { DiscountActionType } from "@/core/models/discount";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { Label } from "@/ui/form/label";
import { Row } from "@/ui/layouts/row";
import { MenuItem } from "@mui/material";
import { ActionValueInput } from "./ruleActionInputs";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import { DISCOUNT_RULE_ACTION_TYPE } from "./fieldNames";

export function RuleDiscountTypeAndValueInputs() {
  const ruleDiscountTypeFieldName = useFieldPath(DISCOUNT_RULE_ACTION_TYPE);

  return (
    <Row>
      <Label>Discount type:</Label>
      <ControlledSelect
        fieldname={ruleDiscountTypeFieldName}
        defaultValue={DiscountActionType.PERCENTAGE}
      >
        <MenuItem value={DiscountActionType.PERCENTAGE}>Percentage</MenuItem>
        <MenuItem value={DiscountActionType.FIXED}>Fixed</MenuItem>
      </ControlledSelect>
      <ActionValueInput />
    </Row>
  );
}
