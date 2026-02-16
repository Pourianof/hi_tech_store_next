import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { ReactNode } from "react";
import { Controller, ControllerProps } from "react-hook-form";

type Props = {
  fieldname: string;
  children: ReactNode;
  label?: string;
  selectLabel?: string;
  defaultValue?: unknown;
  conrollerProps?: ControllerProps;
  selectProps?: SelectProps;
  control?: {
    syncWithFormState?: boolean;
    onChange: (value: unknown) => void;
    value?: unknown;
  };
};

export function ControlledSelect({
  fieldname,
  label,
  children,
  defaultValue,
  selectLabel,
  conrollerProps,
  selectProps,
  control,
}: Props) {
  const selectInput = (
    onChange?: (value: unknown) => void,
    value?: unknown,
  ) => (
    <FormControl>
      {label && <InputLabel id={fieldname}>{label}</InputLabel>}
      <Select
        labelId={fieldname}
        value={value ?? ""}
        size="small"
        onChange={(changeContext) => {
          onChange?.(changeContext.target.value);
          control?.onChange(changeContext.target.value);
        }}
        label={selectLabel}
        {...selectProps}
      >
        {children}
      </Select>
    </FormControl>
  );

  if (control && !control.syncWithFormState) {
    return selectInput(undefined, control.value);
  }

  return (
    <Controller
      {...conrollerProps}
      name={fieldname}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => selectInput(onChange, value)}
    />
  );
}
