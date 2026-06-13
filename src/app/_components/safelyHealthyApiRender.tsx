import { ReactNode } from "react";
import { FailedBox } from "./failedBox";
import { isHealthyApi } from "@/api/apiServerMisc";

export async function SafelyHealthyApiRender({
  children,
}: {
  children?: ReactNode;
}) {
  const isServerHealthy = await isHealthyApi();

  return isServerHealthy ? (
    children
  ) : (
    <FailedBox
      title="We are down"
      message="Server is not accessible for now. We will happy to see you soon some later"
    />
  );
}
