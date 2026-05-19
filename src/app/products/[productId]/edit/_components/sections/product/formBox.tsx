import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function FormBox(props: Props) {
  return (
    <div
      {...props}
      className={twMerge(
        "border border-gray-200 p-8 rounded-lg",
        props.className ?? "",
      )}
    />
  );
}
