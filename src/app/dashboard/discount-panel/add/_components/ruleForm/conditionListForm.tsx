import { OutlinedButton } from "@/ui/form/AppButtons";
import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { Column } from "@/ui/layouts/column";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { ConditionItem } from "./conditionItemForm";

export function ConditionForm() {
  const conditionsPath = useFieldPath("conditions");
  const { fields, append, remove } = useFieldArray({
    name: conditionsPath,
  });

  const [activeConditionIndex, setActiveConditionIndex] = useState<number>(0);

  useEffect(() => {
    if (fields.length <= activeConditionIndex) {
      setActiveConditionIndex(fields.length - 1);
    }
  }, [activeConditionIndex, fields.length]);

  function removeCondition(index: number) {
    if (fields.length <= 1) {
      toast.error("At least one condition must defined in a rule");
      return;
    }

    remove(index);
  }

  return (
    <div>
      <h4 className="font-semibold text-xl">Conditions: </h4>

      <Column className="gap-2 p-4 bg-slate-200 ">
        {fields.map((cond, index) => (
          <FieldnamePathProvider name={["conditions", index]} key={cond.id}>
            <ConditionItem
              conditionIndex={index}
              onConditionRemove={removeCondition}
            />
          </FieldnamePathProvider>
        ))}
        <OutlinedButton onClick={() => append({})}>
          Add new condition
        </OutlinedButton>
      </Column>
    </div>
  );
}
