import { FailedBox } from "@/app/_components/failedBox";
import { getProductColorsAction } from "@/lib/server_actions/productActions";
import { StaticDataInjector } from "@/ui/contexts/StaticDataInjector";
import { ReactNode } from "react";

export const COLORS_STATIC_DATA_KEY = "colors-static-data-key";

export async function AvailableProductColorInjector({
  children,
}: {
  children: ReactNode;
}) {
  const colorsResult = await getProductColorsAction();

  if (colorsResult.status == "failed") {
    return (
      <FailedBox
        title="Cannot fetch colors"
        message="Something went wrong on fetching available colors"
      />
    );
  }

  const colors = colorsResult.data;

  return (
    <StaticDataInjector data={colors} dataKey={COLORS_STATIC_DATA_KEY}>
      {children}
    </StaticDataInjector>
  );
}
