import { BrandModel } from "../models/brand";
import { PropertyDto } from "./propertyDto";

export interface ComponentModelDto {
  brandModel: BrandModel;
  properties: PropertyDto[];
  description?: string;
}
