import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";
import {
  DISCOUNT_CONDITION_ENTITY,
  DISCOUNT_ENTITY_PROPERTY,
} from "../fieldNames";
import { DiscountEntity, DiscountEntityProperty } from "@/core/models/discount";
import { useWatch } from "react-hook-form";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { DISCOUNT_Entities_KEY } from "../ruleForm";

export function useSelectedProps() {
  const propsFieldname = useFieldPath(DISCOUNT_ENTITY_PROPERTY);
  const entityFieldname = useFieldPath(DISCOUNT_CONDITION_ENTITY);

  const [props, entityId] = useWatch({
    name: [propsFieldname, entityFieldname],
  }) as [number[] | undefined, number | undefined];

  const entities = useStaticData(DISCOUNT_Entities_KEY) as DiscountEntity[];

  if (!Number.isFinite(entityId) || !props?.length) {
    return [];
  }

  const entity = entities.find((e) => e.id === entityId);

  if (!entity) {
    return [];
  }

  return props.reduce((acc: DiscountEntityProperty[], propId: number) => {
    const prop = (acc.at(-1)?.subEntity ?? entity)?.properties.find(
      (p) => p.id === propId,
    );
    if (prop) {
      acc.push(prop);
    }
    return acc;
  }, []);
}
