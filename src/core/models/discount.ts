import z from "zod";
import {
  discounConditionGroupSchema,
  discountActionSchema,
  discountCodeSchema,
  discountConditionSchema,
  discountEntityPropertySchema,
  discountRuleSchema,
} from "../schemas/discountCodeSchema";

export type DiscountEntity = {
  id: number;
  name: string;
  description: string;
  properties: DiscountEntityProperty[];
};
export type DiscountEntityProperty = z.infer<
  typeof discountEntityPropertySchema
>;
export type DiscountCode = z.infer<typeof discountCodeSchema> & {
  discountCodeId: number;
  creatorId: number;
  isDeactivated: boolean;
};
export type DiscountRule = z.infer<typeof discountRuleSchema>;
export type DiscountAction = z.infer<typeof discountActionSchema>;
export type DiscountConditioGroup = z.infer<typeof discounConditionGroupSchema>;
export type DiscountCondition = z.infer<typeof discountConditionSchema>;
