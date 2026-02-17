"use client";

import { DiscountActionType } from "@/core/models/discount";
import { FilledButton } from "@/ui/form/AppButtons";
import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { ControlledSelect } from "@/ui/form/controlledSelect";
import { LabeldInput } from "@/ui/form/inputs";
import { Label } from "@/ui/form/label";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { IconButton, MenuItem } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { ConditionForm } from "./conditionListForm";
import { ActionValueInput } from "./ruleActionInputs";

export function RuleFormSC() {
  const fieldPath = useFieldPath("rules");
  const { fields, append, remove } = useFieldArray({
    name: fieldPath,
  });

  function addNewRule() {
    append({
      conditions: [{}],
    });
  }

  function removeRule(index: number) {
    if (fields.length <= 1) {
      toast.error("At least one rule must specified for a discount");
      return;
    }

    remove(index);
  }

  return (
    <FieldnamePathProvider name={fieldPath}>
      <div className="space-y-3">
        {fields.map((r, i) => (
          <RuleItem key={r.id} index={i} onDelete={removeRule} />
        ))}
        <FilledButton onClick={() => addNewRule()}>Add new rule</FilledButton>
      </div>
    </FieldnamePathProvider>
  );
}

function RuleItem({
  index,
  onDelete,
}: {
  index: number;
  onDelete(index: number): void;
}) {
  const ruleNameFieldName = useFieldPath(index, "name");
  const ruleDescriptionFieldName = useFieldPath(index, "description");
  const ruleDiscountTypeFieldName = useFieldPath(index, "discountType");

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
        <Row>
          <Label>Discount type:</Label>
          <ControlledSelect
            fieldname={ruleDiscountTypeFieldName}
            defaultValue={DiscountActionType.PERCENTAGE}
          >
            <MenuItem value={DiscountActionType.PERCENTAGE}>
              Percentage
            </MenuItem>
            <MenuItem value={DiscountActionType.FIXED}>Fixed</MenuItem>
          </ControlledSelect>
          <ActionValueInput />
        </Row>
        <ConditionForm />
      </div>
    </FieldnamePathProvider>
  );
}
