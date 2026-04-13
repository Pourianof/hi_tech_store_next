"use client";

import { DiscountCode } from "@/core/models/discount";
import {
  submitDiscountAction,
  submitDiscountCodeAction,
} from "@/lib/server_actions/discountActions";
import { StatefulForm } from "@/ui/form/statefulForm";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { SubmitButton } from "./submitButton";
import {
  DiscountCodeCreationDto,
  discountCodeSchema,
  discountSchema,
} from "@/core/schemas/discountCodeSchema";
import { DiscountCreationDto } from "@/core/Dtos/discountCodeDto";
import { DiscountTypeProvider } from "./context/discountTypeContext";

export function NewDiscountForm({
  children,
  isDiscountCode,
}: {
  children: ReactNode;
  isDiscountCode?: boolean;
}) {
  const router = useRouter();

  function submitDiscount(formData: Record<string, unknown>) {
    debugger;
    const result = isDiscountCode
      ? discountCodeSchema.safeParse(formData)
      : discountSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(
        "There is some un-sync schema between rhs and zod. handle it developer.",
      );
    }

    return isDiscountCode
      ? submitDiscountCodeAction(result.data as DiscountCodeCreationDto)
      : submitDiscountAction(result.data as DiscountCreationDto);
  }

  return (
    <DiscountTypeProvider isDiscountCode={isDiscountCode}>
      <StatefulForm
        onSubmit={submitDiscount}
        onSubmitionSuccessful={() => {
          const delay = 2500;
          toast.success("Discount registered successfully", {
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
    </DiscountTypeProvider>
  );
}
