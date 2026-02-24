"use client";

import { OutlinedButton } from "@/ui/form/AppButtons";
import { useFormSubmitter } from "@/ui/form/statefulForm";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DiscountConfirmationModal } from "./discountConfirmationModal";

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
