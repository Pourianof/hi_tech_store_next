import { DiscountScriptEditor } from "../../_components/discountScriptEditor";
import { RuleMakerEntitiesInjector } from "./_components/ruleMakerEntitiesInjector";

export default async function Page() {
  return (
    <div className="px-4">
      <h4 className="text-2xl mb-4 font-semibold">Create new discount</h4>
      <RuleMakerEntitiesInjector>
        <DiscountScriptEditor fieldname="" />
      </RuleMakerEntitiesInjector>
    </div>
  );
}
