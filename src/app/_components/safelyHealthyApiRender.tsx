import { ReactNode } from "react";
import { FailedBox } from "./failedBox";
import { isHealthyApi } from "@/api/apiServerMisc";
import { Column } from "@/ui/layouts/column";

export async function SafelyHealthyApiRender({
  children,
}: {
  children?: ReactNode;
}) {
  const isServerHealthy = await isHealthyApi();

  return isServerHealthy ? (
    children
  ) : (
    <Column center className="h-dvh w-dvw">
      <FailedBox
        title="We are down"
        message="Server is not accessible for now. We will happy to see you soon some later"
      />
    </Column>
  );
}
