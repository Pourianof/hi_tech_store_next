import { AppDatePicker } from "@/ui/form/datePicker";

import { LabeldInput } from "@/ui/form/inputs";
import { NewDiscountForm } from "./_components/newDiscountForm";
import { RuleForm } from "./_components/ruleForm/ruleForm";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";

export default async function Page() {
  return (
    <div className="px-4">
      <h4 className="text-2xl mb-4 font-semibold">Create new discount</h4>
      <NewDiscountForm>
        <LabeldInput label="Discount description">
          <ErrorLabeledInput
            filedName="description"
            placeholder="Some description about purpose of discount"
            type="text"
          />
        </LabeldInput>
        <div className="flex gap-4">
          <LabeldInput label="Start date">
            <AppDatePicker />
          </LabeldInput>
          <LabeldInput label="End date">
            <AppDatePicker />
          </LabeldInput>
        </div>
        <RuleForm />
      </NewDiscountForm>
    </div>
  );
}
