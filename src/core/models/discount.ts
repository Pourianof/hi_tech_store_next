import z from "zod";

export enum DiscountEntityProperyValueType {
  STRING = "String",
  INT = "Int",
  FLOAT = "Float",
  BOOLEAN = "Boolean",
  DATETIME = "Date",
  OBJECT = "Object",
}

const discountEntityPropertyValueTypeEnum = z.enum(
  DiscountEntityProperyValueType,
);

export const discountEntitySchema: z.ZodType<DiscountEntity> = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    properties: z.array(discountEntityPropertySchema),
  }),
);

export const discountEntityPropertySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  subEntity: discountEntitySchema.optional(),
  type: discountEntityPropertyValueTypeEnum,
});

export enum DiscountActionType {
  PERCENTAGE,
  FIXED,
}

export const discountActionTypeEnum = z.enum(DiscountActionType);

export const discountActionSchema = z.object({
  value: z.coerce.number(),
  type: discountActionTypeEnum,
});

export enum DiscountConditionOperation {
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  EQUAL,
  CONTAINS,
}

export const discountConditionOperationEnum = z.enum(
  DiscountConditionOperation,
);

export const discountConditionSchema = z.object({
  entityPropertyId: z
    .union([z.number(), z.array(z.number()).nonempty()])
    .transform((val) => (Array.isArray(val) ? val.at(-1)! : val)),
  priority: z.number().optional(),
  operation: discountConditionOperationEnum,
  value: z.coerce.string(),
});

export const discounConditionGroupSchema = z.object({
  conditions: z.array(discountConditionSchema),
});

export const discountRuleSchema = z.object({
  name: z.string(),
  description: z.string(),
  conditions: z.array(discounConditionGroupSchema),
  discountAction: discountActionSchema,
});

export const discountCodeSchema = z.object({
  code: z.string(),
  description: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  rules: z.array(discountRuleSchema),
});

export type DiscountEntity = {
  id: number;
  name: string;
  description: string;
  properties: DiscountEntityProperty[];
};
export type DiscountEntityProperty = z.infer<
  typeof discountEntityPropertySchema
>;
export type DiscountCode = z.infer<typeof discountCodeSchema>;
export type DiscountRule = z.infer<typeof discountRuleSchema>;
export type DiscountAction = z.infer<typeof discountActionSchema>;
export type DiscountConditioGroup = z.infer<typeof discounConditionGroupSchema>;
export type DiscountCondition = z.infer<typeof discountConditionSchema>;
