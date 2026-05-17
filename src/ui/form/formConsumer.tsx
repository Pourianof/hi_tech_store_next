import { ReactNode } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";

type Props = {
  builder(formContext: UseFormReturn): ReactNode;
};

export function FormConsumer({ builder }: Props) {
  const formContext = useFormContext();

  return builder(formContext);
}
