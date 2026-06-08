"use client";

import { useCategories } from "@/ui/contexts/categoriesContext";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { Body } from "@/ui/theme/text/body";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { APP_TITLE } from "../consts";
import { ExpandableBox } from "../products/_components/expandableBox";

export function HeaderDrawerButton() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {isDrawerOpen && <Drawer onClose={() => setIsDrawerOpen(false)} />}
      <button
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setIsDrawerOpen(true);
        }}
      >
        <Icon name="menu" />
      </button>
    </>
  );
}

function Drawer({ onClose }: { onClose: VoidFunction }) {
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function handleClose() {
    setIsOpen(false);
    setTimeout(onClose, 210);
  }

  return createPortal(
    <Modal
      variants="raw"
      containerClassName={twMerge(
        "w-3/5 transition-transform duration-200 top-0 bottom-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
      backBtnHandling={false}
      onClose={handleClose}
    >
      <Column className={"gap-4 text-gray-neutral-44"}>
        <Row className="justify-between mb-24px">
          <Image
            alt={APP_TITLE}
            src={"/icons/logo.svg"}
            width={50}
            height={50}
          />
          <button className="text-2xl cursor-pointer" onClick={handleClose}>
            <Icon name="circular_close" />
          </button>
        </Row>
        <ExpandableBox
          title={
            <Link
              className="text-primary-blue-300 cursor-pointer"
              href={{ pathname: "/products" }}
            >
              <Body size="lg">Products</Body>
            </Link>
          }
        >
          {!!categories && (
            <Column className="gap-3 ps-4 py-2 text-gray-neutral-50">
              {categories.map((cat) => (
                <Link
                  key={cat.categoryId}
                  href={{
                    pathname: "/products",
                    query: { category: cat.categoryId },
                  }}
                >
                  <Row className="gap-1" centerV>
                    <ApiImage
                      alt={cat.description}
                      src={cat.icon}
                      className="w-[20px] h-[20px] overflow-clip"
                    />
                    <Body size="md">{cat.name}</Body>
                  </Row>
                </Link>
              ))}
            </Column>
          )}
        </ExpandableBox>
        <Link href={"/blog"}>
          <Body size="lg">Blog</Body>
        </Link>
        <Link href={"/faq"}>
          <Body size="lg">FAQ</Body>
        </Link>
        <Link href={"/contact-us"}>
          <Body size="lg">Contact us</Body>
        </Link>
      </Column>
    </Modal>,
    window.document.body,
  );
}
