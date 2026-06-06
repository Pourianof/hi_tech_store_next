// Iplemented with help of AI Agents and ChatGPT
/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as monacoType from "monaco-editor";
import monaco from "monaco-editor";
import { LANG_ID, registerRuleLanguage } from "./monaco-language";

const modelContexts = new WeakMap<monaco.editor.ITextModel, any>();

export function attachContext(
  editor: monaco.editor.IStandaloneCodeEditor,
  context: any,
) {
  const model = editor.getModel();

  if (model) {
    modelContexts.set(model, context);
  }
}

function getLambdaParameterName(typeName: string) {
  return typeName ? typeName[0].toLowerCase() + typeName.slice(1) : "item";
}

function getCompletionContext(text: string) {
  const trimmed = text.replace(/\s+$/, "");
  if (!trimmed) return null;

  const trailingDot = trimmed.endsWith(".");
  const source = trailingDot ? trimmed.slice(0, -1) : trimmed;
  const match = source.match(/([A-Za-z_][A-Za-z0-9_.]*)$/);
  if (!match) return null;

  const path = match[1]
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  return path.length
    ? {
        path,
        trailingDot,
      }
    : null;
}

function getLambdaCompletionContext(text: string) {
  const cleaned = text.replace(/\r?\n/g, " ");
  const lambdaMatch = cleaned.match(
    /([A-Za-z0-9_.]+)\.(Any|All|Count)\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*=>\s*([\s\S]*)$/,
  );
  if (!lambdaMatch) return null;

  return {
    arrayPath: lambdaMatch[1]
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean),
    methodName: lambdaMatch[2],
    paramName: lambdaMatch[3],
    bodyText: lambdaMatch[4],
  };
}

function resolveRoot(context: Record<string, any>, segment: string) {
  return Object.entries(context).find(
    ([k]) => k.toLowerCase() === segment.toLowerCase(),
  )?.[1];
}

function resolveTypePath(
  path: string[],
  context: any,
  preserveArrayOnLast = false,
) {
  let target: any = context;

  for (let index = 0; index < path.length; index += 1) {
    const segment = path[index];
    const isLastSegment = index === path.length - 1;

    if (target === context) {
      const root = resolveRoot(context, segment);

      if (root) {
        target = root;
        continue;
      }
    }
    if (!target || !target.properties) {
      return null;
    }

    const entry = Object.entries(target.properties).find(
      ([key]) => key.toLowerCase() === segment.toLowerCase(),
    );
    target = entry?.[1];
    if (!target) {
      return null;
    }

    if (target.kind === "array" && !(preserveArrayOnLast && isLastSegment)) {
      target = target.itemType;
    }
  }

  return target;
}

// function resolvePath(path: string[], context: any) {
//     let target = context;

//     for (const segment of path) {

//         if (target === context) {
//             target = context[segment];
//             continue;
//         }

//         if (!target?.properties)
//             return null;

//         target = target.properties[segment];

//         if (!target)
//             return null;
//     }

//     return target;
// }

let registered = false;

export function registerCompletionProvider(monaco: typeof monacoType) {
  if (registered) return;

  registered = true;

  try {
    registerRuleLanguage(monaco);

    monaco.languages.registerCompletionItemProvider(LANG_ID, {
      triggerCharacters: [".", "(", ">"],
      provideCompletionItems(model, position) {
        const context = modelContexts.get(model);

        if (!context) {
          return { suggestions: [] };
        }

        const text = model.getValue().slice(0, model.getOffsetAt(position));
        const lambdaContext = getLambdaCompletionContext(text);
        const suggestions: any[] = [];

        const addContextPropertySuggestions = (
          props: Record<string, any>,
          prefix: string,
          kind = monaco.languages.CompletionItemKind.Property,
        ) => {
          for (const key of Object.keys(props)) {
            if (!prefix || key.toLowerCase().startsWith(prefix.toLowerCase())) {
              suggestions.push({
                label: key,
                kind,
                insertText: key,
              });
            }
          }
        };

        const addRootSuggestions = (prefix: string) => {
          if (
            lambdaContext?.paramName &&
            (!prefix || lambdaContext.paramName.startsWith(prefix))
          ) {
            suggestions.push({
              label: lambdaContext.paramName,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: lambdaContext.paramName,
            });
          }

          addContextPropertySuggestions(context, prefix);
        };

        if (lambdaContext) {
          const itemArray = resolveTypePath(
            lambdaContext.arrayPath,
            context,
            true,
          );
          const itemType =
            itemArray?.kind === "array" ? itemArray.itemType : null;
          if (!itemType) {
            return { suggestions, incomplete: false };
          }

          const lambdaToken = getCompletionContext(lambdaContext.bodyText);
          if (!lambdaToken) {
            addRootSuggestions("");
            return { suggestions, incomplete: true };
          }

          const isParamAccess = lambdaToken.path[0] === lambdaContext.paramName;
          const prefix = lambdaToken.trailingDot
            ? ""
            : (lambdaToken.path[lambdaToken.path.length - 1] ?? "");

          if (!isParamAccess) {
            addRootSuggestions(prefix);
            return { suggestions, incomplete: true };
          }

          if (lambdaToken.path.length === 1 && !lambdaToken.trailingDot) {
            addRootSuggestions(prefix);
            return { suggestions, incomplete: true };
          }

          let target: any = itemType;
          const propertyPath = lambdaToken.path.slice(
            1,
            lambdaToken.trailingDot ? undefined : -1,
          );

          for (let index = 0; index < propertyPath.length; index += 1) {
            const segment = propertyPath[index];
            const isLastSegment = index === propertyPath.length - 1;

            if (!target || !target.properties) {
              target = null;
              break;
            }

            const entry = Object.entries(target.properties).find(
              ([key]) => key.toLowerCase() === segment.toLowerCase(),
            );
            target = entry?.[1] as any;
            if (!target) {
              break;
            }

            if (target.kind === "array") {
              if (isLastSegment && lambdaToken.trailingDot) {
                break;
              }
              target = target.itemType;
            }
          }

          if (!target) {
            return { suggestions, incomplete: false };
          }

          if (target.kind === "array") {
            const itemName = target.itemType?.name ?? "item";
            const lambdaParam = getLambdaParameterName(itemName);

            if (prefix) {
              for (const method of ["Any", "All", "Count"]) {
                if (method.toLowerCase().startsWith(prefix.toLowerCase())) {
                  suggestions.push({
                    label: method,
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: `${method}()`,
                  });

                  suggestions.push({
                    label: `${method}(predicate)`,
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: `${method}(\${1:${lambdaParam}} => \${1}.\${2:Property})`,
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    detail: `(${itemName}) => boolean`,
                  });
                }
              }
            } else {
              for (const method of ["Any", "All", "Count"]) {
                suggestions.push({
                  label: method,
                  kind: monaco.languages.CompletionItemKind.Method,
                  insertText: `${method}()`,
                });

                suggestions.push({
                  label: `${method}(predicate)`,
                  kind: monaco.languages.CompletionItemKind.Method,
                  insertText: `${method}(\${1:${lambdaParam}} => \${1}.\${2:Property})`,
                  insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
                  detail: `(${itemName}) => boolean`,
                });
              }
            }
          } else if (target.properties) {
            addContextPropertySuggestions(target.properties, prefix);
          }

          return {
            suggestions,
            incomplete: true,
          };
        }

        const statementStart = text.lastIndexOf(";");
        const statementText =
          statementStart === -1 ? text : text.slice(statementStart + 1);
        const contextInfo = getCompletionContext(statementText);

        if (!contextInfo) {
          for (const rootKey of Object.keys(context)) {
            suggestions.push({
              label: rootKey,
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: rootKey,
            });
          }

          return {
            suggestions,
            incomplete: false,
          };
        }

        const { path, trailingDot } = contextInfo;
        let target: any = context;
        let prefix = "";
        let resolvePath = path;

        if (!trailingDot) {
          prefix = path[path.length - 1] ?? "";
          resolvePath = path.slice(0, -1);
        }

        for (let index = 0; index < resolvePath.length; index += 1) {
          const segment = resolvePath[index];
          const isLastSegment = index === resolvePath.length - 1;

          if (target === context) {
            const root = resolveRoot(context, segment);

            if (root) {
              target = root;
              continue;
            }
          }

          if (!target || !target.properties) {
            target = null;
            break;
          }

          const entry = Object.entries(target.properties).find(
            ([key]) => key.toLowerCase() === segment.toLowerCase(),
          );
          target = entry?.[1] as any;
          if (!target) {
            break;
          }

          if (target.kind === "array") {
            if (isLastSegment && trailingDot) {
              // Keep the array itself when the user has typed the array property and a dot
              // so we can suggest array methods like Any/All/Count.
              break;
            }
            target = target.itemType;
          }
        }

        if (!target) {
          return { suggestions, incomplete: false };
        }

        const addPropertySuggestions = (props: Record<string, any>) => {
          for (const key of Object.keys(props)) {
            if (!prefix || key.toLowerCase().startsWith(prefix.toLowerCase())) {
              suggestions.push({
                label: key,
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: key,
              });
            }
          }
        };

        if (target === context) {
          for (const key of Object.keys(context)) {
            if (!prefix || key.toLowerCase().startsWith(prefix.toLowerCase())) {
              suggestions.push({
                label: key,
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: key,
              });
            }
          }
        } else if (target.kind === "array") {
          const itemName = target.itemType?.name ?? "item";
          const lambdaParam = getLambdaParameterName(itemName);

          if (prefix) {
            for (const method of ["Any", "All", "Count"]) {
              if (method.toLowerCase().startsWith(prefix.toLowerCase())) {
                // plain call
                suggestions.push({
                  label: method,
                  kind: monaco.languages.CompletionItemKind.Method,
                  insertText: `${method}()`,
                });

                // lambda snippet variant: Any(v => v.<prop>)
                suggestions.push({
                  label: `${method}(predicate)`,
                  kind: monaco.languages.CompletionItemKind.Method,
                  insertText: `${method}(\${1:${lambdaParam}} => \${1}.\${2:Property})`,
                  insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
                  detail: `(${itemName}) => boolean`,
                });
              }
            }
          } else {
            for (const method of ["Any", "All", "Count"]) {
              suggestions.push({
                label: method,
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: `${method}()`,
              });

              suggestions.push({
                label: `${method}(predicate)`,
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: `${method}(\${1:${lambdaParam}} => \${1}.\${2:Property})`,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: `(${itemName}) => boolean`,
              });
            }
          }
        } else if (target.properties) {
          addPropertySuggestions(target.properties);
        }

        return {
          suggestions,
          incomplete: true,
        };
      },
    });

    // Signature help: infer lambda parameter type for array methods
    monaco.languages.registerSignatureHelpProvider(LANG_ID, {
      signatureHelpTriggerCharacters: ["(", ","],
      provideSignatureHelp(model, position) {
        const context = modelContexts.get(model);

        if (!context) {
          return { dispose: () => {}, value: "" };
        }

        const text = model.getValue().slice(0, model.getOffsetAt(position));

        // look for pattern: <path>.<Method>(   e.g. Product.Variations.Any(
        const m = text.match(/([A-Za-z0-9_.]+)\.(Any|All|Count)\s*\([^)]*$/);
        if (!m) return { value: null, dispose: () => {} };

        const pathText = m[1];
        const methodName = m[2];

        // resolve type from context similar to completion logic
        const parts = pathText.split(".");
        let target: any = context;
        for (const part of parts) {
          if (!target) break;
          if (part.toLowerCase() === "product") {
            target = context.Product;
            continue;
          }
          if (!target.properties) {
            target = null;
            break;
          }
          const entry = Object.entries(target.properties).find(
            ([k]) => k.toLowerCase() === part.toLowerCase(),
          );
          target = entry?.[1];
          if (target && target.kind === "array") {
            // for signature we need item type
            // don't advance into itemType, keep array so itemType available below
          }
        }

        let itemName = "item";
        if (target && target.kind === "array" && target.itemType) {
          itemName = target.itemType.name || itemName;
        }

        const sig: any = {
          signatures: [
            {
              label: `${methodName}(predicate: (${itemName}) => boolean)`,
              parameters: [{ label: `predicate: (${itemName}) => boolean` }],
            },
          ],
          activeSignature: 0,
          activeParameter: 0,
        };

        return { value: sig, dispose: () => {} };
      },
    });
  } catch {
    // ignore when running outside client
  }
}
