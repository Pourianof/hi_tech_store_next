import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { CategoryProperties } from "./categoryProperties";
import { useCategoryFormContext } from "./categoryFormContext";
import { useCategoryComponents } from "./componentProvider";
import { submitComponentAction } from "@/lib/server_actions/componentActions";
import { StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { CategoryComponent } from "@/core/models/category";
import { FieldValues } from "react-hook-form";

export function ComponentForm() {
  const categoryFormContext = useCategoryFormContext();
  const componentContext = useCategoryComponents();
  async function handleComponentSubmition(data: FieldValues) {
    return await submitComponentAction(data as CategoryComponent);
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
            component.isNew = true;
            componentContext.addComponent(
              component as unknown as CategoryComponent
            );
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
