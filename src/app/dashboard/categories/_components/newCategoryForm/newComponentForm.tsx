import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { CategoryProperties } from "./categoryProperties";
import { useCategoryFormContext } from "./categoryFormContext";
import { StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { CategoryComponent } from "@/core/models/category";
import { FieldValues } from "react-hook-form";
import { ResultModel } from "@/core/models/resultModel";
import { useSink } from "@/ui/contexts/channelContext";
import { CATEGORY_COMPONENT_FORM_CHANNEL } from "./newCategoryForm";

export function ComponentForm() {
  const componentSink = useSink<CategoryComponent>(
    CATEGORY_COMPONENT_FORM_CHANNEL
  );
  const categoryFormContext = useCategoryFormContext();
  // async function handleComponentSubmition(data: FieldValues) {
  //   return await submitComponentAction(data as CategoryComponent);
  // }

  async function handleComponentSubmition(
    data: FieldValues
  ): Promise<ResultModel> {
    return { data: data, status: "success", statusCode: 200 };
  }

  return (
    <div>
      <button
        className="hover:bg-gray-neutral-b4 text-sm bg-gray-neutral-cb py-1 px-2 rounded-sm cursor-pointer"
        onClick={categoryFormContext.backToCategoryFormMode}
      >
        <Icon name="arrow_right" className="rotate-180" />
        Back to category form
      </button>
      <h4 className="font-semibold text-lg my-2">
        Create new{" "}
        <span className="bg-green-700 p-1 rounded text-white">Component</span>
      </h4>
      <div>
        <StatefulForm
          onSubmitionSuccessful={(component) => {
            componentSink.add(component as unknown as CategoryComponent);
            categoryFormContext.backToCategoryFormMode();
          }}
          onSubmit={handleComponentSubmition}
        >
          <label>Name</label>
          <ErrorLabeledInput
            filedName="name"
            placeholder="Component name eg: Ram, GPU"
            type="string"
          />
          <label>Desciption</label>
          <ErrorLabeledInput
            filedName="description"
            placeholder="Component description"
            type="string"
          />
          <CategoryProperties title="Component Properties" />
          <div className="flex gap-4">
            <button className="hover:cursor-pointer bg-green-700/70 py-1 px-2 rounded text-gray-100 hover:bg-green-700">
              Submit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                categoryFormContext.backToCategoryFormMode();
              }}
              className="hover:cursor-pointer text-gray-neutral-2d hover:bg-gray-neutral-cb py-1 px-2 rounded hover:text-gray-neutral-44"
            >
              Cancel
            </button>
          </div>
        </StatefulForm>
      </div>
    </div>
  );
}
