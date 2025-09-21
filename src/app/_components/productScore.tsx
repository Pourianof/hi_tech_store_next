import Icon from "@/ui/icons/icon";

export function ProductScore({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  return (
    <span className="space-x-1 flex items-center">
      <Icon className={`fill-blue-900 ${className ?? ""}`} name="filled_star" />
      <span>{`${score.toFixed(1)}`}</span>
    </span>
  );
}
