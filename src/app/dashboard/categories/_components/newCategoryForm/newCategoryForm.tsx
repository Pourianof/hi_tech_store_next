import { Category } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { ChannelProvider } from "@/ui/contexts/channelContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { CategoryComponents } from "./categoryComponent";
import { CategoryFormProvider } from "./categoryFormContext";
import { CategoryProperties } from "./categoryProperties";
import { ComponentContextProvider } from "./componentProvider";
import { ComponentForm } from "./newComponentForm";
import { PreviewFile } from "../../../../../ui/form/previewFile";
import { Row } from "@/ui/layouts/row";
import { Column } from "@/ui/layouts/column";

interface CategoryFormProps {
  submit: (
    categoryFormData: FormData,
    baseCategory?: Category,
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
    { setError }: UseFormReturn,
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
      className="h-full"
    >
      <div
        className={hide ? "hidden" : "grid grid-rows-[auto_1fr] h-full"}
        aria-hidden={hide}
      >
        <Column className="overflow-auto gap-2">
          <Row className="justify-evenly">
            <Column className="items-center gap-1">
              <span>Image</span>
              <PreviewFile
                fieldname="image"
                className="flex flex-col items-center"
                image={editingCategory?.image}
              />
            </Column>
            <Column className="gap-1 items-center">
              <span>Icon</span>
              <PreviewFile
                fieldname="icon"
                className="flex flex-col items-center"
                image={editingCategory?.icon}
              />
            </Column>
          </Row>
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
        </Column>
        <Row className="gap-2">
          <StatefulForm.Submitter
            render={(submitter, isSubmitting) => (
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-green-700 hover:bg-green-800 cursor-pointer rounded-md px-2 py-1 text-white"
                onClick={submitter}
              >
                Submit
              </button>
            )}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              oncancel();
            }}
            className="hover:outline outline-gray-200 px-2 py-1 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
        </Row>
      </div>
    </StatefulForm>
  );
}
