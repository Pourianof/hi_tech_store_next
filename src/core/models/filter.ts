export interface Filters {
  properties: PropertyFilter[];
  components: {
    componentId: number;
    name: number;
    properties: PropertyFilter[];
  }[];
  brands?: {
    brandId?: number;
    name?: string;
    frequency?: number;
  }[];
  priceRange?: {
    max?: number;
    min?: number;
  };
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
