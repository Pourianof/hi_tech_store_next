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

export function DiscountListTable({
  pagedDiscounts,
}: {
  pagedDiscounts: PagedResults<DiscountCode>;
}) {
  const {
    query: { data: discountCodes, isLoading },
    page,
    nextPage,
    previousPage,
  } = usePagedDiscountCodes({
    initialData: pagedDiscounts,
  });

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
            <TableCell>Code</TableCell>
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
