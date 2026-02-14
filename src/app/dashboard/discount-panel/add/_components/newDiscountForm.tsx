"use client";

import { StatefulForm } from "@/ui/form/statefulForm";
import { ReactNode } from "react";

export function NewDiscountForm({ children }: { children: ReactNode }) {
  return (
    <StatefulForm
      onSubmit={StatefulForm.SuccessSubmit}
      onSubmitionSuccessful={() => {}}
      defaultValues={{
        rules: [
          {
            conditions: [{}],
          },
        ],
      }}
    >
      {children}
    </StatefulForm>
  );
}
