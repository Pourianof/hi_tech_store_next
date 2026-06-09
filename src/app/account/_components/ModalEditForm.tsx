"use client";
import { Modal } from "@/ui/modal/modal";
import { EditingFormFrame } from "./EditingFormFrame";
import { ReactNode, useState } from "react";
import { EditableInput, EditableInputProps } from "./EditableInput";
import { FormHandlers } from "@/ui/form/statefulForm";
import { FieldValues, UseFormReturn } from "react-hook-form";

export function ModalEditableInput({
  children,
  modalTitle,
  onSubmit,
  onSubmitionSuccessful,
  ...props
}: {
  children: ReactNode;
  modalTitle: string;
} & EditableInputProps & {
    onSubmit: (
      data: FieldValues,
      form: UseFormReturn,
      closeModal: VoidFunction,
    ) => ReturnType<FormHandlers<Record<string, string>>["onSubmit"]>;
    onSubmitionSuccessful: (
      result: Record<string, unknown>,
      closeModal: VoidFunction,
    ) => void;
  }) {
  const [displayModal, setDisplayModal] = useState(false);

  function closeModal() {
    setDisplayModal(false);
  }
  return (
    <>
      {displayModal && (
        <Modal>
          <EditingFormFrame
            title={modalTitle}
            onClose={closeModal}
            onSubmit={(data, form) => onSubmit(data, form, closeModal)}
            onSubmitionSuccessful={(result) => {
              onSubmitionSuccessful(result, closeModal);
            }}
          >
            {children}
          </EditingFormFrame>
        </Modal>
      )}
      <EditableInput onEdit={() => setDisplayModal(true)} {...props} />
    </>
  );
}
