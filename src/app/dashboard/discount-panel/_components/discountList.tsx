import { FailedBox } from "@/app/_components/failedBox";
import { getAllDiscountsAction } from "@/lib/server_actions/discountActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DiscountCodeRow } from "./discountCodeRow";

export async function DiscountsList() {
  const discountCodeResult = await getAllDiscountsAction();

  if (discountCodeResult.status == "failed") {
    return (
      <FailedBox
        title={"Fail to load discount codes"}
        message={`${discountCodeResult.data.title} - ${discountCodeResult.data.detail}`}
      />
    );
  }

  const discountCodes = discountCodeResult.data;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Start time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discountCodes.map((dc, i) => (
            <DiscountCodeRow key={dc.discountCodeId + i} discount={dc} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
