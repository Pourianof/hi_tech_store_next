import {
  DiscountActionType,
  DiscountConditionOperation,
} from "../schemas/discountCodeSchema";

export interface DiscountCode {
  discountCodeId: number;
  code: string;
  description?: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  isDeactivated: boolean;
  creatorId: string;
  rules: DiscountRule[];
}

export interface DiscountRule {
  discountRuleId: number;
  name: string;
  description?: string;
  conditions: DiscountConditionGroup[];
  discountAction: DiscountAction;
}

export interface DiscountAction {
  type: DiscountActionType;
  value: number;
}

export interface DiscountConditionGroup {
  discountConditionGroupId: number;
  conditions: DiscountCondition[];
}

export interface DiscountCondition {
  discountConditionId: number;
  entityProperty: DiscountEntityProperty;
  priority: number;
  operation: DiscountConditionOperation;
  value: string;
}

export interface DiscountEntity {
  id: number;
  name: string;
  description?: string;
  properties: DiscountEntityProperty[];
}

export interface DiscountEntityProperty {
  id: number;
  name: string;
  description?: string;
  subEntity?: DiscountEntity;
  type: string;
}
