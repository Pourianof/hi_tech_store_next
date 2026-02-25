import { OutlinedButton } from "@/ui/form/AppButtons";
import Link from "next/link";
import { DiscountsList } from "./_components/discountList";

export default async function Page() {
  return (
    <div className="p-2">
      <h3 className="font-semibold text-2xl my-2">Discount Panel</h3>
      <DiscountsList />
      <Link href={{ pathname: "/dashboard/discount-panel/add" }}>
        <OutlinedButton>
          Add new <span className="uppercase font-semibold mx-1">discount</span>
        </OutlinedButton>
      </Link>
    </div>
  );
}
