export function DiscountLabel({ discount }: { discount: number }) {
  return (
    <span className="absolute left-0 text-xs bg-orange-200 text-orange-500 z-10 rounded-r-lg px-1 py-0.5">{`-${discount}%`}</span>
  );
}
