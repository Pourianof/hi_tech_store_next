import z from "zod";
import { DiscountAction } from "../models/discount";
import { ProductVariation } from "../models/product";
import {
  discountCodeSchema,
  discountSchema,
} from "../schemas/discountCodeSchema";

export interface DiscountUpdateDto {
  isDeactivated?: boolean;
  description?: string;
}

export interface DiscountCodeQuery {
  page?: number;
  limit?: number;
}

export type DiscountCreationDto = z.infer<typeof discountSchema>;
export type DiscountCodeCreationDto = z.infer<typeof discountCodeSchema>;

export interface DiscountCodeCheckResultDto {
  isDiscountAppliable: boolean;
  appliedTo?: string;
  discountedProducts?: ProductVariation[];
  discount: DiscountAction;
}
