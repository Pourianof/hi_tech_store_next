import { FieldValues } from "react-hook-form";

export function convertFieldValuesToFormData(values: FieldValues) {
  const formData = new FormData();
  for (const [key, val] of Object.entries(values)) {
    if (!(val instanceof File) && typeof val == "object") {
      formData.append(key, JSON.stringify(val));
    } else if (typeof val == "undefined") {
      // formData.append(key, null);
    } else {
      formData.append(key, val);
    }
  }

  return formData;
}
