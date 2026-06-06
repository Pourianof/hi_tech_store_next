"use client";

import { ObjectType } from "@/lib/rule-lang/contextModel";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import Editor from "@monaco-editor/react";
import type * as monacoType from "monaco-editor";
import { Controller } from "react-hook-form";
import {
  attachContext,
  registerCompletionProvider,
} from "./completion-provider";

export default function RuleEditor({
  defaultValue,
  fieldname,
  readOnly,
  context,
}: {
  defaultValue?: string;
  fieldname: string;
  readOnly?: boolean;
  noPreview?: boolean;
  context: ObjectType["properties"];
}) {
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 13,
    quickSuggestions: { other: true, comments: true, strings: true },
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: "off" as const,
    tabCompletion: "on" as const,
  };

  const handleEditorMount = (
    editor: monacoType.editor.IStandaloneCodeEditor,
    monaco: typeof monacoType,
  ) => {
    attachContext(editor, context);
    registerCompletionProvider(monaco);
  };

  return (
    <Controller
      name={fieldname}
      defaultValue={defaultValue || ""}
      render={({ field: { value, onChange } }) => (
        <Column className="gap-2">
          <Row>
            <div style={{ flex: 1, height: 200 }}>
              <Editor
                defaultLanguage="ruleLang"
                theme="vs-dark"
                value={value ?? ""}
                onMount={handleEditorMount}
                onChange={(v) => onChange(v ?? "")}
                options={{ ...editorOptions, readOnly: !!readOnly }}
              />
            </div>
          </Row>
        </Column>
      )}
    />
  );
}
