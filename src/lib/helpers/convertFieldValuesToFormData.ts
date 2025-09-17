import { FieldValues } from "react-hook-form";

export function convertFieldValuesToFormData(values: FieldValues) {
  const formData = new FormData();
  for (const [key, val] of Object.entries(values)) {
    formData.append(key, val);
  }

  return formData;
}
