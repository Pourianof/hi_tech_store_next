import { useFormContext } from "react-hook-form";
import { getMessageFromErrors } from "./rhf/reactHookFormHelpers";

export function ErrorMessageLabel({
  fieldName,
  name,
}: {
  fieldName: string;
  name?: string;
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = getMessageFromErrors(fieldName, errors, name);

  if (!errorMessage) {
    return null;
  }

  return <div className="text-red-500 text-sm">{errorMessage}</div>;
}
