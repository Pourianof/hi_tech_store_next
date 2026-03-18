export function ColorInput({
  color: { code, name },
  hasSelected,
  onSelect,
}: {
  color: { name: string; code: string };
  hasSelected: boolean;
  onSelect(): void;
}) {
  return (
    <div className="text-center">
      <div
        className={
          "p-1 rounded-full border-4 " +
          (hasSelected ? "border-primary-blue-0c" : "border-neutral-300")
        }
      >
        <div
          className="w-8 aspect-square rounded-full cursor-pointer"
          style={{ backgroundColor: `#${code}` }}
          onClick={(e) => {
            e.preventDefault();
            onSelect();
          }}
        ></div>
      </div>
      <span
        className={"text-sm " + (hasSelected ? "text-primary-blue-0c" : "")}
      >
        {name}
      </span>
    </div>
  );
}
