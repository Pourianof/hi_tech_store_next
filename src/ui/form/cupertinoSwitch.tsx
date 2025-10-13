"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function CupertinoSwitch({ fieldName }: { fieldName: string }) {
  const [isChecked, setIsChecked] = useState(false);
  const { setValue } = useFormContext();

  useEffect(
    () => setValue(fieldName, isChecked),
    [setValue, isChecked, fieldName]
  );

  return (
    <label className="hover:cursor-pointer inline-block w-10">
      <input
        hidden
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          const input = e.target as HTMLInputElement;
          setIsChecked(input.checked);
        }}
      />
      <div
        className={`w-full relative aspect-video transition-colors duration-300 ${
          isChecked ? "bg-main-blue" : "bg-gray-neutral-b4"
        } rounded-full`}
      >
        <div
          className={`absolute top-1 bottom-1 transition-all duration-300 ${
            isChecked
              ? "left-full translate-x-[calc(-100%_-_var(--spacing)_*_1)]"
              : "left-1"
          } aspect-square bg-white rounded-full`}
        ></div>
      </div>
    </label>
  );
}
