"use client";

import Icon from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { useState } from "react";
import { ProductSearch } from "./productSearch";

export function SearchButton() {
  const [displaySearchModal, setDisplaySearchModal] = useState(false);

  return (
    <>
      {displaySearchModal && (
        <Modal
          containerClassName="absolute p-0 flex bg-transparent w-3/4 top-[10dvh] bottom-none max-h-[85dvh]"
          variants="center-x"
          backBtnHandling={false}
        >
          <ProductSearch onClose={() => setDisplaySearchModal(false)} />
        </Modal>
      )}
      <button
        className="w-[30px] hover:cursor-pointer aspect-square rounded-full fill-primary-blue-400 hover:fill-primary-blue-0c hover:bg-primary-blue-0c/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue-0c/20"
        onClick={(e) => {
          e.preventDefault();
          setDisplaySearchModal(true);
        }}
      >
        <Icon name="search" />
      </button>
    </>
  );
}
