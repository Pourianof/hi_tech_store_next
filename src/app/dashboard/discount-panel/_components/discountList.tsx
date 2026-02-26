import { FailedBox } from "@/app/_components/failedBox";
import { getAllDiscountsAction } from "@/lib/server_actions/discountActions";
import { DiscountListTable } from "./discountListTable";

export async function DiscountsList() {
  const discountCodeResult = await getAllDiscountsAction();

  if (discountCodeResult.status == "failed") {
    return (
      <FailedBox
        title={"Fail to load discount codes"}
        message={`${discountCodeResult.data.title} - ${discountCodeResult.data.detail}`}
      />
    );
  }

  const discountCodes = discountCodeResult.data;

  return <DiscountListTable pagedDiscounts={discountCodes} />;
}
