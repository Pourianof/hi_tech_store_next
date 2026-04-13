import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { DiscountDateIntervalInput } from "./discountDateIntervalInput";
import { RuleMakerEntitiesInjector } from "./ruleMakerEntitiesInjector";
import { NewDiscountForm } from "./newDiscountForm";
import { RuleForm } from "./ruleForm/ruleForm";

export function DiscountForm({
  discountCodeForm,
}: {
  discountCodeForm?: boolean;
}) {
  return (
    <RuleMakerEntitiesInjector>
      <NewDiscountForm isDiscountCode={discountCodeForm}>
        <LabeldInput label="Discount description">
          <ErrorLabeledInput
            filedName="description"
            placeholder="Some description about purpose of discount"
            type="text"
          />
        </LabeldInput>
        <DiscountDateIntervalInput />
        <RuleForm />
      </NewDiscountForm>
    </RuleMakerEntitiesInjector>
  );
}
