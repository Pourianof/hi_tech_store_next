"use client";

import { FilledButton } from "@/ui/form/AppButtons";
import { CartDetails } from "../../_components/cartDetail";
import { ResponsiveCartView } from "../../_components/cartPreview";

export function CartPreview() {
  return (
    <CartDetails
      title="Your Order"
      main={<ResponsiveCartView />}
      button={<FilledButton type="submit">Continue to pay</FilledButton>}
    />
  );
}
