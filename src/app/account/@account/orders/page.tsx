import { getUserOrdersAction } from "@/lib/server_actions/orderActions";
import { PageTitle } from "../../_components/pageTitle";
import { OrderRow } from "./_components/orderRow";
import { Column } from "@/ui/layouts/column";

export default async function DashboardOrdersPage() {
  const ordersResult = await getUserOrdersAction();

  if (ordersResult.status == "failed") {
    return (
      <div>
        <h1>There is some problem with fetching orders</h1>
        <div>
          <h2>{ordersResult.data.title}</h2>
          {!!ordersResult.data.detail && <p>{ordersResult.data.detail}</p>}
        </div>
      </div>
    );
  }

  const orders = ordersResult.data;

  return (
    <div>
      <PageTitle
        title="Order History"
        description="Track, return or purchase items"
      />
      <Column className="gap-24px">
        {orders.map((order) => (
          <OrderRow key={order.orderId} order={order} />
        ))}
      </Column>
    </div>
  );
}
