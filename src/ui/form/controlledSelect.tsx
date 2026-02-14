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
};

export function ControlledSelect({
  fieldname,
  label,
  children,
  defaultValue,
  selectLabel,
  conrollerProps,
  selectProps,
}: Props) {
  return (
    <Controller
      {...conrollerProps}
      name={fieldname}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <FormControl>
          {label && <InputLabel id={fieldname}>{label}</InputLabel>}
          <Select
            labelId={fieldname}
            value={value}
            size="small"
            onChange={(changeContext) => {
              onChange(changeContext.target.value);
            }}
            label={selectLabel}
            {...selectProps}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  );
}
