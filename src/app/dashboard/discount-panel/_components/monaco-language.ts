import type * as monacoType from "monaco-editor";

export const LANG_ID = "ruleLang";

export function registerRuleLanguage(monaco: typeof monacoType) {
  try {
    monaco.languages.register({ id: LANG_ID });

    monaco.languages.setMonarchTokensProvider("ruleLang", {
      tokenizer: {
        root: [
          [/=>/, "keyword"],
          [/\|\||&&/, "operator"],
          [/==|!=|>|</, "operator"],
          [/\d+(?:\.\d+)?/, "number"],
          [/[a-zA-Z_][a-zA-Z0-9_]*/, "identifier"],
        ],
      },
    });
  } catch {
    // monaco may be unavailable in some server contexts; swallow safely
  }
}
