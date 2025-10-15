import { ProblemDetailErrors } from "@/core/Dtos/AuthResult";

export function handleProblemDetailErrors({
  errors,
  keys,
  onMatched,
  handleUnmatched,
}: {
  errors: ProblemDetailErrors;
  keys: string[];
  onMatched: (key: string, errorMessage: string) => void;
  handleUnmatched: (items: { key: string; message: string }[]) => void;
}) {
  const unmatched: Parameters<typeof handleUnmatched>[0] = [];
  Object.keys(errors).forEach((key) => {
    const normalizedKey = key.toLowerCase();
    const k = keys.find((key) => normalizedKey.includes(key));
    if (k) {
      onMatched(k, errors![key as never as number][0] as unknown as string);
    } else {
      unmatched.push({ key, message: errors![key as never as number][0] });
    }
  });

  if (unmatched.length) {
    handleUnmatched(unmatched);
  }
}
