import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { Caption } from "@/ui/theme/text/caption";

export function ProductScore({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  return (
    <Row
      className="gap-4px bg-primary-blue-06 text-white px-8px py-4px rounded-sm"
      centerV
    >
      <Icon className={`${className ?? "fill-white"}`} name="filled_star" />
      <Caption size="md">{`${score.toFixed(1)}`}</Caption>
    </Row>
  );
}
