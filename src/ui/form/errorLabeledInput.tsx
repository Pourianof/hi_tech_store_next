import { captalize } from "@/lib/helpers/stringHelpers";
import { TextInput } from "./textInput";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { useEffect } from "react";

type RegisterOpts = RegisterOptions<FieldValues, string>;
export function ErrorLabeledInput(props: {
  placeholder: string;
  filedName: string;
  type: string;
  className?: string;
  initValue?: string;
  validationOptions?: Omit<RegisterOpts, "validate"> & {
    validate?: (
      val: string,
      otherFields: Record<string, string>
    ) => string | undefined | boolean;
  };
}) {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const errorMessage = errors[props.filedName]?.message;
  if (props.validationOptions?.validate) {
    const org = props.validationOptions.validate;
    props.validationOptions.validate = (value: string) => {
      const result = org(value as string, getValues());
      return result ? result : undefined;
    };
  }

  useEffect(() => {
    if (props.initValue) {
      setValue(props.filedName, props.initValue);
    }
  }, [setValue, props.filedName, props.initValue]);

  return (
    <div>
      <TextInput
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        {...register(props.filedName, {
          required: `${captalize(props.filedName)} field is required`,
          ...props.validationOptions,
        } as RegisterOpts)}
      />
      {!!errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage as string}</div>
      )}
    </div>
  );
}
