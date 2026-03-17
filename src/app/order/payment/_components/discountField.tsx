"use client";

import { checkDiscountCodeUsabilityAction } from "@/lib/server_actions/cartActions";
import { Button } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useDiscountCodeContext } from "../_contexts/discountCodeContext";
import toast from "react-hot-toast";

export function DiscountField() {
  const { setDiscountCode, discount } = useDiscountCodeContext()!;
  const [discountInput, setDiscountCodeInput] = useState<string | undefined>(
    discount?.code,
  );

  async function handleDiscountCheck(e: MouseEvent) {
    e.preventDefault();

    const result = await checkDiscountCodeUsabilityAction(discountInput!);

    if (result.status == "failed") {
      if (result.statusCode == 404) {
        toast.error(`No discount code exist with name ${discountInput}`);
      } else {
        toast.error("Something went wrong on checking discount code");
      }
      return;
    }

    const discountCheckState = result.data;
    if (!discountCheckState.isDiscountAppliable) {
      toast.error(`Discount code \"${discountInput}\" is not usable`);
      return;
    }

    setDiscountCode(discountInput!, discountCheckState.discount);
  }

  return (
    <div className=" my-8 space-y-2">
      <div className="flex items-stretch gap-2">
        <input
          className="p-2 border grow border-gray-neutral-b4 rounded-lg"
          placeholder="Discount code"
          value={discountInput}
          onChange={(e) => {
            setDiscountCodeInput(e.target.value);
          }}
        />
        <Button
          variant="outlined"
          disabled={!discountInput}
          onClick={handleDiscountCheck}
        >
          Apply
        </Button>
      </div>
      {!!discount && (
        <div className="text-sm py-1 bg-slate-200 rounded ">
          🎉🎉 Discount code &quot;{discount.code}&quot; has activate for you
        </div>
      )}
    </div>
  );
}
