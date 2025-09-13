export function PageTitle({
  description,
  title,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-xl mb-1">{title}</h3>
      <span className="text-gray-500 text-sm">{description}</span>
    </div>
  );
}
