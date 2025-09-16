import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { ResultModel } from "@/core/models/resultModel";
import { handleProblemDetailErrors } from "@/lib/helpers/problemDetailsHelper";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import toast from "react-hot-toast";

export function StatefulForm(props: {
  onSubmit: (
    data: FieldValues,
    form: UseFormReturn
  ) => Promise<ResultModel | undefined>;
  onSubmitionSuccessful: (result: Record<string, unknown>) => void;
  children: ReactNode;
}) {
  const methods = useForm();

  async function submitHandler(data: FieldValues) {
    const result = await props.onSubmit(data, methods);
    if (!result) {
      return;
    }
    if (result.status === "failed") {
      const error = result.data as ProblemDetails;
      const problemErrors = error.errors;
      if (problemErrors && Object.keys(problemErrors).length) {
        handleProblemDetailErrors({
          errors: problemErrors,
          keys: ["title", "price", "description", "media"],
          onMatched(key, message) {
            methods.setError(key, { message });
          },
        });
      } else {
        toast.error(
          error.detail ?? error.title ?? "No error message defined.",
          { duration: 4000 }
        );
      }
      return;
    }

    props.onSubmitionSuccessful(result.data as Record<string, unknown>);
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

StatefulForm.ResetButton = function ResetButton(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return <button {...props} type="reset"></button>;
};
