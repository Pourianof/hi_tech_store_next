export function parseNumberOrUndefined(value?: string): number | undefined {
  const number = Number(value);
  const isValid = Number.isFinite(number);

  return isValid ? number : undefined;
}
