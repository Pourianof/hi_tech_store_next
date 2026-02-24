import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { ReactNode } from "react";
import { Column } from "../layouts/column";
import { AppController, AppControllerProps } from "./appController";
import { ErrorMessageLabel } from "./errorMessageLabel";

type Props = {
  children: ReactNode;
  label?: string;
  selectLabel?: string;
  selectProps?: SelectProps;
  control?: {
    syncWithFormState?: boolean;
    onChange: (value: unknown) => void;
    value?: unknown;
  };
} & Omit<AppControllerProps, "render">;

export function ControlledSelect({
  label,
  children,
  selectLabel,
  selectProps,
  control,
  ...props
}: Props) {
  const selectInput = (
    onChange?: (value: unknown) => void,
    value?: unknown,
  ) => (
    <FormControl>
      {label && <InputLabel id={props.fieldname}>{label}</InputLabel>}
      <Select
        labelId={props.fieldname}
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
    <Column>
      <AppController
        {...props}
        render={({ field: { value, onChange } }) =>
          selectInput(onChange, value)
        }
      />
      <ErrorMessageLabel fieldName={props.fieldname} />
    </Column>
  );
}
