import { captalize } from "@/lib/helpers/stringHelpers";
import { TextInput } from "./textInput";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { useEffect } from "react";

type RegisterOpts = RegisterOptions<FieldValues, string>;
export function ErrorLabeledInput(props: {
  placeholder: string;
  filedName: string;
  type: string;
  className?: string;
  initValue?: string | number;
  hidden?: boolean;
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
    resetField,
  } = useFormContext();

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

  const { filedName } = props;

  let error = errors;
  const fieldPathParts = filedName.split(".");

  fieldPathParts.every((subFieldPath) => {
    const index = parseInt(subFieldPath);
    const path = Number.isInteger(index) ? index : subFieldPath;

    if (error[path]) {
      error = error[path] as FieldErrors<FieldValues>;
      return true;
    }

    return false;
  });

  const fieldErrorName = fieldPathParts.at(-1);
  let errorMessage = error?.message as unknown as string;
  if (fieldErrorName && errorMessage)
    errorMessage = errorMessage.replace(
      new RegExp(props.filedName, "i"),
      fieldErrorName!
    );

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
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </div>
  );
}
