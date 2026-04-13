"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  TablePaginationActions,
  CircularProgress,
} from "@mui/material";
import { DiscountCodeRow } from "./discountCodeRow";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { DiscountCode } from "@/core/models/discount";
import { usePagedDiscountCodes } from "./hooks/usePagedDiscountCodes";
import { FailedBox } from "@/app/_components/failedBox";
import { useDiscountTypeContext } from "../../_components/context/discountTypeContext";
import { DiscountType } from "@/core/Dtos/discountCodeDto";

export const QUERY_KEY_DISCOUNT_CODE_PAGED = "discount-codes";
export const QUERY_KEY_DISCOUNT_PAGED = "discount";

export function DiscountListTable({
  pagedDiscounts,
}: {
  pagedDiscounts: PagedResults<DiscountCode>;
}) {
  const { isDiscountCodeForm } = useDiscountTypeContext();
  const {
    query: { data: discountCodes, isLoading },
    page,
    nextPage,
    previousPage,
  } = usePagedDiscountCodes({
    initialData: pagedDiscounts,
    key: isDiscountCodeForm
      ? QUERY_KEY_DISCOUNT_CODE_PAGED
      : QUERY_KEY_DISCOUNT_PAGED,
  });

  const { category } = useDiscountTypeContext();

  if (!discountCodes && !isLoading) {
    return (
      <FailedBox
        title="Some problem with loading discount codes"
        message="Reload page and if the error maintained so try again later"
      />
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {category == DiscountType.Codes ? "Code" : "Id"}
            </TableCell>
            <TableCell>Start time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Rules</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <TableBody>
              {discountCodes!.items.map((dc, i) => (
                <DiscountCodeRow key={dc.discountCodeId + i} discount={dc} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={7}
                  count={discountCodes!.totalCount}
                  rowsPerPage={discountCodes!.pageSize}
                  page={discountCodes!.pageNumber - 1}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={(e, p) => {
                    if (p > page - 1) {
                      nextPage();
                    } else {
                      previousPage();
                    }
                  }}
                  onRowsPerPageChange={() => {}}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
    </TableContainer>
  );
}
