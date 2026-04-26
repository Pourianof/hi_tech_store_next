import { Body } from "@/ui/theme/text/body";

export function DiscountLabel({ discount }: { discount: number }) {
  return (
    <Body
      size="md"
      className="absolute left-0 bg-secondary-fd text-secondary-f4 z-10 rounded-r-lg px-[6px] py-4px"
    >{`-${discount.toFixed(1)}%`}</Body>
  );
}
