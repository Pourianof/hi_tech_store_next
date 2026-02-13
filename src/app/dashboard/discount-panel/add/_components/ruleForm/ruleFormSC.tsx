"use client";

import { DiscountActionType } from "@/core/models/discount";
import { FilledButton } from "@/ui/form/AppButtons";
import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { Label } from "@/ui/form/label";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { IconButton, MenuItem, Select } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { ConditionForm } from "./conditionListForm";
import { ActionValueInput } from "./ruleActionInputs";

export function RuleFormSC() {
  const fieldPath = useFieldPath("rules");
  const { fields, append, remove } = useFieldArray({
    name: fieldPath,
  });

  function addNewRule() {
    append({});
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
  const fieldPath = useFieldPath(index);
  return (
    <FieldnamePathProvider name={fieldPath}>
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
              filedName={`${fieldPath}.name`}
              placeholder="Rule name"
              type="text"
            />
          </LabeldInput>
          <LabeldInput label="Description">
            <ErrorLabeledInput
              filedName={`${fieldPath}.description`}
              placeholder="Rule description"
              type="text"
            />
          </LabeldInput>
        </Row>
        <Row>
          <Label>Discount type:</Label>
          <Controller
            name={`${fieldPath}.discountType`}
            defaultValue={DiscountActionType.PERCENTAGE}
            render={({ field: { value, onChange } }) => (
              <Select
                id="discount-type"
                value={value}
                size="small"
                onChange={(changeContext) => {
                  onChange(changeContext.target.value);
                }}
              >
                <MenuItem value={DiscountActionType.PERCENTAGE}>
                  Percentage
                </MenuItem>
                <MenuItem value={DiscountActionType.FIXED}>Fixed</MenuItem>
              </Select>
            )}
          />
          <ActionValueInput />
        </Row>
        <ConditionForm />
      </div>
    </FieldnamePathProvider>
  );
}
