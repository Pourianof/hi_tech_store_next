import { ReactNode } from "react";
import { Label } from "./label";

export function InputBox({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-0.5 grow">{children}</div>;
}

export function LabeldInput({
  children,
  label,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <InputBox>
      <Label>{label}</Label>
      {children}
    </InputBox>
  );
}
