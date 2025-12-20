import { getUserOrders } from "@/api/orderApi";
import { workWithSession } from "../helpers/sessionHelper";

export function getUserOrdersAction() {
  return workWithSession(async ({ apiToken }) => await getUserOrders(apiToken));
}
