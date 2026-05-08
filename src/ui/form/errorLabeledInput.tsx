"use client";
import { captalize } from "@/lib/utils/stringHelpers";
import { useEffect } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessageLabel } from "./errorMessageLabel";
import { TextInput } from "./textInput";

type RegisterOpts = RegisterOptions<FieldValues, string>;
export function ErrorLabeledInput(props: {
  placeholder: string;
  filedName: string;
  type: string;
  className?: string;
  initValue?: string | number;
  hidden?: boolean;
  name?: string;
  isOptional?: boolean;
  validationOptions?: Omit<RegisterOpts, "validate"> & {
    validate?: (
      val: string,
      otherFields: Record<string, string>,
    ) => string | undefined | boolean;
  };
  onChange?: (newValue: string) => void;
}) {
  const { register, getValues, setValue, resetField, unregister } =
    useFormContext();

  useEffect(() => {
    if (props.initValue != undefined) {
      setValue(props.filedName, props.initValue);
    }
  }, [setValue, props.filedName, props.initValue, resetField]);

  useEffect(
    () => () => {
      unregister(props.filedName);
    },
    [props.filedName, unregister],
  );

  const isHidden = "hidden" in props && props.hidden !== false;

  if (isHidden) {
    return null;
  }

  if (props.validationOptions?.validate) {
    const org = props.validationOptions.validate;
    props.validationOptions.validate = (value: string) => {
      const result = org(value as string, getValues());
      return result ? result : undefined;
    };
  }

  const isOptional = "isOptional" in props && props.isOptional !== false;

  return (
    <div>
      <TextInput
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        {...register(props.filedName, {
          ...(isOptional
            ? {}
            : { required: `${captalize(props.filedName)} field is required` }),
          ...props.validationOptions,
        } as RegisterOpts)}
      />
      <ErrorMessageLabel fieldName={props.filedName} name={props.name} />
    </div>
  );
}
