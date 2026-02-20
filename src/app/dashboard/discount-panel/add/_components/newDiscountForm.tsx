"use client";

import { StatefulForm } from "@/ui/form/statefulForm";
import { ReactNode } from "react";
import { SubmitButton } from "./submitButton";
import { discountCodeSchema } from "@/core/models/discount";

export function NewDiscountForm({ children }: { children: ReactNode }) {
  function submitDiscount(formData: Record<string, unknown>) {
    const result = discountCodeSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(
        "There is some un-sync schema between rhs and zod. handle it developer.",
      );
    }
  }

  return (
    <StatefulForm
      onSubmit={StatefulForm.SuccessSubmit}
      onSubmitionSuccessful={submitDiscount}
      defaultValues={{
        rules: [
          {
            conditions: [
              {
                conditions: [{}],
              },
            ],
          },
        ],
      }}
    >
      {children}
      <SubmitButton />
    </StatefulForm>
  );
}
