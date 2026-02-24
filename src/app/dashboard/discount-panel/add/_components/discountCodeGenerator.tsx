import {
  getDiscountCodeByNameAction,
  getRandomDiscountCodeAction,
} from "@/lib/server_actions/discountActions";
import { FilledButton, OutlinedButton } from "@/ui/form/AppButtons";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

enum CodeType {
  CUSTOM,
  RANDOM,
}

export function DiscountCodeGenerator() {
  const [codeType, setCodeType] = useState(CodeType.CUSTOM);

  return (
    <Column className="gap-2 my-2">
      <h4 className="font-semibold text-xl">Discount code:</h4>
      <LabeldInput label="Your custom code">
        <Row className="gap-2">
          <CustomCodeInput
            codeType={codeType}
            onChange={() => setCodeType(CodeType.CUSTOM)}
          />
          <GenerateRandomCodeButton
            onRegistered={() => setCodeType(CodeType.RANDOM)}
          />
        </Row>
      </LabeldInput>
      {codeType == CodeType.RANDOM && (
        <div className="text-sm bg-slate-300 p-1 rounded text-gray-700">
          Code generated randomly
        </div>
      )}
    </Column>
  );
}

const DISCOUNT_CODE_FIELDNAME = "code";
function CustomCodeInput({
  codeType,
  onChange,
}: {
  codeType: CodeType;
  onChange: VoidFunction;
}) {
  const { setError, clearErrors } = useFormContext();
  const [discountCode, startTime, ednTime] = useWatch({
    name: [DISCOUNT_CODE_FIELDNAME, "startTime", "ednTime"],
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ErrorLabeledInput
        filedName={DISCOUNT_CODE_FIELDNAME}
        type="text"
        placeholder="Discount code"
        onChange={() => {
          onChange();
          clearErrors();
        }}
      />
      <FilledButton
        noFullWidth
        disabled={
          codeType == CodeType.RANDOM || !discountCode?.trim() || isLoading
        }
        onClick={() => {
          setIsLoading(true);
          getDiscountCodeByNameAction(discountCode!)
            .then((code) => {
              if (code.status == "failed") {
                if (code.statusCode == 404) {
                  // code is valid
                  toast.success("Code is usable");
                } else {
                  toast.error(code.data.title);
                }
                return;
              }
              // code existed

              // we check the usability of code here
              // but maybe it is better to delegate the
              // business rules of usability to server side
              // #just_for_simplicity
              const { startTime: st, endTime: et } = code.data;
              if (startTime > et || ednTime < st) {
                // not ovelapping
                toast.success("Code is usable");
                return;
              }

              setError(DISCOUNT_CODE_FIELDNAME, {
                message: `code ${code.data.code} has existed and not usable`,
                type: "value",
              });
            })
            .finally(() => setIsLoading(false));
        }}
      >
        {isLoading ? <CircularProgress size={35} /> : "Check it"}
      </FilledButton>
    </>
  );
}

function GenerateRandomCodeButton({
  onRegistered,
}: {
  onRegistered?: VoidFunction;
}) {
  const { setValue } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <OutlinedButton
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        getRandomDiscountCodeAction()
          .then((result) => {
            if (result.status == "failed") {
              toast(result.data.title);
              return;
            }

            const { code } = result.data;

            setValue(DISCOUNT_CODE_FIELDNAME, code);
            onRegistered?.();
          })
          .finally(() => setIsLoading(false));
      }}
    >
      {isLoading ? <CircularProgress size={30} /> : "Generate Random Code"}
    </OutlinedButton>
  );
}
