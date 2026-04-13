import { OutlinedButton } from "@/ui/form/AppButtons";
import Link from "next/link";
import { DiscountsList } from "./_components/discountList";
import { Column } from "@/ui/layouts/column";
import { DiscountType } from "@/core/Dtos/discountCodeDto";

export default async function Page() {
  return (
    <Column className="p-2 gap-2">
      <h3 className="font-semibold text-2xl my-2">Discount Panel</h3>
      <DiscountsList category={DiscountType.Codes} />
      <Link href={{ pathname: "/dashboard/discount-panel/discount-codes/add" }}>
        <OutlinedButton>
          Add new <span className="uppercase font-semibold mx-1">discount</span>
        </OutlinedButton>
      </Link>
    </Column>
  );
}
