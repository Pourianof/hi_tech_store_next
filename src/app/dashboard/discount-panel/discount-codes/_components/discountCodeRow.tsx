"use client";
import { DiscountCode } from "@/core/models/discount";
import { formatDate } from "@/lib/helpers/formatDate";
import Icon from "@/ui/icons/icon";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { DiscountActionsButton } from "./discountActionsButton";
import { DiscountRulesCollapse } from "./discountRuleCollapse";
import { useDiscountCode } from "./hooks/useDiscountCode";

export function DiscountCodeRow({ discount }: { discount: DiscountCode }) {
  const { data: dc } = useDiscountCode(discount.discountId, discount);
  const [isRuleOpen, setIsRuleOpen] = useState(false);

  if (!dc) {
    return;
  }

  return (
    <>
      <TableRow>
        <TableCell>{dc.code ?? `#${dc.discountId}`}</TableCell>
        <TableCell>{formatDate(dc.startTime)}</TableCell>
        <TableCell>{formatDate(dc.endTime)}</TableCell>
        <TableCell>{formatDate(dc.createdAt)}</TableCell>
        <TableCell>{dc.description}</TableCell>
        <TableCell>
          {dc.isDeactivated
            ? "Deactive"
            : Date.now() < new Date(dc.endTime).getTime()
              ? "Active"
              : "Staled"}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => setIsRuleOpen((o) => !o)}>
            <Icon name="eye" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <DiscountActionsButton discount={dc} />
        </TableCell>
      </TableRow>
      <DiscountRulesCollapse isOpen={isRuleOpen} rules={discount.rules} />
    </>
  );
}
