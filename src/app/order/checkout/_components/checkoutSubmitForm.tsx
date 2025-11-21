"use client";
import { routes } from "@/app/routes";
import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { FilledButton } from "@/ui/form/AppButtons";
import { StatefulForm } from "@/ui/form/statefulForm";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function CheckoutForm({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <StatefulForm
      onSubmitionSuccessful={(data) => {
        const searchParams = new URLSearchParams({
          [SHIPPING_METHOD_FIELD_NAME]: data[
            SHIPPING_METHOD_FIELD_NAME
          ] as string,
        });
        router.push(`${routes.order.paymentConfirmation}?${searchParams}`);
      }}
      onSubmit={StatefulForm.SuccessSubmit}
    >
      {children}

      <FilledButton type="submit">Continue to pay</FilledButton>
    </StatefulForm>
  );
}
