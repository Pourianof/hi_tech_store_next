"use client";
import Icon, { IconNames } from "@/ui/icons/icon";

export interface EditableInputProps {
  iconName?: IconNames;
  label?: string;
  value?: string | null;
  onEdit?: VoidFunction;
}

export function EditableInput({
  label: title,
  value,
  iconName,
  onEdit,
}: EditableInputProps) {
  return (
    <div className="text-sm text-gray-500">
      <label className="ms-3 text-[0.7rem]">{title}</label>
      <div className="bg-gray-100 p-2 rounded grid grid-cols-[auto_1fr_auto] items-center gap-1">
        {!!iconName && <Icon name={iconName} />}
        <span className="overflow-hidden">
          <input
            className="max-w-full text-ellipsis"
            disabled
            value={value ?? ""}
            type="text"
            readOnly={true}
          />
        </span>
        <span
          onClick={(e) => {
            if (!onEdit) {
              return;
            }
            e.preventDefault();
            onEdit();
          }}
        >
          <Icon name="edit" className="hover:cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
