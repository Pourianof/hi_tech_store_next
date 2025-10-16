import { useFormContext } from "react-hook-form";

export function ErrorMessageLabel({ fieldName }: { fieldName: string }) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMesage = errors[fieldName]?.message as string;

  if (!errorMesage) {
    return null;
  }

  return <div className="text-red-500 text-sm">{errorMesage}</div>;
}
