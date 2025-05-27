import { ReactNode } from "react";

export function ItemsListBox(props: {
  label: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-2 border-b-2">
        <span className="font-semibold text-lg">{props.label}</span>
        {!!props.linkLabel?.trim() && (
          <span className="text-sm">{props.linkLabel}</span>
        )}
      </div>
      <div>{props.children}</div>
    </div>
  );
}
