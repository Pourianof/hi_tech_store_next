"use client";

import { DiscountCode, discountCodeSchema } from "@/core/models/discount";
import { submitDiscountCodeAction } from "@/lib/server_actions/discountActions";
import { StatefulForm } from "@/ui/form/statefulForm";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { DateObject } from "react-multi-date-picker";
import { SubmitButton } from "./submitButton";
import { useRouter } from "next/navigation";

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
          description: "test description",
          startTime: new DateObject().subtract(5, "d").toUnix() * 1000,
          endTime: new DateObject().add(5, "d").toUnix() * 1000,
          rules: [
            {
              description: "Some test description",
              name: "some test name",
              conditions: [
                {
                  conditions: [{}],
                },
              ],
              discountAction: { type: 0, value: 10 },
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
