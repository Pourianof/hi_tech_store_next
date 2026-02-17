"use client";

import { StatefulForm } from "@/ui/form/statefulForm";
import { ReactNode } from "react";
import { SubmitButton } from "./submitButton";

export function NewDiscountForm({ children }: { children: ReactNode }) {
  return (
    <StatefulForm
      onSubmit={StatefulForm.SuccessSubmit}
      onSubmitionSuccessful={() => {}}
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
