"use client";

import { PagedResults } from "@/core/Dtos/pagedResult";
import { OrderWithProduct } from "@/core/models/order";
import { getUserOrdersAction } from "@/lib/server_actions/orderActions";
import { usePagedQuery } from "@/ui/contexts/pagedQuery";
import { Column } from "@/ui/layouts/column";
import { OrderRow } from "./orderRow";
import { CircularProgress } from "@mui/material";
import { Row } from "@/ui/layouts/row";
import { TextButton } from "@/ui/form/AppButtons";
import { Body } from "@/ui/theme/text/body";
import { FailedBox } from "@/app/_components/failedBox";

export function OrderList({
  initialOrders,
}: {
  initialOrders: PagedResults<OrderWithProduct>;
}) {
  const {
    query: { data, isLoading, error, isError },
    nextPage,
    previousPage,
    page,
  } = usePagedQuery(getUserOrdersAction, "orders", initialOrders);

  if (isLoading) {
    return (
      <Row center className="py-8">
        <CircularProgress size={15} />
      </Row>
    );
  }

  if (isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;

    return (
      <FailedBox
        title={err.message ?? err.title}
        message={err.cause ?? err.description}
      />
    );
  }

  const orders = data!.items;

  return (
    <Column>
      <Column className="gap-24px">
        {orders.map((order) => (
          <OrderRow key={order.orderId} order={order} />
        ))}
      </Column>
      <Row className="justify-between py-4">
        {data?.hasPrevious ? (
          <TextButton onClick={previousPage}>Previous</TextButton>
        ) : (
          <span></span>
        )}
        {<Body size="md">Page: {page}</Body>}
        {data?.hasNext ? (
          <TextButton onClick={nextPage}>Next</TextButton>
        ) : (
          <span></span>
        )}
      </Row>
    </Column>
  );
}
