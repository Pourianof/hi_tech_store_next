"use client";
import Image from "next/image";
import { PageTitle } from "../../_components/pageTitle";
import { useEffect, useRef, useState } from "react";
import { Order } from "@/core/models/order";

enum OrderTabs {
  CURRENT = "Current",
  DELIVERED = "Delivered",
  CANCELED = "Canceled",
  RETURNED = "Returned",
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTabs>(OrderTabs.CURRENT);
  const ordersCache = useRef<{ [key: string]: Order[] }>({});

  useEffect(() => {
    if (ordersCache.current[activeTab as string]) {
      return;
    }

    // fetch orders
  }, [activeTab]);

  return (
    <div className="grow">
      <PageTitle
        title="Order History"
        description="Track, return or purchase items"
      />
      <div>
        <div
          onClick={(e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            if (target.closest("[data-tab-id]")) {
              const newTabId = target.dataset.tabId;
              if (newTabId && newTabId != activeTab) {
                setActiveTab(newTabId as OrderTabs);
              }
            }
          }}
          className="flex *:py-0.5 *:px-1 border-b border-b-gray-500 text-gray-500 text-md gap-2"
        >
          <span data-tab-id={OrderTabs.CURRENT} className="">
            {OrderTabs.CURRENT}
          </span>
          <span data-tab-id={OrderTabs.DELIVERED} className="">
            {OrderTabs.DELIVERED} 0
          </span>
          <span data-tab-id={OrderTabs.CANCELED} className="">
            {OrderTabs.CANCELED} 0
          </span>
          <span data-tab-id={OrderTabs.RETURNED} className="">
            {OrderTabs.RETURNED} 0
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-16">
        <Image
          alt="Order list"
          width={200}
          height={200}
          src={"/images/ui/order_list.png"}
        />
        <span>You have not placed any orders yet</span>
      </div>
    </div>
  );
}
