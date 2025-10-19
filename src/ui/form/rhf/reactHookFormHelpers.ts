import { FieldErrors, FieldValues } from "react-hook-form";

export function getMessageFromErrors(
  fieldName: string,
  errors: FieldErrors<FieldValues>,
  name?: string
) {
  let error = errors;
  const fieldPathParts = fieldName.split(".");

  fieldPathParts.every((subFieldPath) => {
    const index = parseInt(subFieldPath);
    const path = Number.isInteger(index) ? index : subFieldPath;

    if (error[path]) {
      error = error[path] as FieldErrors<FieldValues>;
      return true;
    }

    return false;
  });

  const fieldErrorName = name ?? fieldPathParts.at(-1);
  let errorMessage = error?.message as unknown as string | undefined;
  if (fieldErrorName && errorMessage)
    errorMessage = errorMessage.replace(
      new RegExp(fieldName, "i"),
      fieldErrorName!
    );

  return errorMessage;
}
