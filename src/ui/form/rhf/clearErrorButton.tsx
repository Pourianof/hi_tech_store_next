import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

export function ClearErrorsButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { clearErrors } = useFormContext();

  return (
    <button
      className={[
        "bg-green-700 p-4 rounded-lg fixed right-4 bottom-4 z-10 hover:cursor-pointer hover:bg-green-800 text-white",
        className,
      ].join(" ")}
      onClick={(e) => {
        e.preventDefault();
        clearErrors();
      }}
    >
      {children ? children : "Clear Form Errors"}
    </button>
  );
}
