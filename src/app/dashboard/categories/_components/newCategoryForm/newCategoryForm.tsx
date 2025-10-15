import { Category } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Modal } from "@/ui/modal/modal";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { CategoryComponents } from "./categoryComponent";
import { CategoryFormProvider } from "./categoryFormContext";
import { CategoryProperties } from "./categoryProperties";
import { ComponentContextProvider } from "./componentProvider";
import { PreviewFile } from "./previewFile";
import { ComponentForm } from "./newComponentForm";

interface CategoryFormProps {
  submit: (
    categoryFormData: FormData,
    baseCategory?: Category
  ) => Promise<ResultModel>;
  handleSubmitSuccussfully: (category: Category) => void;
  oncancel: VoidFunction;
  editingCategory?: Category;
}

interface HidableCategoryFormProps extends CategoryFormProps {
  hide?: boolean;
}

export function NewCategoryForm(props: CategoryFormProps) {
  const [isComponentFormMode, setIsComponentFormMode] = useState(false);

  return (
    <Modal>
      <ComponentContextProvider>
        <CategoryFormProvider
          context={{
            backToCategoryFormMode() {
              setIsComponentFormMode(false);
            },
            changeToComponentFormMode: () => setIsComponentFormMode(true),
          }}
        >
          {isComponentFormMode && <ComponentForm />}
          <CategoryForm {...props} hide={isComponentFormMode} />
        </CategoryFormProvider>
      </ComponentContextProvider>
    </Modal>
  );
}

function CategoryForm({
  handleSubmitSuccussfully,
  submit,
  oncancel,
  editingCategory,
  hide,
}: HidableCategoryFormProps) {
  async function handleForSubmission(
    data: FieldValues,
    { setError }: UseFormReturn
  ) {
    const isEditModeAndKeepOldImage = !data.image && !!editingCategory?.image;
    if (
      !isEditModeAndKeepOldImage &&
      (!data.image || !(data.image as File)?.type.startsWith("image"))
    ) {
      setError("image", { message: "Some cover image must set for category" });
      return;
    }

    const formData = convertFieldValuesToFormData(data);
    return submit(formData, editingCategory);
  }

  return (
    <StatefulForm
      onSubmitionSuccessful={(category) => {
        handleSubmitSuccussfully(category as unknown as Category);
      }}
      onSubmit={handleForSubmission}
    >
      <div className={hide ? "hidden" : ""} aria-hidden={hide}>
        <center>
          <PreviewFile image={editingCategory?.image} />
        </center>
        <ErrorLabeledInput
          initValue={editingCategory?.name}
          filedName="name"
          type="text"
          placeholder="Name"
        />
        <ErrorLabeledInput
          initValue={editingCategory?.description}
          filedName="description"
          type="text"
          placeholder="Description"
        />
        <CategoryComponents />
        <CategoryProperties
          title="Category features"
          defaultProperties={editingCategory?.properties}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-700 rounded-md px-2 py-1 text-white"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              oncancel();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </StatefulForm>
  );
}
