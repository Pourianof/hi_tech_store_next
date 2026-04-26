import Icon from "@/ui/icons/icon";
import { H6 } from "@/ui/theme/text/headers";

export function ProductScore({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  return (
    <span className="space-x-1 flex items-center">
      <Icon
        className={`fill-primary-blue-06 ${className ?? ""}`}
        name="filled_star"
      />
      <H6 className="text-primary-blue-06">{`${score.toFixed(1)}`}</H6>
    </span>
  );
}
