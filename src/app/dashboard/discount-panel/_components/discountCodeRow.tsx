"use client";
import { DiscountCode } from "@/core/models/discount";
import { formatDate } from "@/lib/helpers/formatDate";
import { TableRow, TableCell } from "@mui/material";
import { DiscountActionsButton } from "./discountActionsButton";
import { useDiscountCode } from "./hooks/useDiscountCode";

export function DiscountCodeRow({ discount }: { discount: DiscountCode }) {
  const { data: dc } = useDiscountCode(discount.discountCodeId, discount);

  if (!dc) {
    return;
  }

  return (
    <TableRow>
      <TableCell>{dc.code}</TableCell>
      <TableCell>{formatDate(dc.startTime)}</TableCell>
      <TableCell>{formatDate(dc.endTime)}</TableCell>
      <TableCell>{dc.description}</TableCell>
      <TableCell>
        {dc.isDeactivated
          ? "Deactive"
          : Date.now() < new Date(dc.endTime).getTime()
            ? "Active"
            : "Staled"}
      </TableCell>
      <TableCell align="center">
        <DiscountActionsButton discount={dc} />
      </TableCell>
    </TableRow>
  );
}
