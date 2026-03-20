import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { ConditionForm } from "./conditionListForm";
import { useFieldArray } from "react-hook-form";

export function ConditionGroupForm() {
  const conditionsPath = useFieldPath("conditions");
  const { fields } = useFieldArray({
    name: conditionsPath,
  });

  return (
    <FieldnamePathProvider name={"conditions"}>
      {fields.map((cond, index) => (
        <FieldnamePathProvider name={index} key={cond.id}>
          <ConditionForm />
        </FieldnamePathProvider>
      ))}
    </FieldnamePathProvider>
  );
}
