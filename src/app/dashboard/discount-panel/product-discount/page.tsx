import { OutlinedButton } from "@/ui/form/AppButtons";
import { Column } from "@/ui/layouts/column";
import { H3 } from "@/ui/theme/headers";
import Link from "next/link";
import { DiscountsList } from "../discount-codes/_components/discountList";
import { DiscountType } from "@/core/Dtos/discountCodeDto";

export default function Page() {
  return (
    <Column className="px-4">
      <H3>Product Discount Management</H3>
      <DiscountsList
        key={DiscountType.Products}
        category={DiscountType.Products}
      />
      <Link href={{ pathname: "product-discount/add" }}>
        <OutlinedButton>Register new product discount</OutlinedButton>
      </Link>
    </Column>
  );
}
