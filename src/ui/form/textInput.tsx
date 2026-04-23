import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function TextInput(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <input
      {...props}
      className={`border p-2 rounded w-full outline-0 focus:border-black ${props.className ?? ""}`}
    />
  );
}
