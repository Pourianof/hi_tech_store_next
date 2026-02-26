"use client";
import { DiscountCode } from "@/core/models/discount";
import { formatDate } from "@/lib/helpers/formatDate";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { DiscountActionsButton } from "./discountActionsButton";
import { useDiscountCode } from "./hooks/useDiscountCode";
import Icon from "@/ui/icons/icon";

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
      <TableCell>
        <IconButton>
          <Icon name="eye" />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <DiscountActionsButton discount={dc} />
      </TableCell>
    </TableRow>
  );
}
