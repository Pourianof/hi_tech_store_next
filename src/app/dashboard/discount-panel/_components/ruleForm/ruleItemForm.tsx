import { captalize } from "@/lib/utils/stringHelpers";
import { CheckboxItem, CheckboxList } from "@/ui/form/checkboxList";
import {
  FieldnamePathProvider,
  useFieldPath,
} from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { H4 } from "@/ui/theme/text/headers";
import { IconButton } from "@mui/material";
import { useState } from "react";
import RuleEditor from "../RuleEditor";
import { DISCOUNT_RULE_ACTION } from "./fieldNames";
import { RuleDiscountTypeAndValueInputs } from "./ruleDiscountTypeInputs";
import { FormInputBasedScriptResultPreviewButton } from "./scriptResultPreviewButton";
import {
  ProductEditorContext,
  UserEditorContext,
} from "@/lib/rule-lang/contextModel";
import { RowOnDesktopColumnOnMobile } from "@/ui/layouts/rownOnDesktopColumnOnMobile";

export function RuleItem({
  index,
  onDelete,
}: {
  index: number;
  onDelete(index: number): void;
}) {
  const ruleNameFieldName = useFieldPath(index, "name");
  const ruleDescriptionFieldName = useFieldPath(index, "description");

  return (
    <FieldnamePathProvider name={index}>
      <div className="bg-slate-100 p-2 rounded">
        <div className="my-2 flex justify-between">
          <span className="inline-block bg-blue-500 w-fit text-gray-neutral-f9 rounded px-1 py-2">
            Rule #{index + 1}
          </span>
          <IconButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
              onDelete(index);
            }}
          >
            <Icon name="trash" className="text-xl text-red-400" />
          </IconButton>
        </div>
        <Row className="gap-2">
          <LabeldInput label="Rule name">
            <ErrorLabeledInput
              filedName={ruleNameFieldName}
              placeholder="Rule name"
              type="text"
            />
          </LabeldInput>
          <LabeldInput label="Description">
            <ErrorLabeledInput
              filedName={ruleDescriptionFieldName}
              placeholder="Rule description"
              type="text"
            />
          </LabeldInput>
        </Row>
        <FieldnamePathProvider name={DISCOUNT_RULE_ACTION}>
          <RuleDiscountTypeAndValueInputs />
        </FieldnamePathProvider>
        <RuleScriptTabBox />
      </div>
    </FieldnamePathProvider>
  );
}

enum ScriptType {
  Product = "product",
  User = "user",
}

function RuleScriptTabBox() {
  const [includedScripts, setIncludedScripts] = useState<ScriptType[]>([]);
  const productScriptFieldName = useFieldPath("productScript");
  const userScriptFieldName = useFieldPath("userScript");

  const fieldNames = {
    [ScriptType.Product]: productScriptFieldName,
    [ScriptType.User]: userScriptFieldName,
  };

  return (
    <Column>
      <CheckboxList
        valueControl={{
          onChange(items) {
            setIncludedScripts(items as ScriptType[]);
          },
          value: includedScripts,
        }}
      >
        <Row>
          <CheckboxItem
            label={<span>Product script</span>}
            checkedValue={ScriptType.Product}
          />
          <CheckboxItem
            label={<span>User script</span>}
            checkedValue={ScriptType.User}
          />
        </Row>
      </CheckboxList>
      <Column className="gap-2">
        {includedScripts.sort().map((script) => {
          const isUserMode = script == ScriptType.User;
          return (
            <Column key={script}>
              <H4>{captalize(script)} script</H4>
              <RowOnDesktopColumnOnMobile>
                <div className="grow h-[200px]">
                  <RuleEditor
                    fieldname={fieldNames[script]}
                    noPreview={isUserMode}
                    context={
                      isUserMode
                        ? {
                            User: UserEditorContext,
                          }
                        : {
                            Product: ProductEditorContext,
                          }
                    }
                  />
                </div>
                {!isUserMode && (
                  <FormInputBasedScriptResultPreviewButton
                    fieldName={fieldNames[script]}
                  />
                )}
              </RowOnDesktopColumnOnMobile>
            </Column>
          );
        })}
      </Column>
    </Column>
  );
}
