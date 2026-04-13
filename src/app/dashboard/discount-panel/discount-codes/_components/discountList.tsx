import { FailedBox } from "@/app/_components/failedBox";
import { DiscountType } from "@/core/Dtos/discountCodeDto";
import { getAllDiscountsAction } from "@/lib/server_actions/discountActions";
import { DiscountListTable } from "./discountListTable";
import { DiscountTypeProvider } from "../../_components/context/discountTypeContext";

export async function DiscountsList({ category }: { category?: DiscountType }) {
  const discountCodeResult = await getAllDiscountsAction({
    discountType: category,
  });

  if (discountCodeResult.status == "failed") {
    return (
      <FailedBox
        title={"Fail to load discount codes"}
        message={`${discountCodeResult.data.title} - ${discountCodeResult.data.detail}`}
      />
    );
  }

  const discountCodes = discountCodeResult.data;

  return (
    <DiscountTypeProvider category={category}>
      <DiscountListTable pagedDiscounts={discountCodes} />
    </DiscountTypeProvider>
  );
}
