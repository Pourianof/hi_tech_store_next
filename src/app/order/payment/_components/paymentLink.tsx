"use client";

import { routes } from "@/app/routes";
import { FilledButton } from "@/ui/form/AppButtons";
import { useDiscountCodeContext } from "../_contexts/discountCodeContext";

export function PaymentLink() {
  const { discount } = useDiscountCodeContext()!;

  const searchParams = new URLSearchParams();

  if (discount) {
    searchParams.append("discountCode", discount.code);
  }

  return (
    <a
      href={`${routes.order.payment}${discount ? `?${searchParams.toString()}` : ""}`}
    >
      <FilledButton>Place order</FilledButton>
    </a>
  );
}
