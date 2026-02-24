import { FieldErrors, FieldValues } from "react-hook-form";

export function getMessageFromErrors(
  fieldName: string,
  errors: FieldErrors<FieldValues>,
  name?: string,
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
      fieldErrorName!,
    );

  return errorMessage;
}

export function flatAllErrors(
  errors: FieldErrors<FieldValues>,
  data: FieldValues,
): string[] {
  const messages: string[] = [];

  function traverse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorsObj: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataObj: Record<string, any>,
  ): void {
    if (!dataObj || typeof dataObj !== "object") return;

    if (errorsObj?.message && typeof errorsObj.message === "string") {
      messages.push(errorsObj.message);
      return;
    }

    for (const key in dataObj) {
      if (dataObj.hasOwnProperty(key)) {
        const errorValue = errorsObj?.[key];
        const dataValue = dataObj[key];

        if (!errorValue) continue;

        if (Array.isArray(dataValue) && Array.isArray(errorValue)) {
          for (let i = 0; i < dataValue.length; i++) {
            traverse(errorValue[i], dataValue[i]);
          }
        } else if (
          typeof dataValue === "object" &&
          dataValue !== null &&
          !Array.isArray(dataValue)
        ) {
          traverse(errorValue, dataValue);
        } else {
          if (errorValue?.message && typeof errorValue.message === "string") {
            messages.push(errorValue.message);
          }
        }
      }
    }
  }

  traverse(errors, data);
  return messages;
}
