import { Controller, ControllerProps } from "react-hook-form";

export type AppControllerProps = {
  fieldname: string;
  defaultValue?: unknown;
  conrollerProps?: ControllerProps;
  required?: boolean;
  render: ControllerProps["render"];
};

export function AppController({
  fieldname,
  defaultValue,
  render,
  conrollerProps,
  required,
}: AppControllerProps) {
  const lastWordFieldname = fieldname
    .split(".")
    .findLast((fn) => Number.isNaN(+fn));
  return (
    <Controller
      {...conrollerProps}
      name={fieldname}
      defaultValue={defaultValue}
      render={render}
      rules={
        required ? { required: `${lastWordFieldname} is required` } : undefined
      }
    />
  );
}
