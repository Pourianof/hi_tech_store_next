import { captalize } from "@/lib/helpers/stringHelpers";
import { TextInput } from "./textInput";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { ErrorMessageLabel } from "./errorMessageLabel";

type RegisterOpts = RegisterOptions<FieldValues, string>;
export function ErrorLabeledInput(props: {
  placeholder: string;
  filedName: string;
  type: string;
  className?: string;
  initValue?: string | number;
  hidden?: boolean;
  name?: string;
  validationOptions?: Omit<RegisterOpts, "validate"> & {
    validate?: (
      val: string,
      otherFields: Record<string, string>
    ) => string | undefined | boolean;
  };
  onChange?: (newValue: string) => void;
}) {
  const { register, getValues, setValue, resetField } = useFormContext();

  useEffect(() => {
    if (props.initValue) {
      setValue(props.filedName, props.initValue);
    }

    return () => {
      resetField(props.filedName);
    };
  }, [setValue, props.filedName, props.initValue, resetField]);

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

  return (
    <div>
      <TextInput
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        {...register(props.filedName, {
          required: `${captalize(props.filedName)} field is required`,
          ...props.validationOptions,
          onChange: (event) => props.onChange?.(event.target.value as string),
        } as RegisterOpts)}
      />
      <ErrorMessageLabel fieldName={props.filedName} name={props.name} />
    </div>
  );
}
