import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";

export function StatefulForm(props: {
  onSubmit: (data: FieldValues, form: UseFormReturn) => void;
  children: ReactNode;
}) {
  const methods = useForm();

  function submitHandler(data: FieldValues) {
    props.onSubmit(data, methods);
  }
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2.5"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        {props.children}
      </form>
    </FormProvider>
  );
}
