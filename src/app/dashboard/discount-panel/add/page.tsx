import { AppDatePicker } from "@/ui/form/datePicker";

import { LabeldInput } from "@/ui/form/inputs";
import { NewDiscountForm } from "./_components/newDiscountForm";
import { RuleForm } from "./_components/ruleForm/ruleForm";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import {
  DISCOUNT_END_DATE,
  DISCOUNT_START_DATE,
} from "./_components/ruleForm/fieldNames";

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
            <AppDatePicker fieldname={DISCOUNT_START_DATE} />
          </LabeldInput>
          <LabeldInput label="End date">
            <AppDatePicker fieldname={DISCOUNT_END_DATE} />
          </LabeldInput>
        </div>
        <RuleForm />
      </NewDiscountForm>
    </div>
  );
}
