import { DiscountRule } from "@/core/models/discount";
import { DiscountActionType } from "@/core/schemas/discountCodeSchema";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  IconButton,
} from "@mui/material";
import { DiscountConditionCollapse } from "./discountConditionCollapse";
import { useState } from "react";
import Icon from "@/ui/icons/icon";

export function DiscountRulesCollapse({
  isOpen,
  rules,
}: {
  isOpen: boolean;
  rules: DiscountRule[];
}) {
  return (
    <TableRow sx={{ backgroundColor: "#e6cccc" }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Discount Rules
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Discount Type</TableCell>
                  <TableCell>Discount Amout</TableCell>
                  <TableCell>Conditions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rules.map((rule) => (
                  <DiscountRuleRow key={rule.name} rule={rule} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

function DiscountRuleRow({ rule }: { rule: DiscountRule }) {
  const [isConditionOpen, setIsConditionOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>{rule.name}</TableCell>
        <TableCell>{rule.description}</TableCell>
        <TableCell>
          {rule.discountAction.type == DiscountActionType.FIXED
            ? "Dollar"
            : "Percentage"}
        </TableCell>
        <TableCell>{rule.discountAction.value}</TableCell>
        <TableCell>
          <IconButton onClick={() => setIsConditionOpen((o) => !o)}>
            <Icon name="eye" />
          </IconButton>
        </TableCell>
      </TableRow>
      <DiscountConditionCollapse
        conditions={rule.conditions[0].conditions}
        isOpen={isConditionOpen}
      />
    </>
  );
}
