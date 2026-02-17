import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { IconButton } from "@mui/material";
import { ConditionGroupForm } from "./conditionGroupForm";
import { DISCOUNT_RULE_ACTION } from "./fieldNames";
import { RuleDiscountTypeAndValueInputs } from "./ruleDiscountTypeInputs";

export function RuleItem({
  index,
  onDelete,
}: {
  index: number;
  onDelete(index: number): void;
}) {
  const ruleNameFieldName = useFieldPath(index, "name");
  const ruleDescriptionFieldName = useFieldPath(index, "description");

  return (
    <FieldnamePathProvider name={index}>
      <div className="bg-slate-100 p-2 rounded">
        <div className="my-2 flex justify-between">
          <span className="inline-block bg-blue-500 w-fit text-gray-neutral-f9 rounded px-1 py-2">
            Rule #{index + 1}
          </span>
          <IconButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
              onDelete(index);
            }}
          >
            <Icon name="trash" className="text-xl text-red-400" />
          </IconButton>
        </div>
        <Row className="gap-2">
          <LabeldInput label="Rule name">
            <ErrorLabeledInput
              filedName={ruleNameFieldName}
              placeholder="Rule name"
              type="text"
            />
          </LabeldInput>
          <LabeldInput label="Description">
            <ErrorLabeledInput
              filedName={ruleDescriptionFieldName}
              placeholder="Rule description"
              type="text"
            />
          </LabeldInput>
        </Row>
        <FieldnamePathProvider name={DISCOUNT_RULE_ACTION}>
          <RuleDiscountTypeAndValueInputs />
        </FieldnamePathProvider>
        <ConditionGroupForm />
      </div>
    </FieldnamePathProvider>
  );
}
