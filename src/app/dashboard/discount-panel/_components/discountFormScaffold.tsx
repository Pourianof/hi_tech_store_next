"use client";
import { StatefulForm } from "@/ui/form/statefulForm";
import { H4 } from "@/ui/theme/headers";
import { ReactNode } from "react";

export function DiscountFormScaffold({ children }: { children: ReactNode }) {
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
      <H4>Register new discount</H4>
      {children}
    </StatefulForm>
  );
}
