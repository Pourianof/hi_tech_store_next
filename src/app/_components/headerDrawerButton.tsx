"use client";

import Icon from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { APP_TITLE } from "../consts";
import { ExpandableBox } from "../products/_components/expandableBox";
import { useCategories } from "@/ui/contexts/categoriesContext";
import { ApiImage } from "@/ui/image/ApiImage";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      containerClassName={
        "w-3/5 transition-transform duration-200 " +
        (isOpen ? "translate-x-0" : "-translate-x-full")
      }
      onClose={handleClose}
    >
      <div className={"flex flex-col gap-2 text-gray-neutral-44"}>
        <div className="flex justify-between">
          <Image
            alt={APP_TITLE}
            src={"/icons/logo.svg"}
            width={50}
            height={50}
          />
          <button className="text-2xl cursor-pointer" onClick={handleClose}>
            <Icon name="circular_close" />
          </button>
        </div>
        <ExpandableBox
          title={
            <button
              className="text-primary-blue-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                router.push("/products");
                handleClose();
              }}
            >
              Products
            </button>
          }
        >
          {!!categories && (
            <div className="flex flex-col gap-2 ps-4 text-gray-neutral-50">
              {categories.map((cat) => (
                <div key={cat.categoryId} className="flex gap-1 items-center">
                  <ApiImage
                    alt={cat.description}
                    src={cat.icon}
                    className="w-[20px]"
                  />
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          )}
        </ExpandableBox>
        <Link href={"/blog"}>Blog</Link>
        <Link href={"/faq"}>FAQ</Link>
        <Link href={"/contact-us"}>Contact us</Link>
      </div>
    </Modal>,
    window.document.body
  );
}
