import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function TextInput(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input className="border p-2 rounded w-full" {...props} />;
}
