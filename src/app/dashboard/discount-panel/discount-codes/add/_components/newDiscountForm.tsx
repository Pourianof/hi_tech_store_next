"use client";

import { DiscountCode } from "@/core/models/discount";
import { submitDiscountCodeAction } from "@/lib/server_actions/discountActions";
import { StatefulForm } from "@/ui/form/statefulForm";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { SubmitButton } from "./submitButton";
import { discountCodeSchema } from "@/core/schemas/discountCodeSchema";

export function NewDiscountForm({ children }: { children: ReactNode }) {
  const router = useRouter();

  function submitDiscount(formData: Record<string, unknown>) {
    const result = discountCodeSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(
        "There is some un-sync schema between rhs and zod. handle it developer.",
      );
    }

    return submitDiscountCodeAction(result.data);
  }

  return (
    <StatefulForm
      onSubmit={submitDiscount}
      onSubmitionSuccessful={() => {
        const delay = 2500;
        toast.success("Discount code registered successfully", {
          duration: delay,
        });

        setTimeout(() => router.replace("/dashboard/discount-panel"), delay);
      }}
      defaultValues={
        {
          rules: [
            {
              conditions: [
                {
                  conditions: [{}],
                },
              ],
            },
          ],
        } as Partial<DiscountCode>
      }
    >
      {children}
      <SubmitButton />
    </StatefulForm>
  );
}
