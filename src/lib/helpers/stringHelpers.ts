export function captalize(text?: string) {
  if (!text || !text.length) {
    return text;
  }

  return `${text.at(0)!.toUpperCase()}${text.substring(1)}`;
}

export function isTwoStringEqual(str1: string, str2: string) {
  return str1.toLowerCase().trim() == str2.toLocaleLowerCase().trim();
}
