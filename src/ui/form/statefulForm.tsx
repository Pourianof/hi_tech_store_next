"use client";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { ResultModel } from "@/core/models/resultModel";
import { handleProblemDetailErrors } from "@/lib/helpers/problemDetailsHelper";
import {
  BaseSyntheticEvent,
  ButtonHTMLAttributes,
  createContext,
  DetailedHTMLProps,
  ReactNode,
  useContext,
  useState,
} from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import toast from "react-hot-toast";
import { NoContextDefinedError } from "../errors/NoContextDefinedError";
import { useRhfDevTool } from "rhf-devtools";

interface IFormSubmitterContext {
  submit: VoidFunction;
  isSubmitting: boolean;
}
const FormSubmitterContext = createContext<IFormSubmitterContext>(
  {} as unknown as IFormSubmitterContext,
);

StatefulForm.SuccessSubmit = async function (
  data: unknown,
): Promise<ResultModel> {
  return { data, status: "success", statusCode: 200 };
};

export type FormSubmitter<T = FieldValues> = (
  data: T,
  form: UseFormReturn,
) => Promise<ResultModel | undefined>;

export type FormError = {
  message: string;
  path: string;
};

type ValidationResult<T> = { validData?: T; errors?: FormError[] } | undefined;
export type FormValidator<T> = (
  data: FieldValues,
) => Promise<ValidationResult<T>> | ValidationResult<T>;

export type FormSuccessSubmitHandler = (
  result: Record<string, unknown>,
) => void;

export type FormHandlers<T> = {
  onSubmit: FormSubmitter<T>;
  onSubmitionSuccessful: FormSuccessSubmitHandler;
  onValidation?: FormValidator<T>;
};

export function StatefulForm<T>(
  props: {
    children: ReactNode;
    formName?: string;
    shouldUnregister?: boolean;
    defaultValues?: Record<string, unknown>;
    className?: string;
  } & FormHandlers<T>,
) {
  const methods = useForm({
    shouldUnregister: props.shouldUnregister,
    defaultValues: props.defaultValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useRhfDevTool(methods, props.formName);

  async function submitHandler(
    data: FieldValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event?: BaseSyntheticEvent<object, any, any>,
  ) {
    event?.stopPropagation();
    setIsSubmitting(true);

    let submittingData = data;

    if (props.onValidation) {
      const validationResult = await props.onValidation(data);

      if (validationResult?.errors) {
        const errors = validationResult?.errors;
        if (errors.length) {
          errors.forEach((err) =>
            methods.setError(err.path, { message: err.message }),
          );
          return;
        }
      }

      submittingData = validationResult?.validData ?? submittingData;
    }

    const result = await props.onSubmit(submittingData as T, methods);
    if (!result) {
      return;
    }
    if (result.status === "failed") {
      const error = result.data as ProblemDetails;
      const problemErrors = error.errors;
      if (problemErrors && Object.keys(problemErrors).length) {
        handleProblemDetailErrors({
          errors: problemErrors,
          keys: data,
          onMatched(key, message) {
            methods.setError(key, { message });
          },
          handleUnmatched(items) {
            toast.error(items.map((i) => `${i.key}: ${i.message}`).join("\n"));
          },
        });
      } else {
        toast.error(
          error.detail ?? error.title ?? "No error message defined.",
          { duration: 4000 },
        );
      }
      return;
    }

    await props.onSubmitionSuccessful(result.data as Record<string, unknown>);
    setIsSubmitting(true);
  }

  const submitter = methods.handleSubmit(submitHandler, (e) =>
    console.error(e, methods.getValues()),
  );
  return (
    <FormProvider {...methods}>
      <FormSubmitterContext.Provider
        value={{ submit: submitter, isSubmitting }}
      >
        <form
          className={["flex flex-col gap-2.5", props.className ?? ""].join(" ")}
          onSubmit={submitter}
        >
          {props.children}
        </form>
      </FormSubmitterContext.Provider>
    </FormProvider>
  );
}

StatefulForm.ResetButton = function ResetButton(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const { setValue, getValues } = useFormContext();
  const values = getValues();
  return (
    <button
      {...props}
      type="reset"
      onClick={(e) => {
        e.preventDefault();
        Object.entries(values).forEach(([key]) => {
          setValue(key, null);
        });
      }}
    ></button>
  );
};

export function useFormSubmitter() {
  const submitter = useContext(FormSubmitterContext);

  if (!submitter) {
    throw new NoContextDefinedError("FormSubmitterContext");
  }

  return submitter;
}

// This is helpful for nested forms which submitting inner forms
// lead to submit of outer forms.
StatefulForm.Submitter = function Submitter({
  render,
}: {
  render: (submitter: VoidFunction, isSubmitting: boolean) => ReactNode;
}) {
  const submitter = useFormSubmitter();
  const { trigger } = useFormContext();
  if (!submitter) {
    throw new NoContextDefinedError("submitter");
  }

  async function handleSubmission() {
    const isValid = await trigger();
    if (isValid) submitter.submit();
  }

  return render(handleSubmission, submitter.isSubmitting);
};
