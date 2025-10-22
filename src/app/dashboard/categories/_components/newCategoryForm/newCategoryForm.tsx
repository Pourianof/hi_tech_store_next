import { Category } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { ChannelProvider } from "@/ui/contexts/channelContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Modal } from "@/ui/modal/modal";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { CategoryComponents } from "./categoryComponent";
import { CategoryFormProvider } from "./categoryFormContext";
import { CategoryProperties } from "./categoryProperties";
import { ComponentContextProvider } from "./componentProvider";
import { ComponentForm } from "./newComponentForm";
import { PreviewFile } from "../../../../../ui/form/previewFile";

interface CategoryFormProps {
  submit: (
    categoryFormData: FormData,
    baseCategory?: Category
  ) => Promise<ResultModel>;
  handleSubmitSuccussfully: (category: Category) => void;
  oncancel: VoidFunction;
  editingCategory?: Category;
}

export const CATEGORY_COMPONENT_FORM_CHANNEL = "CCFC";

interface HidableCategoryFormProps extends CategoryFormProps {
  hide?: boolean;
}

export function NewCategoryForm(props: CategoryFormProps) {
  const [isComponentFormMode, setIsComponentFormMode] = useState(false);
  // this channel system work just because two component are active simultaneously
  // and hide mechanism. but if we destroy the CategoryForm component on displaying
  // ComponentForm, then when sink a component data to channel then no listener exist
  // so data will lost.
  // for those situation need to cache data in channel
  return (
    <Modal className="items-start overflow-auto p-5">
      <ChannelProvider channelIdentifier={CATEGORY_COMPONENT_FORM_CHANNEL}>
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
      </ChannelProvider>
    </Modal>
  );
}

function CategoryForm({
  handleSubmitSuccussfully,
  submit,
  oncancel,
  editingCategory,
  hide,
}: HidableCategoryFormProps & {}) {
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

    if (
      !isEditModeAndKeepOldImage &&
      (!data.icon || !(data.icon as File)?.type.startsWith("image"))
    ) {
      setError("icon", { message: "An icon must set for category" });
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
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center gap-1">
            <span>Image</span>
            <PreviewFile
              fieldname="image"
              className="flex flex-col items-center"
              image={editingCategory?.image}
            />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span>Icon</span>
            <PreviewFile
              fieldname="icon"
              className="flex flex-col items-center"
              image={editingCategory?.icon}
            />
          </div>
        </div>
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
        <CategoryComponents fieldname="components" />
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
