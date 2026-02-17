import {
  DiscountActionType,
  DiscountConditioGroup,
  DiscountCondition,
  DiscountEntity,
  DiscountRule,
} from "@/core/models/discount";
import { FilledButton, OutlinedButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { useFormContext } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
import { BaseConditionInterpreter } from "./ruleForm/conditionInterpreter";
import { findPropertiesFromEntity } from "./ruleForm/hooks/useSelectedProps";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { DISCOUNT_Entities_KEY } from "./ruleMakerEntitiesInjector";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function DiscountConfirmationModal({ onCancel, onConfirm }: Props) {
  const { getValues } = useFormContext();

  const { description, startDate, endDate, rules } = getValues();

  return (
    <Modal containerClassName="grid grid-rows-[auto_1fr_auto]  ">
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
          {rules.map((rule: DiscountRule, index: number) => (
            <RuleItemOverview key={index} rule={rule} index={index} />
          ))}
        </div>
      </Column>
      <div className="flex justify-between gap-2">
        <FilledButton onClick={onConfirm}>Confirm</FilledButton>
        <OutlinedButton onClick={onCancel}>Cancel</OutlinedButton>
      </div>
    </Modal>
  );
}

function RuleItemOverview({
  rule,
  index,
}: {
  rule: DiscountRule;
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
      <ContionListOverview rule={rule} />
    </Column>
  );
}

function ContionListOverview({ rule }: { rule: DiscountRule }) {
  return (
    <ul className="bg-slate-400 p-1 rounded">
      {rule.conditions.map(
        (conditionGroup: DiscountConditioGroup, condIndex: number) => (
          <li key={condIndex}>
            {!!conditionGroup.conditions?.length && (
              <ul>
                <Column className=" bg-slate-200 rounded p-1 text-slate-800 gap-2">
                  {conditionGroup.conditions.map(
                    (subCondition: DiscountCondition, subCondIndex: number) => (
                      <ConditionItemOverview
                        key={subCondIndex}
                        condition={subCondition}
                        subCondIndex={subCondIndex}
                      />
                    ),
                  )}
                </Column>
              </ul>
            )}
          </li>
        ),
      )}
    </ul>
  );
}

function ConditionItemOverview({
  condition,
  subCondIndex,
}: {
  condition: DiscountCondition;
  subCondIndex: number;
}) {
  const propIds = condition.entityProperty as never as number[];

  const entities = useStaticData(DISCOUNT_Entities_KEY) as DiscountEntity[];
  const entity = entities.find(
    (e) =>
      e.id ===
      (condition as never as { discountEntity: number }).discountEntity,
  );

  if (!entity) {
    return <div>Entity not found</div>;
  }

  const properties = findPropertiesFromEntity(entity, propIds);
  return (
    <li key={subCondIndex}>
      <BaseConditionInterpreter
        entity={entity}
        op={condition.operation}
        porperties={properties}
        value={condition.value}
        column
        withFieldNames
      />
    </li>
  );
}
