"use client";
import { FormHandlers, StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { ReactNode } from "react";

export function EditingFormFrame({
  children,
  title,
  onClose,
  onSubmit,
  onSubmitionSuccessful,
}: {
  children: ReactNode;
  title: string;
  onClose: VoidFunction;
} & FormHandlers) {
  return (
    <div className="p-2 rounded-2xl bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-neutral-44 text-h5 font-semibold">{title}</h3>
        <span
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <Icon name="close" />
        </span>
      </div>
      <StatefulForm
        onSubmit={onSubmit}
        onSubmitionSuccessful={onSubmitionSuccessful}
      >
        {children}
      </StatefulForm>
    </div>
  );
}
