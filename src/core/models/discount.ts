export interface DiscountEntity {
  id: number;
  name: string;
  description: string;
  properties: DiscountEntityProperty[];
}

export interface DiscountEntityProperty {
  id: number;
  name: string;
  description: string;
  subEntity?: DiscountEntity;
  type: string;
}

export interface DiscountCode {
  code: string;
  startTime: number;
  endTime: number;
  rules: DiscountRule[];
}

export interface DiscountRule {
  name: string;
  description: string;
  conditions: DiscountConditioGroup[];
  discountAction: DiscountAction;
}

export interface DiscountAction {
  value: number;
  type: DiscountActionType;
}

export enum DiscountActionType {
  PERCENTAGE,
  FIXED,
}

export interface DiscountConditioGroup {
  conditions: DiscountCondition[];
}

export interface DiscountCondition {
  entityProperty: number;
  priority: number;
  operation: DiscountConditionOperation;
  value: number;
}

export enum DiscountConditionOperation {
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  EQUAL,
  CONTAINS,
}
