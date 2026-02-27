import {
  DiscountCondition,
  DiscountEntityProperty,
} from "@/core/models/discount";
import {
  DiscountConditionOperation,
  DiscountEntityProperyValueType,
} from "@/core/schemas/discountCodeSchema";
import { formatDate } from "@/lib/helpers/formatDate";
import { Column } from "@/ui/layouts/column";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export function DiscountConditionCollapse({
  conditions,
  isOpen,
}: {
  conditions: DiscountCondition[];
  isOpen: boolean;
}) {
  return (
    <TableRow sx={{ backgroundColor: "#adbddf" }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Conditions
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Target Criteria</TableCell>
                  <TableCell align="center">Comparation operator</TableCell>
                  <TableCell>Compared value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conditions.map((cond) => (
                  <DiscountConditionRow
                    condition={cond}
                    key={cond.discountConditionId}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

function DiscountConditionRow({ condition }: { condition: DiscountCondition }) {
  let op: string = "";
  let opName: string = "";

  function setOp(_op: string, _opName: string) {
    op = _op;
    opName = _opName;
  }

  const type = (condition.entityProperty as DiscountEntityProperty).type;
  const isDate = type == DiscountEntityProperyValueType.DATETIME;

  switch (condition.operation) {
    case DiscountConditionOperation.EQUAL:
      setOp("=", "Equal");
      break;

    case DiscountConditionOperation.GREATER_THAN:
      setOp(">", isDate ? "After" : "Greater than");

      break;

    case DiscountConditionOperation.GREATER_THAN_OR_EQUAL:
      setOp(">=", isDate ? "After" : "Greater than or equal");
      break;

    case DiscountConditionOperation.LESS_THAN:
      setOp("<", isDate ? "Before" : "Less than");
      break;

    case DiscountConditionOperation.LESS_THAN_OR_EQUAL:
      setOp("<=", isDate ? "Before" : "Less than or equal");
      break;

    case DiscountConditionOperation.CONTAINS:
      setOp("in", "Contains");
      break;
  }

  let value = condition.value;

  switch (type) {
    case DiscountEntityProperyValueType.DATETIME:
      value = formatDate(condition.value);
      break;
  }

  return (
    <TableRow>
      <TableCell>{condition.entityProperty.name}</TableCell>
      <TableCell align="center">
        <Column>
          <span className="font-semibold text-lg">{op}</span>
          <span className="text-sm text-gray-500">{opName}</span>
        </Column>
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}
