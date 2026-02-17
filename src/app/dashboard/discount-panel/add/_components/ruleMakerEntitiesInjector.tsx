import { FailedBox } from "@/app/_components/failedBox";
import { getDiscountEntitiesAction } from "@/lib/server_actions/discountActions";
import { StaticDataInjector } from "@/ui/contexts/StaticDataInjector";

export const DISCOUNT_Entities_KEY = "discount-rules";

export async function RuleMakerEntitiesInjector({
  children,
}: {
  children: React.ReactNode;
}) {
  const discountEntitiesResult = await getDiscountEntitiesAction();

  if (discountEntitiesResult.status == "failed") {
    return (
      <FailedBox
        title="Displaying Failed"
        message="There is some problem to fetching discount options"
      />
    );
  }

  const discountEntities = discountEntitiesResult.data;
  return (
    <StaticDataInjector dataKey={DISCOUNT_Entities_KEY} data={discountEntities}>
      {children}
    </StaticDataInjector>
  );
}
