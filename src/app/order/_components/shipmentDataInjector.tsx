import { StaticDataInjector } from "@/ui/contexts/StaticDataInjector";
import { ReactNode } from "react";

export const SHIPMENT_PRICE_DATA = "shipment-price";

export type ShipmentData = { name: string; price: number };

export function ShipmentDataInjector({ children }: { children: ReactNode }) {
  return (
    <StaticDataInjector
      data={
        [
          { name: "free", price: 0 },
          { name: "regular", price: 7.5 },
          { name: "express", price: 22.5 },
        ] as ShipmentData[]
      }
      dataKey={SHIPMENT_PRICE_DATA}
    >
      {children}
    </StaticDataInjector>
  );
}
