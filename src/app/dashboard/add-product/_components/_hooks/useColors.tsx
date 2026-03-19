"use client";

import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { COLORS_STATIC_DATA_KEY } from "../availableProductColorInjector";
import { ProductColor } from "@/core/models/product";

export function useColors() {
  const colors = useStaticData(COLORS_STATIC_DATA_KEY) as ProductColor[];
  return colors;
}
