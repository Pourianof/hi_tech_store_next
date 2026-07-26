import { FailedBox } from "@/app/_components/failedBox";
import { getUserOrdersAction } from "@/lib/server_actions/orderActions";
import { PageTitle } from "../../_components/pageTitle";
import { OrderList } from "./_components/orderList";

export default async function DashboardOrdersPage() {
  const ordersResult = await getUserOrdersAction({ page: 1, limit: 10 });

  if (ordersResult.status == "failed") {
    return (
      <FailedBox
        title={`Fail to load orders - ${ordersResult.data.title}`}
        message={ordersResult.data.detail ?? ""}
      />
    );
  }

  return (
    <div>
      <PageTitle
        title="Order History"
        description="Track, return or purchase items"
      />
      <OrderList initialOrders={ordersResult.data} />
    </div>
  );
}
