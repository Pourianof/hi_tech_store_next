"use client";

import { FilledButton } from "@/ui/form/AppButtons";
import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { RuleItem } from "./ruleItemForm";

export function RuleForm() {
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
