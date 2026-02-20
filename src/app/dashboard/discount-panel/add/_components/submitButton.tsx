"use client";

import { OutlinedButton } from "@/ui/form/AppButtons";
import { useState } from "react";
import { DiscountConfirmationModal } from "./discountConfirmationModal";
import { useFormContext } from "react-hook-form";
import { useFormSubmitter } from "@/ui/form/statefulForm";

export function SubmitButton() {
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const { trigger } = useFormContext();
  const submitter = useFormSubmitter();

  function onSubmit() {
    trigger().then((isValid) => {
      if (isValid) {
        setDisplayConfirmationModal(true);
      }
    });
  }

  function onConfirm() {
    // setDisplayConfirmationModal(false);
    submitter.submit();
  }

  return (
    <>
      {displayConfirmationModal && (
        <DiscountConfirmationModal
          onConfirm={onConfirm}
          onCancel={() => setDisplayConfirmationModal(false)}
        />
      )}
      <div className="flex sticky bottom-0 justify-end py-4 bg-white">
        <OutlinedButton onClick={onSubmit}>Submit Discount</OutlinedButton>
      </div>
    </>
  );
}
