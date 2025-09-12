import { ProblemDetailErrors } from "@/core/Dtos/AuthResult";

export function handleProblemDetailErrors({
  errors,
  keys,
  onMatched,
}: {
  errors: ProblemDetailErrors;
  keys: string[];
  onMatched: (key: string, errorMessage: string) => void;
}) {
  Object.keys(errors).forEach((key) => {
    const normalizedKey = key.toLowerCase();
    const k = keys.find((key) => normalizedKey.includes(key));
    if (k) {
      onMatched(k, errors![key as never as number][0] as unknown as string);
    }
  });
}
