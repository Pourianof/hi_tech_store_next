import { DiscountForm } from "../../_components/discountForm";

export default async function Page() {
  return (
    <div className="px-4">
      <h4 className="text-2xl mb-4 font-semibold">Create new discount</h4>
      <DiscountForm discountCodeForm formName="discount-code-form" />
    </div>
  );
}
