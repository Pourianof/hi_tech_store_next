"use client";

import { Button } from "@mui/material";

export function DiscountField() {
  return (
    <div className="flex items-stretch gap-2 my-8">
      <input
        className="p-2 border grow border-gray-neutral-b4 rounded-lg"
        placeholder="Discount code"
      />
      <Button variant="outlined">Apply</Button>
    </div>
  );
}
