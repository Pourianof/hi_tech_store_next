import z from "zod";
import { discountCodeSchema } from "../schemas/discountCodeSchema";

export interface DiscountUpdateDto {
  isDeactivated?: boolean;
  description?: string;
}

export interface DiscountCodeQuery {
  page?: number;
  limit?: number;
}

export type DiscountCodeCreationDto = z.infer<typeof discountCodeSchema>;
