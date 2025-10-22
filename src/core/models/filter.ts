export interface Filters {
  properties: PropertyFilter[];
  components: ComponentFilter[];
  brands?: FilterBrand[];
  priceRange?: {
    max?: number;
    min?: number;
  };
}

interface FilterBrand {
  brandId?: number;
  name?: string;
  frequency?: number;
}

export interface ComponentFilter {
  componentTypeId: number;
  name: string;
  properties: PropertyFilter[];
  commonBrands: FilterBrand[];
}

interface PropertyFilter {
  propertyId: number;
  name: string;
  unit?: string;
  totalFrequency: number;
  commonValues?: PropertyCommonValue[];
}

interface PropertyCommonValue {
  value: number;
  frequency: number;
}
