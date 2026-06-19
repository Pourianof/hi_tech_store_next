"use client";
import { createContext, ReactNode } from "react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../contexts/useAppContext";

interface RadioButtonInputProps {
  name: string;
  value?: unknown;
  onSelect?: (options: { name: string; value: unknown }) => void;
  onChange?: (state: boolean) => void;
  size?: "big" | "normal";
  disabled?: boolean;
}

interface RadioButtonProps extends RadioButtonInputProps {
  label: string | ReactNode;
  containerClassName?: string;
}

export function RadioButton({
  label,
  containerClassName,
  ...props
}: RadioButtonProps) {
  return (
    <label
      className={twMerge(
        "flex",
        props.disabled ? "text-neutral-500" : "",
        containerClassName ?? "",
      )}
    >
      <div className="self-baseline">
        <RadioButtonInput {...props} />
      </div>
      {label}
    </label>
  );
}

function RadioButtonInput({
  name,
  onSelect,
  size,
  value,
  disabled,
}: RadioButtonInputProps) {
  return (
    <>
      <input
        disabled={disabled}
        hidden
        className="
                [&:checked+span]:border-primary-blue-400 [&:checked+span]:before:block 
               [&:checked+span]:after:block"
        type="radio"
        name={name}
        onChange={() => {
          onSelect?.({ name, value });
        }}
      />
      <span
        className={twMerge(
          `
                align-middle me-1 inline-block relative items-center border-[2px] ${
                  size == "normal" ? "w-[16px] " : "w-[20px] "
                }
                aspect-square rounded-full border-gray-neutral-44  
               
                before:hidden
                ${
                  size == "normal" ? "before:w-[8px]" : "before:w-[12px]"
                } before:aspect-square before:absolute
                before:top-1/2 before:left-1/2  before:-translate-1/2
                before:bg-primary-blue-400 before:rounded-full
                
                after:hidden
                ${
                  size == "normal" ? "after:w-[16px]" : "after:w-[20px]"
                } after:aspect-square after:absolute
                after:top-1/2 after:left-1/2  after:-translate-1/2
                after:rounded-full
                after:bg-sky-400
                after:opacity-75
                after:animate-ping
                after:[animation-iteration-count:1]
                after:[animation-fill-mode:forwards]
                `,
          disabled ? "border-neutral-500" : "",
        )}
      ></span>
    </>
  );
}

interface RadioButtonContextModel {
  select: (value: object) => void;
  value?: object;
  name: string;
}

const RadioButtonContext = createContext<RadioButtonContextModel>(
  {} as unknown as RadioButtonContextModel,
);

export function ControlledRadioButtonGroup({
  children,
  fieldName,
  required,
}: {
  children: ReactNode;
  fieldName: string;
  required?: boolean | string;
}) {
  return (
    <Controller
      name={fieldName}
      rules={{
        required,
      }}
      render={({ field: { value, onChange } }) => (
        <RadioButtonContext.Provider
          value={{
            select: onChange,
            value,
            name: fieldName,
          }}
        >
          {children}
        </RadioButtonContext.Provider>
      )}
    />
  );
}

export function ControlledRadioButton(
  props: Omit<RadioButtonProps, "onChange" | "name">,
) {
  const { select, name } = useAppContext(RadioButtonContext);

  return (
    <RadioButton
      {...props}
      name={name}
      onSelect={(val) => select(val.value as object)}
    />
  );
}
