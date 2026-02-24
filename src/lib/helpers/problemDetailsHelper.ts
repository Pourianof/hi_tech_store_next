import { ProblemDetailErrors } from "@/core/Dtos/AuthResult";

function geMatchedPathOnObject(
  obj: unknown,
  path: string[],
): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  const matchedPath: string[] = [];

  for (const key of path) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return;
    }

    const matchedKey = Object.keys(current).find(
      (k) => k.toLowerCase() === key.toLowerCase(),
    );

    if (!matchedKey) {
      return;
    }

    current = current[matchedKey];
    matchedPath.push(matchedKey);
  }

  return matchedPath.join(".");
}

export function handleProblemDetailErrors({
  errors,
  keys,
  onMatched,
  handleUnmatched,
}: {
  errors: ProblemDetailErrors;
  keys: string[] | { [key: string]: unknown };
  onMatched: (key: string, errorMessage: string) => void;
  handleUnmatched: (items: { key: string; message: string }[]) => void;
}) {
  const unmatched: Parameters<typeof handleUnmatched>[0] = [];
  Object.keys(errors).forEach((key) => {
    const normalizedKey = convertPathToRHS(key);
    let _key: string | undefined;
    if (Array.isArray(keys)) {
      _key = keys.find((key) =>
        normalizedKey.toLocaleLowerCase().includes(key),
      );
    } else {
      _key = geMatchedPathOnObject(keys, normalizedKey.split("."));
    }

    if (_key) {
      onMatched(_key, errors![key as never as number][0] as unknown as string);
    } else {
      unmatched.push({
        key: normalizedKey,
        message: errors![key as never as number][0],
      });
    }
  });

  if (unmatched.length) {
    handleUnmatched(unmatched);
  }
}

function convertPathToRHS(path: string) {
  const rhsPath = path
    .replace(/\[(\d+)\]/gi, `.$1`) // replace prop[num] to pop.num
    .replace(/^(\$\.)/gi, ""); // replace $.prop to prop

  return rhsPath;
}
