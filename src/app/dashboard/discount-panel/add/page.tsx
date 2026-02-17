import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { DiscountDateIntervalInput } from "./_components/discountDateIntervalInput";
import { NewDiscountForm } from "./_components/newDiscountForm";
import { RuleForm } from "./_components/ruleForm/ruleForm";
import { RuleMakerEntitiesInjector } from "./_components/ruleMakerEntitiesInjector";

export default async function Page() {
  return (
    <div className="px-4">
      <h4 className="text-2xl mb-4 font-semibold">Create new discount</h4>
      <RuleMakerEntitiesInjector>
        <NewDiscountForm>
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
    </div>
  );
}
