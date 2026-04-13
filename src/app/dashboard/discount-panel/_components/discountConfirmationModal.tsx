import {
  DiscountActionType,
  DiscountRuleCreationDto,
} from "@/core/schemas/discountCodeSchema";
import { FilledButton, OutlinedButton } from "@/ui/form/AppButtons";
import { flatAllErrors } from "@/ui/form/rhf/reactHookFormHelpers";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { CircularProgress } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
import { DiscountScriptEditor } from "./discountScriptEditor";
import { DiscountCodeGenerator } from "./discountCodeGenerator";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function DiscountConfirmationModal({ onCancel, onConfirm }: Props) {
  const {
    getValues,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const { description, startDate, endDate, rules } = getValues();

  const errorMessages = flatAllErrors(errors, getValues());

  return (
    <Modal
      containerClassName="grid grid-rows-[auto_1fr_auto_auto]  "
      backBtnHandling={false}
    >
      <h3 className="text font-semibold text-2xl mb-2">Discount overview:</h3>
      <Column className="border gap-2 p-2 overflow-auto scroll-py-2">
        <p className="p-2 rounded bg-slate-300">
          <strong>Description:</strong> {description}
        </p>
        <p className="p-2 rounded bg-slate-300">
          <strong>Start Date:</strong>{" "}
          {new DateObject(startDate).format("dddd DD MMM YYYY")}
        </p>
        <p className="p-2 rounded bg-slate-300">
          <strong>End Date:</strong>{" "}
          {new DateObject(endDate).format("dddd DD MMM YYYY")}
        </p>
        <strong>Rules:</strong>{" "}
        <div className="p-2 rounded bg-neutral-300">
          {rules.map((rule: DiscountRuleCreationDto, index: number) => (
            <RuleItemOverview key={index} rule={rule} index={index} />
          ))}
        </div>
      </Column>
      <DiscountCodeGenerator />
      {isSubmitting ? (
        <Row className="items-center justify-center">
          Is submitting
          <CircularProgress size={25} />
        </Row>
      ) : (
        <Row className="justify-between gap-2">
          {!!errorMessages.length ? (
            <Column className="max-h-[60px] scroll-auto gap-2">
              {errorMessages.map((err, i) => (
                <span
                  key={i}
                  className="text-sm text-red-500 flex items-center before:content-[''] before:block before:w-[8px] before:aspect-square before:rounded-full before:bg-red-500 before:mr-2"
                >
                  {err}
                </span>
              ))}
            </Column>
          ) : (
            <FilledButton onClick={onConfirm} disabled={isSubmitting}>
              Confirm
            </FilledButton>
          )}

          <OutlinedButton onClick={onCancel}>Cancel</OutlinedButton>
        </Row>
      )}
    </Modal>
  );
}

function RuleItemOverview({
  rule,
  index,
}: {
  rule: DiscountRuleCreationDto;
  index: number;
}) {
  return (
    <Column className="mb-2">
      <Row className="items-baseline">
        <strong className="rounded-full flex items-center justify-center bg-neutral-700 text-white w-8  aspect-square text-center">
          #{index + 1}
        </strong>
        <Column>
          <span className="font-semibold">{rule.name}</span>
          <span className="text-sm">{rule.description}</span>
        </Column>
      </Row>
      <Row className="text-lg font-semibold my-2">
        <span>Discount:</span>
        <Row className="items-center bg-amber-500 p-0.5 w-fit rounded">
          <span>{rule.discountAction.value}</span>
          <span>
            {rule.discountAction.type == DiscountActionType.FIXED ? (
              <Icon name="dollar" />
            ) : (
              <Icon name="discount" className="text-2xl" />
            )}
          </span>
        </Row>
      </Row>
      <RuleScriptsOverview index={index} />
    </Column>
  );
}

function RuleScriptsOverview({ index }: { index: number }) {
  const productScriptFieldName = useFieldPath("rules", index, "productScript");
  const userScriptFieldName = useFieldPath("rules", index, "userScript");

  const [userScript, productScript] = useWatch({
    name: [userScriptFieldName, productScriptFieldName],
  });

  return (
    <Column className="gap-2">
      {!!productScript?.trim() && (
        <Column className="p-2 border border-gray-600 rounded">
          <span className="font-semibold">Product script</span>
          <DiscountScriptEditor fieldname={productScriptFieldName} readOnly />
        </Column>
      )}
      {!!userScript?.trim() && (
        <Column className="p-2 border border-gray-600 rounded">
          <span className="font-semibold">user script</span>
          <DiscountScriptEditor
            fieldname={userScriptFieldName}
            readOnly
            noPreview
          />
        </Column>
      )}
    </Column>
  );
}
