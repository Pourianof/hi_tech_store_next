"use client";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { IconButton } from "@mui/material";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { MobileHeaderTop } from "./header";
import { ProductSearchList } from "./productSearch";

export function MobileSearchInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal
          variants="full-page"
          onClose={() => setIsModalOpen(false)}
          diableScroll
        >
          <SearchView onBack={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <SearchInput
        onClick={(e) => {
          e.preventDefault();

          setIsModalOpen(true);
        }}
      />
    </>
  );
}

function SearchInput(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <Row
      className="grow relative bg-gray-neutral-ed py-1 px-2 rounded text-gray-neutral-71"
      centerV
    >
      <input
        type="search"
        className="grow outline-0 px-1"
        dir="auto"
        placeholder="What can we help you to find ?"
        {...props}
      />
      <Icon name="search" className="fill-gray-neutral-71" />
    </Row>
  );
}

function SearchView({ onBack }: { onBack(): void }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="gap-y-[24px] grid grid-rows-[auto_auto_1fr] h-full">
      <MobileHeaderTop />
      <Row className="gap-2" centerV>
        <IconButton title="Back to home" onClick={onBack}>
          <Icon name="arrow_forward" className="text-lg rotate-180" />
        </IconButton>
        <SearchInput
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm((e.target as HTMLInputElement).value);
          }}
        />
      </Row>
      <div className="overflow-auto">
        <ProductSearchList searchTerm={searchTerm} />
      </div>
    </div>
  );
}
