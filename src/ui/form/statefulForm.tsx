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

interface IFormSubmitterContext {
  submitter: VoidFunction;
  isSubmitting: boolean;
}
const FormSubmitterContext = createContext<IFormSubmitterContext>(
  {} as unknown as IFormSubmitterContext
);

StatefulForm.SuccessSubmit = async function (
  data: unknown
): Promise<ResultModel> {
  return { data, status: "success", statusCode: 200 };
};

export type FormSubmitter = (
  data: FieldValues,
  form: UseFormReturn
) => Promise<ResultModel | undefined>;

export type FormSuccessSubmitHandler = (
  result: Record<string, unknown>
) => void;

export type FormHandlers = {
  onSubmit: FormSubmitter;
  onSubmitionSuccessful: FormSuccessSubmitHandler;
};

export function StatefulForm(
  props: {
    children: ReactNode;
    shouldUnregister?: boolean;
  } & FormHandlers
) {
  const methods = useForm({ shouldUnregister: props.shouldUnregister });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitHandler(
    data: FieldValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event?: BaseSyntheticEvent<object, any, any>
  ) {
    event?.stopPropagation();
    setIsSubmitting(true);
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
          keys: Object.keys(data).map((key) => key.toLowerCase()),
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
          { duration: 4000 }
        );
      }
      return;
    }

    await props.onSubmitionSuccessful(result.data as Record<string, unknown>);
    setIsSubmitting(true);
  }

  const submitter = methods.handleSubmit(submitHandler, (e) =>
    console.error(e, methods.getValues())
  );
  return (
    <FormProvider {...methods}>
      <FormSubmitterContext.Provider value={{ submitter, isSubmitting }}>
        <form className="flex flex-col gap-2.5" onSubmit={submitter}>
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
  >
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

// This is helpful for nested forms which submitting inner forms
// lead to submit of outer forms.
StatefulForm.Submitter = function Submitter({
  render,
}: {
  render: (submitter: VoidFunction, isSubmitting: boolean) => ReactNode;
}) {
  const submitter = useContext(FormSubmitterContext);
  const { trigger } = useFormContext();
  if (!submitter) {
    throw new NoContextDefinedError("submitter");
  }

  async function handleSubmission() {
    const isValid = await trigger();
    if (isValid) submitter.submitter();
  }

  return render(handleSubmission, submitter.isSubmitting);
};
