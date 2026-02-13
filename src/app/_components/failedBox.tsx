export function FailedBox({
  message,
  title,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="p-6 bg-red-300 mx-4 rounded-xl text-stone-800">
      <h3 className="font-bold text-xl my-2">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}
