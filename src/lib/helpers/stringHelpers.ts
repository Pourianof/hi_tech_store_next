export function captalize(text?: string) {
  if (!text || !text.length) {
    return text;
  }

  return `${text.at(0)!.toUpperCase()}${text.substring(1)}`;
}
