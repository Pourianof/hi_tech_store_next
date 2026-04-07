import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { DiscountDateIntervalInput } from "../../discount-codes/add/_components/discountDateIntervalInput";
import { NewDiscountForm } from "../../discount-codes/add/_components/newDiscountForm";
import { RuleForm } from "../../discount-codes/add/_components/ruleForm/ruleForm";
import { RuleMakerEntitiesInjector } from "../../discount-codes/add/_components/ruleMakerEntitiesInjector";
import { ProductDiscountForm } from "./_components/productDiscountForm";

export default function Page() {
  return (
    <div className="p-4">
      <ProductDiscountForm>
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
      </ProductDiscountForm>
    </div>
  );
}
